import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import ComponentPatternSelectView from '../component/componentPatternSelectView';
import ComponentAddContainer from './componentAddContainer';
import ComponentPatternSelectConfirmView from '../component/componentPatternSelectConfirmView'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import { apiDesignTypeGet, apiLearningCompTempGet, apiLearningCompPost, apiLearningOutcomePost, apiCourseGet } from '../../../api';
import { result } from 'lodash';


const ComponentSelectContainer = (props ) => {
    const [ components, setComponents ] = React.useState([]);
    const [ designType, setDesignType ] = React.useState({
        id: -1,
        name: ""
    })
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ openAddDialog , setOpenAddDialog ] =  React.useState(false)
    const [ isSuccess, setIsSuccess ] = React.useState(false);
    const [ unSuccessComp, setUnSuccessComp ] = React.useState([]);

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);

    React.useEffect(()=>{
        fetchComponents()
    }, [course])

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightgrey' : '',
        width: '100%'
    });

    //#region local functino
    const fetchComponents = () => {

        if(typeof course.design_type_id != 'undefined'){
            apiDesignTypeGet(course.design_type_id).then((response)=>{
                if(typeof response.data.components != 'undefined'){
                    setLoadingOpen(true);
                    setDesignType(response.data);
                    var updates = [];
                    response.data.components.map((_component, index) => {
                        updates.push( 
                            apiLearningCompTempGet(_component.id).then(response=>{
                                var component_temp = response.data;
                                component_temp.sequence = index + 1;
                                component_temp.is_selected = false;
                                return component_temp;
                                // setComponents(_prev => ([..._prev, component_temp].sort((a,b) => {return a.sequence - b.sequence})))
                            }) 
                        );
                    })

                    Promise.all(updates).then((result)=>{
                        setLoadingOpen(false);
                        setComponents(result.sort((a,b) => {return a.sequence - b.sequence}))
                    });
                }
            })
        }
    }

    const feedbackComponent = (component) => {
        // feedback function to edit component from children 
        var components_temp = components;
        components_temp.find( x => x.id == component.id && x.sequence == component.sequence).patterns = component.patterns;
        components_temp.find( x => x.id == component.id && x.sequence == component.sequence).title = component.title;
        setComponents(components_temp);
    }

    const checkComponents = () => {
        var unsuccess = [];
        if(components.filter(_component => _component.is_selected == false).length > 0){
            unsuccess = components.filter(_component => _component.is_selected == false).map(x => x.title);
            setIsSuccess(false);
        }else{
            setIsSuccess(true);
        }
        setUnSuccessComp(unsuccess);
        setIsOpen(true);
    }

    const onCloseDialog = () => {
        setIsOpen(false);
    }

    const importComponentTempToComponent = () => {
        var updates = [];
        setLoadingOpen(true);
        components.map((component)=>{
            var request = JSON.parse(JSON.stringify(component));
            request.component_template_id = component.id;
            request.course_id = course.id;
            request.outcomes_id = handleComponentOutcomeMapping(component.outcomes);

            // var lo_add = handleComponentOutcomeAdd(request.outcomes);
            // if(lo_add.length > 0){
            //     updates.push(Promise.resolve(handleComponentWithLO(request, lo_add)));
            // }else{
            //   //normal handling => no addition lo need to be adde
            //   if(typeof request.outcomes !== 'undefined'){
            //     request.outcomes_id = handleComponentOutcomeMapping(request.outcomes);
            //   }
            //   updates.push(Promise.resolve(apiLearningCompPost(request)));
            // }
            if(typeof request.outcomes !== 'undefined'){
                request.outcomes_id = handleComponentOutcomeMapping(request.outcomes);
              }
            updates.push(Promise.resolve(apiLearningCompPost(request)));
        });
        Promise.all(updates).then((rs)=>{
            Promise.all(rs).then(()=>{
                setLoadingOpen(false);
                refreshCourse();
                props.handleNext();
            })
        });
    }

    const handleComponentWithLO = (tempcomponent, lo_add) => {
        // addition lo need to be added

            // add lo
        var add_request = [];
        lo_add.map(_lo => {
            if(tempcomponent.outcomes.filter( x => x.id == _lo  && x.isCourseLevel).length > 0 ){
                var outcome = tempcomponent.outcomes.find( x => x.id == _lo && x.isCourseLevel);
                // handle lo/ slo
                if(typeof outcome.slo_outcome != 'undefined'){
                    outcome.slo_outcome = outcome.slo_outcome.filter( x => lo_add.indexOf(x.id) > -1);
                }
            
                outcome['template_id'] = outcome.id;
                outcome['course_id'] = course.id;
                add_request.push(apiLearningOutcomePost(outcome));
            }
        })

            // re-map added lo to component
        return Promise.all(add_request).then(()=>{
            return apiCourseGet(course.id)
        }).then((rs)=>{
            var outcome_id = [];
            rs.data.outcomes.map((_outcome) => {
                //ulo
                tempcomponent.outcomes.map(_clo => {
                    if(_clo.id == _outcome.template_id){
                        outcome_id.push({"outcome_id":_outcome.id});
                    }
                });
        
                //sub-lo
                _outcome.slo_outcome.map((_slo) => {
                    tempcomponent.outcomes.map(_clo => {
                        if(_clo.id == _slo.template_id){
                            outcome_id.push({"outcome_id":_slo.id});
                        }
                    });
                })
            })
            tempcomponent.outcomes_id = outcome_id;
            return apiLearningCompPost(tempcomponent);
        })
    }

    const handleComponentOutcomeAdd = (clos) => {
        var outcome_id = [];
    
        clos.map(_clo => {
          var add = true;
          course.outcomes.map((_outcome) => {
            //ulo
            if(_clo.id == _outcome.template_id){
              add = false;
            }
            //slo
            _outcome.slo_outcome.map((_slo) => {
              if(_clo.id == _slo.template_id){
                add = false;
              }
            })
          });
    
          if(add){
            outcome_id.push(_clo.id)
          }
        })
        return outcome_id;
      }

    const handleComponentOutcomeMapping = (clos) => {
        var outcome_id = [];
        course.outcomes.map((_outcome) => {
            //ulo
            clos.map(_clo => {
                if(_clo.id == _outcome.template_id){
                    outcome_id.push({"outcome_id":_outcome.id});
                }
            });

            //sub-lo
            _outcome.slo_outcome.map((_slo) => {
                clos.map(_clo => {
                    if(_clo.id == _slo.template_id){
                        outcome_id.push({"outcome_id":_slo.id});
                    }
                });
            })
        })

        return outcome_id;
    }

    const onAddComponent = (components_add) => {
        setLoadingOpen(true);

        var updates = [];
        var components_add = components_add;
        components_add.map((_component) => {
            updates.push(
                apiLearningCompTempGet(_component.template_id).then((response) => {
                    var component_temp = response.data;
                    component_temp.is_selected = false;
                    setComponents(_prev => ([..._prev, {...component_temp, sequence:  _prev.length + 1}].sort((a,b) => {return a.sequence - b.sequence})))
                })
            )
        })
        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
        })
    }

    const onDeleteComponent = (index) => {
        var temp = components.filter((_component, _index) => _index != index);
        setComponents(temp);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var temp =  JSON.parse( JSON.stringify(components) );
        var source = JSON.parse( JSON.stringify(components[result.source.index]) );
        
        if(result.destination.index == result.source.index){

        }else if(result.destination.index > result.source.index){
            temp.splice(result.destination.index + 1, 0, source);
            temp.splice(result.source.index , 1);
            
        }else{
            temp.splice(result.destination.index, 0, source);
            temp.splice(result.source.index + 1 , 1);
        }

        temp.map((_temp, index) => _temp.sequence = index + 1);
        setComponents(temp);
    }
    //#endregion

    //#region display function related
    const displayDialog = () => {
        if(isSuccess){
            return displaySuccessDialog();
        }else{
            return displayFailDialog();
        }
    }

    const displaySuccessDialog = () => {
        return (
            <React.Fragment>
                <ComponentPatternSelectConfirmView 
                    importComponentTempToComponent = {importComponentTempToComponent}
                    onCloseDialog = {onCloseDialog}
                    components = {components}
                />
            </React.Fragment>
        );
    }

    const displayFailDialog = () => {
        return (
            <React.Fragment>
                <DialogContent>
                    <DialogContentText >
                        <Typography variant = {"h6"} color = {"secondary"}>
                            Warning!
                        </Typography>

                        <Typography variant = {"subtitle2"}>
                            You have not choose the component patterns for all your CC.
                        </Typography>
                        <Typography variant = {"subtitle1"}  color = {"secondary"}>
                            Unselected Component(s):
                        </Typography>

                        {
                            unSuccessComp.map(_comp => <Typography variant = {"body1"} color = {"textPrimary"}>{_comp}</Typography>)
                        }
                        <Typography variant = {"subtitle2"}>
                            Please go back and choose again for all your CC.
                        </Typography>
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>
                        Go Back
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }
    //#endregion

    return (
        <React.Fragment>
            <Grid container >
                <Grid item xs ={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        There are curriculum components (CC) under the design type: {designType.name}.
                    </Typography>
                </Grid>

                <Grid item xs ={12}>
                    <Typography variant="h6" gutterBottom display = "inline">
                        DESIGN TYPES - 
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom display = "inline">
                        {designType.name}
                    </Typography>
                </Grid>
            </Grid>

            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <Grid container item xs = {12}  style={getListStyle(snapshot.isDraggingOver)}>
                                {
                                    components.map((_component, index) => {
                                        return(
                                            <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {!true}>
                                              {(provided, snapshot) => (
                                                 <Grid container style = {{padding: 16}} key = {index}>
                                                    <ComponentPatternSelectView 
                                                        provided = {provided} 
                                                        snapshot = {snapshot} 
                                                        component = {_component} 
                                                        feedbackComponent ={feedbackComponent} 
                                                        onDeleteComponent = {() => onDeleteComponent(index)}
                                                    />
                                                </Grid>   
                                            )}
                                             
                                            </Draggable>
                                        )
                                    }) 
                                }
                                </Grid>
                            </RootRef>
                        )}
                        </Droppable>
            </DragDropContext>

            <Grid container justify = "center" spacing = {4}>
                <Grid item >
                    <Button variant="contained" color="secondary" onClick = {()=>setOpenAddDialog(true)}>Add Curriculum Component</Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" color="primary" onClick = {()=>checkComponents()}>Next Step</Button>
                </Grid>
            </Grid>

            <Dialog
                open={isOpen}
                onClose={onCloseDialog}
                maxWidth = {"lg"}
            >
              {displayDialog()}
            </Dialog>

            <ComponentAddContainer open = {openAddDialog} handleClose = {()=>setOpenAddDialog(false)} addItems = {onAddComponent}/>
        </React.Fragment>
    )
}

export default ComponentSelectContainer;
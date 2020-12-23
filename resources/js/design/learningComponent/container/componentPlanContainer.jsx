import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app'

import ComponentAddContainer from './componentAddContainer';
import ComponentContainer from './componentContainer';
import InstructionBox from '../../../components/instructionBox';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { apiLearningCompPost, apiLearningCompTempGet, apiLearningCompPut,
apiCourseGet, 
apiLearningOutcomePost} from '../../../api.js';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const ComponentPlanContainer = (props)  => {
  const classes = useStyles();
  const { course, refreshCourse } = React.useContext(ContextStore);
  const { setLoadingOpen, displayMsg  } = React.useContext(AppContextStore);
  const [ selectComIndex, setSelectComIndex] = React.useState(0);
  const [ addComponentOpen, setAddComponentOpen ] = React.useState(false);
  const isDraggable = course.permission > 2;

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
    width: '100%',
    padding: 16
  });

  const onAddComponentClose = () => {
    setAddComponentOpen(false)
  }

  const onClickAddComponent = () => {
    setAddComponentOpen(true)
  }

  const onAddComponent = (components_add) => {
    setLoadingOpen(true)
      var updates = [];
      var components_add = components_add;
      components_add.map((_component, index) => {

        updates.push( apiLearningCompTempGet(_component.id).then(
          response => {
            var tempcomponent = response.data;
            tempcomponent.component_template_id = _component.id;
            tempcomponent.course_id = course.id;
            tempcomponent.sequence = index + course.components.length;
            if(typeof _component.pattern_id !== 'undefined'){
              tempcomponent.patterns = tempcomponent.patterns.filter(x => x.id == _component.pattern_id)
            }
            var lo_add = handleComponentOutcomeAdd(tempcomponent.outcomes);
            if(lo_add.length > 0){
              return Promise.resolve(handleComponentWithLO(tempcomponent, lo_add));
            }else{
              //normal handling => no addition lo need to be adde
              if(typeof tempcomponent.outcomes !== 'undefined'){
                // 
                tempcomponent.outcomes_id = handleComponentOutcomeMapping(tempcomponent.outcomes);
              }
              return Promise.resolve(apiLearningCompPost(tempcomponent));
            }  
          }
        ));
      })

      Promise.all(updates).then((rs)=>{
        return Promise.all(
          rs
        ).then(
          () => {
            refreshCourse();
            setLoadingOpen(false);
            displayMsg("success", "Learning Components Added")
          }
        );
      });
  }

  const handleComponentWithLO = (tempcomponent, lo_add) => {
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
      // console.log('lo')
      return apiCourseGet(course.id);
    }).then((rs) => {
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
    }).then(()=>{
      // console.log('co');
    });
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
        // //slo
        // _outcome.slo_outcome.map((_slo) => {
        //   if(_clo.id == _slo.template_id){
        //     add = false;
        //   }
        // })
      });

      if(add){
        outcome_id.push(_clo.id)
      }
    })

    console.log(outcome_id);
    console.log(clos);
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

  const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }

    if(result.destination.index == result.source.index){
      return;
    }
    var updates = [];
    setLoadingOpen(true);

    //sync the data to root state
      var tempComponents =  JSON.parse(JSON.stringify(course.components));

      tempComponents.map((_component, index)=> {
          if(_component.sequence == null){
              tempComponents[index].sequence = index + 1;
          }
      });

      var sourceComponent = {
        id: tempComponents[result.source.index].id,
        sequence: tempComponents[result.destination.index].sequence
      }

      if(result.source.index < result.destination.index){
        for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
          let tempComponent = {
            id : tempComponents[i].id,
            sequence: tempComponents[i].sequence - 1
          }
          updates.push( apiLearningCompPut(tempComponent) );
      }
      }else{

        for(var i = result.destination.index; i < result.source.index; i++){
          let tempComponent = {
            id : tempComponents[i].id,
            sequence: tempComponents[i].sequence + 1
          }
          updates.push ( apiLearningCompPut(tempComponent) );
        }
      }
      updates.push( apiLearningCompPut(sourceComponent) );

      Promise.all(updates).then(()=>{
          setLoadingOpen(false);
          displayMsg("success", "Learning Components Sequences Updated")
          refreshCourse();

      }).catch((error)=> {
          console.log(error);
          displayMsg("error", "Error Occured")
      })
  }
  
  return (
    <Grid container>
        <Grid item xs={12}>
            <InstructionBox 
                title="Unit Plan" 
                content= "You can customize the Unit design based on the recommended learning outcomes and learning tasks." 
                tips=""
            />
        </Grid>
        
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                    <Grid container style={getListStyle(snapshot.isDraggingOver)} spacing = {2}>
                    {course.components.map((_component, index)=>(
                         <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {(!isDraggable || selectComIndex == index) }>
                         {(provided, snapshot) => (
                              <Grid item xs ={12}>
                                <ComponentContainer 
                                  component = {_component}
                                  componentID = {_component.id}
                                  key= {index}
                                  index = {index}
                                  isDraggable = {(isDraggable && selectComIndex != index)}
                                  provided = {provided} 
                                  snapshot = {snapshot} 
                                  selectComIndex= {selectComIndex}
                                  setSelectComIndex = {setSelectComIndex}
                                />
                              </Grid>
                         )}
                         </Draggable>
                    ))}
                    {provided.placeholder}
                    </Grid>
                </RootRef>
            )}
            </Droppable>
        </DragDropContext>

        <ComponentAddContainer 
          open = {addComponentOpen}
          addItems = {onAddComponent}
          handleClose = {onAddComponentClose}
          module = {"design"}
        />
        {
          course.permission > 2 ? 
          <Button variant = {"outlined"} color = {"secondary"} onClick = {onClickAddComponent} fullWidth>
              Add New Curriculum Component
          </Button>
          :
          null
        }
        
    </Grid>
  );
}
export default ComponentPlanContainer;
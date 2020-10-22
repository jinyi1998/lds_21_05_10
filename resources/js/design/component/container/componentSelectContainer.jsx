import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ComponentPatternSelectView from '../component/componentPatternSelectView';
import ComponentAddContainer from './componentAddContainer';
import ComponentPatternBinFilterContainer from './componentPatternBinFilterContainer';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import { apiDesignTypeGet, apiLearningCompTempGet, apiLearningCompPost, apiLearningPattTempGet } from '../../../api';


const ComponentSelectContainer = (props ) => {
    const [ components, setComponents ] = React.useState([]);
    const [ designType, setDesignType ] = React.useState({
        id: -1,
        name: ""
    })
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ openAddDialog , setOpenAddDialog ] =  React.useState(false)
    const [ isSuccess, setIsSuccess ] = React.useState(false);

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);

    React.useEffect(()=>{
        fetchComponents()
    }, [course])

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
                                setComponents(_prev => ([..._prev, component_temp].sort((a,b) => {return a.sequence - b.sequence})))
                            }) 
                        );
                    })

                    Promise.all(updates).then(()=>{
                        setLoadingOpen(false);
                    });
                }
            })
        }
    }

    const feedbackComponent = (component) => {
        // feedback function to edit component from children 
        var components_temp = components;
        components_temp.find( x => x.id == component.id).patterns = component.patterns;
        components_temp.find( x => x.id == component.id).title = component.title;
        setComponents(components_temp);
    }

    const checkComponents = () => {
        if(components.filter(_component => _component.is_selected == false).length > 0){
            setIsSuccess(false);
        }else{
            setIsSuccess(true);
        }
        setIsOpen(true);
    }

    const onCloseDialog = () => {
        setIsOpen(false);
    }

    const importComponentTempToComponent = () => {
        var updates = [];
        setLoadingOpen(true);
        components.map((component)=>{
            component.component_template_id = component.id;
            component.course_id = course.id;
            updates.push(
                apiLearningCompPost(component)
            );
        })
        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            refreshCourse();
            props.handleNext();
        });
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
                <DialogContent>
                    <Typography variant="subtitle1" gutterBottom>
                        Congratulations!
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        You have successfully choose the component patterns for all your CC.
                        Now you are ready to plan the detailed settings!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog} variant = {"outlined"}>
                        I need more time here
                    </Button>
                    <Button onClick={()=>{importComponentTempToComponent()}} color="secondary" autoFocus variant = {"outlined"}>
                        I am ready to go!
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }

    const displayFailDialog = () => {
        return (
            <React.Fragment>
                <DialogContent>
                    <DialogContentText >
                        Warning!
                        You have not choose the component patterns for all your CC.
                        Please go back and choose again for all your CC.
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
                        There are five curriculum components (CC) under the design type: {designType.name}. Please choose the component patterm for each CC.
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
            {
                components.map((_component, index) => {
                    return(
                        <Grid container style = {{padding: 16}} key = {index}>
                            <ComponentPatternSelectView 
                                component = {_component} 
                                feedbackComponent ={feedbackComponent} 
                                onDeleteComponent = {() => onDeleteComponent(index)}
                            />
                        </Grid>   
                    )
                }) 
            }
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
            >
              {displayDialog()}
            </Dialog>

            <ComponentAddContainer open = {openAddDialog} handleClose = {()=>setOpenAddDialog(false)} addItems = {onAddComponent}/>
        </React.Fragment>
    )
}

export default ComponentSelectContainer;
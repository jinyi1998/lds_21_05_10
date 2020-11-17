import React from 'react';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import OutcomeTemplateView from '../component/outcomeTemplateView';
import OutcomeTemplateEditView from '../component/outcomeTemplateEditView';

import {AppContextStore} from '../../../container/app';

import {
    apiLearningOutcomeTempPut,
    apiLearningOutcomeTempPost,
    apiLearningOutcomeTempDelete
} from '../../../api';

const OutcomeBuilderContainer = (props) => {

    const { setLoadingOpen } = React.useContext(AppContextStore);
    const [ outcomes, setOutcomes ] = React.useState([]);
    const [ unitOutcomeOpts, setUnitOutcomeOpts] = React.useState([]);
    const [ openOutcomeEdit, setOpenOutcomeEdit] = React.useState(false);
    const [ editOutcome, setEditOutcome] = React.useState({
        id: -1,
        level: "",
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        unit_outcomeid_temp: {
            unit_outcomeid: ""
        }
    });

    React.useEffect(()=> {
        setLoadingOpen(true)
        if(typeof props.outcomes != 'undefined' ){
            setOutcomes(props.outcomes)
        }
    }, [props.outcomes])

    React.useEffect(()=>{
        if(typeof props.unit_outcomes_opts != 'undefined' ){
            setLoadingOpen(true)
            setUnitOutcomeOpts(props.unit_outcomes_opts);
        }
    }, [props.unit_outcomes_opts])

    React.useEffect(()=> {
        setLoadingOpen(false)
    }, [unitOutcomeOpts, outcomes])


    //#region local action
    const onEditOutcome = (outcome) => {
        setEditOutcome(outcome);
        setOpenOutcomeEdit(true)
    }

    const onAddOutcome = () => {
        setEditOutcome({
            id: -1,
            level: "",
            outcomeType: -1,
            STEMType: "",
            description: "",
            isCourseLevel: true,
            unit_outcomeid_temp: {
                unit_outcomeid: ""
            }
        });
        setOpenOutcomeEdit(true)
    }

    const onSaveOutcome = (outcome) => {
        if(outcome.id == -1){
            //new outcome
            apiLearningOutcomeTempPost(outcome).then(
                ()=>{
                    onFinishOutcome();
                }
            )
        }else{
            //update existing outcome
            apiLearningOutcomeTempPut(outcome).then(
                ()=>{
                    onFinishOutcome();
                }
            )
        }
    }

    const onFinishOutcome = () => {
        if(typeof props.onFinish == 'undefined'){
            window.location.reload();
        }else{
            setOpenOutcomeEdit(false);
            props.onFinish();
        }
    }

    const onDeleteOutcome = (outcome) => {
        apiLearningOutcomeTempDelete(outcome).then(
            ()=>{
                window.location.reload();
            }
        )
    }
    //#endregion

    return(
        <React.Fragment>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
            <Paper style = {{padding: 16, width: '100%'}}>
                <List>
                    {
                        unitOutcomeOpts.length > 0?
                        unitOutcomeOpts.map(_unitOutcomeOpts => {
                            return (
                                outcomes.filter( _x => _x.unit_outcomeid_temp.unit_outcome_id == _unitOutcomeOpts.id).length > 0?
                                    <React.Fragment>
                                        <ListSubheader>Unit Level Learning Outcome: {_unitOutcomeOpts.description}</ListSubheader>
                                        {outcomes.filter( _x => _x.unit_outcomeid_temp.unit_outcome_id == _unitOutcomeOpts.id).map(
                                            _outcome =>  
                                                <OutcomeTemplateView 
                                                    outcome = {_outcome} 
                                                    onEditOutcome = {onEditOutcome} 
                                                    onDeleteOutcome = {onDeleteOutcome}
                                                    component_id = {props.component_id} 
                                                    key ={_outcome.id}/>

                                        )}
                                    </React.Fragment>
                                :
                                null
                            )   
                        })
                        :
                        outcomes.map(_outcome => 
                            {return(
                                <OutcomeTemplateView 
                                    outcome = {_outcome} 
                                    onEditOutcome = {onEditOutcome} 
                                    onDeleteOutcome = {onDeleteOutcome}
                                    component_id = {props.component_id} 
                                    key ={_outcome.id}/>
                            )}
                        )
                    }
                </List>
            </Paper>
            
        
            <Dialog open={openOutcomeEdit} onClose={() => setOpenOutcomeEdit(false)} maxWidth = "md">
                <OutcomeTemplateEditView 
                    outcome = {editOutcome} 
                    unitOutcomeOpts = {unitOutcomeOpts} 
                    component_id = {props.component_id} 
                    designtype_id = {props.designtype_id}
                    setOpenOutcomeEdit ={setOpenOutcomeEdit}
                    onSaveOutcome = {onSaveOutcome}
                />
            </Dialog>

            <Button variant = "contained" color = "primary" onClick = {onAddOutcome}>Add Related Outcomes</Button>
            </Grid>
        </React.Fragment>
    )
 
}

export default OutcomeBuilderContainer;
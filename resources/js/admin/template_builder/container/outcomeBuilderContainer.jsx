import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import OutcomeTemplateView from '../component/outcomeTemplateView';
import OutcomeTemplateEditView from '../component/outcomeTemplateEditView';
import OutcomeTemplateSelectView from '../component/outcomeTemplateSelectView';

import {AppContextStore} from '../../../container/app';

import {
    apiLearningOutcomeTempPut,
    apiLearningOutcomeTempPost,
    apiLearningOutcomeTempDelete,
    apiLearningCompTempPut
} from '../../../api';


const useStyles = makeStyles(theme => ({
    AccordionSummary: {
      backgroundColor: theme.palette.primary.dark,
      color: 'white'
    },
  }));

const OutcomeBuilderContainer = (props) => {

    const classes = useStyles();

    const { setLoadingOpen, options, displayMsg } = React.useContext(AppContextStore);
    const [ outcomes, setOutcomes ] = React.useState([]);
    const [ openOutcomeEdit, setOpenOutcomeEdit] = React.useState(false);
    const [ openOutcomeSelect, setOpenOutcomeSelect] = React.useState(false);
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


    React.useEffect(()=> {
        setLoadingOpen(false)
    }, [outcomes])


    //#region local action
    const onEditOutcome = (outcome) => {
        setEditOutcome(outcome);
        setOpenOutcomeEdit(true)
    }

    const onSelectOutcome = () => {
        setOpenOutcomeSelect(true)
    }

    const onAddOutcome = () => {
        setEditOutcome({
            id: -1,
            level: "",
            outcomeType: -1,
            STEMType: "",
            description: "",
            isCourseLevel: true,
            unit_outcome_id: -1,
            slo_outcome: [],
            unit_outcomeid_temp: {
                unit_outcomeid: ""
            }
        });
        setOpenOutcomeEdit(true)
    }

    const onSaveOutcome = (outcome) => {

        // console.log(outcome);
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

    const onFinishSelect = (component) => {
        apiLearningCompTempPut(component).then( () => {
            setLoadingOpen(false)
            displayMsg("success", "Component Outcome Updates");
            onFinishOutcome();
        })
        .catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Error Occured");
            console.log(error)
        });
    }

    const onFinishOutcome = () => {
        if(typeof props.onFinish == 'undefined'){
            window.location.reload();
        }else{
            setOpenOutcomeEdit(false);
            setOpenOutcomeSelect(false);
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

    const displayLearningOutcomes = () => {
        return (
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                {   
                    outcomes.filter(lo => lo.isCourseLevel == true).length > 0?
                    options.outcomeTypeOpts.map( (_lo_type, index) => 
                        <Accordion defaultExpanded = {true} style = {{width: '100%'} } key = {index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className = {classes.AccordionSummary}
                            >
                                {_lo_type.name}
                            </AccordionSummary>

                            <AccordionDetails>
                            {outcomes.filter(lo => lo.outcomeType == _lo_type.id).filter(lo => lo.isCourseLevel == true).length > 0?
                               
                                    <List data-tour ="ulo_display_view" style = {{width: '100%'} }>
                                    {
                                        outcomes.filter(lo => lo.outcomeType == _lo_type.id).sort((a,b)=> a.sequence - b.sequence).map(
                                        (_outcome, index )=>
                                            (
                                                <OutcomeTemplateView 
                                                outcome = {_outcome} 
                                                onEditOutcome = {onEditOutcome} 
                                                onDeleteOutcome = {onDeleteOutcome}
                                                component_id = {props.component_id} 
                                                key ={_outcome.id}/>
                                            )
                                        )
                                    }
                                    </List>
                                    
                                :
                                    <Grid>
                                        <Typography variant = {"caption"} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                            {"There is no outcome under this learning outcome type"}
                                        </Typography>
                                    </Grid>
                                }

                            </AccordionDetails>
                        </Accordion>
                        
                    )
                    :
                    <Grid container spacing = {2}>
                        <Grid item xs = {12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"What intended learning outcomes do you want to achieve by designing this component"}
                            </Typography>
                        </Grid>
                       
                        <Grid item xs = {12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"Add the pre-design unit-level learning outcomes step 2 and link to the tasks with assessment"}
                            </Typography>
                        </Grid>

                        <Grid item xs ={12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"Design Tips: One learning outcome can be archieved by several tasks. \
                                You might also specify the unit-level outcome into several \
                                sup-learning outcomes to indicate how students fulfil the outcome step by step."}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                {/* {
                    enableAdd? 
                        
                            modeLevel == "course"?
                            <Button onClick={addLearningOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                            :
                            <Button onClick={onClickSelectOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                        
                    :
                    null
                } */}
            </Grid>
        )
    }

    return(
        <React.Fragment>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
            <Paper style = {{padding: 16, width: '100%'}}>
                <List>
                    {
                        displayLearningOutcomes()
                    }
                </List>
            </Paper>
            
        
            <Dialog open={openOutcomeEdit} onClose={() => setOpenOutcomeEdit(false)} maxWidth = "md">
                <OutcomeTemplateEditView 
                    outcome = {editOutcome} 
                    designtype_id = {props.designtype_id}
                    component_id = {props.component_id} 
                    setOpenOutcomeEdit ={setOpenOutcomeEdit}
                    onSaveOutcome = {onSaveOutcome}
                />
            </Dialog>


            <Dialog open={openOutcomeSelect} onClose={() => setOpenOutcomeSelect(false)} maxWidth = "md">
                <OutcomeTemplateSelectView 
                    designtype_outcomes= {props.designtype_outcomes}
                    component_id = {props.component_id} 
                    onFinishSelect = {onFinishSelect}
                />
            </Dialog>

           

            {
                typeof props.component_id == "undefined"?
                <Button variant = "contained" color = "primary" onClick = {onAddOutcome}>Add Related Outcomes</Button>
                :
                <Button variant = "contained" color = "primary" onClick = {onSelectOutcome}>Select Related Outcomes</Button>
            }
           
            </Grid>
        </React.Fragment>
    )
 
}

export default OutcomeBuilderContainer;
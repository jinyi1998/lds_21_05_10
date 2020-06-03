import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WarningIcon from '@material-ui/icons/Warning';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {ContextStore} from '../../../container/designContainer';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '66.66%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

const LessonOutcomeAssessment = (props)=>{

    const { taskTypeColor, options } = React.useContext(ContextStore);
    const classes = useStyles();
    const {data} = props;
    const [taskID, setTaskID] = React.useState(-1);

    const displayColor = (outcome_id) => {
        try{
            if(data.task[taskID].outcome_id.includes(parseInt(outcome_id))){
                return {"backgroundColor": "#00BFFF88"}
            }else{
                return {"backgroundColor": "#00BFFF11"}
            }
        }catch{
            return {"backgroundColor": "#00BFFF11"}
        }
    }

    const displayLessonAssessment = () => {
        console.log(data.outcome);
        if( Object.keys(data.outcome).length > 0){
            return(
                Object.keys(data.outcome).map( outcome_id => {
                    return ( 
                    <ListItem 
                        button
                        alignItems="center"
                        style = {displayColor(outcome_id)}
                        key = {outcome_id}
                    >
                        {/* <ListItemText 
                            primary={"Learning Outcome: "} 
                            secondary = {data.outcome[outcome_id]}
                            key = {outcome_id}
                        /> */}
                        <ListItemText 
                            primary= {data.outcome[outcome_id]}
                            key = {outcome_id}
                        />
                    </ListItem>
                    )
                   
                })
            )
        }else{
            return (
            <ListItem 
            alignItems="center"
            >
                <ListItemText 
                    key = {1}
                    primary={"No Learning Assessment in this lesson"} 
                />
            </ListItem>
            )
        }
       
    }

    const displayHasAssessment = (task_id) => {

        try{
            if(data.task[task_id].outcome_id.length > 0){
                return "Has Assessment";
            }else{
                return "No Assessment";
            }
        }catch{
            return "No Assessment";
        }
       
    }

    const displayTaskByComponent = () => {

       return (
            Object.keys(data.component).map( component_id => {
                return(
                    <ExpansionPanel
                        key = {component_id}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            // id= {_task.id}
                            // style = {displayColor(_task.has_assessment)}
                        >
                            <Typography className={classes.heading}>Learning Component: {data.component[component_id]} </Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <List component="nav">
                                { Object.keys(data.task).map( task_id => 
                                    {
                                        if(data.task[task_id].component_id == component_id){
                                            return (
                                                <Paper style = {{width: '100%', margin: 16}} key = {task_id}>
                                                    <Grid item container xs={12} key = {task_id}   onClick = {()=> setTaskID(task_id)} style = {{ cursor: "pointer"}}>
                                                        <Grid item xs={1} height="100%">
                                                            <div style={taskTypeColor(data.task[task_id].task_type)}>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={11} color = "textPrimary">
                                                            <Typography variant="subtitle1" gutterBottom style={{fontWeight: '600'}}>
                                                                {data.task[task_id].task_title} 
                                                            </Typography>
                                                            <Typography variant="subtitle2" gutterBottom color = "textSecondary">
                                                                { options.taskType.find(x=> x.id == data.task[task_id].task_type)?.description}
                                                            </Typography>
                                                        </Grid>
                                                        
                                                    </Grid>
                                                </Paper>
                                            )
                                            //     <ListItem 
                                            //         alignItems="center"
                                            //         onClick = {()=> setTaskID(task_id)}
                                            //         key = {task_id}
                                            //         button
                                            //     >
                                            //         <ListItemText
                                            //             primary = { "Learning Task #" + task_id + " - " + displayHasAssessment(task_id)}
                                            //             secondary = { data.task[task_id].task_title}
                                            //             key = {task_id}
                                            //         />
                                            //     </ListItem>
                                            // )
                                        }
                                    }
                                )} 
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
        })
       )
     
    }

    return (
        <Grid container item xs = {12} alignContent="center" alignItems ="center">
            <Grid item xs = {5} >
                Component
            </Grid>
            <Grid item xs = {2} >
                
            </Grid>
            <Grid item xs = {5} >
                Lesson Assessment
            </Grid>

            <Grid item xs = {7} >
                <List component="nav" >
                    {displayTaskByComponent()}
                </List>
            </Grid>
            <Grid item xs = {1} >
                
            </Grid>
            <Grid item xs = {4} >
                <List component="nav" >
                    {displayLessonAssessment()}
                </List>
               
            </Grid>
        </Grid>             
    );
}

export default LessonOutcomeAssessment;
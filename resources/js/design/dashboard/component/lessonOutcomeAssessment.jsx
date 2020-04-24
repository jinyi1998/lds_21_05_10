import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WarningIcon from '@material-ui/icons/Warning';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    
    const classes = useStyles();
    const {data} = props;
    const [taskID, setTaskID] = React.useState(-1);

    const displayColor = (outcome_id) => {
        try{
            if(data.task[taskID].outcome_id.includes(parseInt(outcome_id))){
                return {"background-color": "#00BFFF88"}
            }else{
                return {"background-color": "#00BFFF11"}
            }
        }catch{
            return {"background-color": "#00BFFF11"}
        }
    }

    const displayLessonAssessment = () => {
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
                        <ListItemText 
                            primary={"Learning Outcome: "+ outcome_id} 
                            secondary = {data.outcome[outcome_id]}
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
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            // id= {_task.id}
                            // style = {displayColor(_task.has_assessment)}
                        >
                            <Typography className={classes.heading}>Learning Component #{component_id}: {data.component[component_id]} </Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <List component="nav" fullWidth>
                                { Object.keys(data.task).map( task_id => 
                                    {
                                        if(data.task[task_id].component_id == component_id){
                                            return (
                                                <ListItem 
                                                    alignItems="center"
                                                    onClick = {()=> setTaskID(task_id)}
                                                    key = {task_id}
                                                    button
                                                >
                                                    <ListItemText
                                                        primary = { "Learning Task #" + task_id + " - " + displayHasAssessment(task_id)}
                                                        secondary = { data.task[task_id].task_title}
                                                        key = {task_id}
                                                    />
                                                    </ListItem>
                                            )
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
                Lesson
            </Grid>

            <Grid item xs = {5} >
                <List component="nav" >
                    {displayTaskByComponent()}
                </List>
            </Grid>
            <Grid item xs = {2} >
                
            </Grid>
            <Grid item xs = {5} >
                <List component="nav" >
                    {displayLessonAssessment()}
                </List>
               
            </Grid>
        </Grid>             
    );
}

export default LessonOutcomeAssessment;
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

const ComponentTaskLesson = (props)=>{

    const classes = useStyles();
    const {data} = props;
    const [taskID, setTaskID] = React.useState(-1);

    const displayColor = (lesson_id) => {
        try{
            if(data.task[taskID].lesson_id == parseInt(lesson_id)){
                return {"backgroundColor": "#00BFFF88"}
            }else{
                return {"backgroundColor": "#00BFFF11"}
            }
        }catch{
            return {"backgroundColor": "#00BFFF11"}
        }
    }

    const displayLessonAssessment = () => {
        if( Object.keys(data.lesson).length > 0){
            return(
                Object.keys(data.lesson).map( lesson_id => {
                    return ( 
                    <ListItem 
                        button
                        alignItems="center"
                        style = {displayColor(lesson_id)}
                        key = {lesson_id}
                    >
                        <ListItemText 
                            primary={"Lesson #"+ lesson_id} 
                            secondary = {data.lesson[lesson_id]}
                            key = {lesson_id}
                        />
                    </ListItem>
                    )
                   
                })
            )
        }else{
            return (
            <ListItem 
            alignItems="center"
            key = {1}
            >
                <ListItemText 
                    primary={"No Lesson in this component"} 
                    key = {1}
                />
            </ListItem>
            )
        }
       
    }
    const displayTaskByComponent = () => {
       return (
            <React.Fragment>
                <List component="nav">
                    { Object.keys(data.task).map( task_id => 
                        {
                          
                            return (
                                <ListItem 
                                    alignItems="center"
                                    onClick = {()=> setTaskID(task_id)}
                                    button
                                    key = {task_id}
                                >
                                    <ListItemText
                                        primary = { "Learning Task #" + task_id}
                                        secondary = { data.task[task_id].task_title}
                                        key = {task_id}
                                    />
                                    </ListItem>
                            )
                        
                        }
                    )} 
                </List>
            </React.Fragment>
       )
    }

    return (
        <Grid container item xs = {12} alignContent="center" alignItems ="center">
            <Grid item xs = {5} >
                Task
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

export default ComponentTaskLesson;
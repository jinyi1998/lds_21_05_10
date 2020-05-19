import React from 'react';
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LessonOutcomeAssessment from './component/lessonOutcomeAssessment';

const useStyles = makeStyles((theme) => ({

    paper: {
      padding: theme.spacing(2),
      width: '100%',
      textAlign: 'center'
    },
  }));


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const LessonAnalysisContainer = (props)=>{
    const {data} = props;
    const classes = useStyles();

    const displayChart = () => {
        if(isEmpty(data.tasks_time_by_task) && 
        isEmpty(data.tasks_num_by_type) && 
        isEmpty(data.tasks_num_by_class_type) && 
        isEmpty(data.tasks_num_by_target) && 
        isEmpty(data.tasks_num_by_size)){
            return ( 
                <Grid container item xs = {12}>
                      <Paper className = {classes.paper}>
                        <h5>No tasks data... You may need to add some tasks to this lesson first</h5>
                      </Paper>
                </Grid> 
            )
           

        }else{
            return (
                <React.Fragment>
                    {displayTaskAessessmentWithComponent()}
                    {displayLearningTimeChart()}
                    {displayTaskTypeChart()}
                    {displayTaskClassTypeChart()}
                    {displayTaskClassSizeChart()}
                    {displayTaskClassTargetChart()}
                </React.Fragment>
            )
        }   
    }
    
    const displayTaskAessessmentWithComponent = () => {
        if(isEmpty(data.lesson_task_with_component)){
        
        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Lesson Tasks Assessment</h5>
                        <LessonOutcomeAssessment data= {data.lesson_task_with_component}/>
                    </Paper>
                </Grid> 
            )
        }
    }

    const displayLearningTimeChart = () => {
        if(isEmpty(data.tasks_time_by_task)){
        
        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Lesson Tasks Time Distribution</h5>
                        <Pie data={data.tasks_time_by_task} />
                    </Paper>
                </Grid> 
            )
        }
    }

    const displayTaskTypeChart = () => {
        if(isEmpty(data.tasks_num_by_type)){
        
        }else{
            return (
                <Grid item xs = {12} >
                     <Paper className = {classes.paper}>
                        <h5>Lesson Task Number Distribution By Type</h5>
                        <Pie data={data.tasks_num_by_type} />
                     </Paper>
                  
                </Grid> 
            )
        }
    }

    const displayTaskClassTypeChart = () => {
        if(isEmpty(data.tasks_num_by_class_type)){
        
        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Lesson Task Number Distribution By Class Type</h5>
                        <Pie data={data.tasks_num_by_class_type} />
                    </Paper>
                </Grid> 
            )
        }
    }

    const displayTaskClassSizeChart = () => {

        if(isEmpty(data.tasks_num_by_size)){
        
        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Lesson Task Number Distribution By Class Size</h5>
                        <Pie data={data.tasks_num_by_size} />
                    </Paper>
                   
                </Grid> 
            )
        }
    }

    const displayTaskClassTargetChart = () => {
        if(isEmpty(data.bytarget)){
        
        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Lesson Task Number Distribution By Class Target</h5>
                        <Pie data={data.tasks_num_by_target} />
                    </Paper>
                </Grid> 
            )
        }
    }

    return (
            <React.Fragment>
                { data.title != ""? 
                     <Grid item xs = {12} >
                        <h2>{data.title}</h2>
                        {displayChart()}
                    </Grid>
                    : 
                    <Grid item xs = {12} >
                         <Paper className = {classes.paper}>
                         some error...
                         </Paper>
                    </Grid>
                }
            </React.Fragment>
       
    );
}

export default LessonAnalysisContainer;
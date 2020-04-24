import React from 'react';
import {Pie} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ComponentTaskLesson from './component/componetTaskLesson';
import ComponentOutcomeAessessment from './component/componentOutcomeAssessment';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
    },
  }));

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const ComponentAnalysisContent = (props)=>{

    const {data} = props;
    const classes = useStyles();

    const displayTaskByLesson = () => {
        if(isEmpty(data['tasks_by_lesson'])){

        }else{
            return (
                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Component Task/ Lesson Matching</h5>
                        <ComponentTaskLesson data = {data['tasks_by_lesson']}/>
                    </Paper>
                </Grid>     
            )
        }
    }

    return (
        <React.Fragment>
            
                {displayTaskByLesson()}

                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Component Outcome/ Task Assessment Matching</h5>
                        <ComponentOutcomeAessessment data = {data['task_assessment']}/>
                    </Paper>
                </Grid>     

                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Component Task Time Distribution By Task Type</h5>
                        <Pie data={data['tasks_time_by_type']} />
                    </Paper>
                </Grid>    

                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Component Task Number Distribution By Task Type</h5>
                        <Pie data={data['tasks_num_by_type']} />
                    </Paper>
                </Grid>   

                <Grid item xs = {12} >
                    <Paper className = {classes.paper}>
                        <h5>Component Task Time Distribution By Tasks</h5>
                        <Pie data={data['tasks_time_by_task']} />
                    </Paper>
                </Grid>   

       </React.Fragment>
    );
}

export default ComponentAnalysisContent;
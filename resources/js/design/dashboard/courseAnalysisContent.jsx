import React from 'react';
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
    },
  }));



const CourseAnalysisContent = (props)=>{

    const classes = useStyles();

    const {data} = props;

    return (
        <React.Fragment>
            <Grid item xs = {6} >
                <Paper className = {classes.paper}>
                    <h5>Distribution of time spent on learning task types</h5>
                    <Pie data={data['tasks_time_by_type']} />
                </Paper>
            </Grid>   
            <Grid item xs = {6} >
                <Paper className = {classes.paper}>
                    <h5>Distribution of number of learning task types</h5>
                    <Pie data={data['tasks_num_by_type']} />
                </Paper>
            </Grid>                
        </React.Fragment>
    );
}

export default CourseAnalysisContent;
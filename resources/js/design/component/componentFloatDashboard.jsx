import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';

import {ComponentContext} from './componentContainer';
import {ContextStore} from '../../container/designContainer';

import {apiComponentAnalysisList} from '../../api';



const useStyles = makeStyles((theme) => ({
    speedDial: {
      zIndex: 500,
      minHeight: '18vh',
      minWidth: '36vw',
      position: 'fixed',
      bottom: theme.spacing(30),
      right: theme.spacing(2),
      opacity: 0.6,
    },
}));

const generateHoverColor = (num) => {
    var temp = []
    for(var i = 0; i< num; i++){
        temp.push('#' + "0abab5");
    }
    return temp;
}


const ComoonentFloatDashboard = (props) => {
    const classes = useStyles();
    const {  component,
        componentID,
        selectComIndex,
        index} = React.useContext(ComponentContext);
    const { course, options, taskTypeColor } = React.useContext(ContextStore);

    const [tasks_time_by_task, set_tasks_time_by_task] = React.useState({});

    async function fetchcomponentanalysis(id) {
        await apiComponentAnalysisList(id)
        .then(response => {
            handleAnalysisData(response.data)
        })
        .catch(error => console.log(error));
    }

    const handleAnalysisData = (data) => {
        let temp_tasks_time_by_type = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        temp_tasks_time_by_type["labels"] = Object.keys(data['tasks_time_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        temp_tasks_time_by_type["datasets"][0]["data"] = Object.values(data['tasks_time_by_type'])
        temp_tasks_time_by_type["datasets"][0]["backgroundColor"] =  Object.keys(data['tasks_time_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.color)
        temp_tasks_time_by_type["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_time_by_type']).length)

        set_tasks_time_by_task(temp_tasks_time_by_type);
    }
    


    React.useEffect(()=>{
        fetchcomponentanalysis(componentID)
    }, [component])

    return (
        index == selectComIndex?
        <Paper className ={classes.speedDial}>
            <Grid container>
                <Grid item xs = {12} className ={classes.speedDial}>
                    <div style={{
                        position: 'relative',
                        margin: 'auto',
                        height: '15vh',
                        width: '30vw'
                        }}>
                       <Pie data={tasks_time_by_task}/>
                    </div>
                </Grid>
            </Grid>
        </Paper>
        :
        null
    )

}
export default ComoonentFloatDashboard;
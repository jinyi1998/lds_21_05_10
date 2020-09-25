import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';

import Typography from '@material-ui/core/Typography';

import {ComponentContext} from './componentContainer';
import {AppContextStore} from '../../container/app';
import {ContextStore} from '../../container/designContainer';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {apiComponentAnalysisList} from '../../api';



const useStyles = makeStyles((theme) => ({
    floatingBox: {
      zIndex: 500,
      width: '20vw',
      position: 'fixed',
      top: theme.spacing(40),
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

const colorConfig = [
    {
        id: 1,
        color: '#FF0000',
    },
    {
        id: 2,
        color: '#00FF00',
    },
];



const ComoonentFloatDashboard = (props) => {
    const classes = useStyles();
    const {  component,
        componentID,
        selectComIndex,
        index} = React.useContext(ComponentContext);
    const { options } = React.useContext(AppContextStore);

    const [tasks_time_by_task, set_tasks_time_by_task] = React.useState({});
    const [tasks_num_by_classtype, set_tasks_num_by_classtype] = React.useState({});

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

        // console.log(options);
        let temp_tasks_num_by_classtarget = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        temp_tasks_num_by_classtarget["labels"] = Object.keys(data['tasks_num_by_classtarget']).map( _id => options.taskTarget.find(x=> x.id == _id)?.description)
        temp_tasks_num_by_classtarget["datasets"][0]["data"] = Object.values(data['tasks_num_by_classtarget'])
        temp_tasks_num_by_classtarget["datasets"][0]["backgroundColor"] = Object.keys(data['tasks_num_by_classtarget']).map( _id => colorConfig.find(x=> x.id == _id)?.color)
        temp_tasks_num_by_classtarget["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_num_by_classtarget']).length)
        // console.log(temp_tasks_num_by_classtarget);
        set_tasks_num_by_classtype(temp_tasks_num_by_classtarget);
    }
    


    React.useEffect(()=>{
        fetchcomponentanalysis(componentID)
    }, [component])


    const displayDashboard = () => {
        return (
            <ExpansionPanel className = {classes.floatingBox}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Component Live Analysis</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs = {12}>
                            <Typography variant = "caption">Task type time distribution</Typography>
                            <Pie 
                                data={tasks_time_by_task}
                                options = {{
                                    legend: {
                                        display: false,
                                    },
                              } 
                             }
                            />
                        </Grid>
        
                        <Grid item xs = {12}>
                            <Typography variant = "caption">Social Type</Typography>
                            <Pie 
                                data={tasks_num_by_classtype}
                                options = {{
                                    legend: {
                                        display: false,
                                    },
                                }} 
                            />
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    return (
        index == selectComIndex?
        displayDashboard()
        :
        null
    )

}
export default ComoonentFloatDashboard;
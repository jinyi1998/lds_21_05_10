import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Pie} from 'react-chartjs-2';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {ComponentContext} from './componentContainer';
import {AppContextStore} from '../../../container/app';
import {ContextStore} from '../../../container/designContainer';

import {apiComponentAnalysisList} from '../../../api';
const useStyles = makeStyles((theme) => ({
    floatingBox: {
      zIndex: 500,
      maxWidth: '40vw',
      maxHeight: "30vh",
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(14),
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



const ComponentFloatDashboardContainer = (props) => {
    const classes = useStyles();
    const {
        component,
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
                    // hoverBackgroundColor: []
            }]
        }
        temp_tasks_time_by_type["labels"] = Object.keys(data['tasks_time_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        temp_tasks_time_by_type["datasets"][0]["data"] = Object.values(data['tasks_time_by_type'])
        temp_tasks_time_by_type["datasets"][0]["backgroundColor"] =  Object.keys(data['tasks_time_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.color)
        // temp_tasks_time_by_type["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_time_by_type']).length)

        set_tasks_time_by_task(temp_tasks_time_by_type);

        // console.log(options);
        let temp_tasks_num_by_classtarget = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    // hoverBackgroundColor: []
            }]
        }
        temp_tasks_num_by_classtarget["labels"] = Object.keys(data['tasks_num_by_classtarget']).map( _id => options.taskTarget.find(x=> x.id == _id)?.description)
        temp_tasks_num_by_classtarget["datasets"][0]["data"] = Object.values(data['tasks_num_by_classtarget'])
        temp_tasks_num_by_classtarget["datasets"][0]["backgroundColor"] = Object.keys(data['tasks_num_by_classtarget']).map( _id => colorConfig.find(x=> x.id == _id)?.color)
        // temp_tasks_num_by_classtarget["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_num_by_classtarget']).length)
        // console.log(temp_tasks_num_by_classtarget);
        set_tasks_num_by_classtype(temp_tasks_num_by_classtarget);
    }
    


    React.useEffect(()=>{
        if(options.taskElearingResource.length > 0  && index == selectComIndex){
            fetchcomponentanalysis(componentID)
        }
    }, [options, selectComIndex, component])


    const displayDashboard = () => {
        return (
            <Accordion className = {classes.floatingBox}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Component Live Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs = {6}>
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
        
                        <Grid item xs = {6}>
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
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        index == selectComIndex?
        displayDashboard()
        :
        null
    )

}
export default ComponentFloatDashboardContainer;
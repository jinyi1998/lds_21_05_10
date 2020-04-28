import React from 'react';
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CourseAnalysisContent from './CourseAnalysisContent';


import { makeStyles } from '@material-ui/core/styles';
import {ContextStore} from '../../container/designContainer'
import config from 'react-global-configuration';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));



const generateColor = (num) => {
    var temp = []
    for(var i = 0; i< num; i++){
        temp.push('#' +  Math.random().toString(16).substr(-6));
    }
    return temp;
}






const CourseAnalysisContainer = ()=>{

    const classes = useStyles();

    const { course, options } = React.useContext(ContextStore);

    const [data, setData] = React.useState({
        tasks_num_by_type:  {},
        tasks_time_by_type: {},
    })

    React.useEffect(()=>{
        fetchcourseanalysis();
    }, []);

    async function fetchcourseanalysis() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/courseanalysis/'+course.id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {

            if( response["tasks_num_by_type"] == undefined){
                setData({
                    tasks_num_by_type:  {},
                    tasks_time_by_type: {},
                });

            }else{
                handleAnalysisData(response)
            }
           
        })
        .catch(error => console.log(error));
    }

    const handleAnalysisData = (data) => {
        var temp = {
            tasks_num_by_type: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }]
            },
            tasks_time_by_type: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
                }]
            },
        };

        //#region data reorganise
        temp["tasks_num_by_type"]["labels"] = Object.keys(data['tasks_num_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        temp["tasks_num_by_type"]["datasets"][0]["data"] = Object.values(data['tasks_num_by_type'])
        temp["tasks_num_by_type"]["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_num_by_type']).length)
        temp["tasks_num_by_type"]["datasets"][0]["hoverBackgroundColor"] = Object.values(data['tasks_num_by_type']).map( _x => {return generateColor()});

        temp["tasks_time_by_type"]["labels"] = Object.keys(data['tasks_time_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        temp["tasks_time_by_type"]["datasets"][0]["data"] = Object.values(data['tasks_time_by_type'])
        temp["tasks_time_by_type"]["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_time_by_type']).length)
        temp["tasks_time_by_type"]["datasets"][0]["hoverBackgroundColor"] = Object.values(data['tasks_time_by_type']).map( _x => {return generateColor()});

    
        //#endregion
    
        setData({
            tasks_num_by_type:  temp["tasks_num_by_type"],
            tasks_time_by_type: temp["tasks_time_by_type"],
        });
    
    }



    return (
        <Grid container spacing = {6}>

            <Grid item xs = {12} >
                <h2> Overall Analysis Container</h2>
            </Grid>

            <CourseAnalysisContent data = {data} />

        </Grid> 
    );
}

export default CourseAnalysisContainer;
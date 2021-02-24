import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ComponentAnalysisContent from './componentAnalysisContent';

import {AppContextStore} from '../../container/app';
import {ContextStore} from '../../container/designContainer'
import config from 'react-global-configuration';

import {apiComponentAnalysisList} from '../../api.js';
const generateColor = (num) => {
    var temp = []
    for(var i = 0; i< num; i++){
        temp.push('#' +  Math.random().toString(16).substr(-6));
        // temp.push('#' + "0abab5");
    }
    return temp;
}
const generateHoverColor = (num) => {
    var temp = []
    for(var i = 0; i< num; i++){
        temp.push('#' + "0abab5");
    }
    return temp;
}


const ComponentAnalysisContainer = ()=>{
    const { course } = React.useContext(ContextStore);
    const { options, taskTypeColor } = React.useContext (AppContextStore);
    const [ component, setComponent ] = React.useState(course.components[0].id);
    
    const [data, setData] = React.useState({
        task_assessment:  [],
        tasks_time_by_type: {},
        tasks_num_by_type: {},
        tasks_time_by_task: {},
        tasks_by_lesson: {}
    })

    React.useEffect( ()=>{
        if(component > 0){
            fetchcomponentanalysis(component)
        }  
    }
    , [component])


    async function fetchcomponentanalysis(id) {
        await apiComponentAnalysisList(id)
        .then(response => {
            if( response.data["task_assessment"] == undefined){
                setData({
                    task_assessment:  [],
                });

            }else{
                handleAnalysisData(response.data)
            }
           
        })
        .catch(error => console.log(error));
    }

    const handleAnalysisData = (data) => {
        let temp_task_assessment = data['task_assessment'].map( _data => 
            {
                Object.keys(_data).map(key => {
                    if((key == "learningtask_id" || key == "learningtask_title" || key == "learningtask_type") && _data[key] != null){
                        _data[key] = _data[key].split(",");
                    }else{
                        _data[key] = _data[key];
                    }
                })
                return _data
            }
        )
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

        let temp_tasks_num_by_type = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                // hoverBackgroundColor: []
            }]
        }
        temp_tasks_num_by_type["labels"] = Object.keys(data['tasks_num_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        temp_tasks_num_by_type["datasets"][0]["data"] = Object.values(data['tasks_num_by_type'])
        temp_tasks_num_by_type["datasets"][0]["backgroundColor"] =  Object.keys(data['tasks_num_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.color)
        // temp_tasks_num_by_type["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_time_by_type']).length)

        let temp_tasks_time_by_task = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                // hoverBackgroundColor: []
            }]
        }

        temp_tasks_time_by_task["labels"] = Object.keys(data['tasks_time_by_task'])
        temp_tasks_time_by_task["datasets"][0]["data"] = Object.values(data['tasks_time_by_task'])
        temp_tasks_time_by_task["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_time_by_task']).length)
        // temp_tasks_time_by_task["datasets"][0]["hoverBackgroundColor"] =  generateHoverColor(Object.keys(data['tasks_time_by_type']).length)

        setData({
            task_assessment: temp_task_assessment,
            tasks_time_by_type: temp_tasks_time_by_type,
            tasks_num_by_type: temp_tasks_num_by_type,
            tasks_time_by_task: temp_tasks_time_by_task,
            tasks_by_lesson: data['tasks_by_lesson']
        });
    }

    
    const displayComponentTabBar = () => {
        return (
            <Tabs
                variant="scrollable"
                value={component}
                indicatorColor="primary"
                textColor="primary"
            >    
            
                {course.components.length > 0?
                    course.components.map(
                        _component => 
                            <Tab 
                                label= {_component.title}
                                value={_component.id} 
                                selected = {component == _component.id} 
                                onClick = {()=>{setComponent(_component.id)}}
                                key = {_component.id} 
                            />

                    )
                    :
                    null
                }
              
            </Tabs>
        );
    }

    return (
   
            <Grid container spacing = {6}>
                <Grid item xs = {12} >
                    <h2> Curriculum Component Analysis</h2>
                </Grid>

                <Grid item xs = {12}>
                   {displayComponentTabBar()}
                </Grid>
               
                <ComponentAnalysisContent data = {data} component = {course.components.find(_component => component == _component.id)}/>

            </Grid>
       
    );
}

export default ComponentAnalysisContainer;
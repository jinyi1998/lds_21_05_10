import React from 'react';
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LessonAnalysisContent from './lessonAnalysisContent';
import {ContextStore} from '../../container/designContainer';
import {AppContextStore} from '../../container/app';
import config from 'react-global-configuration';
import {
    apiLessonAnalysisList
} from '../../api.js'


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




const LessonAnalysisContainer = ()=>{
    const { course } = React.useContext(ContextStore);
    const { options } = React.useContext(AppContextStore);
    const [lesson, setLesson] = React.useState(course.lessons[0].id);
    
    const [data, setData] = React.useState({
        title: "", 
        lesson_task_with_component: {},
        tasks_time_by_task:  {},
        tasks_num_by_type: {},
        tasks_num_by_class_type: {},
        tasks_num_by_target: {},
        tasks_num_by_size: {}
    })

    React.useEffect( ()=>{
        fetchlessonanalysis(lesson);
    }
    , [lesson])


    async function fetchlessonanalysis(id) {
        await apiLessonAnalysisList(id)
        .then(response => {

            if( response.data["tasks_time_by_task"].length == 0){
                setData({
                    // title: "lesson # " + lesson,
                    title: course.lessons.find(_x => _x.id == lesson).title,
                    tasks_time_by_task:  {},
                    tasks_num_by_type: {},
                    tasks_num_by_class_type: {},
                    tasks_num_by_target: {},
                    tasks_num_by_size: {},
                    lesson_assessment_by_component: {},
                });

            }else{
                handleAnalysisData(response.data)
            }
           
        })
        .catch(error => console.log(error));
    }

    const handleAnalysisData = (data) => {

        //#region data reorganise
        var tasks_time_by_task = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        tasks_time_by_task["labels"] = Object.keys(data['tasks_time_by_task'])
        tasks_time_by_task["datasets"][0]["data"] = Object.values(data['tasks_time_by_task'])
        tasks_time_by_task["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_time_by_task']).length)
        tasks_time_by_task["datasets"][0]["hoverBackgroundColor"] = generateColor(Object.keys(data['tasks_time_by_task']).length)

        var tasks_num_by_type = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        tasks_num_by_type["labels"] = Object.keys(data['tasks_num_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.description)
        tasks_num_by_type["datasets"][0]["data"] = Object.values(data['tasks_num_by_type'])
        tasks_num_by_type["datasets"][0]["backgroundColor"] = Object.keys(data['tasks_num_by_type']).map( _id => options.taskType.find(x=> x.id == _id)?.color)
        tasks_num_by_type["datasets"][0]["hoverBackgroundColor"] = generateHoverColor(Object.keys(data['tasks_num_by_type']).length)

        var tasks_num_by_class_type = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        tasks_num_by_class_type["labels"] = Object.keys(data['tasks_num_by_class_type']).map( _id => options.taskClassType.find(x=> x.id == _id)?.description)
        tasks_num_by_class_type["datasets"][0]["data"] = Object.values(data['tasks_num_by_class_type'])
        tasks_num_by_class_type["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_num_by_class_type']).length)
        tasks_num_by_class_type["datasets"][0]["hoverBackgroundColor"] = generateHoverColor(Object.keys(data['tasks_num_by_class_type']).length)

        var tasks_num_by_target = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        tasks_num_by_target["labels"] = Object.keys(data['tasks_num_by_target']).map( _id => options.taskTarget.find(x=> x.id == _id)?.description)
        tasks_num_by_target["datasets"][0]["data"] = Object.values(data['tasks_num_by_target'])
        tasks_num_by_target["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_num_by_target']).length)
        tasks_num_by_target["datasets"][0]["hoverBackgroundColor"] = generateHoverColor(Object.keys(data['tasks_num_by_target']).length)

        var tasks_num_by_size = {
            labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    hoverBackgroundColor: []
            }]
        }
        tasks_num_by_size["labels"] = Object.keys(data['tasks_num_by_size']).map( _id => options.taskSize.find(x=> x.id == _id)?.description)
        tasks_num_by_size["datasets"][0]["data"] = Object.values(data['tasks_num_by_size'])
        tasks_num_by_size["datasets"][0]["backgroundColor"] = generateColor(Object.keys(data['tasks_num_by_size']).length)
        tasks_num_by_size["datasets"][0]["hoverBackgroundColor"] = generateHoverColor(Object.keys(data['tasks_num_by_size']).length)

        //#endregion
        
        setData({
            // title: "lesson # " + lesson,
            title: course.lessons.find(_x => _x.id == lesson).title,
            tasks_time_by_task:  tasks_time_by_task,
            tasks_num_by_type: tasks_num_by_type,
            tasks_num_by_class_type: tasks_num_by_class_type,
            tasks_num_by_target: tasks_num_by_target,
            tasks_num_by_size: tasks_num_by_size,
            lesson_task_with_component: data['lesson_task_with_component']
        });
    
    }

    
    const displayLessonTabBar = () => {
        return (
            <Tabs
                value={lesson}
                indicatorColor="primary"
                textColor="primary"
                variant = "scrollable"
            >   
                {course.lessons.map(
                    _lesson => 
                        <Tab 
                            label= {_lesson.title + " - " + _lesson.time + "mins"}
                            value={_lesson.id} 
                            selected = {lesson == _lesson.id} 
                            onClick = {()=>{setLesson(_lesson.id)}}
                            key = {_lesson.id} 
                        />

                )}
              
            </Tabs>
        );
    }

    return (

        <Grid container spacing = {6}>
            <Grid item xs = {12} >
                <h2> Lesson Analysis Container</h2>
            </Grid>
            <Grid item xs = {12}>
                {displayLessonTabBar()}
            </Grid>
            
            <LessonAnalysisContent data = {data} />      

        </Grid>
       
    );
}

export default LessonAnalysisContainer;
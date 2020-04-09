import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ContextStore} from '../../container/designContainer'

import LearningTaskLessonView from '../task/learningTaskLessonView';
import LearningTaskView from '../task/learningTaskView';
import config from 'react-global-configuration';

//   tasks : [ { componetID, taskIndex }]

const LessonPlanTaskSelect = (props) => {

    const { course, setLoadingOpen, refreshCourse } = React.useContext(ContextStore);
    // const {lesson} = props;
    const [lesson, setLesson] = React.useState(props.lesson);
    const [stage, setStage] = React.useState(1);
    const [selectedComponentID, setSelectedComponentID] = React.useState(-1);
    const [taskOpts, setTaskOpts] = React.useState([]);
    const [checkBoxState, setCheckBoxState] =  React.useState({});
    const refreshLesson = props.refreshLesson;
    const setEditMode = props.setEditMode;

    React.useEffect(()=>{
        if(lesson.id != props.lesson.id){
            setStage(1);
            setEditMode(false);
        }
        setLesson(props.lesson);
    }, [props])

    const onChnageComponent = (id) => {
        setSelectedComponentID(id);
        setStage(2);
    }
    
    const onSave = () => {
        var task_arr = []

        const idList = Object.keys(checkBoxState);
        idList.map( task_id => {
            if(checkBoxState[task_id] == true){
                var temp = {
                    "lesson_id": lesson.id,
                    "task_id": task_id
                };
                task_arr.push(temp);
            }
        })

        var json = {
            tasks_id: task_arr
        }

        updateLesson(lesson.id, json);
    }

    const onCheckCheckbox = name => event => {
        setCheckBoxState({ ...checkBoxState, [name]: event.target.checked });
    } 

    React.useEffect(()=>{
        if(selectedComponentID > 0){
            fetchlearningComponentData(selectedComponentID);
        }
    }, [selectedComponentID])

    async function fetchlearningComponentData(id) {
        setLoadingOpen(true)
        fetch(
            'http://'+config.get('url')+'/api/learningComponent/'+id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            var task = response.tasks;
            response.patterns.map( 
                pattern => { task = task.concat(pattern.tasks) }
            );
            var checkBoxStateTmp = {};
            //get the init data
            lesson.tasksid.map(_taskid => {
                checkBoxStateTmp[_taskid.task_id] = true;
            })
            task.map(_task => {
                // checkBoxStateTmp[_task.id] = false;
                if(checkBoxStateTmp[_task.id] == true){

                }else{
                    checkBoxStateTmp[_task.id] = false;
                }

            });
            setCheckBoxState(checkBoxStateTmp)
            setTaskOpts(task);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }

    async function updateLesson(id, data) {
        setLoadingOpen(true);
        await fetch(
            'http://'+config.get('url')+'/api/lesson/'+id,
            {
                method: "PUT",
                body:  JSON.stringify(data),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        .then(res => res.json())
        .then(response => {
            refreshCourse();
            setEditMode(false);
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));

    }

    const displayEditContent = () => {
        switch(stage){
            default:
            case 1:
                    return (
                        <Grid container>
                            <Grid item xs = {12}> 
                                1. Choose the Major Step(s) that you will cover in this lesson
                            </Grid>
                            <Grid item xs = {12}>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="demo-simple-select-filled-label">Choose the major step(s)</InputLabel>
                                    <Select
                                        labelId="component-select-label"
                                        id="component-select"
                                        onChange={(event)=>{onChnageComponent(event.target.value)}}
                                        value = {selectedComponentID}
                                    >
                                    <MenuItem value="-1" disabled>
                                        <em>Choose the major step(s)</em>
                                    </MenuItem>
                                    {
                                        course.components.map(
                                            (_component, index) => (
                                                <MenuItem value={_component.id} key={index} index = {index}>{_component.title}</MenuItem>
                                            )
                                        )
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>   
                    )
                break;
            case 2:
                var filter = course.lessons.map(_lesson => {
                    if(lesson.id == _lesson.id ){
                        return [];
                    }else{
                        return _lesson.tasks.map(_task => {return _task.id})
                    }
                })
                
                filter = [].concat.apply([], filter);

                return (
                    <Grid container>
                         {  (
                            selectedComponentID > 0 && taskOpts.length > 0?
                            (
                                taskOpts.map(
                                    (_task ) => (
                                        (filter.indexOf(_task.id) == -1? 
                                        //not display other lesson selected learning tasks
                                        <Grid container item xs = {12} key = {_task.id}>
                                            <Grid item xs >
                                                <Checkbox
                                                        value="secondary"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        onChange= {onCheckCheckbox(_task.id)}
                                                        value = {checkBoxState[_task.id]}
                                                        key = {_task.id}
                                                        checked = {false || checkBoxState[_task.id]}
                                                        // checked = {courseData.lesson[lessonID].tasks.find(_task => 
                                                        //     (_task.componentID != selectComponent && _task.taskIndex != index)
                                                        // )== 'undefined'}
                                                />
                                            </Grid>
                                            <Grid item xs = {11}>
                                                <LearningTaskView 
                                                    taskID = {_task.id} 
                                                    taskData = {_task} 
                                                    onEditearningTask = {()=>{}}
                                                    key = {_task.id}
                                                    editBtn = {false}
                                                    duplicateBtn = {false}
                                                    deleteBtn = {false}
                                                />
                                            </Grid>
                                        </Grid>
                                        : 
                                        null)
                                    )
                                )
                            )
                            :
                            null
                            )
                         }
                        <Grid item xs = {12}>
                            <Button variant="contained" color="primary" fullWidth onClick = {onSave}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                   
                )
                break;
        }
    }


    return (
        <Grid container>
            {displayEditContent()}
        </Grid>
    )

}

export default LessonPlanTaskSelect;
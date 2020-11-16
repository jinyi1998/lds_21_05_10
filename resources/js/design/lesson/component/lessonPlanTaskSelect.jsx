import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningTaskView from '../../task/component/learningTaskView';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningCompGet,
} from '../../../api.js'


const LessonPlanTaskSelect = (props) => {

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
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
    }, [props.lesson])

    React.useEffect(()=>{
        if(selectedComponentID > 0){
            fetchlearningComponentData(selectedComponentID);
        }
    }, [selectedComponentID])

    const onChnageComponent = (id) => {
        setSelectedComponentID(id);
        setStage(2);
    }
    
    const onSave = () => {
        var task_arr = []
        var i = 1;

        const taskList = Object.keys(checkBoxState);
        taskList.map( task_id => {
            if(checkBoxState[task_id] == true){
                var temp = {
                    "lesson_id": lesson.id,
                    "task_id": task_id,
                    "sequence": lesson.tasks.length + i 
                };
                task_arr.push(temp);
                i++;
            }
        })

        var json = {
            tasks_id: task_arr,
            lesson_id: lesson.id
        }

        updateLesson(json);
    }

    const onCheckCheckbox = name => event => {
        setCheckBoxState({ ...checkBoxState, [name]: event.target.checked });
    } 

    async function fetchlearningComponentData(id) {
        setLoadingOpen(true)

        apiLearningCompGet(id)
        .then(response => {
            var task = response.data.tasks;
            response.data.patterns.map( 
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

    async function updateLesson(lesson) {
        props.updateLesson(lesson);
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
                                        onChange={(event)=>{onChnageComponent(event.target.value); tourNextStep();}}
                                        value = {selectedComponentID}
                                        data-tour = "lesson_component_select"
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
                    <Grid container data-tour = "lesson_task_select">
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
                    </Grid>
                   
                )
                break;
        }
    }

    return (
        <React.Fragment>
            <DialogTitle>Add your tasks into lesson</DialogTitle>
            <DialogContent>
                <Grid container item xs = {12}>
                    {displayEditContent()}
                </Grid>
            </DialogContent>
            <DialogActions>
 
                 {stage == 2?
                    <Button variant="contained" color="primary" fullWidth onClick = {onSave} data-tour = "lesson_task_add">
                        Save
                    </Button>
                    :
                    null
                 }
                 
            </DialogActions>
        </React.Fragment>
      
    )

}

export default LessonPlanTaskSelect;
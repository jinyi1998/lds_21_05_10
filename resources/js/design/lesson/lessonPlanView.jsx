import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app'
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningTaskEditView from '../task/learningTaskEditView';
import validator from 'validator';

import LearningTaskLessonView from '../task/learningTaskLessonView';
import config from 'react-global-configuration';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
    apiLearningTaskPost, apiLearningTaskPut,
    apiLessonTaskUpdate, 

} from '../../api.js';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
});

const LessonPlanView = (props) => {

    const {setEditMode} = props;
    const canEdit = props.canEdit;

    const [lesson, setLesson] = React.useState(props.lesson);
    const {refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore); 

    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);

    const [ taskData, setTaskData] = React.useState({});

    const [ error, setError] = React.useState({
        "type": "",
        "title": "",
        "description": "",
        "time": "",
        "classType": "",
        "target": "",
        "size": ""
    });

    const validate = () => {
        var validated = true;
        var tempError = {
          "type": "",
          "title": "",
          "description": "",
          "time": "",
          "classType": "",
          "target": "",
          "size": "",
        }

        if(validator.isEmpty(taskData.type.toString())){
            tempError["type"] = "Please enter the course type";
            validated = false;
          }
      
        if(validator.isEmpty(taskData.title.toString())){
            tempError["title"] = "Please enter the title";
            validated = false;
        }
    
        if(validator.isEmpty(taskData.description.toString())){
            tempError["description"] = "Please enter the description";
            validated = false;
        }
    
        if(validator.isEmpty(taskData.time.toString())){
          tempError["time"] = "Please enter the time";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.class_type.toString())){
          tempError["classType"] = "Please enter the class type";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.target.toString())){
          tempError["target"] = "Please enter the target";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.size.toString())){
          tempError["size"] = "Please enter the course size";
          validated = false;
        }
    
        setError(tempError);
        return validated;
      }


    React.useEffect(()=>{
        setLesson(props.lesson)
    }, [props])

    async function updateLearningTask() {
        setLoadingOpen(true);

        var json = taskData;
        if(taskData.id == -1){
            //new learning task
            return await apiLearningTaskPost(taskData)
            .then(response => {
                //load the default learning outcomes by api request
                setLoadingOpen(false);
                setOpenTaskEdit(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            //update existing task
            return await apiLearningTaskPut(taskData)
            .then(response => {
                //load the default learning outcomes by api request
                setLoadingOpen(false);
                setOpenTaskEdit(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }
    }

    async function updateLearningTaskLessonRelation(task_relation) {
        setLoadingOpen(true);
        
        return await apiLessonTaskUpdate(task_relation)
        .then(response => {
            //load the default learning outcomes by api request
            setLoadingOpen(false);
            refreshCourse();
        })
        .catch(error => console.log(error));
    }



    const onDragEnd = (result) => {
         // dropped outside the list
         if (!result.destination) {
            return;
        }

        //sync the data to root state
        var tempTasks =  JSON.parse(JSON.stringify(lesson.tasks));

        tempTasks.map((_task, index)=> {
            if(_task.lessonid.sequence == null){
                tempTasks[index].lessonid.sequence = index + 1;
            }
        });

        var sourceTask = {
          id: tempTasks[result.source.index].lessonid.id,
          sequence: tempTasks[result.destination.index].lessonid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempTask = {
              id : tempTasks[i].lessonid.id,
              sequence: tempTasks[i].lessonid.sequence - 1
            }
            // console.log(tempTask);
            updateLearningTaskLessonRelation(tempTask);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].lessonid.id,
              sequence: tempTasks[i].lessonid.sequence + 1
            }
            // console.log(tempTask);
            updateLearningTaskLessonRelation(tempTask);
          }
        }
        // console.log(sourceTask);
        updateLearningTaskLessonRelation(sourceTask);
    }

    const onSaveTask = () => {
        if(validate()){
            updateLearningTask();
        }
    }

    const onEditearningTask = (task) => {
        setTaskData(task)
        setOpenTaskEdit(true);
    }

    const totalTime = () => {
        var time = 0;
        lesson.tasks.map( _task => 
            time += parseInt(_task.time)
        );
        return time;
    } 


    return (
        <Grid container>
            
            <Grid container spacing={4}>

                <Grid item xs ={12}>
                    <b>{lesson.title}</b>
                </Grid>

                <Grid item xs ={12}>
                    Estimated learning time: {totalTime()} min(s)
                </Grid>
                
                <Grid item xs ={12}>

                    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)}>
                                {   
                                    lesson.tasks.length > 0 ?
                                        lesson.tasks.map(
                                            (_task, index) => 
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <LearningTaskLessonView 
                                                    provided = {provided} 
                                                    snapshot = {snapshot} 
                                                    taskID = {_task.id} 
                                                    taskData = {_task} 
                                                    // onEditearningTask = {()=>{}
                                                    onEditearningTask = {onEditearningTask}
                                                    key = {_task.id}
                                                    />
                                                )}
                                            </Draggable>
                                        )
                                        : 
                                        <Grid item xs ={12}>    
                                            No Learning Task In This Lesson
                                        </Grid> 
                                    }
                                    {provided.placeholder}
                                </List>
                            </RootRef>
                        )}
                        </Droppable>
                    </DragDropContext>
                 </Grid>

                {canEdit == true? 
                    <Grid item xs ={12}>
                        <Button variant="contained" color="primary" fullWidth onClick = {()=> setEditMode(true)} data-tour = "lesson_lesson_select">
                            Edit
                        </Button>
                    </Grid> 
                    : null
                }
            </Grid>

            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning task for this component...
                    </DialogContentText>
                    <LearningTaskEditView 
                        taskID = {taskData.id} 
                        taskData = {taskData} 
                        syncTask = {setTaskData} 
                        showAssessment = {false}
                        error = {error}
                        mode = "lesson_edit"/> 
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenTaskEdit(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onSaveTask()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}

export default LessonPlanView;
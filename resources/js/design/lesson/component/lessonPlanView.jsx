import React from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import validator from 'validator';
import RootRef from "@material-ui/core/RootRef";

import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningTaskEditView from '../../task/component/learningTaskEditView';
import LearningTaskLessonView from '../../task/component/learningTaskLessonView';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app'
import { Typography } from '@material-ui/core';

import { getListStyle } from '../../../dragndrop';

const LessonPlanView = (props) => {

    const {setEditMode} = props;
    const canEdit = props.canEdit;

    const [lesson, setLesson] = React.useState(props.lesson);
    const {refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore); 

    const lessontype = props.lessontype? props.lessontype : 2;
    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);

    const [ taskData, setTaskData] = React.useState({});

    const {enableDrag, enableEdit} = props;

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
          tempError["classType"] = "Please enter the location";
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
        props.updateLearningTask(taskData);
        setOpenTaskEdit(false);
    }

    async function updateLearningTaskLessonRelation(task_relation) {
       props.updateLearningTaskLessonRelation(task_relation);
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
        lesson.tasks.filter(_task => _task.lessonid.lessontype== lessontype).map( _task => 
            time += parseInt(_task.time)
        );
        return time;
    } 

    const displayLessonType = () => {
        
        switch (lessontype){
            case 1:
                return <Typography variant = {"subtitle1"}>{displayLessonTypeName()}</Typography>
            case 2:
                return <Typography variant = {"subtitle1"}>{displayLessonTypeName()}</Typography>
            case 3:
                return <Typography variant = {"subtitle1"}>{displayLessonTypeName()}</Typography>
        }
            
    }

    const displayLessonTypeName = () => {
        switch (lessontype){
            case 1:
                return "Pre-Class"
            case 2:
                return "In-Class"
            case 3:
                return "Post-Class"
        }
            
    }

    return (
        <Grid container>
            
            <Grid container spacing={4}>

                <Grid item xs ={12}>
                    {displayLessonType()}
                </Grid>

                <Grid container item xs ={12}>
                    <Grid item xs = {12}>
                    {
                        lessontype == 2?
                        <Typography variant = {"caption"}>Targeted Learning Time: {lesson.time} min(s)</Typography>
                        :
                        null
                    }
                    </Grid>

                    <Grid item xs ={12}>
                    {
                        lesson.time >= totalTime() || lessontype != 2?
                        <Typography variant = {"caption"} style = {{color: "blue"}}>  Estimated Learning Time: {totalTime()} min(s)</Typography>
                        :
                        <Typography variant = {"caption"} style = {{color: "red"}}>  Estimated Learning Time: {totalTime()} min(s)</Typography>
                    }

                    </Grid>
                  
                     {/* <Typography variant = {"caption"}>  Estimated Learning Time: {totalTime()} min(s)</Typography> */}
                  
                </Grid>
                
                <Grid item xs ={12}>

                    {/* <DragDropContext onDragEnd={(result) => onDragEnd(result)}> */}
                        <Droppable droppableId={lessontype.toString()}>
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)}>
                                {   
                                    lesson.tasks.filter( _task => _task.lessonid.lessontype == lessontype).length > 0 ?
                                        lesson.tasks.filter( _task => _task.lessonid.lessontype == lessontype).map(
                                            (_task, index) => 
                                            <Draggable key={_task.lessonid.id.toString()} draggableId={_task.lessonid.id.toString()} index={index} isDragDisabled = {!enableDrag}>
                                                {(provided, snapshot) => (
                                                    <LearningTaskLessonView 
                                                    provided = {provided} 
                                                    snapshot = {snapshot} 
                                                    taskID = {_task.id} 
                                                    taskData = {_task} 
                                                    editBtn = {enableEdit}
                                                    enableDrag = {enableDrag}
                                                    // onEditearningTask = {()=>{}

                                                    onEditearningTask = {onEditearningTask}
                                                    key = {_task.id}
                                                    />
                                                )}
                                            </Draggable>
                                        )
                                        : 
                                        <Grid container item xs ={12} justify = {"center"}>    
                                          <Typography variant = {"subtitle2"} style = {{color: "red"}}> 
                                            No Learning Task In {displayLessonTypeName()}
                                          </Typography>
                                        </Grid> 
                                    }
                                    {provided.placeholder}
                                </List>
                            </RootRef>
                        )}
                        </Droppable>
                    {/* </DragDropContext> */}
                 </Grid>
            </Grid>

            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title" maxWidth = {"md"}>
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
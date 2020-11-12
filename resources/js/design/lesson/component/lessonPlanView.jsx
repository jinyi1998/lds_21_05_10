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
        props.updateLearningTask(taskData);
        setOpenTaskEdit(false);
    }

    async function updateLearningTaskLessonRelation(task_relation) {
       props.updateLearningTaskLessonRelation(task_relation);
    }

    const onDragEnd = (result) => {
         // dropped outside the list
         if (!result.destination) {
            return;
        }

        var updates = [];
        setLoadingOpen(true);

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
            updates.push( updateLearningTaskLessonRelation(tempTask) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].lessonid.id,
              sequence: tempTasks[i].lessonid.sequence + 1
            }
            // console.log(tempTask);
            updates.push( updateLearningTaskLessonRelation(tempTask) );
          }
        }
        // console.log(sourceTask);
        updates.push( updateLearningTaskLessonRelation(sourceTask) );

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Tasks Sequence Updated")
        });
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
                    Target learning time: {lesson.time} min(s)
                    <br />
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
                                            <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {!enableDrag}>
                                                {(provided, snapshot) => (
                                                    <LearningTaskLessonView 
                                                    provided = {provided} 
                                                    snapshot = {snapshot} 
                                                    taskID = {_task.id} 
                                                    taskData = {_task} 
                                                    editBtn = {enableEdit}
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

                {canEdit == true && enableEdit ? 
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
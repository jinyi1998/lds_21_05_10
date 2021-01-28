import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import LessonPlanView from '../component/lessonPlanView';
import LessonPlanTaskSelect from '../component/lessonPlanTaskSelect';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningTaskPost, apiLearningTaskPut,
    apiLessonTaskUpdate, apiLessonUpdate, apiLessonPut

} from '../../../api.js';

const LessonPlanViewContainer = (props) => {

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    
    const [editMode, setEditMode] =  React.useState(false);
    const [editLesson, setEditLesson] = React.useState(false);
    const [lesson, setLesson] =  React.useState(props.lesson);
    const [editTitle, setTitle] = React.useState("");
    const [editTime, setTime] = React.useState("");

    const canEdit = props.canEdit;

    const refreshLesson = () => {
        refreshCourse();
    }

    const enableDrag = course.permission > 2;
    const enableEdit = course.permission > 2;
    
    React.useEffect(()=>{
        setLesson(props.lesson);
        setTitle(props.lesson.title);
        setTime(props.lesson.time);
    }, [props])

    //#region api function
    async function updateLearningTask(task) {
        setLoadingOpen(true);

        if(task.id == -1){
            //new learning task
            return await apiLearningTaskPost(task)
            .then(response => {
                //load the default learning outcomes by api request
                setLoadingOpen(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            //update existing task
            return await apiLearningTaskPut(task)
            .then(response => {
                //load the default learning outcomes by api request
                setLoadingOpen(false);
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

    async function updateLesson(lesson) {
        setLoadingOpen(true);
        await apiLessonUpdate(lesson)
        .then(response => {
            refreshCourse();
            setEditMode(false);
            setEditLesson(false);
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));
    }

    const onCancelEditLesson = () => {
        setTitle(props.lesson.title);
        setTime(props.lesson.time);
        setEditLesson(false)
    }

    const updateLessonBasic = () => {
        var temp = JSON.parse(JSON.stringify(lesson));
        temp.time = editTime;
        temp.title = editTitle;
        temp.lesson_id = temp.id;
        updateLesson(temp);
    }
    //#endregion


    return (
        <Grid container data-tour = "lesson_view">
            <Grid item xs = {12}>
                {
                    editLesson?
                    <Grid container item xs alignContent = {"flex-end"} justify = {"space-between"}>
                        <Grid item xs = {3}>
                        <TextField label = {"Lesson Title"}  value = {editTitle}  onChange = {(event) => setTitle(event.target.value)}/>
                        </Grid>

                        <Grid item xs = {3}>
                        <TextField label = {"In Class Duration"} value = {editTime} onChange = {(event) => setTime(event.target.value)}/>
                        </Grid>

                      
                        <Grid item xs>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick = {()=> updateLessonBasic()}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="span"  onClick = {onCancelEditLesson}>
                                <CancelIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    :
                    <Grid container item xs alignContent = {"flex-end"} justify = {"space-between"}>
                        <Grid item>
                            <Typography variant = {"h6"} gutterBottom> {lesson.title}</Typography>
                            <Typography variant = {"subtitle2"} gutterBottom> 
                                In Class Lesson Duration - {lesson.time}
                            </Typography>
                        </Grid>


                        <Grid item xs = {3}>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick = {()=> setEditLesson(true)}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
            
                }
                
            </Grid>

             <LessonPlanView 
                lesson = {lesson}
                lessontype = {1}
                canEdit = {canEdit}
                setEditMode = {setEditMode}
                refreshLesson = {refreshLesson}
                enableDrag = {enableDrag}
                enableEdit = {enableEdit}
                updateLearningTask = {updateLearningTask}
                updateLearningTaskLessonRelation = {updateLearningTaskLessonRelation}
            />

            <LessonPlanView 
                lesson = {lesson}
                lessontype = {2}
                canEdit = {canEdit}
                setEditMode = {setEditMode}
                refreshLesson = {refreshLesson}
                enableDrag = {enableDrag}
                enableEdit = {enableEdit}
                updateLearningTask = {updateLearningTask}
                updateLearningTaskLessonRelation = {updateLearningTaskLessonRelation}
            />

            <LessonPlanView 
                lesson = {lesson}
                lessontype = {3}
                canEdit = {canEdit}
                setEditMode = {setEditMode}
                refreshLesson = {refreshLesson}
                enableDrag = {enableDrag}
                enableEdit = {enableEdit}
                updateLearningTask = {updateLearningTask}
                updateLearningTaskLessonRelation = {updateLearningTaskLessonRelation}
            />

            {canEdit == true && enableEdit ? 
                <Grid item xs ={12}>
                    <Button variant="contained" color="primary" fullWidth onClick = {()=> setEditMode(true)} data-tour = "lesson_lesson_select">
                        Edit
                    </Button>
                </Grid> 
                : null
            }

             <Dialog open={editMode} 
                onClose={() => {setEditMode(false)}} 
                style = {{minWidth: "400px", minHeight: "300px"}} 
                onEntered = {()=>{tourNextStep()}} maxWidth = {"md"}>  
                <LessonPlanTaskSelect 
                        lesson = {lesson}
                        setEditMode = {setEditMode}
                        refreshLesson = {refreshLesson}
                        updateLesson = {updateLesson}
                    />
            </Dialog>
           
        </Grid>
    )

}

export default LessonPlanViewContainer;
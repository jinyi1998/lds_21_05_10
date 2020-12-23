import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LessonPlanView from '../component/lessonPlanView';
import LessonPlanTaskSelect from '../component/lessonPlanTaskSelect';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningTaskPost, apiLearningTaskPut,
    apiLessonTaskUpdate, apiLessonUpdate 

} from '../../../api.js';

const LessonPlanViewContainer = (props) => {

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    
    const [editMode, setEditMode] =  React.useState(false);
    const [lesson, setLesson] =  React.useState(props.lesson);
    const canEdit = props.canEdit;

    const refreshLesson = () => {
        refreshCourse();
    }

    const enableDrag = course.permission > 2;
    const enableEdit = course.permission > 2;
    
    React.useEffect(()=>{
        setLesson(props.lesson) 
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
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));
    }
    //#endregion


    return (
        <Grid container data-tour = "lesson_view">
            <Grid item xs = {12}>
                <Typography variant = {"subtitle1"}> {lesson.title}</Typography>
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
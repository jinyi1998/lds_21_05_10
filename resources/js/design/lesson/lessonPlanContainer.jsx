import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Checkbox } from '@material-ui/core';
import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app';
import LessonPlanView from './lessonPlanView';
import LessonPlanTaskSelect from './lessonPlanTaskSelect';
import config from 'react-global-configuration';

import Dialog from '@material-ui/core/Dialog';

//   tasks : [ { componetID, taskIndex }]

const LessonPlanContainer = (props) => {

    const { course } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    
    const [editMode, setEditMode] =  React.useState(false);
    const [refresh, setRefresh] =  React.useState(false);
    const [lesson, setLesson] =  React.useState(props.lesson);
    const canEdit = props.canEdit;

    const refreshLesson = () => {
        setRefresh(true);
    }

    const enableDrag = course.permission > 2;
    const enableEdit = course.permission > 2;
    
    React.useEffect(()=>{
        setLesson(props.lesson)
    }, [props])

    return (
        <Grid container data-tour = "lesson_view">
            {/* {
                editMode == false?
                    <LessonPlanView 
                        lesson = {lesson}
                        canEdit = {canEdit}
                        setEditMode = {setEditMode}
                        refreshLesson = {refreshLesson}
                    />
                    :
                    <LessonPlanTaskSelect 
                        lesson = {lesson}
                        setEditMode = {setEditMode}
                        refreshLesson = {refreshLesson}
                    />
            } */}
            <LessonPlanView 
                lesson = {lesson}
                canEdit = {canEdit}
                setEditMode = {setEditMode}
                refreshLesson = {refreshLesson}
                enableDrag = {enableDrag}
                enableEdit = {enableEdit}
            />

             <Dialog open={editMode} onClose={() => {setEditMode(false)}} style = {{minWidth: "400px", minHeight: "300px"}} onEntered = {()=>{tourNextStep()}}>
               
                <LessonPlanTaskSelect 
                        lesson = {lesson}
                        setEditMode = {setEditMode}
                        refreshLesson = {refreshLesson}
                    />
            </Dialog>
           
        </Grid>
    )

}

export default LessonPlanContainer;
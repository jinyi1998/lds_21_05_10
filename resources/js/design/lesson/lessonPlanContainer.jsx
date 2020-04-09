import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Checkbox } from '@material-ui/core';
import {ContextStore} from '../../container/designContainer'
import LessonPlanView from './lessonPlanView';
import LessonPlanTaskSelect from './lessonPlanTaskSelect';
import config from 'react-global-configuration';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    contentGrid: {
        textAlign: "left"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    chip: {
        margin: 2,
    },
    color:{
        backgroundColor: "#de5995",
        height: "100%"
    },
  }));

//   tasks : [ { componetID, taskIndex }]

const LessonPlanContainer = (props) => {

    const { course, setLoadingOpen } = React.useContext(ContextStore);
    const [editMode, setEditMode] =  React.useState(false);
    const [refresh, setRefresh] =  React.useState(false);
    const [lesson, setLesson] =  React.useState(props.lesson);
    const canEdit = props.canEdit;

    const refreshLesson = () => {
        setRefresh(true);
    }

    // React.useEffect(()=>{
    //     // fetchLesson(lessonID)
    // },[lessonID])
    
    React.useEffect(()=>{
        setLesson(props.lesson)
    }, [props])

    // React.useEffect(()=>{
    //     if(refresh== true){
    //         fetchLesson(lesson.id);
    //         setRefresh(false);
    //     }
       
    // },[refresh])

    async function fetchLesson(id) {
        setLoadingOpen(true);
        return await fetch(
            'http://'+config.get('url')+'/api/lesson/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setLesson(response);
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));
    }

    return (
        <Grid container>
            {
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
            }
           

           

            {/* <LessonPlanEditTask 
                openLessonTaskEdit = {openLessonTaskEdit}
                setOpenLessonTaskEdit = {setOpenLessonTaskEdit}
                onEditComponentID = {onEditComponentID}
                onEditTasktID = {onEditTasktID}
            /> */}
        </Grid>
    )

}

export default LessonPlanContainer;
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';
import config from 'react-global-configuration';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import LessonPlanViewContainer from './lessonPlanViewContainer';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiCourseUpdate,
    apiLessonCreate, apiLessonDelete
} from '../../../api.js';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));
  
// lesson : [
//     {
//         id: 0,
//         task: {

//         }
//     }
// ]

const LessonPlanContainer = (props) => {

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    
    const enableAdd = course.permission > 2;
    const enableDelete = course.permission > 2;
    const enableDrag = course.permission > 2;

    const classes = useStyles();
    const [selectedLessonID, setSelectedLessonID] = React.useState(-1);
    const [onDeletelLessonID, setOnDeleteLessonID] = React.useState(-1);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [lesson, setLesson] = React.useState({
        id: -1,
        title: "",
        sequence: 0,
        time: 0,
        created_by: 1,
        updated_by: 1,
        is_deleted: 0,
        created_at: "",
        updated_at: "",
        tasks: [
        ]
    });

    const onChangeLesson = (lessonID) => {
        tourNextStep();
        setSelectedLessonID(lessonID);
        setLesson(course.lessons.find(x=> x.id == lessonID));
    }

    const onAddLessson = () => {
        setLoadingOpen(true)
        var lessonjson = {
            "time": 0,
            "title": 'Lesson' + (course.lessons.length+1),
            "sequence": course.lessons.length + 1,
            "course_id": course.id,
        };

        apiLessonCreate(lessonjson)
        .then(response => {
            setLoadingOpen(false)
            // update the course no of lessons
            updateCourseNoOfLesson(course.lessons.length + 1);
        })
        .catch(error => console.log(error));
        
    }

    const onDeleteDialog = (lesson_id) => {
        setOnDeleteLessonID(lesson_id);
        setDeleteDialog(true);
    }

    const onDeleteLesson = () => {
        if(selectedLessonID == onDeletelLessonID){
            setSelectedLessonID(-1)
        }
        //delete the lesson
        setLoadingOpen(true)

        apiLessonDelete(onDeletelLessonID)
        .then(response => {

                // update the course no of lessons
                updateCourseNoOfLesson(course.lessons.length - 1);
        })
        .catch(error => console.log(error));
    
    }

    const updateCourseNoOfLesson = (no_of_lesson) => {
        var json = {        
            "no_of_lesson": no_of_lesson,
        };

        apiCourseUpdate({        
            "no_of_lesson": no_of_lesson,
            "course_id":  course.id
        }).then(response => {
            refreshCourse();
            setLoadingOpen(false)
            setDeleteDialog(false);
        })
        .catch(error => console.log(error));    
    }


    React.useEffect(()=>{
        setLesson(course.lessons.find(x=> x.id == selectedLessonID));
    },
    [course])


    return (
        <Grid container >
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <List data-tour = "lesson_lesson_list">
                        {course.lessons.map((_lessons, index) => 
                            <ListItem 
                                onClick = {() => onChangeLesson(_lessons.id)} 
                                key={index}  
                                selected={selectedLessonID == _lessons.id}
                                button
                                data-tour = {"lesson_lesson_" + index}
                                >
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary= {_lessons.title} />
                                <ListItemSecondaryAction>
                                    {
                                        enableDelete? 
                                        <IconButton edge="end" aria-label="delete" onClick={()=> onDeleteDialog(_lessons.id)} data-tour = "lesson_lesson_delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        :
                                        null
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                        <ListItem onClick = {() => onChangeLesson(-1)} selected={selectedLessonID == -1} data-tour = "lesson_lesson_all">View All</ListItem>
                    </List>
                    {
                        enableAdd?
                        <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick = {onAddLessson}
                        data-tour = "lesson_lesson_add"
                        >
                            Add Lesson
                        </Button>
                        :
                        null
                    }
                 
                </Paper>
            </Grid>

            <Grid item xs={9}>
                {
                    selectedLessonID == -1 ? 
                        course.lessons.map(_lesson => 
                            <LessonPlanViewContainer lesson = {_lesson}  canEdit = {false}  key = {_lesson.id}/>
                        )
                        :
                        <LessonPlanViewContainer lesson = {lesson} canEdit = {true}/>
                }
                
            </Grid>
            <Dialog open={deleteDialog} onClose={()=>{setDeleteDialog(false)}}>
                <DialogTitle id="form-dialog-title">Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are You Sure To Delete Lesson #(lesson id: {onDeletelLessonID})
                        This action cannot be recovered after deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setDeleteDialog(false)}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{onDeleteLesson()} } color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default LessonPlanContainer;
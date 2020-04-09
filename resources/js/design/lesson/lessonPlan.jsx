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
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import LessonPlanContainer from './lessonPlanContainer';

import {ContextStore} from '../../container/designContainer'


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

const LessonPlan = (props) => {

    const { course } = React.useContext(ContextStore);

    const classes = useStyles();
    const [selectedLessonID, setSelectedLessonID] = React.useState(-1);
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

        setSelectedLessonID(lessonID);
        setLesson(course.lessons.find(x=> x.id == lessonID));
    }

    React.useEffect(()=>{
        setLesson(course.lessons.find(x=> x.id == selectedLessonID));
    },
    [course])


    return (
        <Grid container >
            <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <MenuList>
                        {course.lessons.map((_lessons, index) => 
                            <MenuItem 
                                onClick = {() => onChangeLesson(_lessons.id)} 
                                key={index}  
                                selected={selectedLessonID == _lessons.id}>
                                {_lessons.title}
                            </MenuItem>
                        )}
                        <MenuItem onClick = {() => onChangeLesson(-1)} selected={selectedLessonID == -1} >View All</MenuItem>
                    </MenuList>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                {
                    selectedLessonID == -1 ? 
                        course.lessons.map(_lesson => 
                            <LessonPlanContainer lesson = {_lesson}  canEdit = {false}  key = {_lesson.id}/>
                        )
                        :
                        <LessonPlanContainer lesson = {lesson} canEdit = {true}/>
                }
                
            </Grid>
        </Grid>
    )
}

export default LessonPlan;
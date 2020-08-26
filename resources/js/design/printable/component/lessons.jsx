import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {PrintableStore} from '../printableContainer';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import GroupIcon from '@material-ui/icons/Group';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import AssessmentIcon from '@material-ui/icons/Assessment';

const Task = (props) => {
    const {taskTypeColor, options} = React.useContext(PrintableStore);
    const task = props.task;
    const classTypeOtps = options.taskClassType;
    const taskClassSizeOpts = options.taskSize;
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;

    return (
        <React.Fragment style = {{pageBreakInside: "avoid"}}>
             <Grid item container  xs={12} spacing={4}  style = {{pageBreakInside: "avoid"}}>
                <Grid item xs={1} height="100%">
                    <div style={taskTypeColor(task.type)}>
                    </div>
                </Grid>

                <Grid container item xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom style={{fontWeight: '600'}} display = "inline">
                            {task.title} 
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom display = "inline">
                        @ Component
                        {task.component == null? 
                        task.pattern.component.sequence + " - " + task.pattern.component.title 
                        : 
                        task.pattern.component.sequence + " - " + task.component.title}
                        </Typography>
                    
                    </Grid>

                    <Grid item xs={12}>
                        {taskTypeOpts.find(x => x.id == task.type)?.description}
                    </Grid>

                    <Grid item xs={3}>
                        <AccessTimeIcon />
                        {task.time} mins 
                    </Grid>
{/* 
                    <Grid item xs={3}>
                        <RoomIcon /> 
                        {classTypeOtps.find(x => x.id == task.class_type)?.description}
                    </Grid>

                    <Grid item xs={3}>
                        <GpsNotFixedIcon /> 
                        {taskTargetOpts.find(x => x.id == task.target)?.description }
                    </Grid>

                    <Grid item xs={3}>
                        <GroupIcon /> 
                        {taskClassSizeOpts.find(x => x.id == task.size)?.description } 
                    </Grid>

                    <Grid item xs={6}>
                        <AssignmentIcon />
                        {task.resourceid.length == 0? "N/A" : task.resourceid.map(selected=> taskResouceOpts.find(x => x.id == selected.resource_id)?.description.concat(', '))}
                    </Grid>

                    <Grid item xs={6}>
                        <ImportantDevicesIcon /> 
                        {task.toolid.length == 0? "N/A" : task.toolid.map(selected=> taskELearnResouceOpts.find(x => x.id == selected.elearningtool_id)?.description.concat(', '))} 
                    </Grid>
                     */}
                    <Grid item xs={9}>
                        <Typography color = "textSecondary" gutterBottom>
                            {task.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const Lesson = (props) => {
    const lesson = props.lesson;
    return (
        <React.Fragment style = {{pageBreakInside: "avoid"}}>
            <Grid container style = {{margin: 16, pageBreakInside: "avoid"}}>
                <Grid item xs = {12} >
                    <Typography variant = "subtitle1" color = "textPrimary" gutterBottom>   {lesson.title} - {lesson.time} mins </Typography>  
                </Grid>

                {
                    lesson.tasks.length > 0?
                    lesson.tasks.map(task => {
                        return (
                            <Task task = {task} key = {task.id}/>
                        )
                    })
                    :
                    "No task in this lesson"   
                }
            </Grid>
        </React.Fragment>
    )
}

const Lessons = () => {
    const {course, options} = React.useContext(PrintableStore);
   
    return (
        <React.Fragment>
            <Grid container>
                {
                    course.lessons.map(lesson => {
                        return(
                            <Lesson lesson = {lesson} key = {lesson.id}/>
                        )
                    })
                }
                
            </Grid>
        </React.Fragment>
    );
}

export default Lessons;
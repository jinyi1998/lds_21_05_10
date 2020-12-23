import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

import ForumIcon from '@material-ui/icons/Forum';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import GroupIcon from '@material-ui/icons/Group';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import AssessmentIcon from '@material-ui/icons/Assessment';


import {PrintableStore} from '../printableContainer';


const Outcome = (props) => {
    const {options} = React.useContext(PrintableStore);
    
    const outcome = props.outcome;
    const component_outcomeid = props.component_outcomeid;

    return (
        <Grid container item xs = {12}>
            <Grid container item xs ={12}>
                <Grid item xs = {1}>
                    <Avatar>
                        <ForumIcon />
                    </Avatar>
                </Grid>

                <Grid item xs = {11}>
                    <Typography variant = {"subtitle2"} display = {"block"}>
                        {outcome.description}
                    </Typography>
                    <Typography variant = {"caption"} display = {"block"}>
                        {options.bloomLvlOpts.find( x => x.id == outcome.bloom_id)?.name } 
                    </Typography>
                </Grid>
            </Grid>

            {
                outcome.slo_outcome.filter( _slo => component_outcomeid.map(_id => _id.outcome_id).includes(_slo.id)).map(
                    (_slo,index) => 
                    <Grid container item xs = {12} key = {index}>
                        <Grid item xs = {2}>

                        </Grid>
                        <Grid container item xs ={10}>

                            <Grid item xs>
                                <Typography variant = {"caption"} display = {"block"}>
                                    {_slo.description}
                                </Typography>
                                <Typography variant = {"caption"} display = {"block"}>
                                    {options.bloomLvlOpts.find( x => x.id == _slo.bloom_id)?.name }  
                                </Typography>
                            </Grid>
            
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    );
}

const ComponentOutcome = (props) => {
    const outcomeid = props.outcomeid;
    const {course} = React.useContext(PrintableStore);
    const outcomes = course.outcomes.filter( x => (outcomeid.map(_id => _id.outcome_id).includes(x.id) && x.isCourseLevel));

    return (
        <React.Fragment>
             <Typography variant = "subtitle1" color = "textSecondary" gutterBottom> Outcome </Typography>
             <Grid container spacing={2}>
                <Grid container item xs={12}>
                        {outcomes.map(outcome => 
                            <Outcome 
                                outcome = {outcome} 
                                component_outcomeid = {outcomeid}
                                key = {outcome.id}
                        />)}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const ComponentTask = (props) => {
    const {taskTypeColor, options} =  React.useContext(PrintableStore);
    const task = props.task;

    const classTypeOtps = options.taskClassType;
    const taskClassSizeOpts = options.taskSize;
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;
    return (
        <React.Fragment>
             <Grid item container xs={12} style = {{pageBreakInside: "avoid"}}>
                <Grid container item xs={1} height="100%">
                    <div style={taskTypeColor(task.type)}/>
                </Grid>

                
                <Grid container item xs={10}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom style={{fontWeight: '600'}}>
                            {task.title}
                        </Typography>
                    </Grid>
                   
                    <Grid item xs={12}>
                        {taskTypeOpts.find(x => x.id == task.type)?.description } 
                    </Grid>
                    
                    <Grid item xs={12}>
                        <AssessmentIcon />
                      
                       {task.assessment?.map(
                           _assessment => 
                           _assessment.description.concat(', ')
                       )}
                    </Grid>

                    <Grid item xs={3}>
                        <AccessTimeIcon />
                        {task.time} mins 
                      
                    </Grid>

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
                    
                    <Grid item xs={12}>
                        <Typography color = "textSecondary" gutterBottom>
                            {task.description}
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const ComponentPattern = (props) => {
    const pattern = props.pattern;

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs = {12}>
                    <Typography variant = "subtitle1" color = "textSecondary" gutterBottom>   {pattern.title} </Typography>
                </Grid>
                <Grid item xs = {12}>
                    {/* {pattern.tasks.length > 0? 
                        <Typography variant = "subtitle2" color = "textSecondary" gutterBottom>  
                            Pattern Tasks
                        </Typography> : null} */}
                    {pattern.tasks.map((task, index) => 
                        <ComponentTask task = {task} key = {task.id}/>
                    )}
                </Grid>
            </Grid> 
        </React.Fragment>
    );
}

const Component = (props) => {
    const component = props.component;
    
    return (
        <Box border={1} borderRadius={16} style = {{padding: 16, margin: 16}}>
            <Grid container spacing={2} style = {{pageBreakInside: "avoid"}}>
                <Grid item xs={12}>
                    <Typography variant = "subtitle1" color = "textPrimary" gutterBottom> Component #{component.sequence} - {component.title} </Typography>
                </Grid>

                <Grid item xs={12}>
                    <ComponentOutcome 
                        outcomeid = {component.outcomeid} />
                </Grid>
                
                <Grid container item xs = {12}>
                    <Grid item xs = {12}>
                        <Typography variant = "subtitle2" color = "textSecondary" gutterBottom>  
                                Patterns and Tasks
                        </Typography>
                    </Grid>
                 
                    {component.patterntaskid.map(
                        (_patterntaskid, index) =>
                        {
                            if(_patterntaskid.pattern_id != null){
                                var pattern = component.patterns.find(x => x.id == _patterntaskid.pattern_id);
                                return (
                                    <ComponentPattern pattern = {pattern} key={index}/>
                                );
                              
                            }else if(_patterntaskid.task_id != null){
                                var task = component.tasks.find(x => x.id == _patterntaskid.task_id)
                                return(
                                    <ComponentTask task = {task} key = {index}/>
                                );
                            }
                        }
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

const Components = () => {
    const {course, options} = React.useContext(PrintableStore);

    return (
        <Grid container>
            <Grid item xs={12}>
                {course.components.map(component => <Component component = {component} key = {component.id}/>)}
            </Grid>
        </Grid>
    )
}


export default Components;
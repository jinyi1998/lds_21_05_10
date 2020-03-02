import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ComponentTask from './componentTask';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        width: '100%',
        margin: 16
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
}));


const LearningPattern = (props) => {
    const { course, options, dispatch } = React.useContext(ContextStore);

    const classes = useStyles();
    const classTypeOtps = options.taskClassType;
    const taskClassSizeOpts = options.taskSize;
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;
    const learningPatternOpts = options.learningPatternOpts;

    const {componentID, patternData} = props;

    const taskTypeColor = (TaskData) => {

        switch(TaskData.type){
            default:
            case 1:
                return({
                    backgroundColor:  "#194d33",
                    height: "100%"
                });
                break;
            case 2:
                return({
                    backgroundColor:  "#FF6900",
                    height: "100%"
                });
                break
            case 3:
                return({
                    backgroundColor:  "#FCB900",
                    height: "100%"
                });
                break;
            case 4:
                return({
                    backgroundColor:  "#7BDCB5",
                    height: "100%"
                });
                break;
            case 5:
                return({
                    backgroundColor:  "#8ED1FC",
                    height: "100%"
                });
                break;
            case 6:
                return({
                    backgroundColor:  "#0693E3",
                    height: "100%"
                });
                break;
            case 7:
                return({
                    backgroundColor:  "#EB144C",
                    height: "100%"
                });
                break;
            case 8:
                return({
                    backgroundColor:  "#9900EF",
                    height: "100%"
                });
                break;
        }  
    }

    const unLockPattern = () => {
        dispatch({
            type: "UNLOCKPATTERN",
            value: componentID
        })
    }


    function displayTask(TaskData) {
        return (
            <Paper className={classes.paper} key = {TaskData.id}>
                <Grid item container spacing={4} xs={12}>
                    <Grid item xs={1} height="100%">
                        <div style={taskTypeColor(TaskData)}>
                        </div>
                    </Grid>
                    <Grid container item xs={11}>
                        <Grid item xs={8} className={classes.contentGrid}>
                            {taskTypeOpts.find(x => x.id == TaskData.type)?.description } 
                        </Grid>
                    
                        <Grid item xs={12} className={classes.contentGrid}>
                            {TaskData.title}
                        </Grid>
                        
                        <Grid item xs={12} className={classes.contentGrid}>
                        {TaskData.assessment?.map(
                            _learningOutcome_id => 
                            course.learningOutcomes.find( x => x.id == _learningOutcome_id).description
                        )}
                        </Grid>

                        <Grid item xs={12} className={classes.contentGrid}>
                            {TaskData.time} mins | 
                            {taskTargetOpts.find(x => x.id == TaskData.target)?.description } | 
                            {taskClassSizeOpts.find(x => x.id == TaskData.size)?.description } | 
                            {TaskData.resource?.map(selected=> taskResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
                            {TaskData.e_resource?.map(selected=> taskELearnResouceOpts.find(x => x.id == selected)?.description.concat(','))} |
                            {/* {TaskData.STEMType.map(_STEMType => _STEMType.concat(','))} */}
                        </Grid>
                        
                        
                        <Grid item xs={12} className={classes.contentGrid}>
                            {TaskData.description}
                        </Grid>

                        <Grid item xs={12} className={classes.contentGrid}>
                            {TaskData.content}
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>
        );
    }

    return (
        <React.Fragment>
             <Paper className={classes.paper}>
                <Grid container spacing = {4}>
                    <Grid item xs = {8}>
                        {learningPatternOpts.find(x=> x.id == patternData.id)?.description}
                    </Grid>

                    <Grid item xs = {4}>
                        <Button color="primary" variant="contained" onClick={()=> unLockPattern()}> <LockOpenIcon/>Unclock me</Button>
                    </Grid>
                    
                    {patternData.tasks?.map((_task, index)=>
                        displayTask(_task)
                    )}
                    
                </Grid>
             </Paper>
        </React.Fragment>
    );
}
export default LearningPattern;
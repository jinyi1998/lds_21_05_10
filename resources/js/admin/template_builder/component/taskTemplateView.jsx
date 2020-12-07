import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import GroupIcon from '@material-ui/icons/Group';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Tooltip from '@material-ui/core/Tooltip';

import {AppContextStore} from '../../../container/app';


const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
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

const TaskTemplateView = (props) => {
    const classes = useStyles();
    // const { setLoadingOpen } = React.useContext(AppContextStore);
    const {options, taskTypeColor } = React.useContext(AppContextStore);
    const {provided, snapshot, index, onEditearningTask, onDeleteTask, onDuplicateTask} = props;

    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const [duplicateDialogOpen, setDuplicateDialogOpen] = React.useState(false);
    const [task, setTask] = React.useState({
        id: -1,
        type: 1,
        title: "",
        assessment: [],
        time: 0,
        class_type: 1,
        componentid: {},
        target: 1,
        size: 1,
        toolid: [],
        resourceid: [],
        // STEMType: [],
        description: "",
        content: "",
        has_assessment: false
    });  

    //#region init opts data

    const classTypeOtps = options.taskClassType;
    const taskClassSizeOpts = options.taskSize;
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;
    //#endregion

    React.useEffect(()=> {
        setTask(props.task);
    }, [props.task])

    const getDraggable = (provided, snapshot) => {
        if(typeof provided == 'undefined'){
            return (
               null
            );
        }else{
            return (
                {
                    // styles we need to apply on draggables
                    ref: provided.innerRef,
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    style: getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )
                }
            );
        }
    }


    //#region button action related
    const onClickEdit = () => {
        onEditearningTask(task);
    }

    const onClickDuplicate = () => {
        var temp = JSON.parse(JSON.stringify(task));
        if(typeof task.componentid != 'undefined' && typeof task.componentid.component_id != 'undefined'){
            temp.component_id = task.componentid.component_id;
        }
        if(typeof task.patternid != 'undefined' && typeof task.patternid.pattern_id != 'undefined'){
            temp.pattern_id = task.patternid.pattern_id;
        }
        
        // temp.pattern_id = task.patternid.pattern_id;
        // temp.sequence = lastestindex;
        onDuplicateTask(temp);
    }

    const onClickDelete = () => {
        onDeleteTask(task);
    }
    //#endregion

    const displayView = () => {
        return (
            <Grid item container spacing={2} xs={12} style = {{"width": "100%"}} 
               {...getDraggable(provided, snapshot)}
            >
                <Grid container item xs={1} height="100%">
                    {typeof provided == 'undefined'?    
                        null
                    :
                        <Grid item xs ={4} container  justify="center" alignItems="center">
                            <DragHandleIcon />
                        </Grid>
                    }
                 
                    <Grid item xs ={8}>
                        <div style={taskTypeColor(task.type)}/>
                    </Grid>

                </Grid>

                
                <Grid container item xs={10}>
                    <Grid item xs={10} className={classes.contentGrid}>
                        <Typography variant="subtitle1" gutterBottom style={{fontWeight: '600'}} data-tour = "component_task_title">
                            {task.title}
                        </Typography>
                    </Grid>
                   
                    <Grid item xs={2} className={classes.contentGrid}>
                        <IconButton onClick={()=>onClickEdit()}>
                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={()=> {onClickDuplicate()}}>
                            <FileCopyIcon />
                        </IconButton>

                        <IconButton onClick={()=> {setDelDialogOpen(true)}}>
                            <DeleteIcon />
                        </IconButton>
                       
                    </Grid>
                   
                    <Grid item xs={12} className={classes.contentGrid} data-tour="component_task_type">
                        {taskTypeOpts.find(x => x.id == task.type)?.description } 
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid} data-tour="component_task_lo">
                        <Tooltip title="Learning Outcome" aria-label="lo">
                            <AssessmentIcon />
                        </Tooltip>
                      
                       {task.has_assessment? "Assessment(s) is needed" : null}
                    </Grid>

                    <Grid item xs={3} className={classes.contentGrid} data-tour="component_task_time">
                        <Tooltip title="Task Time" aria-label="time">
                            <AccessTimeIcon />
                        </Tooltip>
                        {task.time} mins 
                      
                    </Grid>

                    <Grid item xs={3} className={classes.contentGrid} data-tour="component_task_classtype">
                        <Tooltip title="Class Type" aria-label="classtype">
                            <RoomIcon /> 
                        </Tooltip>
                        {classTypeOtps.find(x => x.id == task.class_type)?.description}
                    </Grid>

                    <Grid item xs={3} className={classes.contentGrid} data-tour="component_task_classtarget">
                        <Tooltip title="Class Target" aria-label="classtarget">
                            <GpsNotFixedIcon /> 
                        </Tooltip>
                        {taskTargetOpts.find(x => x.id == task.target)?.description }
                     
                    </Grid>

                    <Grid item xs={3} className={classes.contentGrid} data-tour="component_task_classsize">
                        <Tooltip title="Class Size" aria-label="classsize">
                            <GroupIcon /> 
                        </Tooltip>
                        {taskClassSizeOpts.find(x => x.id == task.size)?.description } 
                    </Grid>

                    <Grid item xs={6} className={classes.contentGrid} data-tour="component_task_resource">
                        <Tooltip title="Resource" aria-label="classtarget">
                            <AssignmentIcon />
                        </Tooltip>  
                        {task.resourceid.length == 0? "N/A" : task.resourceid.map(selected=> taskResouceOpts.find(x => x.id == selected.resource_id)?.description.concat(', '))}
                    </Grid>

                    <Grid item xs={6} className={classes.contentGrid} data-tour = "component_task_eresource">
                        <Tooltip title="E-Learning Tools" aria-label="classtarget">
                            <ImportantDevicesIcon /> 
                        </Tooltip>  
                        {task.toolid.length == 0? "N/A" : task.toolid.map(selected=> taskELearnResouceOpts.find(x => x.id == selected.elearningtool_id)?.description.concat(', '))} 
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid} data-tour ="component_task_description">
                        <Typography color = "textSecondary" gutterBottom>
                            {task.description}
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        );
    }

    return (
        <Paper className={classes.paper}>
            <Grid container 
            spacing={2} 
            justify="center"
    
            >   
                {
                    displayView()
                }
            </Grid>
    
            <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                    <DialogTitle id="form-dialog-title">Warning</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are You Sure To Delete LearningTask #({task.id})
                            This action cannot be recovered after deleted
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{setDelDialogOpen(false)}} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>{onClickDelete(); setDelDialogOpen(false)} } color="primary">
                            Delete
                        </Button>
                    </DialogActions>
            </Dialog>

        </Paper>
        );
}

export default TaskTemplateView;
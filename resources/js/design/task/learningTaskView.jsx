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
import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app';

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

import {
    apiLearningTaskPost, apiLearningTaskDelete
} from '../../api.js'
//   tasks: [
//     {
//       id: 0,
//       type: "",
//       title: "",
//       assessment: [],
//       time: 0,
//       classType: "",
//       target: "",
//       resource: "",
//       STEMType: [],
//       description: "",
//     }
//   ],


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


const LearningTaskView = (props) => {

    const classes = useStyles();

    const {taskID, taskData, onEditearningTask} = props;
    // const {onEditTasks} = props;
    const {course, options, refreshCourse, taskTypeColor } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const [duplicateDialogOpen, setDuplicateDialogOpen] = React.useState(false);
    const [duplicateTo, setDuplicateTo] = React.useState( -1);
    const {editBtn, duplicateBtn, deleteBtn} = props;
    const {provided, snapshot, index} = props;

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
    });  

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

    async function duplicateLearningTask() {
        setLoadingOpen(true);
        if(duplicateTo != -1){
            var json = task;
            json['component_id'] = duplicateTo;
            json['sequence'] = course.components.find(x => x.id == duplicateTo)? course.components.find(x => x.id == duplicateTo)?.tasks.length + 1 : 999;
            
            return await apiLearningTaskPost(json)
            .then(response => {
                //load the default learning outcomes by api request
                refreshCourse();
                setLoadingOpen(false);  
                setDuplicateDialogOpen(false);  
            })
            .catch(error => console.log(error))
        }
    }

    async function deleteLearningTask() {
        setLoadingOpen(true);
        return await apiLearningTaskDelete(task.id)
        .then(response => {
            //load the default learning outcomes by api request
            refreshCourse();
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));
    }

    React.useEffect( ()=>{  
        setTask(taskData);
    }
    , [props])
    //#region init opts data

    const classTypeOtps = options.taskClassType;
    const taskClassSizeOpts = options.taskSize;
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;
    //#endregion

    
    //#region button action related
    const onClickEdit = () => {
        onEditearningTask(task);
    }

    const onClickDuplicate = () => {
        setDuplicateDialogOpen(true);
    }

    const onConfirmDuplicate = () => {
        duplicateLearningTask();
    }

    const onClickDelete = () => {
        deleteLearningTask();
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
                        {
                            editBtn == true?
                                <IconButton onClick={()=>onClickEdit()}>
                                    <EditIcon />
                                </IconButton>
                                :
                                null
                        }

                        {
                            duplicateBtn == true?
                                <IconButton onClick={()=> {onClickDuplicate()}}>
                                    <FileCopyIcon />
                                </IconButton>
                                :
                                null
                        }

                        {      
                            deleteBtn == true?
                                <IconButton onClick={()=> {setDelDialogOpen(true)}}>
                                    <DeleteIcon />
                                </IconButton>
                                :
                                null
                        }       
                       
                    </Grid>
                   
                    <Grid item xs={12} className={classes.contentGrid} data-tour="component_task_type">
                        {taskTypeOpts.find(x => x.id == task.type)?.description } 
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid} data-tour="component_task_lo">
                        <Tooltip title="Learning Outcome" aria-label="lo">
                            <AssessmentIcon />
                        </Tooltip>
                      
                       {task.assessment?.map(
                           _assessment => 
                           _assessment.description.concat(', ')
                       )}
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
        direction="row"
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

        <Dialog open={duplicateDialogOpen} onClose={()=>{setDuplicateDialogOpen(false)}}>
                <DialogTitle id="form-dialog-title">Duplicate Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select the component you wanna duplicate to.
                    </DialogContentText>
                    <Select value = {duplicateTo} onChange = {(event) => setDuplicateTo(event.target.value)} fullWidth>
                        <MenuItem value = {-1} disabled> 
                            Duplicate to component
                        </MenuItem>
                        {course.components.map(_component => 
                            <MenuItem value = {_component.id} key = {_component.id}> 
                                {_component.title}
                            </MenuItem>
                        )}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setDuplicateDialogOpen(false)}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{onConfirmDuplicate()} } color="primary">
                        Duplicate
                    </Button>
                </DialogActions>
        </Dialog>
    </Paper>
    );
}

export default LearningTaskView;
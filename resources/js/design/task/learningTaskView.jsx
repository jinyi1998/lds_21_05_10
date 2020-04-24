import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import {ContextStore} from '../../container/designContainer'

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

import config from 'react-global-configuration';
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

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
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


const LearningTaskView = (props) => {

    const classes = useStyles();

    const {taskID, taskData, onEditearningTask} = props;
    // const {onEditTasks} = props;
    const {course, options, setLoadingOpen, refreshCourse, taskTypeColor } = React.useContext(ContextStore);
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const {editBtn, duplicateBtn, deleteBtn} = props;

    const [task, setTask] = React.useState({
        id: -1,
        type: 1,
        title: "",
        assessment: [],
        time: 0,
        class_type: 1,
        target: 1,
        size: 1,
        toolid: [],
        resourceid: [],
        // STEMType: [],
        description: "",
        content: "",
    });  

    async function fetchlearningTask(id) {
        setLoadingOpen(true);
        return await fetch(
            'http://'+config.get('url')+'/api/learningTask/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setLoadingOpen(false);
            setTask(response);
          
        })
        .catch(error => console.log(error));
    }

    async function duplicateLearningTask() {
        setLoadingOpen(true);
        var json = task;
        json['component_id'] = task.componentid.component_id;
        json['sequence'] = props.lastestindex;
        return await fetch(
            'http://'+config.get('url')+'/api/learningTask/',
            {
                method: "POST",
                body:  JSON.stringify(json),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            refreshCourse();
            setLoadingOpen(false);    
        })
        .catch(error => console.log(error));
    }

    async function deleteLearningTask() {
        setLoadingOpen(true);
        return await fetch(
            'http://'+config.get('url')+'/api/learningTask/'+ task.id,
            {
            method: "DELETE",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            refreshCourse();
            setLoadingOpen(false);
        })
        .catch(error => console.log(error));
    }

    React.useEffect( ()=>{  
        // fetchlearningTask(taskID)
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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    
    //#region button action related
    const onClickEdit = () => {
        onEditearningTask(task);
    }

    const onClickDuplicate = () => {
        duplicateLearningTask();
    }

    const onClickDelete = () => {
        deleteLearningTask();
    }
    //#endregion

    const displayView = () => {
        return (
            <Grid item container spacing={4} xs={12}>
                <Grid item xs={1} height="100%">
                    <div style={taskTypeColor(task.type)}>
                    </div>
                </Grid>
                <Grid container item xs={11}>
                    <Grid item xs={8} className={classes.contentGrid}>
                        {taskTypeOpts.find(x => x.id == task.type)?.description } 
                    </Grid>
                   
                    <Grid item xs={4} className={classes.contentGrid}>
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
                   
                    <Grid item xs={12} className={classes.contentGrid}>
                        {task.title}
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid}>
                       {/* {TaskData.assessment.map(
                           _learningOutcome_id => 
                           course.learningOutcomes.find( x => x.id == _learningOutcome_id).description
                       )} */}
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        <AccessTimeIcon />{task.time} mins 
                    </Grid>

                    <Grid item xs={4} className={classes.contentGrid}>
                        <RoomIcon /> {classTypeOtps.find(x => x.id == task.class_type)?.description}
                    </Grid>

                    <Grid item xs={4} className={classes.contentGrid}>
                        <GpsNotFixedIcon />  {taskTargetOpts.find(x => x.id == task.target)?.description }
                    </Grid>

                    <Grid item xs={4} className={classes.contentGrid}>
                        <GroupIcon /> {taskClassSizeOpts.find(x => x.id == task.size)?.description } 
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        <AssignmentIcon />{task.resourceid.map(selected=> taskResouceOpts.find(x => x.id == selected.resource_id)?.description.concat(', '))}
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        <ImportantDevicesIcon /> {task.toolid.map(selected=> taskELearnResouceOpts.find(x => x.id == selected.elearningtool_id)?.description.concat(', '))} 
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid}>
                        {task.description}
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
    </Paper>
    );
}

export default LearningTaskView;
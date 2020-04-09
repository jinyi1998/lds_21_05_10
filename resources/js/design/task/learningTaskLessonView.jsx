import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {ContextStore} from '../../container/designContainer'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EditIcon from "@material-ui/icons/Edit";
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


const LearningTaskLessonView = (props) => {

    const classes = useStyles();

    const {taskID, taskData, onEditearningTask} = props;
    // const {onEditTasks} = props;
    const {error} = props;
    const {course, options, setLoadingOpen } = React.useContext(ContextStore);
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const mode = props.mode;  

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

    React.useEffect( ()=>{  
        setTask(taskData);
    }
    , [taskID, taskData])
    

    const taskTypeColor = () => {

        switch(task.type){
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
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };
    
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

    return (
    <Paper className={classes.paper}>
        <Grid container 
        spacing={2} 
        direction="row"
        justify="center"
        >   
            <Grid container item xs ={12}>
                <ExpansionPanel  style={{width: '100%'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid item container xs={12} spacing={4}>
                                <Grid item xs={1} height="100%">
                                    <div style={taskTypeColor()}>
                                    </div>
                                </Grid>
                                <Grid item xs={11} className={classes.contentGrid}>
                                    {taskTypeOpts.find(x => x.id == task.type)?.description}
                                </Grid>
                            </Grid>
                            
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid item container  xs={12} spacing={4}>
                                <Grid item xs={1} height="100%">
                                    <div style={taskTypeColor()}>
                                    </div>
                                </Grid>

                                <Grid container item xs={10}>
                                    {/* <Grid item xs={10} className={classes.contentGrid}>
                                        {task.title}
                                    </Grid>

                                    <Grid item xs={12} className={classes.contentGrid}>
                                        {task.time} mins | 
                                        {taskTargetOpts.find(x => x.id == task.target)?.description } | 
                                        {taskClassSizeOpts.find(x => x.id == task.size)?.description } | 
                                        {task.resourceid.map(selected=> taskResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
                                        {task.toolid.map(selected=> taskELearnResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
                                    </Grid>

                                    <Grid item xs={12} className={classes.contentGrid}>
                                        {task.description}
                                    </Grid> */}
                                
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

                                <Grid item xs={1} className={classes.contentGrid}>
                                        <IconButton onClick={()=>onClickEdit()}>
                                            <EditIcon />
                                        </IconButton>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>

        </Grid>
    </Paper>
    );
}

export default LearningTaskLessonView;
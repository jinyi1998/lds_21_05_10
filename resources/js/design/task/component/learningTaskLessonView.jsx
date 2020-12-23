import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import GroupIcon from '@material-ui/icons/Group';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import Tooltip from '@material-ui/core/Tooltip';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { AppContextStore } from '../../../container/app';
import { ContextStore } from '../../../container/designContainer'
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
        textAlign: 'center',
        width: '100%',
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
    const {provided, snapshot, index} = props;
    // const {onEditTasks} = props;
    const {error, editBtn} = props;
    const {course } = React.useContext(ContextStore);
    const { options, taskTypeColor} = React.useContext(AppContextStore);
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
        component: {},
        pattern: {component: {}},
        // STEMType: [],
        description: "",
        content: "",
    });  

    React.useEffect( ()=>{  
        setTask(taskData);
    }
    , [taskID, taskData])

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
        duplicateLearningTask();
    }

    const onClickDelete = () => {
        deleteLearningTask();
    }
    //#endregion

    return (
    <div >
        <Grid 
            container 
            spacing={2} 
            direction="row"
            justify="center"
            ref = {provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
        >   
            <Grid container item xs ={1} justify="center" alignItems="center">
                <DragHandleIcon />
            </Grid>

            <Grid container item xs ={11}>
                <Accordion  style={{width: '100%'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid item container xs={12} spacing={4}>
                                <Grid item xs={1} height="100%">
                                    <div style={taskTypeColor(task.type)}>
                                    </div>
                                </Grid>
                                <Grid item xs={11} className={classes.contentGrid}>
                                    <Typography variant="subtitle1" gutterBottom style={{fontWeight: '600'}}>
                                        Component #
                                        {(task.component == null? 
                                            (task.pattern.component.sequence? task.pattern.component.sequence : null) 
                                            :(task.component.sequence? task.component.sequence: null) 
                                        )} - {task.title}
                                    </Typography>
                                  
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item container  xs={12} spacing={4}>
                                <Grid item xs={1} height="100%">
                                    <div style={taskTypeColor(task.type)}>
                                    </div>
                                </Grid>

                                <Grid container item xs={10}>
                                
                                    <Grid item xs={12} className={classes.contentGrid}>
                                        {taskTypeOpts.find(x => x.id == task.type)?.description}
                                    </Grid>
                                    
                                    <Grid item xs={12} className={classes.contentGrid}>
                                    {/* {TaskData.assessment.map(
                                        _learningOutcome_id => 
                                        course.learningOutcomes.find( x => x.id == _learningOutcome_id).description
                                    )} */}
                                    </Grid>

                                    <Grid item xs={3} className={classes.contentGrid}>
                                        <Tooltip title="Task Time" aria-label="time">
                                            <AccessTimeIcon />
                                        </Tooltip>
                                        {task.time} mins 
                                    </Grid>

                                    <Grid item xs={3} className={classes.contentGrid}>
                                        <Tooltip title="Class Type" aria-label="classtype">
                                            <RoomIcon /> 
                                        </Tooltip>
                                        {classTypeOtps.find(x => x.id == task.class_type)?.description}
                                    </Grid>

                                    <Grid item xs={3} className={classes.contentGrid}>
                                        <Tooltip title="Class Target" aria-label="classtarget">
                                            <GpsNotFixedIcon /> 
                                        </Tooltip>
                                        {taskTargetOpts.find(x => x.id == task.target)?.description }
                                    </Grid>

                                    <Grid item xs={3} className={classes.contentGrid}>
                                        <Tooltip title="Class Size" aria-label="classtarget">
                                            <GroupIcon /> 
                                        </Tooltip>
                                        {taskClassSizeOpts.find(x => x.id == task.size)?.description } 
                                    </Grid>

                                    <Grid item xs={6} className={classes.contentGrid}>
                                        <Tooltip title="Resource" aria-label="classtarget">
                                            <AssignmentIcon />
                                        </Tooltip>  
                                        {task.resourceid.length == 0? "N/A" : task.resourceid.map(selected=> taskResouceOpts.find(x => x.id == selected.resource_id)?.description.concat(', '))}
                                    </Grid>

                                    <Grid item xs={6} className={classes.contentGrid}>
                                        <Tooltip title="E-Learning Tools" aria-label="classtarget">
                                            <ImportantDevicesIcon /> 
                                        </Tooltip>  
                                        {task.toolid.length == 0? "N/A" : task.toolid.map(selected=> taskELearnResouceOpts.find(x => x.id == selected.elearningtool_id)?.description.concat(', '))} 
                                    </Grid>
                                    
                                    <Grid item xs={12} className={classes.contentGrid}>
                                        <Typography color = "textSecondary" gutterBottom>
                                            {task.description}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs={1} className={classes.contentGrid}>
                                        {
                                            editBtn? 
                                            <IconButton onClick={()=>onClickEdit()}>
                                                <EditIcon />
                                            </IconButton>
                                            :
                                            null
                                        }
                                       
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                </Accordion>
            </Grid>

        </Grid>
    </div>
    );
}

export default LearningTaskLessonView;
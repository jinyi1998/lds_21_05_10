import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import {ContextStore} from '../container/designContainer'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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


const ComponentTask = (props) => {

    const classes = useStyles();

    const {TaskData} = props; //Task data to init the task
    const {componentData} = props; //to get learning outcome from the parent component
    const {handleTaskUpdate} = props; //handleTask Update callback
    const {index} = props; // component index?
    const {onEditTasks} = props;
    const { course, dispatch, options } = React.useContext(ContextStore);
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const mode = props.mode;  

    const [task, setTask] = React.useState({
        id: TaskData.id? TaskData.id: -1,
        type: TaskData.type? TaskData.type: "",
        title: TaskData.title? TaskData.title: "",
        assessment: TaskData.assessment? TaskData.assessment: [],
        time: TaskData.time? TaskData.time: 0,
        classType: TaskData.classType? TaskData.classType: "",
        target: TaskData.target? TaskData.target: "",
        size: TaskData.size? TaskData.size: "",
        resource: TaskData.resource? TaskData.resource : [],
        e_resource: TaskData.e_resource? TaskData.e_resource: [],
        // STEMType: TaskData.STEMType? TaskData.STEMType : [],
        description: TaskData.description? TaskData.description: "",
        content: TaskData.content? TaskData.content: "",
    });  

    const [isAssessment, setAssessment] = React.useState(
        (TaskData.assessment?.length > 0)? true: false
    );

    const onChangeIsAssessment = () => {
        setAssessment(!isAssessment);
        if(isAssessment == false){
            task.assessment = [];
        }
    }

    const handleChangeMultiple = event => {
        switch (event.target.name){
            default:
                setTask({...task, assessment: event.target.value});
                break;
            case "resource":
                setTask({...task, resource: event.target.value});
                break;
            case "e-resource":
                setTask({...task, e_resource: event.target.value});
                break;
            // case "STEMType":
            //     setTask({...task, STEMType: event.target.value});
            //     break;
        }
       
    };

    const handleChange = event => {
        switch (event.target.name){
            default:
                break;
            case "type":
                setTask({...task, type: event.target.value});
                break;
            case "time":
                setTask({...task, time: event.target.value});
                break;
            case "classType":
                setTask({...task, classType: event.target.value});
                break;
            case "target":
                setTask({...task, target: event.target.value});
                break;
            case "size":
                setTask({...task, size: event.target.value});
                break;
            case "title":
                setTask({...task, title: event.target.value});
                break;
            case "description":
                setTask({...task, description: event.target.value});
                break;
            case "content":
                setTask({...task, content: event.target.value});
                break;
        }
    }

    React.useEffect(()=>{
       if(typeof handleTaskUpdate == 'function'){
            handleTaskUpdate(task, index);
       }
    },[task]);

    const taskTypeColor = () => {

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
        onEditTasks();
    }

    const onClickDuplicate = () => {
        var test = task;
        test.id = componentData.tasks.length + 1;
        test.componentid = componentData.id;
        dispatch({
            type: "ADD_LEARNINGTASK",
            value: test
        })
    }

    const onClickDelete = () => {
        var test = {
            "componentid" : componentData.id,
            "taskid": task.id,
        };
        dispatch({
            type: "DELETE_LEARNINGTASK",
            value: test
        })
    }
    //#endregion

    const displayView = () => {
        return (
            <Grid item container spacing={4} xs={12}>
                <Grid item xs={1} height="100%">
                    <div style={taskTypeColor()}>
                    </div>
                </Grid>
                <Grid container item xs={11}>
                    <Grid item xs={8} className={classes.contentGrid}>
                        {taskTypeOpts.find(x => x.id == TaskData.type)?.description } 
                    </Grid>
                    { (mode == 'view')?
                        <Grid item xs={4} className={classes.contentGrid}>
                            <IconButton onClick={onClickEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={()=> {onClickDuplicate()}}>
                                <FileCopyIcon />
                            </IconButton>
                            <IconButton onClick={()=> {setDelDialogOpen(true)}}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        : 
                        null
                    }
                   
                    <Grid item xs={12} className={classes.contentGrid}>
                        {TaskData.title}
                    </Grid>
                    
                    <Grid item xs={12} className={classes.contentGrid}>
                       {TaskData.assessment.map(
                           _learningOutcome_id => 
                           course.learningOutcomes.find( x => x.id == _learningOutcome_id).description
                       )}
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        {TaskData.time} mins | 
                        {taskTargetOpts.find(x => x.id == TaskData.target)?.description } | 
                        {taskTargetOpts.find(x => x.id == TaskData.size)?.description } | 
                        {TaskData.resource.map(selected=> taskResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
                        {TaskData.e_resource.map(selected=> taskELearnResouceOpts.find(x => x.id == selected)?.description.concat(','))} |
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
        );
    }

    const displayLessonView = () => {
        return (
            <Grid container item xs ={12}>
                <ExpansionPanel>
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
                                    {taskTypeOpts.find(x => x.id == TaskData.type)?.description}
                                </Grid>
                            </Grid>
                            
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid item container  xs={12} spacing={4}>
                                <Grid item xs={1} height="100%">
                                    <div style={taskTypeColor()}>
                                    </div>
                                </Grid>
                                <Grid container item xs={11}>
                                    <Grid item xs={8} className={classes.contentGrid}>
                                        {TaskData.title}
                                    </Grid>

                                    <Grid item xs={4} className={classes.contentGrid}>
                                        <IconButton onClick={onClickEdit}>
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid item xs={12} className={classes.contentGrid}>
                                        {TaskData.time} mins | 
                                        {taskTargetOpts.find(x => x.id == TaskData.target)?.description } | 
                                        {taskClassSizeOpts.find(x => x.id == TaskData.size)?.description } | 
                                        {TaskData.resource.map(selected=> taskResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
                                        {TaskData.e_resource.map(selected=> taskELearnResouceOpts.find(x => x.id == selected)?.description.concat(','))} | 
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
                        </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        )
    }

    const displayAssessment = () => {
        if(isAssessment){
            return (
                <Grid item xs={12} className={classes.contentGrid}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id={"assessment-"+ index+"-label"}>Assessment</InputLabel>
                    <Select
                        labelId={"assessment-"+ index+"-label"}
                        id={"assessment-"+ index}
                        multiple
                        defaultValue = ''
                        value = {task.assessment}
                        fullWidth
                        onChange={handleChangeMultiple}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={course.learningOutcomes.find(x=> x.id == value).description} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                    {componentData.learningOutcomes.map((_learningOutcome, index) => (                             
                        <MenuItem key={_learningOutcome} value= {course.learningOutcomes.find(x=> x.id == _learningOutcome).id}>
                            {course.learningOutcomes.find(x=> x.id == _learningOutcome).description}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
            );
        }
    }

    const displayEdit = () => {
        return (
            <React.Fragment>
            <Grid item xs={3}>
                <Grid container spacing={4}>
                    <Grid item xs={12} className={classes.contentGrid}>
                        <TextField id={"time-"+ index} label="Minutes" variant="filled" value={task.time} name="time" onChange={handleChange}/>
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControlLabel
                            control={<Checkbox 
                                checked={isAssessment} 
                                onChange={() => onChangeIsAssessment()} 
                                value="Assessment" />}
                            label="Have Assessment?"
                        />
                    </Grid>
                    {/* assessment */}
                    {displayAssessment()}
                   
                    {/* classtype */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel  id={"classType-"+ index + "-label"}>
                                Place
                            </InputLabel>
                            <Select
                            labelId={"classType-"+ index + "-label"}
                            id={"classType-"+ index}
                            name="classType"
                            value={task.classType}
                            onChange={handleChange}
                            renderValue={selected => (
                                classTypeOtps.find(x => x.id == selected)?.description
                            )}
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {classTypeOtps.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* target */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel  id={"target-"+ index + "-label"}>
                                Class Type
                            </InputLabel>
                            <Select
                            labelId={"target-"+ index + "-label"}
                            id={"target-"+index}
                            name="target"
                            value={task.target}
                            onChange={handleChange}
                            renderValue={selected => (
                                taskTargetOpts.find(x => x.id == selected)?.description
                            )}
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {taskTargetOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* claassize */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel  id={"size-"+index+"-label"}>
                                Size
                            </InputLabel>
                            <Select
                            labelId={"size-"+index+"-label"}
                            id={"size-"+ index}
                            name="size"
                            value={task.size}
                            onChange={handleChange}
                            renderValue={selected => (
                                taskClassSizeOpts.find(x => x.id == selected)?.description
                            )}
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {taskClassSizeOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Resource */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id = {"resource-"+ index + "-lebal"}>Resource</InputLabel>
                            <Select
                                labelId = {"resource-"+ index + "-lebal"}
                                id = {"resource-"+ index}
                                multiple
                                defaultValue = ''
                                value = {task.resource}
                                fullWidth
                                name = "resource"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"resource-"+ index} />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={taskResouceOpts.find(x=>x.id == value)?.description} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {taskResouceOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* E-Resource */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id = {"e-resource-"+ index + "-lebal"}>E-Learning-Tools</InputLabel>
                            <Select
                                labelId = {"e-resource-"+ index + "-lebal"}
                                id = {"e-resource-"+ index}
                                multiple
                                defaultValue = ''
                                value = {task.e_resource}
                                fullWidth
                                name = "e-resource"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"e-resource-"+ index} />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={taskELearnResouceOpts.find(x=> x.id == value).description} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {taskELearnResouceOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* STEM */}
                    {/* <Grid item xs={12} className={classes.contentGrid}>
                    <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id={"STEMType-"+ index +"-label"}>STEM Type</InputLabel>
                            <Select
                                labelId = {"STEMType-"+ index +"-label"}
                                id = {"STEMType-"+ index }
                                multiple
                                defaultValue = ''
                                value = {task.STEMType}
                                name = "STEMType"
                                fullWidth
                                onChange={handleChangeMultiple}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="Science">
                                    Science
                                </MenuItem>
                                <MenuItem value="Technology">
                                    Technology
                                </MenuItem>
                                <MenuItem value="Engineering">
                                    Engineering
                                </MenuItem>
                                <MenuItem value="Mathematics">
                                    Mathematics
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                </Grid>
            </Grid>

            <Grid item xs={1} height="100%">
                <div style={taskTypeColor()}>
                </div>
            </Grid>

            <Grid item xs={8}>
            <Grid container  spacing={4}>
                <Grid item xs={8} className={classes.contentGrid}> 
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel  id={"type-"+ index +"-label"}>
                            Type
                        </InputLabel>
                        <Select
                        labelId={"type-"+ index +"-label"}
                        id= {"type-"+index}
                        name="type"
                        value={task.type}
                        onChange={handleChange}
                        renderValue={selected => (
                            taskTypeOpts.find(x => x.id==selected)?.description
                        )}
                        >
                        {taskTypeOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
               
                {/* duplicate | delete */}
                    {(mode == "edit")? 
                        <Grid item xs={4} className={classes.contentGrid}> 
                            <IconButton onClick={()=> {onClickDuplicate(task.id)}}>
                                <FileCopyIcon />
                            </IconButton>
                            <IconButton onClick={()=> {onClickDelete(task.id)}}>
                                <DeleteIcon />
                            </IconButton> 
                        </Grid>
                        :
                        null
                    }
                <Grid item xs={12} className={classes.contentGrid}>
                    <TextField id={"title-"+ index} name="title" label="title" variant="filled" onChange={handleChange} value={task.title} fullWidth/>
                </Grid>
                <Grid item xs={12} className={classes.contentGrid}>
                    <TextField id={"description-" + index} name="description" label="description" variant="filled" onChange={handleChange} value={task.description} fullWidth/>
                </Grid>

                {/* <Grid item xs={12} className={classes.contentGrid}>
                    <TextField id={"content-" + index} name="content" label="content" variant="filled" onChange={handleChange} value={task.content} fullWidth/>
                </Grid> */}
            </Grid>
        </Grid>
        </React.Fragment>
        );
    }

    const display = () => {
        switch (mode){
            case "view":
            case "lesson_select":
                return displayView()
                break;
            default:
            case "lesson_edit":
            case "edit":
                return displayEdit()
                break;
            case "lesson_view":
                return displayLessonView();
                break;
        }
    }


    return (
    <Paper className={classes.paper}>
        <Grid container 
        spacing={2} 
        direction="row"
        justify="center"
        >   
            {
                display()
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

export default ComponentTask;
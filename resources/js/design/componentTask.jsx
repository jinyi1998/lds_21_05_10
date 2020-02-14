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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import {ContextStore} from '../container/designContainer'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    color:{
        backgroundColor: "#de5995",
        height: "100%"
    },
  }));


const ComponentTask = (props) => {

    const classes = useStyles();

    const {TaskData} = props; //Task data to init the task
    const {componentData} = props; //to get learning outcome from the parent component
    const {handleTaskUpdate} = props; //handleTask Update callback
    const {index} = props; // component index?
    const {onEditTasks} = props;
    const { course, dispatch } = React.useContext(ContextStore);
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);

    const [mode, setMode] = React.useState(props.mode);  

    const [task, setTask] = React.useState({
        id: TaskData.id? TaskData.id: -1,
        type: TaskData.type? TaskData.type: "",
        title: TaskData.title? TaskData.title: "",
        assessment: TaskData.learningOutcomes? TaskData.assessment: [],
        time: TaskData.time? TaskData.time: 0,
        classType: TaskData.classType? TaskData.classType: "",
        target: TaskData.target? TaskData.target: "",
        size: TaskData.size? TaskData.size: "",
        resource: TaskData.resource? TaskData.resource : [],
        STEMType: TaskData.STEMType? TaskData.STEMType : [],
        description: TaskData.description? TaskData.description: "",
    });  

    const handleChangeMultiple = event => {
        switch (event.target.name){
            default:
                setTask({...task, assessment: event.target.value});
                break;
            case "resource":
                setTask({...task, resource: event.target.value});
                break;
            case "STEMType":
                setTask({...task, STEMType: event.target.value});
                break;
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
        }
    }
    
    React.useEffect(()=>{
       if(typeof handleTaskUpdate == 'function'){
            handleTaskUpdate(task, index);
       }
    },[task]);

    //#region init opts data
    const [classTypeOtps, setClassTypeOtps] = React.useState([{"id":1,"value":"In Class","description":"In Class"},{"id":2,"value":"Out Class","description":"Out Class"}]); 
    async function fetchClassTypeData() {
  
      const res = await fetch(
          `http://localhost:8000/api/learningTask/getTaskClassTypeOption`,
          {
          method: "GET",
          }
      )
          .then(res => res.json())
          .then(response => {
            setClassTypeOtps(response);
      })
      .catch(error => console.log(error));
    }
    const [taskClassSizeOpts, setTaskClassSizeOpts] = React.useState([{"id":1,"value":1,"description":"Whole Class"},{"id":2,"value":2,"description":"6 per group"},{"id":3,"value":3,"description":"5 per group"},{"id":4,"value":4,"description":"4 per group"},{"id":5,"value":5,"description":"3 per group"},{"id":6,"value":6,"description":"2 per group"},{"id":7,"value":7,"description":"individual"}]);
    async function fetchClassSizeData() {
  
        const res = await fetch(
            `http://localhost:8000/api/learningTask/getTaskSizeOption`,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setTaskClassSizeOpts(response);
        })
        .catch(error => console.log(error));
      }

    const [taskTargetOpts, setTaskTargetOtps] = React.useState([{"id":1,"value":"Whole Class","description":"Whole Class"},{"id":2,"value":"6 per group","description":"6 per group"},{"id":3,"value":"5 per group","description":"5 per group"},{"id":4,"value":"4 per group","description":"4 per group"},{"id":5,"value":"3 per group","description":"3 per group"},{"id":6,"value":"2 per group","description":"2 per group"},{"id":7,"value":"individual","description":"individual"}]);
    async function fetchTaskTargetData() {
  
        const res = await fetch(
            `http://localhost:8000/api/learningTask/getTaskTargetTypeOption`,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setTaskTargetOtps(response);
        })
        .catch(error => console.log(error));
      }

    const [taskResouceOpts, setTaskResouceOpts] = React.useState([{"id":1,"value":"Youtube","description":"Youtube"},{"id":2,"value":"Facebook","description":"Facebook"},{"id":3,"value":"Telegram","description":"Telegram"},{"id":4,"value":"Wiki","description":"Wikipedia"},{"id":5,"value":"textbook","description":"Textbook"},{"id":6,"value":"lihkg","description":"lihkg"}]);
    async function fetchTaskResourceData() {
  
        const res = await fetch(
            `http://localhost:8000/api/learningTask/getTaskResourceTypeOption`,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setTaskResouceOpts(response);
        })
        .catch(error => console.log(error));
      }
    

    // React.useEffect(() => {
    //     if(classTypeOtps.length == 0){
    //         fetchClassTypeData();
    //     }
    //     if(taskClassSizeOpts.length == 0){
    //         fetchClassSizeData();
    //     }
    //     if(taskTargetOpts.length == 0){
    //         fetchTaskTargetData();
    //     }
    //     if(taskResouceOpts.length == 0){
    //         fetchTaskResourceData();
    //     }
    // }, []);
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
                    <div className={classes.color}>
                    </div>
                </Grid>
                <Grid container item xs={11}>
                    <Grid item xs={8} className={classes.contentGrid}>
                        {TaskData.type}
                    </Grid>
                    <Grid item xs={4} className={classes.contentGrid}>
                        {/* <a href="#" onClick={onClickEdit}>edit </a> | 
                        <a href="#" onClick={()=> {onClickDuplicate(task.id)}}>duplicate </a>  |
                        <a href="#" onClick={()=> {onClickDelete(task.id)}}>delete </a>    */}

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
                        {TaskData.time} mins | {TaskData.target} | {TaskData.classType} | {TaskData.resource.map(_learningOutcome=> _learningOutcome)} 
                        | {TaskData.STEMType.map(_STEMType => _STEMType)}
                    </Grid>

                    <Grid item xs={12} className={classes.contentGrid}>
                        {TaskData.description}
                    </Grid>

                </Grid>
            </Grid>
        );
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
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {classTypeOtps.map(_opts =>  <MenuItem value={_opts.value} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
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
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {taskTargetOpts.map(_opts =>  <MenuItem value={_opts.value} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
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
                            >
                            <MenuItem value="" disabled>
                                <em>None</em>
                            </MenuItem>
                            {taskClassSizeOpts.map(_opts =>  <MenuItem value={_opts.value} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
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
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {taskResouceOpts.map(_opts =>  <MenuItem value={_opts.value} key={_opts.id}>{_opts.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.contentGrid}>
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
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} height="100%">
                <div className={classes.color}>
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
                        >
                        <MenuItem value="" disabled>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Discuss">Discuss</MenuItem>
                        <MenuItem value="Receive Infomation">Receive infomation</MenuItem>
                        <MenuItem value="Reading">Reading</MenuItem>
                        <MenuItem value="Writing">Writing</MenuItem>
                        <MenuItem value="Youtube">Youtube</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} className={classes.contentGrid}> 
                {/* duplicate | delete */}
                    <IconButton onClick={()=> {onClickDuplicate(task.id)}}>
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton onClick={()=> {onClickDelete(task.id)}}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={12} className={classes.contentGrid}>
                    <TextField id={"title-"+ index} name="title" label="title" variant="filled" onChange={handleChange} value={task.title} fullWidth/>
                </Grid>
                <Grid item xs={12} className={classes.contentGrid}>
                    <TextField id={"description-" + index} name="description" label="description" variant="filled" onChange={handleChange} value={task.description} fullWidth/>
                </Grid>
            </Grid>
        </Grid>
        </React.Fragment>
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
             (mode==="view") ?
                displayView()
            :
                displayEdit()
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
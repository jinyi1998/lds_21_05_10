import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormHelperText from '@material-ui/core/FormHelperText';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {AppContextStore} from '../../../container/app';

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



  const TaskTemplateEditView = (props) => {
    const classes = useStyles();
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

    const {options,  taskTypeColor } = React.useContext(AppContextStore);
    const {taskData, error,  syncTask, taskID} = props;
    const [task, setTask] = React.useState({
        id: -999,
        type: 1,
        title: "",
        assessmentid: [],
        time: 0,
        class_type: 1,
        target: 1,
        size: 1,
        toolid: [],
        resourceid: [],
        // STEMType: [],
        description: "",
        has_assessment: false
    });  
    const [tool, setTool] = React.useState([])
    const [resource, setResource] = React.useState([])
    const [hasAssessment, setHasAssessment] = React.useState(false);

    React.useEffect( ()=>{  
        // fetchlearningTask(task.id)
        if(taskID == -1){
            //new task
            setTask({...task, id: -1});
        }else{
            var toolData = taskData.toolid.map( _tool => {return _tool.elearningtool_id});
            setTool(toolData);
            var resourceData = taskData.resourceid.map( _resource => {return _resource.resource_id});
            setResource(resourceData);
            setHasAssessment(taskData.has_assessment);
            setTask(taskData);
        }

        var temp = options.taskSize;
        if(taskID == -1){
            if(task.target == 1 ){
                temp = temp.filter(x => x.id == 1)
            }else if(task.target == 3){
                temp = temp.filter(x => x.id == 7)
            }else{
                temp = temp.filter(x => ![1,7].includes(x.id))
            }
        }else{
            if(taskData.target == 1 ){
                temp = temp.filter(x => x.id == 1)
            }else if(taskData.target == 3){
                temp = temp.filter(x => x.id == 7)
            }else{
                temp = temp.filter(x => ![1,7].includes(x.id)) 
            }
        }
      
        setTaskClassSizeOpts(temp)
    }
    , [taskID])

    React.useEffect( ()=>{  
        // update the original toolid 
        if(task.id != -999){
            var toolid = {}
            toolid =  tool.map(_tool => {
                return {"elearningtool_id": _tool, "learningtask_id": task.id}
            })
            setTask({...task, toolid: toolid});
        }
    }
    , [tool])

    React.useEffect( ()=>{  
         // update the original resourceid
         if(task.id != -999){
            var resourceid = {}
            resourceid =  resource.map(_resource => {
                return {"resource_id": _resource, "learningtask_id": task.id}
            })
            setTask({...task, resourceid: resourceid});
        }
    }
    , [resource])

    React.useEffect( ()=>{  
        // update the original resourceid
        if(task.id != -999){
        
           setTask({...task, has_assessment: hasAssessment});
       }
   }
   , [hasAssessment])

    React.useEffect(()=>{
        if(task.id != -999){
            syncTask(task);
        }
    },[task])

    const handleChangeMultiple = event => {
        switch (event.target.name){
            default:
            case "assessment":
                setAssessment(event.target.value);
                break;
            case "resource":
                setResource(event.target.value);
                break;
            case "e-resource":
                setTool(event.target.value);
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
            case "class_type":
                setTask({...task, class_type: event.target.value});
                break;
            case "target":
                var temp = options.taskSize;
                if(event.target.value == 1 ){
                    temp = temp.filter(x => x.id == 1)
                }else if(event.target.value == 3){
                    temp = temp.filter(x => x.id == 7)
                }else{
                    temp = temp.filter(x => ![1,7].includes(x.id))
                }
                setTaskClassSizeOpts(temp)
                setTask({...task, size: temp[0].id, target: event.target.value});
                // setTask({...task, target: event.target.value});
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

    const onChangeIsAssessment = (event) => {
        setHasAssessment(!hasAssessment);
    }
    
    const classTypeOtps = options.taskClassType;
    const [taskClassSizeOpts, setTaskClassSizeOpts] = React.useState(options.taskSize);
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;

    return (
        <Paper className={classes.paper}>
            <Grid container 
            spacing={2} 
            direction="row"
            justify="center"
            >   
                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.contentGrid}>
                            <TextField 
                            id={"time-"+ task.id} 
                            label="Minutes" 
                            variant="filled" 
                            value={task.time} 
                            type="number"
                            name="time" 
                            onChange={handleChange}
                            error = {! (error["time"]=="")}
                            helperText= {! (error["time"]=="")? error["time"]:  ""}
                            />
                        </Grid>
                        <React.Fragment>
                            <Grid item xs={12} className={classes.contentGrid}>
                                <FormControlLabel
                                    control={<Checkbox 
                                        checked={hasAssessment} 
                                        onChange={onChangeIsAssessment} 
                                        value="Assessment" />}
                                    label="Have Assessment?"
                                />
                            </Grid>
                        </React.Fragment>
                       
                        {/* classtype */}
                        <Grid item xs={12} className={classes.contentGrid}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["classType"]=="")} margin='dense'>
                                <InputLabel  id={"classType-"+ task.id+ "-label"}>
                                    Class Type
                                </InputLabel>
                                <Select
                                labelId={"classType-"+ task.id+ "-label"}
                                id={"classType-"+ task.id}
                                name="class_type"
                                value={task.class_type}
                                size = "small"
                                onChange={handleChange}
                                renderValue={selected => (
                                    classTypeOtps.find(x => x.id == selected)?.description
                                )}
                                >
                                    <MenuItem value={-1} disabled>
                                        <em>Please select the class type</em>
                                    </MenuItem>
                                    {classTypeOtps.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                                </Select>
    
                                <FormHelperText>
                                   {! (error["classType"]=="")? error["classType"]:  ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* target */}
                        <Grid item xs={12} className={classes.contentGrid}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["target"]=="")} margin='dense'>
                                <InputLabel  id={"target-"+ task.id+ "-label"}>
                                    Class Target
                                </InputLabel>
                                <Select
                                labelId={"target-"+ task.id+ "-label"}
                                id={"target-"+task.id}
                                name="target"
                                size="small"
                                value={task.target}
                                onChange={handleChange}
                                renderValue={selected => (
                                    taskTargetOpts.find(x => x.id == selected)?.description
                                )}
                                >
                                    <MenuItem value={-1} disabled>
                                        <em>Please select the class target</em>
                                    </MenuItem>
                                    {taskTargetOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                                </Select>
                                <FormHelperText>
                                    {! (error["target"]=="")? error["target"]:  ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* claassize */}
                        <Grid item xs={12} className={classes.contentGrid}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["size"]=="")} margin='dense'>
                                <InputLabel  id={"size-"+task.id+"-label"}>
                                    Size
                                </InputLabel>
                                <Select
                                labelId={"size-"+task.id+"-label"}
                                id={"size-"+ task.id}
                                name="size"
                                size="small"
                                value={task.size}
                                onChange={handleChange}
                                renderValue={selected => (
                                    taskClassSizeOpts.find(x => x.id == selected)?.description
                                )}
                                >
                                    <MenuItem value={-1} disabled>
                                        <em>Please select the class size</em>
                                    </MenuItem>
                                    {taskClassSizeOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                                </Select>
                                <FormHelperText>
                                    {! (error["size"]=="")? error["size"]:  ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* Resource */}
                        <Grid item xs={12} className={classes.contentGrid}>
                            <FormControl className={classes.formControl} fullWidth margin='dense'>
                                <InputLabel id = {"resource-"+ task.id+ "-lebal"}>Resource(s)</InputLabel>
                                <Select
                                    labelId = {"resource-"+ task.id+ "-lebal"}
                                    id = {"resource-"+ task.id}
                                    multiple
                                    value = {resource}
                                    fullWidth
                                    name = "resource"
                                    onChange={handleChangeMultiple}
                                    input = {<Input id={"resource-"+ task.id} />}
                                    size = "small"
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
                                <FormHelperText>
                                   You can select one or more resource(s)
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* E-Resource */}
                        <Grid item xs={12} className={classes.contentGrid}>
                            <FormControl className={classes.formControl} fullWidth margin='dense'>
                                <InputLabel id = {"e-resource-"+ task.id+ "-lebal"}>E-Learning-Tool(s)</InputLabel>
                                <Select
                                    labelId = {"e-resource-"+ task.id+ "-lebal"}
                                    id = {"e-resource-"+ task.id}
                                    multiple
                                    value = {tool}
                                    fullWidth
                                    name = "e-resource"
                                    size = "small"
                                    onChange={handleChangeMultiple}
                                    input = {<Input id={"e-resource-"+ task.id} />}
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
                                <FormHelperText>
                                   You can select one or more e-learning tool(s)
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
    
                <Grid item xs={1} height="100%">
                    <div style={taskTypeColor(task.type)}>
                    </div>
                </Grid>
    
                <Grid item xs={8}>
                    <Grid container  spacing={4}>
                        <Grid item xs={8} className={classes.contentGrid}> 
                            <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["type"]=="")}>
                                <InputLabel  id={"type-"+ task.id+"-label"}>
                                    Type
                                </InputLabel>
                                <Select
                                labelId={"type-"+ task.id+"-label"}
                                id= {"type-"+task.id}
                                name="type"
                                value={task.type}
                                onChange={handleChange}
                                renderValue={selected => (
                                    taskTypeOpts.find(x => x.id==selected)?.description
                                )}
                                >
                                    {taskTypeOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.description}</MenuItem>)}
                                </Select>
                                <FormHelperText>
                                        {! (error["type"]=="")? error["type"]:  ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    
                        <Grid item xs={12} className={classes.contentGrid}>
                            <TextField 
                            id={"title-"+ task.id} 
                            name="title" 
                            label="Title" 
                            variant="filled" 
                            onChange={handleChange} 
                            value={task.title} 
                            error = {! (error["title"]=="")}
                            helperText= {! (error["title"]=="")? error["title"]:  ""}
                            multiline
                            fullWidth/>
                        </Grid>
                        <Grid item xs={12} className={classes.contentGrid}>
                            <TextField 
                            id={"description-" + task.id} 
                            name="description" 
                            label="Description" 
                            variant="filled" 
                            onChange={handleChange} 
                            value={task.description} 
                            error = {! (error["description"]=="")}
                            helperText= {! (error["description"]=="")? error["description"]:  ""}
                            multiline
                            fullWidth/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        );


  }

  export default TaskTemplateEditView;
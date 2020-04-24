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
import Checkbox from '@material-ui/core/Checkbox';
import {ContextStore} from '../../container/designContainer'
import {ComponentContext} from '../component/componentContainer';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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


const LearningTaskEditView = (props) => {

    const classes = useStyles();

    const {taskID, taskData, syncTask, showAssessment} = props;
    const {error} = props;
    const {course, options, setLoadingOpen, taskTypeColor } = React.useContext(ContextStore);
    const { component } = React.useContext(ComponentContext);

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
    });  

    const [tool, setTool] = React.useState([])
    const [resource, setResource] = React.useState([])
    const [assessment, setAssessment] = React.useState([])

    // async function fetchlearningTask(id) {
    //     setLoadingOpen(true);
    //     return await fetch(
    //         'http://'+config.get('url')+'/api/learningTask/'+ id,
    //         {
    //         method: "GET",
    //         }
    //     )
    //     .then(res => res.json())
    //     .then(response => {
    //         //load the default learning outcomes by api request
    //         setLoadingOpen(false);
    //         setTask(response);
          
    //     })
    //     .catch(error => console.log(error));
    // }

    React.useEffect( ()=>{  
        // fetchlearningTask(taskID)
        if(taskID == -1){
            //new task
            setTask({...task, id: -1});
        }else{
            var toolData = taskData.toolid.map( _tool => {return _tool.elearningtool_id});
            setTool(toolData);
            var resourceData = taskData.resourceid.map( _resource => {return _resource.resource_id});
            setResource(resourceData);
            if(showAssessment){
                var hasAssessment = (taskData.assessmentid?.length > 0)? true: false
                setHasAssessment(hasAssessment);
                var assessmentData = taskData.assessmentid.map( _assessment => {return _assessment.learningoutcome_id});
                setAssessment(assessmentData);
            }
         
            setTask(taskData);
            // setTask({...task, id: -1});
            // console.log(taskData);
        }
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
        // update the original learningoutcome
        if(task.id != -999 && showAssessment){
           var assessmentid = {}
           assessmentid =  assessment.map(_assessment => {
               return {"learningoutcome_id": _assessment, "learningtask_id": task.id}
           })
           setTask({...task, assessmentid: assessmentid});
       }
   }
   , [assessment])



    React.useEffect(()=>{
        if(task.id != -999){
            syncTask(task);
        }
    },[task])
    
    const [hasAssessment, setHasAssessment] = React.useState(
       true
    );


    const onChangeIsAssessment = () => {
        setHasAssessment(!hasAssessment);
        if(hasAssessment == false){
            setAssessment([]);
        }
    }

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


    const displayAssessment = () => {
        if(hasAssessment){
            return (
                <Grid item xs={12} className={classes.contentGrid}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id={"assessment-"+ taskID+"-label"}>Assessment</InputLabel>
                    <Select
                        labelId={"assessment-"+ taskID+"-label"}
                        id={"assessment-"+ taskID}
                        name = "assessment"
                        multiple
                        defaultValue = ''
                        value = {assessment}
                        fullWidth
                        onChange={handleChangeMultiple}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={component.outcomes.find(x=> x.id == value).description} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {component.outcomes.map(_outcome => (
                            <MenuItem key={_outcome.id} value= {_outcome.id}>
                              {_outcome.description}
                          </MenuItem>
                        ))}
                    {/* {componentData.learningOutcomes.map((_learningOutcome, index) => (                             
                        <MenuItem key={_learningOutcome} value= {course.learningOutcomes.find(x=> x.id == _learningOutcome).id}>
                            {course.learningOutcomes.find(x=> x.id == _learningOutcome).description}
                        </MenuItem>
                    ))} */}
                    </Select>
                </FormControl>
            </Grid>
            );
        }
    }


    return (
    <Paper className={classes.paper}>
        <Grid container 
        spacing={2} 
        direction="row"
        justify="center"
        >   
            <Grid item xs={3}>
                <Grid container spacing={4}>
                    <Grid item xs={12} className={classes.contentGrid}>
                        <TextField 
                        id={"time-"+ taskID} 
                        label="Minutes" 
                        variant="filled" 
                        value={task.time} 
                        name="time" 
                        onChange={handleChange}
                        error = {! (error["time"]=="")}
                        helperText= {! (error["time"]=="")? error["time"]:  ""}
                        />
                    </Grid>
                    {
                        showAssessment == true?
                            <React.Fragment>
                                <Grid item xs={12} className={classes.contentGrid}>
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={hasAssessment} 
                                            onChange={() => onChangeIsAssessment()} 
                                            value="Assessment" />}
                                        label="Have Assessment?"
                                    />
                                </Grid>
                                {displayAssessment()}
                            </React.Fragment>
                        :
                        null
                    }
                   
                   
                    {/* classtype */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["classType"]=="")}>
                            <InputLabel  id={"classType-"+ taskID + "-label"}>
                                Place
                            </InputLabel>
                            <Select
                            labelId={"classType-"+ taskID + "-label"}
                            id={"classType-"+ taskID}
                            name="class_type"
                            value={task.class_type}
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

                            <FormHelperText>
                               {! (error["classType"]=="")? error["classType"]:  "required"}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    {/* target */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["target"]=="")}>
                            <InputLabel  id={"target-"+ taskID + "-label"}>
                                Class Type
                            </InputLabel>
                            <Select
                            labelId={"target-"+ taskID + "-label"}
                            id={"target-"+taskID}
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
                            <FormHelperText>
                                {! (error["target"]=="")? error["target"]:  ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    {/* claassize */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["size"]=="")}>
                            <InputLabel  id={"size-"+taskID+"-label"}>
                                Size
                            </InputLabel>
                            <Select
                            labelId={"size-"+taskID+"-label"}
                            id={"size-"+ taskID}
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
                            <FormHelperText>
                                {! (error["size"]=="")? error["size"]:  ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    {/* Resource */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id = {"resource-"+ taskID + "-lebal"}>Resource(s)</InputLabel>
                            <Select
                                labelId = {"resource-"+ taskID + "-lebal"}
                                id = {"resource-"+ taskID}
                                multiple
                                value = {resource}
                                fullWidth
                                name = "resource"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"resource-"+ taskID} />}
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
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id = {"e-resource-"+ taskID + "-lebal"}>E-Learning-Tool(s)</InputLabel>
                            <Select
                                labelId = {"e-resource-"+ taskID + "-lebal"}
                                id = {"e-resource-"+ taskID}
                                multiple
                                value = {tool}
                                fullWidth
                                name = "e-resource"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"e-resource-"+ taskID} />}
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
                            <InputLabel  id={"type-"+ taskID +"-label"}>
                                Type
                            </InputLabel>
                            <Select
                            labelId={"type-"+ taskID +"-label"}
                            id= {"type-"+taskID}
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
                        id={"title-"+ taskID} 
                        name="title" 
                        label="title" 
                        variant="filled" 
                        onChange={handleChange} 
                        value={task.title} 
                        error = {! (error["title"]=="")}
                        helperText= {! (error["title"]=="")? error["title"]:  ""}
                        fullWidth/>
                    </Grid>
                    <Grid item xs={12} className={classes.contentGrid}>
                        <TextField 
                        id={"description-" + taskID} 
                        name="description" 
                        label="description" 
                        variant="filled" 
                        onChange={handleChange} 
                        value={task.description} 
                        error = {! (error["description"]=="")}
                        helperText= {! (error["description"]=="")? error["description"]:  ""}
                        fullWidth/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    );
}

export default LearningTaskEditView;
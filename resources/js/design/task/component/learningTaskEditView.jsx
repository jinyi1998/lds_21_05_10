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
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import {ContextStore} from '../../../container/designContainer'
import {ComponentContext} from '../../learningComponent/container/componentContainer';
import {AppContextStore} from '../../../container/app';

import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    const { course } = React.useContext(ContextStore);
    const { options, taskTypeColor } = React.useContext(AppContextStore);
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
        feedbackid: [],
        motivatorid: [],
        description: "",
        has_assessment: false,
    });  

    const [tool, setTool] = React.useState([])
    const [resource, setResource] = React.useState([])
    const [feedback, setFeedback] = React.useState([])
    const [motivator, setMotivator] = React.useState([])
    const [assessment, setAssessment] = React.useState([])
    const [hasAssessment, setHasAssessment] = React.useState(
        false
     );
     
    React.useEffect( ()=>{  
        // fetchlearningTask(taskID)
        if(taskID == -1){
            //new task
            setTask({...task, id: -1});
        }else{
            //init multiple choice data
            var toolData = taskData.toolid.map( _tool => {return _tool.elearningtool_id});
            setTool(toolData);
            var resourceData = taskData.resourceid.map( _resource => {return _resource.resource_id});
            setResource(resourceData);

            var motivatorData = taskData.motivatorid.map( motivator => {return motivator.motivator_id});
            setMotivator(motivatorData);

            var feedbackData = taskData.feedbackid.map( _feedback => {return _feedback.feedback_id});
            setFeedback(feedbackData);

            if(showAssessment){
                // var hasAssessment = (taskData.assessmentid?.length > 0)? true: false
                setHasAssessment(taskData.has_assessment? true : false);
                var assessmentData = taskData.assessmentid.map( _assessment => {return _assessment.learningoutcome_id});
                setAssessment(assessmentData);
            }   
         
            setTask(taskData);
            // setTask({...task, id: -1});
            // console.log(taskData);
        }
        // var classTargetInit = {
        //     target: {
        //         "name": "target",
        //         "value": taskData.class_type
        //     }
        // }
        // handleChange(classTargetInit);

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
        // update the original feedbackid
        if(task.id != -999){
           var feedbackid = {}
           feedbackid =  feedback.map(_feedback => {
               return {"feedback_id": _feedback, "task_id": task.id}
           })
           setTask({...task, feedbackid: feedbackid});
       }
   }
   , [feedback])

   React.useEffect( ()=>{  
    // update the original motivtor
    if(task.id != -999){
       var motivatorid = {}
       motivatorid =  motivator.map(_motivator => {
           return {"motivator_id": _motivator, "task_id": task.id}
       })
       setTask({...task, motivatorid: motivatorid});
   }
}
, [motivator])

    React.useEffect( ()=>{  
        // update the original learningoutcome
        if(task.id != -999){
           var assessmentid = {}
           assessmentid =  assessment.map(_assessment => {
               return {"learningoutcome_id": _assessment, "learningtask_id": task.id}
           })
           setTask({...task, assessmentid: assessmentid});
       }
   }
   , [assessment])

    React.useEffect( ()=>{
        if(task.id != -999){
            setTask({...task, has_assessment: hasAssessment});
        }
    }, [hasAssessment]) 

    React.useEffect(()=>{
        if(task.id != -999){
            syncTask(task);
        }
    },[task])
    


    const onChangeIsAssessment = () => {
        if(hasAssessment == true){
            // clear assessment if uncheck has assessment
            setAssessment([]);
        }
        setHasAssessment(!hasAssessment);
     
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
            case "feedback":
                setFeedback(event.target.value);
                break;
            case "motivator":
                setMotivator(event.target.value);
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

    //#region init opts data

    const classTypeOtps = options.taskClassType;
    const [taskClassSizeOpts, setTaskClassSizeOpts] = React.useState(options.taskSize);
    const taskTargetOpts = options.taskTarget;
    const taskResouceOpts = options.taskResource;
    const taskELearnResouceOpts = options.taskElearingResource;
    const taskTypeOpts = options.taskType;
    const feedbackOpts = options.feedbackOpts;
    const motivatorOpts = options.motivatorOpts;

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
        // const outcomes =  course.outcomes.filter(_outcome => _outcome.isCourseLevel == true && component.outcomeid.map( x => x.outcome_id).includes(_outcome.id));
        const outcomes =   course.outcomes.concat( 
            course.outcomes.flatMap( 
                x => x.slo_outcome.flatMap(
                    (_slo, index) => _slo
                )
            )
        ).filter(_outcome => component.outcomeid.map( x => x.outcome_id).includes(_outcome.id));

        if(hasAssessment){
            return (
                <Grid item xs={12} className={classes.contentGrid}>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id={"assessment-"+ taskID+"-label"}>Outcome(s)</InputLabel>
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
                                <Chip key={value} label={
                                    outcomes.find(x=> x.id == value).description
                                } 
                                    className={classes.chip}  
                                    style={{whiteSpace: 'normal' }} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {
                            outcomes.map(_outcome => ( 
                                <MenuItem key={_outcome.id} value= {_outcome.id} style={{whiteSpace: 'normal' }}>
                                    {_outcome.description}
                                </MenuItem>   
                            ))
                        }
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
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.contentGrid}>
                        <TextField 
                        id={"time-"+ taskID} 
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
                    {
                        showAssessment == true?
                            <React.Fragment>
                                <Grid item xs={12} className={classes.contentGrid}>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["has_assessment"]=="")} margin='dense'>
                                    <FormControlLabel
                                        control={<Checkbox 
                                            checked={hasAssessment} 
                                            onChange={() => onChangeIsAssessment()} 
                                            disabled = {assessment.length > 0?  true : false}
                                            value="Assessment" />}
                                        label="Have Assessment?"
                                    />
                                    {displayAssessment()}
                                     <FormHelperText>
                                        {! (error["has_assessment"]=="")? error["has_assessment"]:  ""}
                                    </FormHelperText>
                                    </FormControl>
                                </Grid>
                              
                            </React.Fragment>
                        :
                        null
                    }
                   
                   
                    {/* classtype */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth error = {! (error["classType"]=="")} margin='dense'>
                            <InputLabel  id={"classType-"+ taskID + "-label"}>
                                Location
                            </InputLabel>
                            <Select
                            labelId={"classType-"+ taskID + "-label"}
                            id={"classType-"+ taskID}
                            name="class_type"
                            value={task.class_type}
                            size = "small"
                            onChange={handleChange}
                            renderValue={selected => (
                                classTypeOtps.find(x => x.id == selected)?.description
                            )}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Please select the location</em>
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
                            <InputLabel  id={"target-"+ taskID + "-label"}>
                                Class Target
                            </InputLabel>
                            <Select
                            labelId={"target-"+ taskID + "-label"}
                            id={"target-"+taskID}
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
                            <InputLabel  id={"size-"+taskID+"-label"}>
                                Size
                            </InputLabel>
                            <Select
                            labelId={"size-"+taskID+"-label"}
                            id={"size-"+ taskID}
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
                            <InputLabel id = {"e-resource-"+ taskID + "-lebal"}>E-Learning-Tool(s)</InputLabel>
                            <Select
                                labelId = {"e-resource-"+ taskID + "-lebal"}
                                id = {"e-resource-"+ taskID}
                                multiple
                                value = {tool}
                                fullWidth
                                name = "e-resource"
                                size = "small"
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

                    {/* Feedback */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl className={classes.formControl} fullWidth margin='dense'>
                            <InputLabel id = {"feedback-"+ taskID + "-lebal"}>Feedback</InputLabel>
                            <Select
                                labelId = {"feedback-"+ taskID + "-lebal"}
                                id = {"feedback-"+ taskID}
                                multiple
                                value = {feedback}
                                fullWidth
                                name = "feedback"
                                size = "small"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"feedback-"+ taskID} />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={feedbackOpts.find(x=> x.id == value).name} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {feedbackOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.name}</MenuItem>)}
                            </Select>
                            <FormHelperText>
                               You can select one or more feedback(s)
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* Motivator */}
                    <Grid item xs={12} className={classes.contentGrid}>
                        <FormControl className={classes.formControl} fullWidth margin='dense'>
                            <InputLabel id = {"motivator"+ taskID + "-lebal"}>Motivator(s)</InputLabel>
                            <Select
                                labelId = {"motivator"+ taskID + "-lebal"}
                                id = {"motivator"+ taskID}
                                multiple
                                value = {motivator}
                                fullWidth
                                name = "motivator"
                                size = "small"
                                onChange={handleChangeMultiple}
                                input = {<Input id={"motivator"+ taskID} />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={motivatorOpts.find(x=> x.id == value).name} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {motivatorOpts.map(_opts =>  <MenuItem value={_opts.id} key={_opts.id}>{_opts.name}</MenuItem>)}
                            </Select>
                            <FormHelperText>
                               You can select one or more motivator(s)
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
                                
                                {
                                    options.taxonomyCategory?.map(
                                        (_category) =>
                                        {
                                            var x =   [
                                                <ListSubheader>
                                                    {_category.name}
                                                </ListSubheader>
                                            ,
                                                taskTypeOpts.filter( _opts => _opts.categoryid?.taxonomy_category_id == _category.id)?.map(_opts =>  
                                                    <MenuItem value={_opts.id} key={_opts.id}>
                                                        <Grid container>
                                                            <Grid item xs = {2}>
                                                                <div style={taskTypeColor(_opts.id)} />
                                                            </Grid>
                                                            <Grid item xs = {10}>
                                                                <Typography variant = {"subtitle2"}>
                                                                    {_opts.description}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                       
                                                    </MenuItem>
                                                )
                                            ];
                                            return (x);
                                        }
                                    )       
                                }
                               
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
                        id={"description-" + taskID} 
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

export default LearningTaskEditView;
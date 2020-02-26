import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Button, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import ComponentTask from './componentTask';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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

//   tasks : [ { componetID, taskIndex }]

const LessonPlanContent = (props) => {
    const [mode, setMode] = React.useState("view"); //lessonPlan mode => view / edit
    const [editStage, setEditStage] = React.useState(1); //edit Stage => 1 for select component/ 2 for select tasks
    const [selectComponent, setSelectComponent] = React.useState(-1);
    const [checkBoxState, setCheckBoxState] =  React.useState([]);
    const {lessonID, courseData, handleUpdate} = props
    const {canEdit} = props

    const classes = useStyles();

    const onEdit = () => {
        setEditStage(1);
        setMode("edit");
        setCheckBoxState([]);
    }

    const totalTime = () => {
        var time = 0;
        courseData.lesson[lessonID].tasks.map((_task, index) => 
            time += _task.time
        );
        return time;
    } 

    const onSave = () => {
        setEditStage(1);
        setMode("view");
        var temp_task = courseData.lesson[lessonID].tasks;

        courseData.components[selectComponent].tasks.map(
            (_task, index) => {
                if(checkBoxState.indexOf(index.toString()) != -1){
                    temp_task.push(_task);
                }
            }
        );

        var temp_lesson = {
            id: lessonID,
            name: "lesson_" + (lessonID+1).toString(),
            tasks: temp_task,
        } 
        console.log(temp_lesson);
        handleUpdate('updateLesson', temp_lesson);
    }

    const onCheckCheckbox = (event) => {
        var tempCheckList = checkBoxState;
        if(checkBoxState.indexOf(event.target.value) === -1){
            // no in state => uncheck to check
            tempCheckList.push(event.target.value);
        }else{
            tempCheckList = tempCheckList.filter(x => x!=event.target.value);
        }
        setCheckBoxState(tempCheckList);
    } 

    React.useEffect( ()=> {
        setEditStage(1);
        setSelectComponent(-1);
    }
    ,[lessonID]);

    const onSelectComponent = (event) => {
        setSelectComponent(event.target.value);
    }

    React.useEffect(
        ()=> {setEditStage(2); console.log(selectComponent);}
    , [selectComponent]);

    const getAvailableTask = () => {

    }

    const displayEditContent = () => {
        switch(editStage){
            default:
            case 1:
                    return (
                        <Grid container>
                            <Grid item xs = {12}> 
                                1. Choose the Major Step(s) that you will cover in this lesson
                            </Grid>
                            <Grid item xs = {12}>
                                <FormControl variant="filled" className={classes.formControl} fullWidth>
                                    <InputLabel id="demo-simple-select-filled-label">Choose the major step(s)</InputLabel>
                                    <Select
                                    labelId="component-select-label"
                                    id="component-select"
                                    onChange={onSelectComponent}
                                    defaultValue = ""
                                    >
                                    <MenuItem value="" disabled>
                                        <em>Choose the major step(s)</em>
                                    </MenuItem>
                                    {
                                        courseData.components.map(
                                            (_component, index) => (
                                                <MenuItem value={index} key={index} index = {index}>{_component.title}</MenuItem>
                                            )
                                        )
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>   
                    )
                break;
            case 2:
                return (
                    <Grid container>
                         {  (
                            selectComponent !== "" && typeof courseData.components[selectComponent].tasks != undefined?
                            courseData.components[selectComponent].tasks.map(
                                (_task, index) => (
                                    <Grid container item xs = {12}>
                                        <Grid item xs >
                                            <Checkbox
                                                    value="secondary"
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    onChange= {onCheckCheckbox}
                                                    value = {index}
                                            />
                                        </Grid>
                                        <Grid item xs = {11}>
                                            <ComponentTask 
                                                TaskData = {_task} 
                                                index = {index} 
                                                componentData = {componentData}
                                                handleTaskUpdate= {()=> {}} 
                                                onEditTasks = {()=>{}} 
                                                mode = "view"/>
                                        </Grid>
                                    </Grid>
                                )
                            ):
                            null
                            )
                         }
                        <Grid item xs = {12}>
                            <Button variant="contained" color="primary" fullWidth onClick = {onSave}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                   
                )
                break;
        }
    }

    const displayContent = () => {

        switch (mode){
            default: 
            case "view":
                return(
                    <Grid container spacing={4}>
                        <Grid item xs ={12}>
                            <b>Lesson {lessonID + 1} </b>
                        </Grid>

                        <Grid item xs ={12}>
                            Estimated learning time: {totalTime()} min(s)
                        </Grid>
                        
                        { (typeof courseData.lesson[lessonID] != "undefined") ?
                            courseData.lesson[lessonID].tasks.map((_task, index)=> 
                                <Grid container item xs ={12}>
                                    <ExpansionPanel>
                                            <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                                <Grid item container xs={12} spacing={4}>
                                                  <Grid item xs={1} height="100%">
                                                        <div className={classes.color}>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={11} className={classes.contentGrid}>
                                                        {_task.type}
                                                    </Grid>
                                                </Grid>
                                              
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                            <Grid item container  xs={12} spacing={4}>
                                                    <Grid item xs={1} height="100%">
                                                        <div className={classes.color}>
                                                        </div>
                                                    </Grid>
                                                    <Grid container item xs={11}>
                                                        <Grid item xs={12} className={classes.contentGrid}>
                                                            {_task.title}
                                                        </Grid>

                                                        <Grid item xs={12} className={classes.contentGrid}>
                                                            {_task.time} mins | 
                                                            {_task.target} | 
                                                            {_task.classType} | 
                                                            {_task.resource.map(_learningOutcome=> _learningOutcome)} |
                                                            {_task.STEMType.map(_STEMType => _STEMType)}
                                                        </Grid>

                                                        <Grid item xs={12} className={classes.contentGrid}>
                                                            {_task.description}
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            ) 
                        : "no learning task in this lesson"
                        }

                        {
                            canEdit == true? 
                            <Grid item xs ={12}>
                                <Button variant="contained" color="primary" fullWidth onClick = {onEdit}>
                                    Edit
                                </Button>
                            </Grid> 
                            : null
                        }
                       
                    </Grid>
                )
                break;
            case "edit":
                return(
                    <Grid container>
                        <Grid item xs ={12}>
                            {displayEditContent()}
                        </Grid>
                    </Grid>
                )
                break;
        }
    }

    return (
        <Grid container>
            {displayContent()}
        </Grid>
    )

}

export default LessonPlanContent;
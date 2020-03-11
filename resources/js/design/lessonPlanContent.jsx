import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ContextStore} from '../container/designContainer'

import ComponentTask from './componentTask';
import LessonPlanEditTask from './lessonPlanEditTask';

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
    const {lessonID} = props
    const { course, dispatch } = React.useContext(ContextStore);
    const {canEdit} = props
    //edit learning task props
    const [ openLessonTaskEdit, setOpenLessonTaskEdit] = React.useState(false);
    const [ onEditComponentID, setOnEditComponentID] = React.useState(-1);
    const [ onEditTasktID, setOnEditTasktID] = React.useState(-1);

    const [taskMode, setTaskMode] = React.useState("lesson_select");


    const classes = useStyles();

    const onEdit = () => {
        setEditStage(1);
        setMode("edit");
        setCheckBoxState([]);
    }

    const totalTime = () => {
        var time = 0;
        course.lesson[lessonID].tasks.map((_task, index) => 
            // time +=  course.components[_task.componentID].tasks[_task.taskIndex].time
            time += parseInt(course.components.find(x => x.id ==_task.componentID).pattern.tasks.concat(course.components.find(x => x.id ==_task.componentID).tasks)[_task.taskIndex].time)
        );
        return time;
    } 

    const onSave = () => {
        setEditStage(1);
        setMode("view");

        var temp_task = course.lesson[lessonID].tasks;
        //filter out all current component selected before
        temp_task = temp_task.filter(_task => _task.componentID != selectComponent);


        course.components.find(x => x.id == selectComponent).pattern.tasks.concat(course.components.find(x => x.id == selectComponent).tasks).map(
            (_task, index) => {
                if(checkBoxState[index]){
                    let temp = {
                        "componentID": selectComponent,
                        "taskIndex": index
                    }
                    temp_task.push(temp);
                }
            }
        );

        var temp_lesson = {
            id: lessonID,
            name: "lesson_" + (lessonID+1).toString(),
            tasks: temp_task,
        } 
        dispatch(
            {
                type: "UPDATE_LESSON",
                value: temp_lesson
            }
        );
        setSelectComponent(-1);
    }
    const onEditTask = () => {
        setTaskMode("edit");
    }
    const onEditLessonTask = (componentID, taskID) => {
        setOpenLessonTaskEdit(true);
        setOnEditComponentID(componentID)
        setOnEditTasktID(taskID)
    }

    const onCheckCheckbox = name => event => {
        setCheckBoxState({ ...checkBoxState, [name]: event.target.checked });
    } 

    React.useEffect( ()=> {
        setEditStage(1);
        setSelectComponent(-1);
    }
    ,[lessonID]);

    const onSelectComponent = (event) => {
        setSelectComponent(event.target.value);
    }

    React.useEffect(()=> {
            if(selectComponent != -1){
                setEditStage(2);
                let temp = []
                course.components.find(x => x.id == selectComponent).pattern.tasks.concat(course.components.find(x => x.id == selectComponent).tasks).map((_data, index) => {
                    if(course.lesson[lessonID].tasks.filter( x => x.componentID == selectComponent && x.taskIndex == index).length > 0){
                        temp.push(true)
                    }else{
                        temp.push(false)
                    }
                })
                // course.lesson[lessonID].tasks.map((_taskData)=> {
                //     if(_taskData.componentID === selectComponent){
                //         temp.push(_taskData.taskIndex)
                //     }
                // });
                setCheckBoxState(temp);
            }
        }
    , [selectComponent]);


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
                                        course.components.map(
                                            (_component, index) => (
                                                <MenuItem value={_component.id} key={index} index = {index}>{_component.title}</MenuItem>
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
                var filter = course.lesson.map((_lesson, index) => {
                    if(lessonID == index){
                        return [];
                    }else{
                        return course.lesson[index].tasks.filter(x => x.componentID == selectComponent).map(_task => {return _task.taskIndex})
                    }
                })
                filter = [].concat.apply([], filter);
                let taskOpts =  course.components.find(x => x.id == selectComponent).pattern.tasks.concat(course.components.find(x => x.id == selectComponent).tasks)
                // .filter((x, index)=>filter.indexOf(index) == -1);

                return (
                    <Grid container>
                         {  (
                            selectComponent !== "" && taskOpts.length > 0?
                            (
                                taskOpts.map(
                                    (_task, index) => (
                                        (filter.indexOf(index) == -1? 
                                        //not display other lesson selected learning tasks
                                        <Grid container item xs = {12} key = {index}>
                                            <Grid item xs >
                                                <Checkbox
                                                        value="secondary"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        onChange= {onCheckCheckbox(index)}
                                                        // value = {checkBoxState[index]}
                                                        // key = {index}
                                                        checked = {false || checkBoxState[index]}
                                                        // checked = {courseData.lesson[lessonID].tasks.find(_task => 
                                                        //     (_task.componentID != selectComponent && _task.taskIndex != index)
                                                        // )== 'undefined'}
                                                />
                                            </Grid>
                                            <Grid item xs = {11}>
                                                <ComponentTask 
                                                    TaskData = {_task} 
                                                    index = {index} 
                                                    key = {index}
                                                    componentData = {course.components.find(x => x.id == selectComponent)}
                                                    handleTaskUpdate= {()=> {}} 
                                                    onEditTasks = {onEditTask} 
                                                    mode = {taskMode}/>
                                            </Grid>
                                        </Grid>
                                        : 
                                        null)
                                       
                                    )
                                )
                            )
                            :
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

    const displayTaskViewList = () => {

        if( course.lesson[lessonID].tasks.length == 0){
           return (
            <Grid item xs ={12}>
                <Paper variant="outlined" key ={lessonID} style = {{padding: "16px", textAlign: "center"}}>
                    No Learning Task In This Lesson
                </Paper>
            </Grid> 
           ); 
        }else{
            return (
                course.lesson[lessonID].tasks.map(
                    (_taskdata, index) => (
                        // console.log(_taskdata)
                        <ComponentTask 
                            // TaskData = {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex]}
                            TaskData = {course.components.find(x => x.id == _taskdata.componentID).pattern.tasks.concat(course.components.find(x => x.id == _taskdata.componentID).tasks)[_taskdata.taskIndex]}  
                            index = {index} 
                            key = {index}
                            componentData = {course.components.find(x => x.id == _taskdata.componentID)}
                            handleTaskUpdate= {()=> {}} 
                            onEditTasks = {()=>{onEditLessonTask(_taskdata.componentID, _taskdata.taskIndex)}} 
                            mode = "lesson_view"/> 
                    )
                )
                    // <Grid container item xs ={12}>
                    //     <ExpansionPanel>
                    //             <ExpansionPanelSummary
                    //             expandIcon={<ExpandMoreIcon />}
                    //             aria-controls="panel1a-content"
                    //             id="panel1a-header"
                    //             >
                    //                 <Grid item container xs={12} spacing={4}>
                    //                     <Grid item xs={1} height="100%">
                    //                         <div className={classes.color}>
                    //                         </div>
                    //                     </Grid>
                    //                     <Grid item xs={11} className={classes.contentGrid}>
                    //                         {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].type}
                    //                     </Grid>
                    //                 </Grid>
                                    
                    //             </ExpansionPanelSummary>
                    //             <ExpansionPanelDetails>
                    //                 {/* <ComponentTask 
                    //                             TaskData = {_task} 
                    //                             index = {index} 
                    //                             componentData = {course.components.find(x => x.id == selectComponent)}
                    //                             handleTaskUpdate= {()=> {}} 
                    //                             onEditTasks = {()=>{}} 
                    //                             mode = "view"/> */}
                    //             <Grid item container  xs={12} spacing={4}>
                    //                     <Grid item xs={1} height="100%">
                    //                         <div className={classes.color}>
                    //                         </div>
                    //                     </Grid>
                    //                     <Grid container item xs={11}>
                    //                         <Grid item xs={12} className={classes.contentGrid}>
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].title}
                    //                         </Grid>

                    //                         <Grid item xs={12} className={classes.contentGrid}>
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].time} mins | 
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].target} | 
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].classType} | 
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].resource.map(_learningOutcome=> _learningOutcome)} |
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].STEMType.map(_STEMType => _STEMType)}
                    //                         </Grid>

                    //                         <Grid item xs={12} className={classes.contentGrid}>
                    //                             {course.components.find(x => x.id == _taskdata.componentID).tasks[_taskdata.taskIndex].description}
                    //                         </Grid>

                    //                     </Grid>
                    //                 </Grid>
                    //             </ExpansionPanelDetails>
                    //     </ExpansionPanel>
                    // </Grid>

            );
           
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
                        
                        {displayTaskViewList()}
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
            <LessonPlanEditTask 
                openLessonTaskEdit = {openLessonTaskEdit}
                setOpenLessonTaskEdit = {setOpenLessonTaskEdit}
                onEditComponentID = {onEditComponentID}
                onEditTasktID = {onEditTasktID}
            />
        </Grid>
    )

}

export default LessonPlanContent;
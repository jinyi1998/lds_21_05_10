import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Button, Checkbox } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ContextStore} from '../../container/designContainer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningTaskEditView from '../task/learningTaskEditView';
import validator from 'validator';

import LearningTaskLessonView from '../task/learningTaskLessonView';
import config from 'react-global-configuration';
import { useState } from 'react';

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

const LessonPlanView = (props) => {

    const {setEditMode} = props;
    const canEdit = props.canEdit;

    const [lesson, setLesson] = useState(props.lesson);
    const {setLoadingOpen, refreshCourse } = React.useContext(ContextStore);

    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);

    const [ taskData, setTaskData] = React.useState({});

    const [ error, setError] = React.useState({
        "type": "",
        "title": "",
        "description": "",
        "time": "",
        "classType": "",
        "target": "",
        "size": ""
    });

    const validate = () => {
        var validated = true;
        var tempError = {
          "type": "",
          "title": "",
          "description": "",
          "time": "",
          "classType": "",
          "target": "",
          "size": "",
        }

        if(validator.isEmpty(taskData.type.toString())){
            tempError["type"] = "Please enter the course type";
            validated = false;
          }
      
        if(validator.isEmpty(taskData.title.toString())){
            tempError["title"] = "Please enter the title";
            validated = false;
        }
    
        if(validator.isEmpty(taskData.description.toString())){
            tempError["description"] = "Please enter the description";
            validated = false;
        }
    
        if(validator.isEmpty(taskData.time.toString())){
          tempError["time"] = "Please enter the time";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.class_type.toString())){
          tempError["classType"] = "Please enter the class type";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.target.toString())){
          tempError["target"] = "Please enter the target";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.size.toString())){
          tempError["size"] = "Please enter the course size";
          validated = false;
        }
    
        setError(tempError);
        return validated;
      }


    React.useEffect(()=>{
        setLesson(props.lesson)
    }, [props])

    async function updateLearningTask() {
        setLoadingOpen(true);

        var json = taskData;
        if(taskData.id == -1){
            //new learning task
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
                setLoadingOpen(false);
                setOpenTaskEdit(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            //update existing task
            return await fetch(
                'http://'+config.get('url')+'/api/learningTask/'+ taskData.id,
                {
                    method: "PUT",
                    body:  JSON.stringify(json),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )
            .then(res => res.json())
            .then(response => {
                //load the default learning outcomes by api request
                setLoadingOpen(false);
                setOpenTaskEdit(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }
     
    }


    const onSaveTask = () => {
        if(validate()){
            updateLearningTask();
        }
    }

    const onEditearningTask = (task) => {
        setTaskData(task)
        setOpenTaskEdit(true);
    }

    const totalTime = () => {
        var time = 0;
        lesson.tasks.map( _task => 
            time += parseInt(_task.time)
        );
        return time;
    } 


    return (
        <Grid container>
            
            <Grid container spacing={4}>

                <Grid item xs ={12}>
                    <b>{lesson.title}</b>
                </Grid>

                <Grid item xs ={12}>
                    Estimated learning time: {totalTime()} min(s)
                </Grid>
                
                {   
                lesson.tasks.length > 0 ?
                    lesson.tasks.map(
                        _task => 
                        <LearningTaskLessonView 
                            taskID = {_task.id} 
                            taskData = {_task} 
                            // onEditearningTask = {()=>{}
                            onEditearningTask = {onEditearningTask}
                            key = {_task.id}
                        />
                    )
                    : 
                    <Grid item xs ={12}>
                    <Paper variant="outlined" style = {{padding: "16px", textAlign: "center"}}>
                        No Learning Task In This Lesson
                    </Paper>
                </Grid> 
                }

                {canEdit == true? 
                    <Grid item xs ={12}>
                        <Button variant="contained" color="primary" fullWidth onClick = {()=> setEditMode(true)}>
                            Edit
                        </Button>
                    </Grid> 
                    : null
                }
            </Grid>

            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning task for this component...
                    </DialogContentText>
                    <LearningTaskEditView 
                        taskID = {taskData.id} 
                        taskData = {taskData} 
                        syncTask = {setTaskData} 
                        showAssessment = {false}
                        error = {error}
                        mode = "lesson_edit"/> 
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenTaskEdit(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onSaveTask()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}

export default LessonPlanView;
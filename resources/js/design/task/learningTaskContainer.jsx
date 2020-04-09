import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField } from '@material-ui/core';
import {ContextStore} from '../../container/designContainer'
import {ComponentContext} from '../component/componentContainer';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LearningTaskView from './learningTaskView';
import LearningTaskEditView from './learningTaskEditView';
import validator from 'validator';
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


const LearningTaskContainer = (props) => {

    const classes = useStyles();

    const {tasksData, componentID} = props;
    // const {onEditTasks} = props;
    const { setLoadingOpen, refreshCourse } = React.useContext(ContextStore);

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

    //#region api data function 
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

    async function updateLearningTask() {
        setLoadingOpen(true);

        var json = taskData;
        json['component_id'] = componentID;
        if(taskData.id == -1){
            //new learning task
            json['sequence'] = tasksData.length;
            setOpenTaskEdit(false);
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
                // setOpenTaskEdit(false);
                setLoadingOpen(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            //update existing task
            setOpenTaskEdit(false);
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
                // setOpenTaskEdit(false);
                setLoadingOpen(false);
                refreshCourse();
            })
            .catch(error => console.log(error));
        }
     
    }
    //#endregion

    // React.useEffect( ()=>{  
    //     // fetchlearningTask(taskID)
    //     setTask(taskData);
    // }
    // , [])
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

    const onSaveTask = () => {
        if(validate()){
            updateLearningTask();
        }
    }

    const onEditearningTask = (task) => {
        setTaskData(task)
        setOpenTaskEdit(true);
    }

    const onAddLearningTask = () => {
        setTaskData({
            id: -1,
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
            sequence: tasksData.length + 1
        });
        setOpenTaskEdit(true);
    }
    //#endregion


    return (
        <React.Fragment>
                {tasksData.map( _task => 
                    <LearningTaskView 
                        taskID = {_task.id} 
                        taskData = {_task} 
                        onEditearningTask = {onEditearningTask}
                        key = {_task.id}
                        editBtn = {true}
                        duplicateBtn = {true}
                        deleteBtn = {true}
                        lastestindex = {tasksData.length + 1}
                    />
                )}

            <Button variant="contained" color="primary" onClick={()=>onAddLearningTask()}>
                Add Learning Task
            </Button>

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
                        showAssessment = {true}
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
        </React.Fragment>
    );
}

export default LearningTaskContainer;
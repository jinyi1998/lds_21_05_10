import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {ContextStore} from '../../container/designContainer'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LearningTaskView from './learningTaskView';
import LearningTaskEditView from './learningTaskEditView';
import validator from 'validator';
import config from 'react-global-configuration';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';


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

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
});

const LearningTaskContainer = (props) => {

    const {tasksData, componentID} = props;
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
    
        if(!validator.isInt(taskData.time.toString(), {min: 0, max: 999})){
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

    async function updateComponentTaskLessonRelation(component_task_relation){
        return await fetch(
            'http://'+config.get('url')+'/api/componentTaskRelation/'+ component_task_relation.id,
            {
                method: "PUT",
                body:  JSON.stringify(component_task_relation),
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
    }
    //#endregion

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

    const onDragEnd = (result) => {

        if (!result.destination) {
            return;
        }

        //sync the data to root state
        var tempTasks =  JSON.parse(JSON.stringify(tasksData));

        tempTasks.map((_task, index)=> {
            if(_task.componentid.sequence == null){
                tempTasks[index].componentid.sequence = index + 1;
            }
        });

        var sourceTask = {
          id: tempTasks[result.source.index].componentid.id,
          sequence: tempTasks[result.destination.index].componentid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempTask = {
              id : tempTasks[i].componentid.id,
              sequence: tempTasks[i].componentid.sequence - 1
            }
            // console.log(tempTask);
            updateComponentTaskLessonRelation(tempTask);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].componentid.id,
              sequence: tempTasks[i].componentid.sequence + 1
            }
            // console.log(tempTask);
            updateComponentTaskLessonRelation(tempTask);
          }
        }
        // console.log(sourceTask);
        updateComponentTaskLessonRelation(sourceTask);

    }
    //#endregion


    return (
        <React.Fragment>
               <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List style={getListStyle(snapshot.isDraggingOver)}>
                            {   
                                tasksData.map( 
                                    (_task, index) => 
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided, snapshot) => (
                                          <LearningTaskView 
                                            provided = {provided} 
                                            snapshot = {snapshot} 
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
                                    </Draggable>
                                )
                            }
                            {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                    </Droppable>
                </DragDropContext>
                {/* {tasksData.map( _task => 
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
                )} */}

            <Button variant="contained" color="primary" onClick={()=>onAddLearningTask()}>
                Add Learning Task
            </Button>

            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
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
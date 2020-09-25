import React from 'react';
import Button from '@material-ui/core/Button';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TaskTemplateView from '../component/taskTemplateView';
import TaskTemplateEditView from '../component/taskTemplateEditView';
import validator from 'validator';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';
import {AppContextStore} from '../../../container/app';
import {
    apiOptionsList, 
    apiLearningTaskTempPost,
    apiLearningTaskTempPut,
    apiLearningTaskTempDelete
} from '../../../api';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
});


const TaskTemplateBuilderContainer = (props) => {

    const { setLoadingOpen } = React.useContext(AppContextStore);

    const {options,  taskTypeColor } = React.useContext(AppContextStore);
    const [ displayMode, setDisplayMode ] = React.useState('edit');
    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);
    const [ tasksData, setTasksData] = React.useState([]);
    const [ editTask, setEditTask] = React.useState({});
    const [ editTaskID, setEditTaskID] = React.useState(-1);
    const [ error, setError] = React.useState({
        
        "type": "",
        "title": "",
        "description": "",
        "time": "",
        "classType": "",
        "target": "",
        "size": ""
    });


    React.useEffect(()=>{
        if(typeof props.tasksData != 'undefined'){
            setTasksData(props.tasksData);
        }
        if(typeof props.mode != 'undefined'){
            setDisplayMode(props.mode)
        }
    }, [props])

    //#region api request related

    async function updateLearningTask(task) {
        await apiLearningTaskTempPut(task)
    }

    async function addLearningTask(task) {
        await apiLearningTaskTempPost(task)
    }

    async function deleteLearningTask(task) {
        await apiLearningTaskTempDelete(task)
    }

    //#endregion

    //#region local action
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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        //sync the data to root state
        var tempTasks =  JSON.parse(JSON.stringify(tasksData));

        if(typeof props.component_id != 'undefined'){
            //component task
            return onHandleComponentDrag(tempTasks, result);
        }else{
            //pattern task
            return onHandlePatternDrag(tempTasks, result);
        }
    }

    const onHandlePatternDrag = (tempTasks, result) => {
        var updates =  [];

        tempTasks.map((_task, index)=> {
            if(_task.patternid.sequence == null){
                tempTasks[index].patternid.sequence = index + 1;
            }
        });

        var sourceTask = {
            id: tempTasks[result.source.index].id,
            pattern_id: tempTasks[result.source.index].patternid.pattern_id,
            sequence: tempTasks[result.destination.index].patternid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempTask = {
              id : tempTasks[i].id,
              pattern_id : tempTasks[i].patternid.pattern_id,
              sequence: tempTasks[i].patternid.sequence - 1
            }
            updates.push(updateLearningTask(tempTask));
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
                id : tempTasks[i].id,
                pattern_id : tempTasks[i].patternid.pattern_id,
                sequence: tempTasks[i].patternid.sequence + 1
            }
            updates.push(updateLearningTask(tempTask));
          }
        }
        updates.push(updateLearningTask(sourceTask));

        Promise.all(updates).then(values => { 
            props.reloadPattern();
        });
    }

    const onHandleComponentDrag = (tempTasks, result) => {
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
            // updateLearningTask(tempTask);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].componentid.id,
              sequence: tempTasks[i].componentid.sequence + 1
            }
            // console.log(tempTask);
            // updateLearningTask(tempTask);
          }
        }
        // console.log(sourceTask);
        // updateLearningTask(sourceTask);
    }

    const onEditearningTask = (task) => {
        setEditTaskID(task.id)
        setEditTask(task);
        setOpenTaskEdit(true);
    }

    const onAddNewTask = () => {
        setEditTaskID(-1)
        setOpenTaskEdit(true)
    }

    const onSaveTask = () => {
        if(editTask.id == -1){
            if(typeof props.component_id != 'undefined'){
                //component
                editTask.component_id = props.component_id;
                addLearningTask(editTask).then(
                    () => {
                        if(typeof props.reloadComponent != 'undefined'){
                            props.reloadComponent();
                        }
    
                        setOpenTaskEdit(false)
                    }
                );
            }else{
                //pattern
                editTask.pattern_id = props.pattern_id;
                addLearningTask(editTask).then(
                    () => {
                        if(typeof props.reloadPattern != 'undefined'){
                            props.reloadPattern();
                        }
    
                        setOpenTaskEdit(false)
                    }
                );
            }
           
        }else{
            updateLearningTask(editTask).then(
                () => {
                    if(typeof props.reloadPattern() != 'undefined'){
                        props.reloadPattern();
                    }
                    setOpenTaskEdit(false)
                }
            );
        }
    }

    const onDeleteTask = (task) => {
        deleteLearningTask(task).then(
            () => {
                if(typeof props.reloadPattern() != 'undefined'){
                    props.reloadPattern();
                }
            }
        );
    }

    const onDuplicateTask = (task) => {
        addLearningTask(task).then(
            () => {
                if(typeof props.reloadPattern() != 'undefined'){
                    props.reloadPattern();
                }
            }
        );
    }
    //#endregion

    //#region display
    const displayEditView = () => {
        return (
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">

                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)} style = {{width: '100%'}}>
                                {   
                                    tasksData.map( 
                                        (_task, index) => 
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <TaskTemplateView 
                                                provided = {provided} 
                                                snapshot = {snapshot} 
                                                taskID = {_task.id} 
                                                task = {_task} 
                                                onEditearningTask = {onEditearningTask}
                                                onDeleteTask = {onDeleteTask}
                                                onDuplicateTask = {onDuplicateTask}
                                                key = {_task.id}
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
                    
                    <Button variant="contained" color="primary" onClick={()=>onAddNewTask()}>
                        Add Learning Task
                    </Button>
            </Grid>
        )
    }

    const displayListView = () => {
        return (
            <Grid container>
                {
                     tasksData.map( _task => 
                        <Grid container item xs = {12}>
                            <Grid item xs = {1}> 
                                <div style={taskTypeColor(_task.type)}/>
                            </Grid>
                            <Grid item xs = {11}>
                                {_task.title}
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
           
        )
    }

    const display = () =>{
        switch(displayMode) {
            default:
            case 'edit':
                return displayEditView();
            case 'list':
                return displayListView();
        }
    }
    //#endregion

    return (
        <React.Fragment>
            <Paper style = {{padding: 16}}>
                {display()}
            </Paper>
            

            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                {/* <DialogTitle id="form-dialog-title">{task.id == -1? "Add Learning Task" : "Edit Learning Task"}</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        You may add new learning task for this component...
                    </DialogContentText>
                    <TaskTemplateEditView 
                        taskID = {editTaskID}
                        taskData = {editTask} 
                        syncTask = {setEditTask} 
                        showAssessment = {true}
                        error = {error} /> 
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

export default TaskTemplateBuilderContainer;
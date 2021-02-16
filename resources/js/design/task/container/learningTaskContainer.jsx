import React from 'react';
import Button from '@material-ui/core/Button';
import {ContextStore} from '../../../container/designContainer';
import {AppContextStore} from '../../../container/app';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LearningTaskView from '../component/learningTaskView';
import LearningTaskEditView from '../component/learningTaskEditView';
import validator from 'validator';
import Typography from '@material-ui/core/Typography';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';
import {
    apiLearningTaskPost, apiLearningTaskPut, apiLearningTaskCompPut,
    apiLearningTaskDelete
} from '../../../api.js';

import {getListStyle} from '../../../dragndrop'
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

const LearningTaskContainer = (props) => {

    const { tasksData, component_id, pattern_id} = props;
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const enableAdd = typeof props.enableAdd == 'undefined'? course.permission > 2 : props.enableAdd;
    const enableDrag = typeof props.enableDrag == 'undefined'? course.permission > 2 : props.enableDrag;
    const enableEdit = typeof props.enableEdit == 'undefined'? course.permission > 2 : props.enableEdit;
    const enableDelete = typeof props.enableDelete == 'undefined'? course.permission > 2 : props.enableDelete;
    const enableDuplicate = typeof props.enableDuplicate == 'undefined'? course.permission > 2 : props.enableDuplicate;
    const enableMove = typeof props.enableDelete == 'undefined'? course.permission > 2 : props.enableMove;


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
          "has_assessment": "",
        }

        if(validator.isEmpty(taskData.type.toString())){
            tempError["type"] = "Please enter the course type";
            validated = false;
          }
      
        if(validator.isEmpty(taskData.title.toString())){
            tempError["title"] = "Please enter the title";
            validated = false;
        }
    
        // if(validator.isEmpty(taskData.description.toString())){
        //     tempError["description"] = "Please enter the description";
        //     validated = false;
        // }
    
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

        if(taskData.has_assessment){
            if(taskData.assessmentid.length == 0){
                tempError["has_assessment"] = "You said there is some assessment in the task but you have not select any assessment yet";
                validated = false;
            }
        }
    
        setError(tempError);
        return validated;
    }

    //#region api data function 

    async function updateLearningTask() {
        setLoadingOpen(true);

        var json = taskData;
        json = handleTaskRequest(json);
        if(taskData.id == -1){
            setOpenTaskEdit(false);

            return await apiLearningTaskPost(json)
            .then(response => {
                //load the default learning outcomes by api request
                // setOpenTaskEdit(false);
                setLoadingOpen(false);
                displayMsg("success", "Learning Task Added")
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            //update existing task
            setOpenTaskEdit(false);
            return await apiLearningTaskPut(json)
            .then(response => {
                //load the default learning outcomes by api request
                // setOpenTaskEdit(false);
                setLoadingOpen(false);
                displayMsg("success", "Learning Task Updated")
                refreshCourse();
            })
            .catch(error => console.log(error));
        }
    }

    const handleTaskRequest = (task) => {
        var temp = JSON.parse(JSON.stringify(task))

        if(typeof component_id != 'undefined'){
            temp['component_id'] = component_id;

        }else if(typeof pattern_id != 'undefined'){
            temp['pattern_id'] = pattern_id;
        }
        return temp;
    }

    async function updateComponentTaskLessonRelation(component_task_relation){
        return await apiLearningTaskCompPut(component_task_relation)
        .then(response => {
                 //load the default learning outcomes by api request
            // setOpenTaskEdit(false);
            // setLoadingOpen(false);

        }).catch(error => console.log(error));
    }

    async function duplicateLearningTask(task, duplicateTo) {
        setLoadingOpen(true);
        if(typeof component_id != 'undefined'){
            if(duplicateTo != -1){
                var json = task;
                json['component_id'] = duplicateTo;
                json['sequence'] = course.components.find(x => x.id == duplicateTo)? course.components.find(x => x.id == duplicateTo)?.tasks.length + 1 : 999;
                
                return await apiLearningTaskPost(json)
                .then(response => {
                    //load the default learning outcomes by api request
                    refreshCourse();
                    setLoadingOpen(false);  
                    displayMsg("success", "Learning Task Duplicated"); 
                })
                .catch(error => {
                    console.log(error);
                    displayMsg("error", "Some Errors Occured");
                })
            }
        }else if(typeof pattern_id != 'undefined' && pattern_id > 0) {
            var temp_task = JSON.parse(JSON.stringify(task));
            temp_task['pattern_id'] = pattern_id;
            delete temp_task.sequence;
            return await apiLearningTaskPost(temp_task)
            .then(response => {
                //load the default learning outcomes by api request
                refreshCourse();
                setLoadingOpen(false);  
                displayMsg("success", "Learning Task Duplicated"); 
            })
            .catch(error => {
                console.log(error);
                displayMsg("error", "Some Errors Occured");
            })
        }    
    }

    async function deleteLearningTask(task) {
        setLoadingOpen(true);
        return await apiLearningTaskDelete(task.id)
        .then(response => {
            //load the default learning outcomes by api request
            refreshCourse();
            setLoadingOpen(false);
            displayMsg("success", "Learning Task Deleted");
        })
        .catch(error => {
            displayMsg("error", "Some Errors Occured");
            console.log(error);
        });
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

    async function moveLearningTask(task, moveTo){
        setLoadingOpen(true);
        if(typeof moveTo != 'undefined'){

            // identify component / pattern
            var arr = moveTo.split("_");
            var type = arr[0];
            var id = arr[1];

            if(type == "component"){
                var temp_task = JSON.parse(JSON.stringify(task));
                delete temp_task['pattern_id'];
                delete temp_task['assessment'];
                temp_task['component_id'] = id;
               
                return await apiLearningTaskPost(temp_task)
                .then(response => {
                    //load the default learning outcomes by api request
                    refreshCourse();
                    setLoadingOpen(false);  
                    deleteLearningTask(task)
                    displayMsg("success", "Learning Task Moved"); 
                })
                .catch(error => {
                    console.log(error);
                    displayMsg("error", "Some Errors Occured");
                })
            }else if(type == "pattern"){
                var temp_task = JSON.parse(JSON.stringify(task));
                delete temp_task['component_id'];
                delete temp_task['assessment'];
                temp_task['pattern_id'] = id;
               
                return await apiLearningTaskPost(temp_task)
                .then(response => {
                    //load the default learning outcomes by api request
                    refreshCourse();
                    setLoadingOpen(false);  
                    deleteLearningTask(task)
                    displayMsg("success", "Learning Task Moved"); 
                })
                .catch(error => {
                    console.log(error);
                    displayMsg("error", "Some Errors Occured");
                })
            }else{
                displayMsg("error", "You need to select the component you want to move");
                setLoadingOpen(false);
            }
        }else{
            displayMsg("error", "You need to select the component you want to move");
            setLoadingOpen(false);
        }
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
            hasAssessment: false,
            sequence: tasksData.length + 1
        });
        setOpenTaskEdit(true);
    }

    const onDragEnd = (result) => {

        if(typeof component_id != 'undefined'){
            handleComponentTaskDragEnd(result);
        }else if(typeof pattern_id != 'undefined') {
            handlePatternTaskDragEnd(result);
        }

    }

    const handleComponentTaskDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var updates = [];
        setLoadingOpen(true);

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
            updates.push( updateComponentTaskLessonRelation(tempTask) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].componentid.id,
              sequence: tempTasks[i].componentid.sequence + 1
            }
            // console.log(tempTask);
            updates.push ( updateComponentTaskLessonRelation(tempTask) );
          }
        }
        // console.log(sourceTask);
        updates.push( updateComponentTaskLessonRelation(sourceTask) );

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Learning Tasks Sequences Updated")
            refreshCourse();

        }).catch((error)=> {
            console.log(error);
            displayMsg("error", "Error Occured")
        })
    }

    const handlePatternTaskDragEnd = (result) => {
        if (!result.destination || !result.source ) {
            return;
        }

        if(result.destination.index == result.source.index){
            return;
        }
        var updates = [];
        setLoadingOpen(true);

        //sync the data to root state
        var tempTasks =  JSON.parse(JSON.stringify(tasksData));

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
              pattern_id: tempTasks[i].patternid.pattern_id,
              sequence: tempTasks[i].patternid.sequence - 1
            }
            updates.push( apiLearningTaskPut(tempTask) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
              id : tempTasks[i].id,
              pattern_id: tempTasks[i].patternid.pattern_id,
              sequence: tempTasks[i].patternid.sequence + 1
            }
            updates.push ( apiLearningTaskPut(tempTask) );
          }
        }
        updates.push( apiLearningTaskPut(sourceTask) );

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Learning Tasks Sequences Updated")
            refreshCourse();

        }).catch((error)=> {
            console.log(error);
            displayMsg("error", "Error Occured")
        })
    }
    //#endregion


    return (
        <React.Fragment>
            <Grid container alignItems="flex-start" justify="flex-end">
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <RootRef rootRef={provided.innerRef}>
                                <List style={getListStyle(snapshot.isDraggingOver)}>
                                {   
                                    tasksData.length > 0 ?
                                    tasksData.map( 
                                        (_task, index) => 
                                        <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {!enableDrag}>
                                        {(provided, snapshot) => (        
                                            <LearningTaskView 
                                                provided = {provided} 
                                                snapshot = {snapshot} 
                                                taskID = {_task.id} 
                                                taskData = {_task} 
                                                onEditearningTask = {onEditearningTask}
                                                duplicateLearningTask = {duplicateLearningTask}
                                                deleteLearningTask = {deleteLearningTask}
                                                moveLearningTask = {moveLearningTask}
                                                key = {index}
                                                enableDrag = {enableDrag}
                                                editBtn = {enableEdit}
                                                duplicateBtn = {enableDuplicate}
                                                moveBtn = {enableMove}
                                                deleteBtn = {enableDelete}
                                                lastestindex = {tasksData.length + 1}
                                            />
                                        )}
                                        </Draggable>
                                    )
                                    :
                                    <Grid container item xs = {12} justify = {"center"}>
                                         <Typography variant="caption" display="block" gutterBottom>
                                            No Learning Task in this container
                                        </Typography>
                                    </Grid>
                                }
                                {provided.placeholder}
                                </List>
                            </RootRef>
                        )}
                        </Droppable>
                    </DragDropContext>

                {
                    enableAdd?
                    <Button variant="contained" color="primary" onClick={()=>onAddLearningTask()}>
                        Add Learning Task
                    </Button>
                    :
                    null
                }
            </Grid>

            <Dialog open={openTaskEdit} aria-labelledby="form-dialog-title" maxWidth = "md">
                <DialogTitle id="form-dialog-title">{taskData.id == -1? "Add Learning Task" : "Edit Learning Task"}</DialogTitle>
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
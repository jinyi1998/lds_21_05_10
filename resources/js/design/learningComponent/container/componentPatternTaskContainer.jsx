import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import validator from 'validator';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import LearningPatternContainer from '../../pattern/container/learningPatternContainer';
import LearningTaskView from '../../task/component/learningTaskView';
import LearningTaskEditView from '../../task/component/learningTaskEditView';
import ComponentPatternSelectBox from '../component/componentPatternSelectBox';

import DragHandleIcon from '@material-ui/icons/DragHandle';

import RootRef from "@material-ui/core/RootRef";
import List from '@material-ui/core/List';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { AppContextStore } from '../../../container/app';
import { ContextStore } from '../../../container/designContainer'

import {  
    apiLearningTaskPost, apiLearningTaskPut, apiLearningTaskCompPut,
    apiLearningTaskDelete,
    apiLearningCompGetPatternOpts,
    apiLearningPattTempList, apiLearningPattTempGet,
    apiLearningPatternPut, apiLearningPatternPost
} from '../../../api';


import {
    getListStyle, getDraggable
} from '../../../dragndrop';
const ComponentPatternTaskContainer = (props) =>{
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { component } = props;

    const enableAdd = typeof props.enableAdd == 'undefined'? course.permission > 2 : props.enableAdd;
    const enableDrag = typeof props.enableDrag == 'undefined'? course.permission > 2 : props.enableDrag;
    const enableEdit = typeof props.enableEdit == 'undefined'? course.permission > 2 : props.enableEdit;
    const enableDelete = typeof props.enableDelete == 'undefined'? course.permission > 2 : props.enableDelete;
    const enableDuplicate = typeof props.enableDuplicate == 'undefined'? course.permission > 2 : props.enableDuplicate;
    const enableMove = typeof props.enableMove == 'undefined'? course.permission > 2 : props.enableMove;
    

    //#region task 
    const [ onOpenTask, setOpenTask] = React.useState(initTaskOpen());
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

    function initTaskOpen(){
        var arr = [];
        component.patterntaskid.map((_patterntaskid, index) => {
            if(typeof _patterntaskid.task_id != 'undefined' && _patterntaskid.task_id != null){
                arr.push(_patterntaskid.task_id);
            }
        })
        return arr;
    }
    
    const handleExpandChange = (event, isExpanded, id) => {
        console.log(openPattern_temp);
        var openPattern_temp = JSON.parse(JSON.stringify(onOpenTask));
        console.log(id);
        if(isExpanded){
            openPattern_temp.push(id);
        }else{
            openPattern_temp.splice(openPattern_temp.indexOf(id), 1);
        }
        console.log(openPattern_temp);
        // setOpenPattern(isExpanded ? pattern.id : -1);
        setOpenTask(openPattern_temp);
    };

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
            hasAssessment: false,
        });
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

        if(typeof component != 'undefined'){
            temp['component_id'] = component.id;
        }

        return temp;
    }
    //#endregion


    //#region pattern
    const [ onOpenPattern, setOpenPattern] = React.useState(initPatternOpen());
    const [ editPatternOpen, setEditPatternOpen] = React.useState(false);
    const [ isDisplayPatternOpen, setIsDisplayPatternOpen ] = React.useState(false);
    const [ patternTempRawOpts, setPatternTempRawOpts] = React.useState([]);
    const [ patternTempOpts, setPatternTempOpts] = React.useState([]);
    const [ patternTempID, setPatternTempID] = React.useState(-1);
    const [ searchText, setSearchText ] = React.useState("");
    const [ selectDisplayPattern, setSelectDisplayPattern ] = React.useState(-1);

    React.useEffect(()=> {
        if(editPatternOpen){
            reloadPatternTemplate(props.component.id);
        }
    }, [editPatternOpen]) 

    React.useEffect(()=>{
        setPatternTempOpts(patternTempRawOpts);
    }, [patternTempRawOpts])

    React.useEffect(()=>{
        setLoadingOpen(true);

        if(searchText.length){
            onFilterBySearchText();
        }else{
            setPatternTempOpts(patternTempRawOpts);
            setLoadingOpen(false);
        }
    }, [searchText])

    function initPatternOpen(){
        var arr = [];
        component.patterntaskid.map((_patterntaskid, index) => {
            if(typeof _patterntaskid.pattern_id != 'undefined' && _patterntaskid.pattern_id != null){
                arr.push(_patterntaskid.pattern_id);
            }
        })
        return arr;
    }

    const onFilterBySearchText = () => {
        setLoadingOpen(true);
      
        var temp = JSON.parse(JSON.stringify(patternTempRawOpts));
        temp = temp.filter(_pattern => {
            if(typeof _pattern.title == "undefined"){
                return false;
            }
            if(_pattern.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1){
                return true;
            }
            if(_pattern.tags.filter( _tags => _tags.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1 ).length > 0){
                return true;
            }
            return false;
        });

        setPatternTempOpts(temp);
    
        setLoadingOpen(false);
    }

    async function reloadPatternTemplate(id) {
        return await apiLearningPattTempList()
        .then(response => {
            //load the default learning outcomes by api request
            setPatternTempRawOpts(response.data);
            return response;
        })
        .catch(error => console.log(error));
    }
  
    async function saveLearningPattern() {
        if(patternTempOpts.filter(x => x.id == patternTempID).length > 0){

            apiLearningPattTempGet(patternTempID).then((response) => {
                var json = response.data;
                json["component_id"] = component.id;
        
                return apiLearningPatternPost(json)
                .then(response => {
                      //load the default learning outcomes by api request
                      setLoadingOpen(false);
                      setEditPatternOpen(false);
                      displayMsg("success", "Pattern Added");
                      refreshCourse();
                })
            }).catch(error => {
                setLoadingOpen(false);
                setEditPatternOpen(false);
                console.log(error);
                displayMsg("error", "Error Occured");
            });
           
           
        }else{
            displayMsg("error", "Error Occured");
        }
    }
    
    const onSearch = (e) => {
        setSearchText(e.target.value)
    }

    const onClickLoadPattern = () => {
        setEditPatternOpen(true);
    }   
    const onCloseLoadPattern = () => {
        setEditPatternOpen(false);
        setPatternTempID(-1);

    }

    const handleOnClick = (e, index) => {
        e.preventDefault();
        setSelectDisplayPattern(index);
        setIsDisplayPatternOpen(true);
    }

    const handleOnSelect = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if(patternTempOpts[index].id != patternTempID){
            setPatternTempID(patternTempOpts[index].id);
        }
    }

    const displayPatternDetail = () => {
        if(!(selectDisplayPattern == -1 || patternTempOpts.length == 0 || typeof patternTempOpts[selectDisplayPattern] == 'undefined')){
            return (
                <React.Fragment>
                    <DialogContent>
                        <Grid container alignItems="flex-start">
                            <Grid container item xs = {12}>
                                <Typography variant="h6" gutterBottom>Pattern: {patternTempOpts[selectDisplayPattern].title}</Typography>
                            </Grid>

                            <Grid container item xs = {8}>
                                <Grid item xs ={12}> <Typography variant="h6" gutterBottom> Tasks</Typography></Grid>
                                {patternTempOpts[selectDisplayPattern].tasks.map((_task, index)=>{
                                    return(
                                        <Grid item xs ={12} key = {index}>
                                            <LearningTaskView 
                                                taskID = {_task.id} 
                                                taskData = {_task} 
                                                key = {index}
                                                editBtn = {false}
                                                duplicateBtn = {false}
                                                deleteBtn = {false}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                            <Button variant = {"outlined"} color = {"secondary"} onClick = {()=>setIsDisplayPatternOpen(false)}>Cancel</Button>
                            <Button  
                                variant = {"outlined"} 
                                color = {"primary"} 
                                onClick = {(e)=> {handleOnSelect(e, selectDisplayPattern); setIsDisplayPatternOpen(false);}}>Select</Button>
                    </DialogActions>
                </React.Fragment>
            );
        }else{
            return (
                null
            );
        }
    }
    //#endregion

    //#region local action
    const onDragEnd = (result) => {
        console.log(result);
        // return;
        if (!result.destination || !result.source ) {
            return;
        }

        var destination = result.destination.droppableId;

        if(result.type == "DEFAULT"){
            handleReorderCompnentLevel(result);
        }else if(result.type == "sub_level"){
            //move to pattern
            handleReoderSubLevel(result);
        }else{
            console.log('no one match')
        }
    }

    const handleReorderCompnentLevel = (result) => {
        // result.destination.index = result.destination.droppableId.split("_")[1];
        console.log(result.destination.index);
        if(result.destination.index == result.source.index){
            return;
        }

        var updates = [];
        setLoadingOpen(true);

        //sync the data to root state
        var temp =  JSON.parse(JSON.stringify(component.patterntaskid));

        var source = {
          id: temp[result.source.index].pattern_id > 0? temp[result.source.index].pattern_id : temp[result.source.index].task_id,
          component_id: temp[result.source.index].component_id,
          pattern_id: temp[result.source.index].pattern_id > 0 ? temp[result.source.index].pattern_id : 0,
          task_id:  temp[result.source.index].task_id > 0 ? temp[result.source.index].task_id : 0,
          sequence: temp[result.destination.index].sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempTask = {
              id : temp[i].pattern_id > 0? temp[i].pattern_id : temp[i].task_id,
              component_id: component.id,
              pattern_id: temp[i].pattern_id > 0 ? temp[i].pattern_id : 0,
              task_id:  temp[i].task_id > 0 ? temp[i].task_id : 0,
              sequence: temp[i].sequence - 1
            }

            if(tempTask.pattern_id > 0){
                updates.push(apiLearningPatternPut(tempTask))
            }else{
                 updates.push( apiLearningTaskPut(tempTask) );
            }
           
            updates.push (tempTask);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempTask = {
                id : temp[i].pattern_id > 0? temp[i].pattern_id : temp[i].task_id,
                component_id: component.id,
                pattern_id: temp[i].pattern_id > 0 ? temp[i].pattern_id : 0,
                task_id:  temp[i].task_id > 0 ? temp[i].task_id : 0,
                sequence: temp[i].sequence + 1
            }
            if(tempTask.pattern_id > 0){
                updates.push(apiLearningPatternPut(tempTask))
            }else{
                 updates.push( apiLearningTaskPut(tempTask) );
            }
          }
        }
        if(source.pattern_id > 0){
            updates.push(apiLearningPatternPut(source))
        }else{
             updates.push( apiLearningTaskPut(source) );
        }

        // console.log(updates)

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Learning Tasks Sequences Updated")
            refreshCourse();

        }).catch((error)=> {
            console.log(error);
            displayMsg("error", "Error Occured")
        })
    }

    const handleReoderSubLevel = (result) => {
        var source = result.draggableId;
        var destination = result.destination.droppableId;
        if(destination.split("_")[0] == "pattern"){
            if(source.split("_")[0] == "task"){
                var task_id = source.split("_")[1]; 
                var task = component.tasks.find(x => x.id == task_id);
                var moveTo = "pattern_" + destination.split("_")[1];
                moveLearningTask(task, moveTo);
            }else{
                console.log('no one match')
            }
        }else{
            console.log('no one match')
        }   
    }

    async function duplicateLearningTask(task, duplicateTo) {
        setLoadingOpen(true);
        if(duplicateTo != -1){
            var json = task;
            json['component_id'] = duplicateTo;
            // json['sequence'] = course.components.find(x => x.id == duplicateTo)? course.components.find(x => x.id == duplicateTo)?.tasks.length + 1 : 999;
            
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

    return (
        <React.Fragment>
             <Accordion defaultExpanded = {true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                >
                <Typography>Learning Patterns & Tasks </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs = {12}>
                            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                                <Droppable droppableId="component">
                                    {(provided, snapshot) => (
                                        <RootRef rootRef={provided.innerRef}>
                                            <List style={getListStyle(snapshot.isDraggingOver)} >
                                            {provided.placeholder}
                                            {
                                                component.patterntaskid.map((_patterntaskid, index) => 
                                                    {
                                                        if(typeof _patterntaskid.pattern_id != 'undefined' && _patterntaskid.pattern_id != null){
                                                            return(
                                                                <Draggable 
                                                                    key={_patterntaskid.pattern_id} 
                                                                    draggableId={"comptask_" + _patterntaskid.pattern_id} 
                                                                    index={index} 
                                                                    isDragDisabled = {!(enableDrag && onOpenPattern.indexOf(_patterntaskid.pattern_id) == -1)}
                                                                >
                                                                {(provided, snapshot) => (
                                                                    <div>
                                                                        <Grid container item xs   style = {{margin : "16px 0px"}} >
                                                                            <LearningPatternContainer 
                                                                                provided = {provided} 
                                                                                snapshot = {snapshot} 
                                                                                enableDrag = {enableDrag && onOpenPattern.indexOf(_patterntaskid.pattern_id) == -1}
                                                                                componentID = {component.id} 
                                                                                patternData = {component.patterns.find(x => x.id == _patterntaskid.pattern_id)}
                                                                                key = {index}
                                                                                onOpenPattern = {onOpenPattern}
                                                                                setOpenPattern = {setOpenPattern}
                                                                            />
                                                                        </Grid>
                                                                    </div>
                                                                )}
                                                                </Draggable>
                                                            )

                                                        }else if(typeof _patterntaskid.task_id != 'undefined' && _patterntaskid.task_id != null){
                                                            return(
                                                                <Draggable 
                                                                    key={_patterntaskid.task_id} 
                                                                    draggableId={"comptask_" + _patterntaskid.task_id} 
                                                                    index={index} 
                                                                    isDragDisabled = {onOpenTask.indexOf(_patterntaskid.task_id) != -1}
                                                                >
                                                                    {(provided, snapshot) => (
                                                                        <div  {...getDraggable(provided, snapshot)}>
                                                                            <Grid container item xs = {12}   
                                                                                style = {{margin : "16px 0px"}}       
                                                                               
                                                                            >
                                                                                <Accordion 
                                                                                    expanded = {onOpenTask.indexOf(_patterntaskid.task_id) != -1}
                                                                                    onChange = {(event, isExpanded) => handleExpandChange(event, isExpanded, _patterntaskid.task_id)}
                                                                                >
                                                                                    <AccordionSummary
                                                                                    expandIcon={<ExpandMoreIcon />}
                                                                                    >   
                                                                                        <Grid container item xs ={12}>
                                                                                            {onOpenTask.indexOf(_patterntaskid.task_id) != -1?
                                                                                                null
                                                                                            :
                                                                                                <Grid item xs ={1} container  justify="flex-start" alignItems="center">
                                                                                                    <DragHandleIcon />
                                                                                                </Grid>
                                                                                            }
                                                                                            <Grid container item xs justify = "center" alignItems = "center">
                                                                                                <Grid item xs = {12} >
                                                                                                    <Typography  data-tour = "component_pattern_title" variant = {"subtitle2"}>
                                                                                                        Learning Task
                                                                                                    </Typography>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                        
                                                                                    </AccordionSummary>
                                                                                    <AccordionDetails>
                                                                                        <Droppable 
                                                                                        droppableId = {"task_" +  _patterntaskid.task_id} 
                                                                                        type = "sub_level" 
                                                                                        isDropDisabled = {true}
                                                                                        index = {index}
                                                                                    >
                                                                                        {(provided_drop, snapshot_drop) => (
                                                                                            <div style={getListStyle(snapshot_drop.isDraggingOver)}>
                                                                                                {provided_drop.placeholder}
                                                                                                    <RootRef rootRef={provided_drop.innerRef}>
                                                                                                    <Draggable 
                                                                                                        key={_patterntaskid.id} 
                                                                                                        draggableId={"task_" + _patterntaskid.task_id} 
                                                                                                        index={index} 
                                                                                                        isDragDisabled = {!enableDrag}
                                                                                                    >
                                                                                                    {(provided, snapshot) => (
                                                                                                        <RootRef rootRef={provided.innerRef}>
                                                                                                            <LearningTaskView 
                                                                                                                provided = {provided} 
                                                                                                                snapshot = {snapshot} 
                                                                                                                taskID = {_patterntaskid.task_id} 
                                                                                                                taskData = {component.tasks.find(x => x.id == _patterntaskid.task_id)} 
                                                                                                                onEditearningTask = {onEditearningTask}
                                                                                                                duplicateLearningTask = {duplicateLearningTask}
                                                                                                                deleteLearningTask = {deleteLearningTask}
                                                                                                                moveLearningTask = {moveLearningTask}
                                                                                                                key = {index}
                                                                                                                enableDrag = {enableDrag}
                                                                                                                editBtn = {enableEdit}
                                                                                                                duplicateBtn = {enableDuplicate}
                                                                                                                deleteBtn = {enableDelete}
                                                                                                                moveBtn = {enableMove}
                                                                                                                lastestindex = {1}
                                                                                                            />
                                                                                                        </RootRef>
                                                                                                    )}
                                                                                                </Draggable>
                                                                                                </RootRef>
                                                                                            </div>
                                                                                        )}
                                                                                    </Droppable>
                                                                                    </AccordionDetails>
                                                                                </Accordion>
                                                                            </Grid>
                                                                          </div>
                                                                    )}
                                                                </Draggable>
                                                            )
                                                        }
                                                    }
                                                )
                                            }
                                            </List>
                                        </RootRef>
                                    )}
                                    </Droppable>
                            </DragDropContext>
                        </Grid>
                        <Grid container item xs ={12} justify = {"flex-end"} spacing = {2}>  
                            {
                                enableAdd?
                                <Grid item xs ={4}>
                                    <Button variant="contained" color="secondary" onClick={onClickLoadPattern} fullWidth>

                                        Add Pattern
                                    </Button>
                                </Grid>
                                :
                                null
                            }
                            {
                                enableAdd?
                                <Grid item xs ={4}>
                                    <Button variant="contained" color="primary" onClick={()=>onAddLearningTask()} fullWidth>
                                        Add Learning Task
                                    </Button>
                                </Grid>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                   

                </AccordionDetails>
            </Accordion>
            
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

            <Dialog open={editPatternOpen} onClose={onCloseLoadPattern} maxWidth = "lg" style = {{minHeight: 400}}>
                <DialogContent>
                    <Grid container item xs = {12}>
                        <TextField label = {"search text"} onChange = {onSearch} />
                    </Grid>
                    <Grid container item xs = {12} style= {{width: 1280}}>
                    {
                         patternTempOpts.map((_patternOpt, index)=>{
                            return(
                                <Grid item xs = {6}>
                                     <ComponentPatternSelectBox 
                                            index = {index}
                                            _patternOpt = {_patternOpt}
                                            selectPattern = {patternTempOpts.findIndex( x => x.id == patternTempID)}
                                            handleOnClick = {handleOnClick}
                                            handleOnSelect = {handleOnSelect}
                                        />
                                </Grid>
                             
                            );
                        })
                    }
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onCloseLoadPattern} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => saveLearningPattern()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDisplayPatternOpen} onClose={()=>setIsDisplayPatternOpen(false)} maxWidth="lg">
                {displayPatternDetail()}
            </Dialog>

            
        </React.Fragment>
    );
    
}

export default ComponentPatternTaskContainer;
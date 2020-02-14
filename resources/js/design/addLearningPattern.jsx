import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ComponentTask from './componentTask';
import Button from '@material-ui/core/Button';
import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({
    root: {
        padding: 25,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
      },
}));

const patternType = {
    "IdentifyDesignGoalsThroughClientInterview": {
        "Primary1": ["task1"],
        "Primary2": ["task1", "task2"],
        "Secondary1": ["task1", "task2", "task3", "task4"]
    },
    "IdentifyDesignGoalsThroughYoutube": {
        "Primary3": ["task 1"],
        "Primary4": ["task 1"],
        "Secondary2": ["task 1", "task 2"]
    },
    "IdentifyDesignGoalsThroughTwitter": {
        "Primary5": ["task 1"],
        "Primary6": ["task 1", "task2", "task3"],
        "Secondary3": ["task 1", "task 2"]
    }
};


const AddLearningPatternContainner = (props) => {

    const {componentData, onClose} = props;

    const classes = useStyles();
    const [selectedType, setSelectType] = React.useState("");
    const [selectedLevel, setLevel] = React.useState("");
    const [tempComponentData, setTempComponentData] = React.useState(componentData);
   
    const patternTypeOnChange = (event) => {
        setSelectType(event.target.value);
        setLevel('');
    }

    const [taskData, setTaskData] =  React.useState("");

    const { course, dispatch } = React.useContext(ContextStore);

    const patternLevelOnChange = (event) => {
        setLevel(event.target.value);   
    }

    // update the selected taskData after onChange
    React.useEffect(()=>{
        switch(props.mode){
            default:
                break;
            case "edit":
                setTaskData(componentData.tasks);
                break;
        }
        }
    , [props.mode]);

    React.useEffect(()=>{
        switch(props.mode){
            default:
            case "add":
                if(!(selectedType === "" || selectedLevel === "" )){
                    setTaskData(patternType[selectedType][selectedLevel]);
                }
                break;
        }
    }
    , [selectedType, selectedLevel]);

    
    function handleTaskUpdate(data, key){
        const temp = taskData.map( (_data,index) => {
            if(index == key){
                return data;
            }else{
                return _data
            }
        })
        setTaskData(temp);
    }

    React.useEffect(()=>{
        var temp = "";
        switch(props.mode){
            default:
            case "add":
                temp = {...componentData, tasks: [...componentData.tasks.concat(taskData)] }
                setTempComponentData(temp);
                break;
            case "edit":
                temp = {...componentData, tasks: taskData}
                setTempComponentData(temp);
                break;
        }
    }, [taskData])

    const onSaveTask = () => {
        dispatch({
            type: "UPDATE_COMPONENT",
            value: tempComponentData
        });
        onClose(); 
    }

    const displayStage0Content = () => {
        if(props.mode == "edit"){
            return null;
        }else{
            return (
                <React.Fragment>
                        <Grid container>
                        <Grid item xs={12}>
                        <h2>
                            Choose the recommended lesson pattern based on the selected engineering design and self-directed learning steps
                        </h2>
                        </Grid>
    
                        <Grid item xs={9}>
                            <Select
                            labelId="pattern-type-select-required-label"
                            id="pattern-type-select-required"
                            className={classes.selectEmpty}
                            defaultValue = ''
                            fullWidth
                            onChange = {patternTypeOnChange}
                            >
                            <MenuItem value='' disabled>
                                <em>Outcome Type</em>
                            </MenuItem>
                            {Object.keys(patternType).map( (_key, index)=>
                                <MenuItem value={_key} key={index}>
                                <em>{_key}</em>
                                </MenuItem>    
                            )}
                            </Select>
                        </Grid>
    
                        <Grid item xs={3}>
                            <Select
                            labelId="pattern-level-select-required-label"
                            id="pattern-level-select-required"
                            className={classes.selectEmpty}
                            defaultValue = {selectedType}
                            fullWidth
                            onChange = {patternLevelOnChange}
                            >
                            { selectedType !== ""? (Object.keys(patternType[selectedType]).map( (_key, index)=>
                                <MenuItem value={_key} key={index}>
                                    <em>{_key}</em>
                                </MenuItem>    
                            )): null}
                            </Select>
                        </Grid>
    
                    </Grid>
                </React.Fragment>
            );
        }
        
       
    }

    const displayStage1Content = () => {
        if(props.mode == "edit" && taskData != ""){
            return (
                <Grid container spacing={5}>
                    {taskData.map((_data, index)=>
                        <ComponentTask 
                        TaskData={_data} 
                        componentData={componentData} 
                        key={index} 
                        mode="edit" 
                        index={index}
                        handleTaskUpdate = {handleTaskUpdate}/>
                    )}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={onSaveTask}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            );
        }
        else if(selectedLevel === "" || taskData === ""){
            return (
                null
            );
        }else{
            return (
                <Grid container spacing={5}>
                    {taskData.map((_data, index)=>
                        <ComponentTask 
                        TaskData={_data} 
                        componentData={componentData} 
                        key={index} mode="edit" index={index}
                        handleTaskUpdate = {handleTaskUpdate}/>
                    )}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={onSaveTask}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            );
        }
        
    }

    return (
        <div className={classes.root}>
             <Grid container spacing={5}>
                 <Grid item xs={12}>
                    {displayStage0Content()}
                 </Grid>
                 <Grid item xs={12}>
                    {displayStage1Content()}
                 </Grid>
             </Grid>
        </div>
    );

}

export default AddLearningPatternContainner;
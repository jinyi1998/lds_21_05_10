import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ComponentTask from './componentTask';
import Button from '@material-ui/core/Button';
import {ContextStore} from '../container/designContainer'
import InstructionBox from '../components/instructionBox';
import config from 'react-global-configuration';


const LearningPatternEdit = (props) => {
    const {componentData, onClose} = props
    const [selectedPattern, setSelectedPattern] = React.useState(-1)
    const [taskData, setTaskData] = React.useState([])
    const { course, options, dispatch } = React.useContext(ContextStore);

    const patternChange = (event) => {
        setSelectedPattern(event.target.value);
    }

    React.useEffect(()=>{
        if(selectedPattern != -1){
            fetchlearningTaskByPattern(selectedPattern).then(_res => {
                setTaskData(_res);
            })
        }
       
    }, [selectedPattern])

    const onSaveTask = () => {
        let temp = componentData
        
        temp.learningOutcomes = []
        fetchlearningTaskByPattern(selectedPattern).then(taskData => {
            if(config.get('enablePattern')){
                temp.pattern = {
                    id: selectedPattern,
                    tasks: taskData
                };
            }else{
                temp.tasks = taskData;
            }
        })

        //learning outcomes
        //delete learning outcomes with component
        dispatch({
          type: "UPDATE_COMPONENT",
          value: temp
        })

        fetchlearningOutcomes(temp.id).then(learningOutcomes => {
            learningOutcomes.map(learningOutcome => {
            learningOutcome.id = -1;
            //auto match the component
            learningOutcome.componentid = temp.id;
                dispatch({
                    type: "ADD_LEARNINGOUTCOME",
                    value: learningOutcome
                })
            });
        })

        dispatch({
            type: "DELETE_LEARNINGOUTCOME_COMPONENT",
            value: temp.id
        })

        onClose();
    }

    //#region fetch data related

    async function fetchlearningTaskByPattern(id) {
        return await fetch(
            'http://'+config.get('url')+'/api/learningTask/getLearningTaskByPattern/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            return response;
        })
        .catch(error => console.log(error));
      }

      async function fetchlearningOutcomes(id) {
        return await fetch(
            'http://'+config.get('url')+'/api/learningOutcome/getLearningOutcomeByComponentTemp/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            return response;
        })
        .catch(error => console.log(error));
      }    
    //#endregion

    return (
        <React.Fragment>    
             <Grid item xs={12}>
                <InstructionBox 
                    title= "Reload your pre-defined learning tasks" 
                    content = "Current Componet has two differnet mode of learning tasks. 
                    Please select the mode you like in order to reload the learning tasks. 
                    Choose the recommended lesson pattern based on the selected engineering design and self-directed learning steps"
                    tips=""
                />
            </Grid>
    
            <Grid item xs={12}>
                <Select
                labelId="pattern-select-required-label"
                id="pattern-select-required"
                onChange = {patternChange}
                value = {selectedPattern}
                fullWidth
                >
                <MenuItem value= {-1} disabled>
                    <em>Outcome Type</em>
                </MenuItem>

                {componentData.patternOptsID.map((_opts, index)=>
                    <MenuItem value={_opts} key={index}>
                        {options.learningPatternOpts.find(x => x.id == _opts)?.description}
                    </MenuItem>
                )}
                </Select>
            </Grid>

            <Grid container item xs = {12} spacing={5}>
                {taskData?.map((_data, index)=>
                    <ComponentTask 
                    TaskData={_data} 
                    componentData={componentData} 
                    key={index} 
                    mode="view" 
                    index={index}
                    handleTaskUpdate = { ()=>{}}/>
                )}
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={onSaveTask}>
                    Save
                </Button>
            </Grid>
        </React.Fragment>  

    )
}

export default LearningPatternEdit;
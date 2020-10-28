import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import LearningTaskView from '../../task/component/learningTaskView';
import InstructionBox from '../../../components/instructionBox';


const LearningPatternEditView = (props) => {
    const {patternTempOpts, setPatternTempID} = props

    const [selectedPatternID, setSelectedPatternID] = React.useState(-1);
    
    const patternChange = (event) => {
        setSelectedPatternID(event.target.value);
        setPatternTempID(event.target.value);
    }

    return (
        <React.Fragment>    
             <Grid item xs={12}>
                <InstructionBox 
                    title= "Reload your pre-defined learning tasks" 
                    content = "Current Componet has two differnet mode of learning tasks. Please select the mode you like in order to reload the learning tasks. Choose the recommended lesson pattern based on the selected engineering design and self-directed learning steps"
                    tips=""
                />
            </Grid>
    
            <Grid item xs={12}>
                <Select
                    labelId="pattern-select-required-label"
                    id="pattern-select-required"
                    onChange = {patternChange}
                    value = {selectedPatternID}
                    fullWidth
                >
                <MenuItem value= {-1} disabled>
                    <em>Outcome Type</em>
                </MenuItem>

                {patternTempOpts.map(_pattern=>
                    <MenuItem value={_pattern.id} key={_pattern.id}>
                       {_pattern.title}
                    </MenuItem>
                )}
                </Select>
            </Grid>

            <Grid container item xs = {12} spacing={5}>
                {patternTempOpts.find(pattern=> pattern.id == selectedPatternID)?.tasks.map( 
                    _task => 
                    <LearningTaskView 
                        taskID = {_task.id} 
                        taskData = {_task} 
                        key = {_task.id}
                        editBtn = {false}
                        duplicateBtn = {false}
                        deleteBtn = {false}
                    />
                )}
            </Grid>
        </React.Fragment>  

    )
}

export default LearningPatternEditView;
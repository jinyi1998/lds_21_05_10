import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import config from 'react-global-configuration';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app'


const LearningOutcomeAddFromSelect = (props) => {
    const {onClose, componentID} = props;
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    const [learningOutcome, setLearningOutcome] = React.useState({
        id: -1,
        level: "",
        outcomeType: "",
        STEMType: [""],
        description: "",
        status: false
      });


    const outcomeSave = event => {
        // link the 
        if(learningOutcome.id != -1){
            setLoadingOpen(true);
            var json = learningOutcome;
            json["component_id"] = componentID;
            fetch(
                'http://'+config.get('url')+'/api/learningOutcome/'+ learningOutcome.id,
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
                
                refreshCourse();
                setLoadingOpen(false);
            })
            .catch(error => console.log(error));
        }
        onClose();
    }

    const onSelectChange = (event) => {
        var outcome = course.outcomes.find(_x => _x.id == event.target.value);
        setLearningOutcome(outcome);
    }

    return (
        <React.Fragment>

            <Paper style={ {padding: "16px"} }>
            

            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                </Grid>
                
                <Grid item xs={12}>
                   <Select 
                    fullWidth
                    value = {learningOutcome.id}
                    onChange = {onSelectChange}
                    >  
                       <MenuItem value = {-1} disabled>
                           Unit Level learningOutcome
                       </MenuItem>
                        {
                        course.outcomes.map(_outcome =>  
                            <MenuItem value={_outcome.id} key = {_outcome.id}>
                                {_outcome.description}
                            </MenuItem>
                        )
                        }
                      
                   </Select>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" color="primary" onClick={outcomeSave} fullWidth> 
                        save
                    </Button>
                </Grid>
            </Grid>
        </Paper> 
    </React.Fragment>
        
    );

}

export default LearningOutcomeAddFromSelect;
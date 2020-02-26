import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@material-ui/core';

import {ContextStore} from '../container/designContainer'


// learningOutcomes: [
//     {
//       id: 0,
//       level: "",
//       outcomeType: "",
//       STEMType: ["", ""],
//       description: "",
//       status: ""
//     }
//   ]
const useStyles = makeStyles(theme => ({
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

const LearningOutcomeAdd = (props) => {
    const classes = useStyles();
    const handleClose = props.onClose;
    const {handleOnSave} = props;
    const [learningOutcome, setLearningOutcome] = React.useState({
        id: -1,
        level: -1,
        outcomeType: -1,
        STEMType: [],
        description: "",
        isCourseLevel: true
      });

    const [step, setStep] = React.useState(0);
    const [state, setState] = React.useState({
        S: false,
        T: false,
        E: false,
        M: false,
      });

    const { options } = React.useContext(ContextStore);
    const learningTypeTemp = options.learningOutcomeType;

    const [learningLevelTemp, setLearningLevelTemp] = React.useState([]);
    async function fetchlearningLevelTempData(selectLearningType) {
        const res = await fetch(
            `http://localhost:8000/api/learningOutcome/getOutcomeLevel/`+selectLearningType,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
            setLearningLevelTemp(response);
        })
        .catch(error => console.log(error));
    }
    React.useEffect(() => {
        var selectLearningType = -1
        Object.keys(learningTypeTemp).map( 
            _key => {
                if(learningTypeTemp[_key].value == learningOutcome.outcomeType){
                    selectLearningType = learningTypeTemp[_key].id;
                }
        });
        fetchlearningLevelTempData(selectLearningType);
    }, [learningOutcome.outcomeType]);

    React.useEffect(() => {
        handleChange();
    }, [learningOutcome]);

    //#region action related
    const handleChange = () => {
        var stepCount = 0;
        if(learningOutcome.level != -1){
            stepCount++;
        }
        if(learningOutcome.outcomeType != -1){
            stepCount++;
        }

        setStep(stepCount);
    }


    
      const handleSTEMChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };

      const outcomeTypeOnchange = event => {
        setLearningOutcome({...learningOutcome, outcomeType: event.target.value});
      }

      const outcomeLevelOnchange = event => {
        setLearningOutcome({...learningOutcome, 
            level: event.target.value, 
            description: learningLevelTemp.find(x => x.value == event.target.value).description});
      }

      const outcomeDescchange = event => {
        setLearningOutcome({...learningOutcome, description: event.target.value});
      }

      const outcomeSave = event => {
         //binding of STEM Type to learningOutcome like object 
         const tmpSTEMType = [];
         if(learningOutcome.outcomeType == "Generic Skills"){

         }else{
            state.S == true ? tmpSTEMType.push("S") : null;
            state.T == true ? tmpSTEMType.push("T") : null;
            state.E == true ? tmpSTEMType.push("E") : null;
            state.M == true ? tmpSTEMType.push("M") : null;
         }
         //sync the record to root state
         handleOnSave({...learningOutcome, STEMType: tmpSTEMType});
         handleClose();
      }
      //#endregion
    

    //#region display related
    const displayOutcomeType = () => {
        return (
            <Grid item xs={12}>
                    <FormControl required className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Outcome Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        className={classes.selectEmpty}
                        value = {learningOutcome.outcomeType}
                        onChange = {outcomeTypeOnchange}
                        >
                            <MenuItem value='' disabled>
                                <em>Outcome Type</em>
                            </MenuItem>
                            {Object.keys(learningTypeTemp).map(_key=> 
                                (<MenuItem 
                                    value={learningTypeTemp[_key].value} 
                                    key={learningTypeTemp[_key].id}>
                                        {learningTypeTemp[_key].description}
                                </MenuItem>)
                            )}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
            </Grid>
        )
    }

    const displayOutcomeLevel = () => {
        if(step > 0){
            return (
                <Grid item xs={12}>
                    <FormControl required className={classes.formControl} fullWidth>
                        <InputLabel id="levels-label">Levels</InputLabel>
                        <Select
                        labelId="levels-label"
                        id="levels"
                        className={classes.selectEmpty}
                        defaultValue = ''
                        onChange = {outcomeLevelOnchange}
                        >
                            <MenuItem value='' disabled>
                                <em>Levels</em>
                            </MenuItem>
                            {
                                learningLevelTemp.map(_learningLevelTemp=> 
                                    (<MenuItem 
                                        value={_learningLevelTemp.value} 
                                        key={_learningLevelTemp.id}>
                                            {_learningLevelTemp.description}
                                    </MenuItem>)
                                )
                            }
                        </Select> 
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
            )
        }  
    }

    const displaySTEMOpts = () => {
        if(step > 1 && (learningOutcome.outcomeType == 1 || learningOutcome.outcomeType == 2) ){
            return (
                <Grid item xs={12}>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.S}
                                onChange={handleSTEMChange('S')}
                                value="checkedB"
                                color="primary"
                            />
                            }
                            label="Science"
                        />

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.T}
                                onChange={handleSTEMChange('T')}
                                value="checkedB"
                                color="primary"
                            />
                            }
                            label="Technology"
                        />

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.E}
                                onChange={handleSTEMChange('E')}
                                value="checkedB"
                                color="primary"
                            />
                            }
                            label="Engineering"
                        />

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.M}
                                onChange={handleSTEMChange('M')}
                                value="checkedB"
                                color="primary"
                            />
                            }
                            label="Mathamatics"
                        />
                    </FormGroup>
            </Grid>
            );
        }
    }

    const displayOutcomeDes = () => {
        if(step > 1){
            return (
                <Grid item xs={12}>
                    <TextField 
                         required
                         id="outlined-required"
                         label="Description of the outcome"
                         variant="outlined"
                         value =  {learningOutcome.description}
                         onChange = {outcomeDescchange}
                         autoFocus
                         fullWidth/>
                </Grid>
            );
        }
    }
    //#endregion

    return (
        <React.Fragment>
            <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                        Adding new learning outcome
                        </Typography>
                        <Button autoFocus color="inherit" onClick={outcomeSave}>
                        save
                        </Button>
                    </Toolbar>
            </AppBar>
            <Paper style={ {padding: "16px"} }>
            

            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                </Grid>

                {displayOutcomeType()}
                {displayOutcomeLevel()}
                {displaySTEMOpts()}
                {displayOutcomeDes()}
                
            </Grid>
        </Paper> 
        </React.Fragment>
        
    );

}

export default LearningOutcomeAdd;
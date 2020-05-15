import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
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
import config from 'react-global-configuration';
import {ContextStore} from '../../container/designContainer'
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const LearningOutcomeEdit = (props) => {
    const classes = useStyles();
    const handleClose = props.onClose;
    const {handleOnSave, courseID, componentID, outcomeID} = props;
    const { course, refreshCourse } = React.useContext(ContextStore);
    const [checked, setChecked] = React.useState(false);


    const [learningOutcome, setLearningOutcome] = React.useState({
        level: "",
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        unit_outcomeid: -1
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
            'http://'+config.get('url')+'/api/learningOutcome/getOutcomeLevel/'+selectLearningType,
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

    React.useEffect(()=>{
        if(outcomeID == -1){
            setLearningOutcome({
                level: -1,
                outcomeType: -1,
                STEMType: "",
                description: "",
                isCourseLevel: true,
                unit_outcomeid: -1
            });
        }else{
            setLearningOutcome({
                ...props.learningOutcome,
                unit_outcomeid: props.learningOutcome.unit_outcomeid.unit_outcomeid
            });
        } 
    }, [outcomeID]);

    React.useEffect(()=>{
        var STEMArr = learningOutcome.STEMType.replace(" ","").split(",");
        var tempState = {
            S: false,
            T: false,
            E: false,
            M: false,
          }
        STEMArr.map(
            _x => 
            {
                switch(_x){
                    case "S":
                        tempState["S"] = true;
                        break;
                    case "T":
                        tempState["T"] = true;
                        break;
                    case "E":
                        tempState["E"] = true;
                        break;
                    case "M":
                        tempState["M"] = true;
                        break;
                }
            }
        )
        setState(tempState)
    }, [learningOutcome.STEMType]);

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

    React.useEffect(()=>{
        var clo = course.outcomes.find(x=> x.id == learningOutcome.unit_outcomeid);
        if(typeof clo != 'undefined'){
            setLearningOutcome({
                ...clo,
                isCourseLevel: false,
                unit_outcomeid: clo.id
             });
        }
      
    }, [checked]);

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
        setLearningOutcome({...learningOutcome, 
            outcomeType: event.target.value, 
            level: "", 
            description: ""
        })
    }

    // const outcomeLevelOnchange = event => {
    //     setLearningOutcome({...learningOutcome, 
    //         level: event.target.value, 
    //         // description: learningLevelTemp.find(x => x.value == event.target.value).description
    //         description: event.target.value
    //     });
    // }
    const outcomeLevelOnchange = event => {
        setLearningOutcome({...learningOutcome, 
            level: event.target.value, 
        });
    }

    const outcomeDescchange = value => {
   
        setLearningOutcome({...learningOutcome, description:value});
    }

    const unitOutcomeChange = event => {
        setLearningOutcome({...learningOutcome, 
            unit_outcomeid: event.target.value, 
        });
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

        var json = learningOutcome;
        json["STEMType"] = tmpSTEMType.join(" ,");
        if(componentID != -1 && typeof componentID != "undefined"){
            json["component_id"] = componentID;
            json["isCourseLevel"] = false;
        }else if(courseID != -1 || typeof componentID == "undefined"){
            json["isCourseLevel"] = true;
            json["course_id"] = courseID;
        }
        if(outcomeID == -1){
            fetch(
                'http://'+config.get('url')+'/api/learningOutcome',
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
                
                refreshCourse();
            })
            .catch(error => console.log(error));
        }else{
            fetch(
                'http://'+config.get('url')+'/api/learningOutcome/'+ outcomeID,
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
            })
            .catch(error => console.log(error));
        }
       

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
                        disabled = {checked}
                        >
                            <MenuItem value={-1} disabled>
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
                <React.Fragment>

                    <Grid item xs={12}>
                        <FormControl required className={classes.formControl} fullWidth>
                            <InputLabel id="levels-label">Bloom Taxonomy Level</InputLabel>
                            <Select
                            labelId="levels-label"
                            id="levels"
                            className={classes.selectEmpty}
                            value = {learningOutcome.level}
                            onChange = {outcomeLevelOnchange}
                            disabled = {checked}
                            >
                                <MenuItem value='' disabled>
                                    <em>Levels</em>
                                </MenuItem>
                                {
                                    learningLevelTemp.map(_learningLevelTemp=> 
                                        (<MenuItem 
                                            value={_learningLevelTemp.description} 
                                            key={_learningLevelTemp.id}>
                                                {_learningLevelTemp.description}
                                        </MenuItem>)
                                    )
                                }
                            </Select> 
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </Grid>
                </React.Fragment>
            )
        }  
    }

    const displayParentUnitOutcome = () => {
        if(step > 0 && componentID != -1 && typeof componentID != "undefined"){
            return (
                <React.Fragment>

                    <Grid item xs={8}>
                        <FormControl required className={classes.formControl} fullWidth>
                            <InputLabel id="unit-label">Unit Level Learning Outcome</InputLabel>
                            <Select
                            labelId="unit-label"
                            id="unit"
                            className={classes.selectEmpty}
                            value = {learningOutcome.unit_outcomeid}
                            onChange = {unitOutcomeChange}
                            disabled = {checked}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Unit Level Learning Outcomes</em>
                                </MenuItem>
                                {
                                    course.outcomes.map(ulo=> 
                                        (<MenuItem 
                                            value={ulo.id} 
                                            key={ulo.id}>
                                                {ulo.description}
                                        </MenuItem>)
                                    )
                                }
                            </Select> 
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={()=> setChecked(!checked)}
                                color="primary"
                            />
                            }
                            label="Same As Unit Level Outcome"
                        />
                    </Grid>
                </React.Fragment>
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
                                disabled = {checked}
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
                                disabled = {checked}
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
                                disabled = {checked}
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
                                disabled = {checked}
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
            var autoString = learningLevelTemp.find(x => x.description == learningOutcome.level)? learningLevelTemp.find(x => x.description == learningOutcome.level).value : [];
            return (
                <Grid item xs={12}>
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={autoString}
                            value =  {learningOutcome.description}  
                            onInputChange={(event, newInputValue) => {
                                outcomeDescchange(newInputValue);
                              }}
                            renderInput={(params) => (
                                <TextField 
                                {...params}
                                label="Description of the outcome"
                                variant="outlined"
                                disabled = {checked}
                                fullWidth/>
                            )}
                        />
{/*  
                    <TextField 
                         required
                         id="outlined-required"
                         label="Description of the outcome"
                         variant="outlined"
                         autoComplete = {autoString}
                         value =  {learningOutcome.description}
                         onChange = {outcomeDescchange}
                         autoFocus
                         fullWidth/> */}
                </Grid>
            );
        }
    }
    //#endregion

    return (
        <React.Fragment>
            
            <Paper style={ {padding: "16px"} }>
            

            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                </Grid>
                {displayParentUnitOutcome()}
                {displayOutcomeType()}
                {displayOutcomeLevel()}
                {displaySTEMOpts()}
                {displayOutcomeDes()}
                
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

export default LearningOutcomeEdit;
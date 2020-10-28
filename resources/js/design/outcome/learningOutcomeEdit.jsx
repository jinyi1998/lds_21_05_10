import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@material-ui/core';
import config from 'react-global-configuration';

import Autocomplete from '@material-ui/lab/Autocomplete';
import validator from 'validator';

import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app'

import {
    apiLearningOutcomeGetOutcomeLevel, apiLearningOutcomePost, apiLearningOutcomePut
} from '../../api.js';

import QuestionHint from '../../components/questionHint';
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
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
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
    

    const [ error, setError] = React.useState({
        level: "",
        outcomeType: "",
        STEMType: "",
        description: "",
        unit_outcomeid: ""
    });

    const { options, setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
    const learningTypeTemp = options.learningOutcomeType;

    const [learningLevelTemp, setLearningLevelTemp] = React.useState([]);
    
    async function fetchlearningLevelTempData(selectLearningType) {
        await apiLearningOutcomeGetOutcomeLevel(selectLearningType)
        .then(response =>  {
            setLearningLevelTemp(response.data);
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
        }else if(componentID != -1 && typeof componentID != "undefined"){
            setLearningOutcome({
                ...props.learningOutcome,
                unit_outcomeid: props.learningOutcome.unit_outcomeid.unit_outcomeid
            });
        }else{
            setLearningOutcome({
                ...props.learningOutcome,
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
            // tourNextStep();
            stepCount++;
        }
        if(learningOutcome.outcomeType != -1){
            // tourNextStep();
            stepCount++;
        }
        setStep(stepCount);
    }

    const handleSTEMChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const outcomeTypeOnchange = event => {
        tourNextStep();
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
        json["outcome_id"] = outcomeID;
        if(componentID != -1 && typeof componentID != "undefined"){
            json["component_id"] = componentID;
            json["isCourseLevel"] = false;
        }else if(courseID != -1 || typeof componentID == "undefined"){
            json["isCourseLevel"] = true;
            json["course_id"] = courseID;
        }

        setLoadingOpen(true);
        if(outcomeID == -1){
           
            apiLearningOutcomePost(json)
            .then( () => {
                setLoadingOpen(false)
                displayMsg("success", "Outcome Added");
                refreshCourse();
            })
            .catch(error => {
                setLoadingOpen(false);
                displayMsg("error", "Error Occured");
                console.log(error)
            });
    
        }else{
            apiLearningOutcomePut(json)
            .then( ()=> {
                setLoadingOpen(false)
                displayMsg("success", "Outcome Updated");
                refreshCourse()
            })
            .catch(error => {
                setLoadingOpen(false);
                displayMsg("error", "Error Occured");
                console.log(error)
            });
        }
        handleClose();
    }

    const onClickSave = event => {
        if(validate()){
            outcomeSave(event);
        }else{
            //
        }
    }

    const validate = () => {
        var validated = true;
        var tempError = {
            level: "",
            outcomeType: "",
            STEMType: "",
            description: "",
            unit_outcomeid: ""
        }

        if(validator.isEmpty(learningOutcome.level.toString())){
            tempError["level"] = "Please enter the outcome level";
            validated = false;
          }
      
        if(validator.isEmpty(learningOutcome.outcomeType.toString()) || learningOutcome.outcomeType == -1){
            tempError["outcomeType"] = "Please enter the outcome type";
            validated = false;
        }
    
        if(validator.isEmpty(learningOutcome.description.toString())){
            tempError["description"] = "Please enter the description";
            validated = false;
        }
        
        if(componentID != -1 && typeof componentID != "undefined"){
            if(learningOutcome.unit_outcomeid == -1){
                tempError["unit_outcomeid"] = "Please enter the parent ulo";
                validated = false;
            }
        }
    
    
        setError(tempError);
        return validated;
    }
    //#endregion
    

    //#region display related
    const displayOutcomeType = () => {
        return (
            <Grid item xs={12}>
                    <FormControl required className={classes.formControl} fullWidth   error = {error['outcomeType'] != ""} >
                        <InputLabel id="demo-simple-select-required-label">Outcome Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        data-tour = "lo_edit_type"
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
                        <FormHelperText>
                            <React.Fragment>
                            {error['outcomeType'] ==""? "Required": error['outcomeType']}
                            <QuestionHint title = {
                                <React.Fragment>
                                There are three types of learning outcomes: disciplinary knowledge, disciplinary skills and generic skills.
                                <br/>
                                Disciplinary knowledge generally refers to the facts, concepts, theories, and principles that are taught and learned in specific subjects/disciplines.
                                <br/>
                                Disciplinary skills are about the ability to perform a task, such as reading, writing, and calculating.
                                <br/>
                                Generic skills are often referred to as 21st century skills, includes communication, collaboration, critical thinking, creativity, problem solving, and self-directed learning.
                                </React.Fragment>
                            }/>
                            </React.Fragment>
                        </FormHelperText>
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
                            <InputLabel id="levels-label">
                                Bloom Taxonomy Level
                            </InputLabel>
                            <Select
                            labelId="levels-label"
                            id="levels"
                            data-tour = "lo_edit_level"
                            className={classes.selectEmpty}
                            value = {learningOutcome.level}
                            onChange = {outcomeLevelOnchange}
                            disabled = {checked}
                            error = {error['level']!=""}
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
                           
                            <FormHelperText>
                                <React.Fragment>
                                {error['level'] == "" ? "Required" : error['level']}
                                <QuestionHint title = {
                                    <React.Fragment>
                                        It is also very important to make learning outcomes realistic and can be assessed. 
                                        <br/>
                                        Teachers need to consider the level of achievement to be reached. LDS uses the Bloom’s Taxonomy to help teachers specify the level of outcome targeted.
                                    </React.Fragment>
                                } />
                                </React.Fragment>
                            </FormHelperText>
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
                            data-tour = "lo_edit_unit"
                            className={classes.selectEmpty}
                            value = {learningOutcome.unit_outcomeid}
                            onChange = {unitOutcomeChange}
                            disabled = {checked}
                            error = {error['unit_outcomeid']!=""}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Unit Level Learning Outcomes</em>
                                </MenuItem>
                                {
                                    course.outcomes.filter(ulo => ulo.outcomeType == learningOutcome.outcomeType)?.length > 0? 
                                        course.outcomes.filter(ulo => ulo.outcomeType == learningOutcome.outcomeType).map(ulo=> 
                                        (<MenuItem 
                                            value={ulo.id} 
                                            key={ulo.id}>
                                                {ulo.description}
                                        </MenuItem>))
                                        :
                                        // <MenuItem value = ""  disabled>
                                        //         No corresponding unit learning outcome.
                                        // </MenuItem>
                                        null
                                }
                            </Select> 
                            <FormHelperText>
                                <React.Fragment>
                                    <QuestionHint title = {
                                        <React.Fragment>
                                            You need to associate this newly added learning outcomes to one of the unit level learning outcomes you set in the previous step.
                                        </React.Fragment>} 
                                    />
                                    {error['unit_outcomeid']==""? "Required": error['unit_outcomeid']}
                                </React.Fragment>
                            
                            </FormHelperText>
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
                            label = 
                            {
                                <React.Fragment>
                                    Same As Unit Level Outcome
                                     <QuestionHint title = {
                                        <React.Fragment>
                                           You may wish check this box if the unit learning outcomes cannot be divided into several component learning outcomes.
                                        </React.Fragment>} 
                                    />
                                </React.Fragment>
                            }
                        />
                    </Grid>
                </React.Fragment>
            )
        }  
    }

    const displaySTEMOpts = () => {
        if(step > 1 && (learningOutcome.outcomeType == 1 || learningOutcome.outcomeType == 2) ){
            return (
                <Grid item xs={12} data-tour = "lo_edit_STEM">
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
                            label="Mathametics"
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
                <Grid item xs={12} data-tour = "lo_edit_description">
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
                                    fullWidth
                                    error = {error['description']!=""}
                                    helperText={error['description'] == ""? "Required": error['description']}
                                />
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
                {displayOutcomeType()}
                {displayParentUnitOutcome()}
                {displayOutcomeLevel()}
                {displaySTEMOpts()}
                {displayOutcomeDes()}
                
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" color="primary" onClick={onClickSave} fullWidth> 
                        save
                    </Button>
                </Grid>
            </Grid>
        </Paper> 
        </React.Fragment>
        
    );

}

export default LearningOutcomeEdit;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { Grid, Paper } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Autocomplete from '@material-ui/lab/Autocomplete';
import validator from 'validator';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app'
import SLOContainer from './SLOContainer';
import {
    apiLearningOutcomePost, apiLearningOutcomePut
} from '../../../api.js';

import QuestionHint from '../../../components/questionHint';
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

const LearningOutcomeEditContainer = (props) => {
    const classes = useStyles();
    const handleClose = props.onClose;
    const { handleOnSave, componentID, outcomeID} = props;
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { options, setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const loinit = {
        level: -1,
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        unit_outcome_id: -1,
        slo_outcome: []
    }
    const [learningOutcome, setLearningOutcome] = React.useState(loinit);

    const [step, setStep] = React.useState(0);
    const [state, setState] = React.useState(initSTEMState);
    

    const [ error, setError] = React.useState({
        level: "",
        outcomeType: "",
        STEMType: "",
        description: "",
        unit_outcome_id: ""
    });

    const [ autoString, setAutoString ] = React.useState([]);
    const [ hasSLO, setHasSLO ] = React.useState(false);

    const outcomeTypes = options.outcomeTypeOpts;
    const bloomLevelOpts = options.bloomLvlOpts;
    const stemTypes = options.STEMTypeOpts;

    React.useEffect(()=>{
        if(outcomeID == -1){
            //new
            setLearningOutcome(loinit);
        }else{
            //update
            setLearningOutcome({
                ...props.learningOutcome,
            });
            if(props.learningOutcome.slo_outcome.length > 0){
                setHasSLO(true);
            }
        }
    }, [outcomeID]);

    React.useEffect(()=>{
        var STEMArr = learningOutcome.stemtypesid? learningOutcome.stemtypesid.map( _stem => _stem.stem_type_id) : [];
        var tempState = {};
        STEMArr.map( _stem => {
            {
                tempState[_stem.id]= false
            }
        });

        STEMArr.map(
            _x => 
            { 
                tempState[_x] = true;
            }
        )
        setState(tempState)
    }, [learningOutcome.stemtypesid]);

    React.useEffect(() => {
        handleChange();
    }, [learningOutcome]);

    React.useEffect(()=>{
        var temp = bloomLevelOpts.find(x => x.id == learningOutcome.bloom_id)? 
            bloomLevelOpts.find(x => x.id == learningOutcome.bloom_id).verbs.map(x => x.name) 
            : 
            [];
        temp = temp.filter(x => x.toLocaleUpperCase().indexOf(learningOutcome.description.toLocaleUpperCase()) != -1);
        setAutoString(temp)
    }, [learningOutcome.bloom_id, learningOutcome.description])

    //#region action related
    const initSTEMState = () => {
        var tempState = {};
        stemTypes.map( _stem => {
            {
                tempState[_stem.id]= false
            }
        });
        return tempState;
    }

    const handleChange = () => {
        var stepCount = 0;
        if(learningOutcome.bloom_id != -1){
            // tourNextStep();
            stepCount++;
        }
        if(learningOutcome.outcomeType != -1){
            // tourNextStep();
            stepCount++;
        }
        setStep(stepCount);
    }

    const handleSTEMChange = id => event => {
        setState({ ...state, [id]: event.target.checked });
    };

    const handleHasSLOChange = event => {
        setHasSLO(event.target.checked);
    }

    const outcomeTypeOnchange = event => {
        tourNextStep();
        setLearningOutcome({...learningOutcome, 
            outcomeType: event.target.value, 
        })
    }

    const outcomeLevelOnchange = event => {
        setLearningOutcome({...learningOutcome, 
            bloom_id: event.target.value, 
        });
    }

    const outcomeDescchange = value => {
        setLearningOutcome({...learningOutcome, description:value});
    }

    const outcomeSave = event => {
        //binding of STEM Type to learningOutcome like object 
        const tmpSTEMType = [];
        if(learningOutcome.outcomeType == 3){

        }else{
            Object.keys(state).map(
                _key => {
                    state[_key]?  tmpSTEMType.push(_key) : null;
                }
            )
        }
        //sync the record to root state

        var json = JSON.parse(JSON.stringify(learningOutcome));

        json["stemtypes_id"] = tmpSTEMType;
        json["outcome_id"] = outcomeID;
        json["isCourseLevel"] = true;
        json["course_id"] = course.id;
       

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

    const handleSLOSave = (slo, mode = "edit") => {

        var temp = JSON.parse(JSON.stringify(learningOutcome.slo_outcome))
        var index = temp.findIndex(_slo => _slo.id == slo.id);
        var del = index > -1? 1 : 0;
        if(index > -1  && mode == "edit"){
            temp.splice(index, del, slo);
        }else{
            temp.push(slo);
        }
        setLearningOutcome({...learningOutcome, slo_outcome: temp});
    }


    const handleSLODelete = (slo) => {
        var temp = JSON.parse(JSON.stringify(learningOutcome.slo_outcome))
        var index = temp.findIndex(_slo => _slo.id == slo.id && _slo.description == slo.description);
        var del = index > -1? 1 : 0;
       
        temp.splice(index, del);
        setLearningOutcome({...learningOutcome, slo_outcome: temp});
    }

    const validate = () => {
        var validated = true;
        var tempError = {
            level: "",
            outcomeType: "",
            STEMType: "",
            description: "",
            unit_outcome_id: ""
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
    
        setError(tempError);
        return validated;
    }
    //#endregion
    

    //#region display related
    const displayOutcomeType = () => {
        return (
            <Grid item xs={12}>
                    <FormControl required className={classes.formControl} fullWidth   error = {error['outcomeType'] != ""} >
                        <FormLabel>
                            What do you think are the most important knowledge, skills, or generic skills in the unit that you are teaching?
                        </FormLabel >
                        <RadioGroup
                            data-tour = "lo_edit_type"
                            value = {learningOutcome.outcomeType}
                            onChange = {outcomeTypeOnchange}
                            row
                        >
                            {
                                outcomeTypes.map(_outcomeType => 
                                    <FormControlLabel 
                                        key={_outcomeType.id} 
                                        checked = {_outcomeType.id == learningOutcome.outcomeType}
                                        value={_outcomeType.id} 
                                        control={<Radio />} 
                                        label={
                                            <React.Fragment>
                                                    {_outcomeType.name}
                                                    <QuestionHint title = {_outcomeType.hint}/>
                                            </React.Fragment>
                                        }
                                    />
                                )
                            }
                        </RadioGroup>

                        <FormHelperText>
                            <React.Fragment>
                            {error['outcomeType'] ==""? "Required": error['outcomeType']}
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
                                Which level do you want to focus on for this learning outcome 
                            </InputLabel>
                            <Select
                                labelId="levels-label"
                                id="levels"
                                data-tour = "lo_edit_level"
                                className={classes.selectEmpty}
                                value = {learningOutcome.bloom_id}
                                onChange = {outcomeLevelOnchange}
                                error = {error['level']!=""}
                            >
                                <MenuItem value='' disabled>
                                    <em>Levels</em>
                                </MenuItem>
                                {
                                    bloomLevelOpts.map(_bloomLevel=> 
                                        (<MenuItem 
                                            value={_bloomLevel.id} 
                                            key={_bloomLevel.id}
                                        >
                                            {_bloomLevel.name}
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

    const displaySTEMOpts = () => {
        if(step > 1 && (learningOutcome.outcomeType == 1 || learningOutcome.outcomeType == 2) ){
            return (
                <Grid item xs={12} data-tour = "lo_edit_STEM">
                    <InputLabel id="stem-type-label">
                        Which discipline do you want to focus on for this learning outcome?
                    </InputLabel>
                    <FormGroup row>
                        {
                            stemTypes.map(
                                _stemTypes => 
                                <FormControlLabel
                                    key = {_stemTypes.id}
                                    control={
                                        <Checkbox
                                            checked={state[_stemTypes.id]}
                                            onChange={handleSTEMChange(_stemTypes.id)}
                                            color="primary"
                                        />
                                    }
                                    label={_stemTypes.name}
                                />
                            )
                        }
                    </FormGroup>
            </Grid>
            );
        }
    }

    const displayOutcomeDes = () => {
        if(step > 1){
           
            return (
                <Grid item xs={12} data-tour = "lo_edit_description">
                        <InputLabel id="description-label">
                            How do you describe the details of the learning outcome?
                        </InputLabel>
                        <Autocomplete
                            freeSolo
                            includeInputInList
                            options={autoString}
                            autoComplete
                            value =  {learningOutcome.description}  
                            onInputChange={(event, newInputValue) => {
                                outcomeDescchange(newInputValue);
                              }}
                            renderInput={(params) => (
                                <TextField 
                                    {...params}
                                    label="Description of the outcome"
                                    variant="outlined"
                                    fullWidth
                                    error = {error['description']!=""}
                                    helperText={error['description'] == ""? "Required": error['description']}
                                />
                            )}
                        />
                </Grid>
            );
        }
    }

    const displaySLO = () => {
        if(step > 1){
            return(
                <React.Fragment>
                    {
                        <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasSLO}
                                // onChange={handleSTEMChange(_stemTypes.id)}
                                onChange={handleHasSLOChange}
                                color="primary"
                            />
                        }
                        label={"Do you want to create sub learning outcome(s), for this learning outcome?"}
                        />
                    }
                    {
                        hasSLO?
                        <React.Fragment>
                        {learningOutcome.slo_outcome?.map( _slo => 
                            <React.Fragment>
                                <SLOContainer 
                                    slo = {_slo} 
                                    handleSLOSave = {handleSLOSave}
                                    handleSLODelete = {handleSLODelete}
                                    component_id = {componentID}
                                />
                            </React.Fragment>
                        )}
                        <SLOContainer 
                            slo = {{
                                id: -1, 
                                description: "",
                                bloom_id: learningOutcome.bloom_id,
                                outcomeType: learningOutcome.outcomeType,
                                STEMType: ""
                            }} 
                            uloid = {learningOutcome.id}
                            component_id = {componentID}
                            handleSLOSave = {handleSLOSave}
                            handleSLODelete = {handleSLODelete}
                        />
                        </React.Fragment>
                        :
                        null

                    }
                </React.Fragment>
            )
        }
    }
    //#endregion

    return (
        <React.Fragment>
            
            <Paper style={ {padding: "64px"} }>
            

            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                </Grid>

                {displayOutcomeType()}
                {displayOutcomeLevel()}
                {displaySTEMOpts()}
                {displayOutcomeDes()}
                {displaySLO()}
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

export default LearningOutcomeEditContainer;
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Autocomplete from '@material-ui/lab/Autocomplete';

import validator from 'validator';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import SLOTemplateBuilderContainer from '../container/SLOTemplateBuilderContainer';
import {AppContextStore} from '../../../container/app';


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


const OutcomeTemplateEditView = (props) => {
    const classes = useStyles();
    const { options } = React.useContext(AppContextStore);

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
    const [ step, setStep ] = React.useState(0);
    const [ state, setState ] = React.useState(initSTEMState());
    const [ autoString, setAutoString ] = React.useState([]);
    const [ hasSLO, setHasSLO ] = React.useState(false);
    const [ error, setError] = React.useState({
        level: "",
        outcomeType: "",
        STEMType: "",
        description: "",
        unit_outcome_id: ""
    });


    const outcomeTypes = options.outcomeTypeOpts;
    const bloomLevelOpts = options.bloomLvlOpts;
    const stemTypes = options.STEMTypeOpts;

    //#region React useEffect Related
    React.useEffect(()=>{
        if(typeof props.outcome != 'undefined'){
            if(props.outcome.slo_outcome?.length > 0){
                setHasSLO(true);
            }
            if(typeof props.component_id != "undefined"){
                setLearningOutcome({
                    ...props.outcome,
                    // unit_outcome_id: props.outcome.unit_outcomeid_temp.unit_outcome_id
                });
            }else{
                setLearningOutcome({
                    ...props.outcome,
                });
            }
        }
    }, [props.outcome, props.component_id])

    // React.useEffect (()=>{
    //     console.log(learningOutcome); 
    //     console.log(stemTypes);
    //     console.log(state);
    // }, [learningOutcome])

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
    }, [learningOutcome.level, learningOutcome.description])

    React.useEffect(()=>{
        var STEMArr = learningOutcome.stemtypesid? learningOutcome.stemtypesid.map( _stem => _stem.stem_type_id) : [];
        var tempState = {};
        stemTypes.map( _stem => {
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
    }, [learningOutcome.STEMType]);
    //#endregion

    //#region action related

    function initSTEMState (){
        var tempState = {};
        options.STEMTypeOpts.map( _stem => {
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


    const outcomeTypeOnchange = event => {
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

        var outcome = JSON.parse(JSON.stringify(learningOutcome));
        // outcome["STEMType"] = tmpSTEMType.join(" ,");
        outcome["stemtypes_id"] = tmpSTEMType;
        outcome["id"] = learningOutcome.id;
        outcome["isCourseLevel"] = true;
        if(typeof props.designtype_id != "undefined"){
            outcome["designtype_id"] = props.designtype_id ;
            // json["course_id"] = courseID;
        }
        props.onSaveOutcome(outcome)
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
            // var autoString = bloomLvlOpts.find(x => x.description == learningOutcome.level)? bloomLvlOpts.find(x => x.description == learningOutcome.level).value : [];
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
                                {/* { _slo.description} */}
                                <SLOTemplateBuilderContainer 
                                    slo = {_slo} 
                                    component_id = {props.component_id}
                                    handleSLOSave = {handleSLOSave}
                                    handleSLODelete = {handleSLODelete}
                                />
                            </React.Fragment>
                        )}
                        <SLOTemplateBuilderContainer 
                            slo = {{
                                id: -1, 
                                description: "",
                                bloom_id: learningOutcome.bloom_id,
                                outcomeType: learningOutcome.outcomeType,
                                STEMType: ""
                            }} 
                            component_id = {props.component_id}
                            handleSLOSave = {handleSLOSave}
                            handleSLODelete = {handleSLODelete}
                        />
                        </React.Fragment>
                        :
                        null

                    }
                </React.Fragment>

// handleSLOSave = {handleSLOSave}
// handleSLODelete = {handleSLODelete}
            )
        }
    }
    //#endregion

    return (
        <React.Fragment>
              <DialogTitle>{learningOutcome.id == -1? "Add Learning Outcome" : "Edit Learning Outcome"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning outcome for this component...
                    </DialogContentText>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                        </Grid>
                        {displayOutcomeType()}
                        {displayOutcomeLevel()}
                        {displaySTEMOpts()}
                        {displayOutcomeDes()}
                        {displaySLO()}
                    </Grid>
                </DialogContent>
        
                <DialogActions>
                    <Button onClick = {() => {props.setOpenOutcomeEdit(false)}}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick = {outcomeSave}>
                        Save
                    </Button>
                </DialogActions>
        </React.Fragment>
        
    );
}

export default OutcomeTemplateEditView;
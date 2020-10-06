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

import Autocomplete from '@material-ui/lab/Autocomplete';

import validator from 'validator';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {AppContextStore} from '../../../container/app';

import {apiLearningOutcomeGetOutcomeLevel } from '../../../api';

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
    const [checked, setChecked] = React.useState(false);
    
    
    const [learningOutcome, setLearningOutcome] = React.useState({
        level: "",
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        unit_outcome_id: -1
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
        unit_outcome_id: ""
    });

    const { options } = React.useContext(AppContextStore);
    const learningTypeTemp = options.learningOutcomeType;
    const [learningLevelTemp, setLearningLevelTemp] = React.useState([]);

    React.useEffect(()=>{
        if(typeof props.outcome != 'undefined'){
            if(typeof props.component_id != "undefined"){
                setLearningOutcome({
                    ...props.outcome,
                    unit_outcome_id: props.outcome.unit_outcomeid_temp.unit_outcome_id
                });
            }else{
                setLearningOutcome({
                    ...props.outcome,
                });
            }
        }
    }, [props.outcome, props.component_id])

    React.useEffect (()=>{console.log(learningOutcome); console.log(learningOutcome.unit_outcome_id)}, [learningOutcome])

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
        
        var clo_ori = props.unitOutcomeOpts.find(x=> x.id == learningOutcome.unit_outcome_id);
        if(typeof clo_ori != 'undefined'){
            var clo = JSON.parse(JSON.stringify(clo_ori));
            delete clo.id;
            setLearningOutcome({
                ...clo,
                id: learningOutcome.id,
                isCourseLevel: false,
                unit_outcome_id: learningOutcome.unit_outcome_id
                // unit_outcome_id: learningOutcome.unit_outcome_id
                });
        }
        
    }, [checked]);

    async function fetchlearningLevelTempData(selectLearningType) {
        await apiLearningOutcomeGetOutcomeLevel(selectLearningType)
        .then(response =>  {
            setLearningLevelTemp(response.data);
        })
        .catch(error => console.log(error));
    }

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

    const outcomeLevelOnchange = event => {
        setLearningOutcome({...learningOutcome, 
            level: event.target.value, 
        });
    }

    const outcomeDescchange = value => {
    
        setLearningOutcome({...learningOutcome, description:value});
    }

    const unitOutcomeChange = event => {
        setLearningOutcome({
            ...learningOutcome, 
            unit_outcome_id: event.target.value, 
        });
    }

    const outcomeSave = event => {
        //binding of STEM Type to learningOutcome like object 
        if(validate()){
            const tmpSTEMType = [];
            if(learningOutcome.outcomeType == "Generic Skills"){
    
            }else{
                state.S == true ? tmpSTEMType.push("S") : null;
                state.T == true ? tmpSTEMType.push("T") : null;
                state.E == true ? tmpSTEMType.push("E") : null;
                state.M == true ? tmpSTEMType.push("M") : null;
            }
    
            var outcome = learningOutcome;
            outcome["STEMType"] = tmpSTEMType.join(" ,");
            outcome["outcome_id"] = learningOutcome.id;
            if(typeof props.component_id != "undefined"){
                outcome["component_id"] = props.component_id;
                outcome["isCourseLevel"] = false;
            }else if(typeof props.designtype_id != "undefined"){
                outcome["isCourseLevel"] = true;
                outcome["designtype_id"] = props.designtype_id ;
                // json["course_id"] = courseID;
            }
            props.onSaveOutcome(outcome)
        }
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
        
        // if(componentID != -1 && typeof componentID != "undefined"){
        //     if(learningOutcome.unit_outcome_id == -1){
        //         tempError["unit_outcome_id"] = "Please enter the parent ulo";
        //         validated = false;
        //     }
        // }
    
    
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
                                </React.Fragment>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </React.Fragment>
            )
        }  
    }

    const displayParentUnitOutcome = () => {
        if(step > 0 && typeof props.component_id != "undefined"){
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
                            value = {learningOutcome.unit_outcome_id}
                            onChange = {unitOutcomeChange}
                            disabled = {checked}
                            error = {error['unit_outcome_id']!=""}
                            >
                                <MenuItem value={-1} disabled>
                                    <em>Unit Level Learning Outcomes</em>
                                </MenuItem>
                                {
                                    props.unitOutcomeOpts.filter(ulo => ulo.outcomeType == learningOutcome.outcomeType)?.length > 0? 
                                        props.unitOutcomeOpts.filter(ulo => ulo.outcomeType == learningOutcome.outcomeType).map(ulo=> 
                                        (<MenuItem 
                                            value={ulo.id} 
                                            key={ulo.id}>
                                                {ulo.description}
                                        </MenuItem>))
                                        :
                                        <MenuItem value = ""  disabled>
                                                No corresponding unit learning outcome.
                                        </MenuItem>
                                }
                            </Select> 
                            <FormHelperText>
                                <React.Fragment>
                                    {error['unit_outcome_id']==""? "Required": error['unit_outcome_id']}
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
                </Grid>
            );
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
                        {displayParentUnitOutcome()}
                        {displayOutcomeLevel()}
                        {displaySTEMOpts()}
                        {displayOutcomeDes()}
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
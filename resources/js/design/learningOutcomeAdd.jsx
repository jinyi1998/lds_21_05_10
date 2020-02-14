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
import { Grid } from '@material-ui/core';


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
        level: "",
        outcomeType: "",
        STEMType: ["", ""],
        description: "",
        isCourseLevel: true
      });

    const [state, setState] = React.useState({
        S: true,
        T: true,
        E: true,
        M: true,
      });

      const [learningTypeTemp, setLearningTypeTemp] = React.useState({});
      async function fetchlearningTypeTempData() {

        const res = await fetch(
            `http://localhost:8000/api/learningOutcome/getOutcomeType/`,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
            setLearningTypeTemp(response);
        })
        .catch(error => console.log(error));

    }
    
    React.useEffect(() => {
       fetchlearningTypeTempData();
    }, []);


    const [learningLevelTemp, setLearningLevelTemp] = React.useState([]);
    async function fetchlearningLevelTempData(selectLearningType) {
        console.log(selectLearningType);
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
                    console.log(learningTypeTemp[_key].value);
                    selectLearningType = learningTypeTemp[_key].id;
                }
        });
        fetchlearningLevelTempData(selectLearningType);
    }, [learningOutcome.outcomeType]);


    
      const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };

      const outcomeTypeOnchange = event => {
        setLearningOutcome({...learningOutcome, outcomeType: event.target.value});
      }

      const outcomeLevelOnchange = event => {
        setLearningOutcome({...learningOutcome, level: event.target.value});
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


    return (
        <div>
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

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h5>Add learning outcomes that specify what learners will be able to do after this unit.</h5>
                </Grid>

                <Grid item xs={6}>
                    <FormControl required className={classes.formControl}>
                        <InputLabel id="demo-simple-select-required-label">Outcome Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        className={classes.selectEmpty}
                        defaultValue = ''
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

                <Grid item xs={6}>
                   
                    <FormControl required className={classes.formControl}>
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


                <Grid item xs={12}>
                {learningOutcome.outcomeType === "Generic Skills"?  null :
                    <FormGroup row>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.S}
                                onChange={handleChange('S')}
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
                                onChange={handleChange('T')}
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
                                onChange={handleChange('E')}
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
                                onChange={handleChange('M')}
                                value="checkedB"
                                color="primary"
                            />
                            }
                            label="Mathamatics"
                        />
                        </FormGroup>
                    }
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                         required
                         id="outlined-required"
                         label="Description of the outcome"
                         variant="outlined"
                         defaultValue = ''
                         onChange = {outcomeDescchange}
                         fullWidth/>
                </Grid>
            </Grid>
        </div> 
        
    );

}

export default LearningOutcomeAdd;
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
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

const LearningOutcomeAddFromSelect = (props) => {
    const classes = useStyles();
    const handleClose = props.onClose;
    const {handleOnSave, learningOutcomeOpts} = props;

    const [learningOutcome, setLearningOutcome] = React.useState({
        id: -1,
        level: "",
        outcomeType: "",
        STEMType: [""],
        description: "",
        status: false
      });


    const outcomeSave = event => {
        //binding of STEM Type to learningOutcome like object 
        //sync the record to root state
        handleOnSave({...learningOutcome}, "select");
        handleClose();
    }

    const outcomeOnChange = (event) => {
        const tempData = learningOutcomeOpts.filter(_opts => _opts.id==event.target.id);
        setLearningOutcome(tempData[0]);
    }

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
                   
                </Toolbar>
            </AppBar>

            <div style= { {padding: "16px" }}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h3>Add learning outcomes that specify what learners will be able to do after this unit.</h3>
                </Grid>

                <Grid item xs={12}>
                    <FormControl required className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-required-label">Outcome Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        className={classes.selectEmpty}
                        onChange = {(evnet)=>outcomeOnChange(event)}
                        value = {learningOutcome.description}
                        fullWidth
                        >
                            <MenuItem value='' disabled>
                                <em>Outcome Type</em>
                            </MenuItem>
                            {
                                learningOutcomeOpts.map((_opts, key)=> 
                                <MenuItem 
                                    id={_opts.id}
                                    value={_opts.description} 
                                    // level = {_opts.description} 
                                    // outcomeType = {_opts.outcomeType} 
                                    // STEMType = {_opts.STEMType}
                                    // description = {_opts.description}
                                    key={key}>
                                        {_opts.description}
                                </MenuItem>)
                            }
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" color="primary" onClick={outcomeSave} fullWidth> 
                        save
                    </Button>
                </Grid>
            </Grid>
            </div>
        </React.Fragment> 
        
    );

}

export default LearningOutcomeAddFromSelect;
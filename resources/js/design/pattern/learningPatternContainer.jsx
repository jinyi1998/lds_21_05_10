import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import LearningTaskView from '../task/learningTaskView';
import LearningPatternEditView from './learningPatternEditView';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {ComponentContext} from '../component/componentContainer';
import {ContextStore} from '../../container/designContainer'
import config from 'react-global-configuration';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // color: theme.palette.text.secondary,
        width: '100%',
        margin: 16
    },
    contentGrid: {
        textAlign: "left"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    chip: {
        margin: 2,
    },
}));


const LearningPatternContainer = (props) => {
    const { setLoadingOpen, refreshCourse } = React.useContext(ContextStore);
    const { component } = React.useContext(ComponentContext);

    const classes = useStyles();
    
    const [pattern, setPattern] = React.useState(props.patternData);
    const [patternTempOpts, setPatternTempOpts] = React.useState([]);
    const [patternTempID, setPatternTempID] = React.useState(-1);

    const [editPatternOpen, setEditPatternOpen] = React.useState(false);

    async function fetchlearningPattern(id) {
        setLoadingOpen(true)
        return await fetch(
            'http://'+config.get('url')+'/api/learningPattern/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setPattern(response);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }
    
    async function fetchLearningPatternTemplate(id) {
        patternTempOpts
        return await fetch(
            'http://'+config.get('url')+'/api/learningComponent/getPatternOpts/'+ id,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setPatternTempOpts(response);
            return response;
        })
        .catch(error => console.log(error));
    }

    React.useEffect( ()=>{  
            // fetchlearningPattern(pattern.id)
            fetchLearningPatternTemplate(component.id);
        }
    , [pattern.id])

  
    async function unlockLearningPattern() {
        setLoadingOpen(true)
        return await fetch(
            'http://'+config.get('url')+'/api/learningPattern/unlockPattern/'+ pattern.id,
            {
            method: "PUT",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setLoadingOpen(false)
            refreshCourse()
        })
        .catch(error => console.log(error));
    }

    async function saveLearningPattern() {
        var json = patternTempOpts.find(x => x.id == patternTempID);
        return await fetch(
            'http://'+config.get('url')+'/api/learningPattern/' + pattern.id,
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
            setLoadingOpen(false);
            setEditPatternOpen(false);
            fetchlearningPattern(pattern.id);
            refreshCourse();
        })
        .catch(error => console.log(error));
    }

    const unLockPattern = () => {
        unlockLearningPattern()
    }

    const onEditPattern = () => {
        setEditPatternOpen(true);
    }

    return (
        <React.Fragment>
             <Paper className={classes.paper} data-tour = "component_pattern_view">
                {
                patternTempOpts?.length > 1? 
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={()=>onEditPattern()} data-tour = "component_pattern_change">
                            Reload Learning Patterns
                        </Button>
                    </Grid>
                    :
                    null
                }
                
                <Grid container spacing = {4}>
                    <Grid item xs = {8} data-tour = "component_pattern_title">
                        {pattern.title}
                    </Grid>

                    <Grid item xs = {4}>
                        <Button color="primary" variant="contained" onClick={()=> unLockPattern()} data-tour = "component_pattern_unlock"> <LockOpenIcon/>Unclock me</Button>
                    </Grid>
                    
                    {pattern.tasks?.map((_task, index)=>
                       <div data-tour = "component_pattern_task" key = {index}>
                        <LearningTaskView 
                                taskID = {_task.id} 
                                taskData = {_task} 
                                key = {index}
                                editBtn = {false}
                                duplicateBtn = {false}
                                deleteBtn = {false}
                            />
                        </div>
                    )}
                    
                </Grid>
             </Paper>
            

             <Dialog open={editPatternOpen} onClose={() => setEditPatternOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Learning Pattern</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may edit learning pattern for this component...
                    </DialogContentText>
                    <LearningPatternEditView 
                        patternTempOpts = {patternTempOpts}
                        setPatternTempID = {setPatternTempID}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setEditPatternOpen(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => saveLearningPattern()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment> 
    );
}
export default LearningPatternContainer;
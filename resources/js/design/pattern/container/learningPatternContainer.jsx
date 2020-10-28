import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningTaskView from '../../task/component/learningTaskView';
import LearningPatternEditView from '../component/learningPatternEditView';

import {ComponentContext} from '../../learningComponent/container/componentContainer';
import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningCompGetPatternOpts,
    apiLearningPatternGet, apiLearningPatternPut, apiLearningPatternUnlock
} from '../../../api.js';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
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
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
    const { component } = React.useContext(ComponentContext);

    const classes = useStyles();
    
    const [pattern, setPattern] = React.useState(props.patternData);
    const [patternTempOpts, setPatternTempOpts] = React.useState([]);
    const [patternTempID, setPatternTempID] = React.useState(-1);

    const [editPatternOpen, setEditPatternOpen] = React.useState(false);

    const enableUnlock = course.permission > 2;

    //#region local function
    async function reloadPattern(id) {
        setLoadingOpen(true)
        return await apiLearningPatternGet(id).then(response => {
            //load the default learning outcomes by api request
            setPattern(response.data);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }
    
    async function reloadPatternTemplate(id) {
        return await apiLearningCompGetPatternOpts(id)
        .then(response => {
            //load the default learning outcomes by api request
            setPatternTempOpts(response.data);
            return response;
        })
        .catch(error => console.log(error));
    }
  
    async function unlockLearningPattern() {
        setLoadingOpen(true)
        return await apiLearningPatternUnlock(pattern)
        .then(response => {
            //load the default learning outcomes by api request
            setLoadingOpen(false)
            displayMsg("success", "Pattern Unlocked");
            refreshCourse()
        })
        .catch(error => {
            console.log(error);
            displayMsg("error", "Error Occured");
        });
    }

    async function saveLearningPattern() {
        var json = patternTempOpts.find(x => x.id == patternTempID);
        json["pattern_id"] = pattern.id;

        return await apiLearningPatternPut(json)
        .then(response => {
              //load the default learning outcomes by api request
              setLoadingOpen(false);
              setEditPatternOpen(false);
              reloadPattern(pattern.id);
              displayMsg("success", "Pattern Unlocked");
              refreshCourse();
        })
        .catch(error => {
            console.log(error);
            displayMsg("error", "Error Occured");
        });
    }

    const unLockPattern = () => {
        unlockLearningPattern()
    }

    const onEditPattern = () => {
        setEditPatternOpen(true);
    }
    //#endregion

    React.useEffect( ()=>{  
        // fetchlearningPattern(pattern.id)
        reloadPatternTemplate(component.id);
    }
    , [pattern.id])

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
                        {
                            enableUnlock?
                            <Button color="primary" variant="contained" onClick={()=> unLockPattern()} data-tour = "component_pattern_unlock" > <LockOpenIcon/>Unlock me</Button>
                            :
                            null
                        }
                    </Grid>
                    
                    {pattern.tasks?.map((_task, index)=>
                       <div data-tour = "component_pattern_task" key = {index} style = {{"width": "100%"}}>
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
            

             <Dialog open={editPatternOpen} onClose={() => setEditPatternOpen(false)} maxWidth = "md" style = {{minHeight: 400}}>
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
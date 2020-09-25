import React from 'react';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TaskTemplateView from '../component/taskTemplateView';
import TaskTemplateEditView from '../component/taskTemplateEditView';
import validator from 'validator';

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from '@material-ui/core/List';
import { ListItem, Typography } from '@material-ui/core';
import {
   
} from '../../../api';

const OutcomeBuilderContainer = () => {
    const [ outcomes, setOutcomes ] = React.useState([]);
    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);
    const [ editOutcome, setEditOutcome] = React.useState({});
    const [ editOutcomeID, setEditOutcomeID] = React.useState(-1);

    return(
        <React.Fragment>
            <Paper style = {{padding: 16}}>
                outcomes
            </Paper>
            
        
            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                <DialogTitle id="form-dialog-title">{setEditOutcomeID == -1? "Add Learning Outcome" : "Edit Learning Outcome"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning outcome for this component...
                    </DialogContentText>
                    {/* <TaskTemplateEditView 
                        taskID = {editTaskID}
                        taskData = {editTask} 
                        syncTask = {setEditTask} 
                        showAssessment = {true}
                        error = {error} />  */}
                </DialogContent>
        
                <DialogActions>
                    <Button onClick={() => setOpenTaskEdit(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onSaveTask()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
 
}

export default OutcomeBuilderContainer;
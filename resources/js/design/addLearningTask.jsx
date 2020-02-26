import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {ContextStore} from '../container/designContainer'
import ComponentTask from './componentTask';


const AddLearningTask = (props) => {
    const {
        openTaskAdd
        , setOpenTaskAdd
        , onEditComponentID
        } = props;

    const { course, dispatch } = React.useContext(ContextStore);
    const [ taskData, setTaskData] = React.useState({});
    

    const onSaveTask = () => {
        taskData.componentid = onEditComponentID
        dispatch({
            type: "ADD_LEARNINGTASK",
            value: taskData
        });
        setOpenTaskAdd(false);
    }

    const handleTaskUpdate = (task, index) => {
        //listen task data changes
        setTaskData(task);
    }


    if(onEditComponentID == -1){
        return (
            null
        )
    }else{
        return (
            <Dialog open={openTaskAdd} onClose={() => setOpenTaskAdd(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning task for this component...
                    </DialogContentText>
                    <ComponentTask 
                                TaskData = {{}} 
                                index = {0} 
                                key = {0}
                                componentData = {course.components.find(x=>x.id == onEditComponentID )}
                                handleTaskUpdate= {handleTaskUpdate} 
                                onEditTasks = {()=>{}} 
                                mode = "lesson_edit"/> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTaskAdd(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => onSaveTask()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
   
}

export default AddLearningTask;
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {ContextStore} from '../container/designContainer'
import ComponentTask from './componentTask';


const LessonPlanEditTask = (props) => {
    const {onEditTasktID, onEditComponentID , setOpenLessonTaskEdit, openLessonTaskEdit} = props;
    const { course, dispatch } = React.useContext(ContextStore);
    const [ taskData, setTaskData] = React.useState({});
    

    const onSaveTask = () => {
        
        taskData.componentid = onEditComponentID
        dispatch({
            type: "UPDATE_LEARNINGTASK",
            value: taskData
        });
        setOpenLessonTaskEdit(false);
    }

    const handleTaskUpdate = (task, index) => {
        //listen task data changes
        setTaskData(task);
    }

    if(onEditComponentID == -1 || onEditTasktID == -1){
        return (
            null
        )
    }else{
        return (
            <Dialog open={openLessonTaskEdit} onClose={() => setOpenLessonTaskEdit(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Lesson Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Any changes in this view will also affect the learning task in unit plan...
                    </DialogContentText>
                    <ComponentTask 
                                // TaskData = {course.components[onEditComponentID].tasks[onEditTasktID]} 
                                TaskData = {course.components.find(x => x.id == onEditComponentID).pattern.tasks.concat(course.components.find(x => x.id == onEditComponentID).tasks)[onEditTasktID]} 
                                index = {0} 
                                key = {0}
                                componentData = {course.components.find(x => x.id == onEditComponentID)}
                                handleTaskUpdate= {handleTaskUpdate} 
                                onEditTasks = {()=>{}} 
                                mode = "lesson_edit"/> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLessonTaskEdit(false)} color="primary">
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

export default LessonPlanEditTask;
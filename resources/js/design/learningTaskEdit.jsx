import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import validator from 'validator';
import {ContextStore} from '../container/designContainer'
import ComponentTask from './componentTask';


const EditLearningTask = (props) => {
    const {
        openTaskEdit
        , setOpenTaskEdit
        , onEditComponentID
        , TaskData
        } = props;

    const { course, dispatch } = React.useContext(ContextStore);
    const [ taskData, setTaskData] = React.useState({});
    const [ error, setError] = React.useState({
        "type": "",
        "title": "",
        "description": "",
        "time": "",
        "classType": "",
        "target": "",
        "size": ""
    });
    
    const validate = () => {
        var validated = true;
        var tempError = {
          "type": "",
          "title": "",
          "description": "",
          "time": "",
          "classType": "",
          "target": "",
          "size": "",
        }

        if(validator.isEmpty(taskData.type.toString())){
            tempError["type"] = "Please enter the course type";
            validated = false;
          }
      
          if(validator.isEmpty(taskData.title.toString())){
            tempError["title"] = "Please enter the title";
            validated = false;
          }
      
          if(validator.isEmpty(taskData.description.toString())){
            tempError["description"] = "Please enter the description";
            validated = false;
          }
    
        if(validator.isEmpty(taskData.time.toString())){
          tempError["time"] = "Please enter the time";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.classType.toString())){
          tempError["classType"] = "Please enter the class type";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.target.toString())){
          tempError["target"] = "Please enter the target";
          validated = false;
        }
    
        if(validator.isEmpty(taskData.size.toString())){
          tempError["size"] = "Please enter the course size";
          validated = false;
        }
    
        setError(tempError);
        return validated;
      }
    

    const onSaveTask = () => {
        if(validate()){
            taskData.componentid = onEditComponentID
            dispatch({
                type: "UPDATE_LEARNINGTASK",
                value: taskData
            });
            setOpenTaskEdit(false);
        }
        
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
            <Dialog open={openTaskEdit} onClose={() => setOpenTaskEdit(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Learning Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You may add new learning task for this component...
                    </DialogContentText>
                    <ComponentTask 
                                TaskData = {TaskData} 
                                index = {0} 
                                key = {0}
                                componentData = {course.components.find(x=>x.id == onEditComponentID )}
                                handleTaskUpdate= {handleTaskUpdate} 
                                onEditTasks = {()=>{}} 
                                error = {error} 
                                mode = "lesson_edit"/> 
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
        );
    }
   
}

export default EditLearningTask;
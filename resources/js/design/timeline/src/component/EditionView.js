import * as React from 'react';
import { DATAAPI } from '../api/api-server';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {apiLearningTaskGet} from '../../../../api';
import LearningTaskEditView  from '../../../task/component/learningTaskEditView'


/** define the styles of the taskEdition, including the width of the leftInfo and rightnfo **/
const useStyles = makeStyles((theme) => ({
	leftInfoStyle: {
	    margin: theme.spacing(1),
	    marginBottom: '24px',
	    width: 130,
	},
	rightInfoStyle: {
		marginBottom:'48px',
	    width: 210,
	},
}));


/***define the style of multiple choice*****/
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
var style = {
	marginLeft: '-100px'
};

/****Get the information of tools, resources, class type, size from the API******/



export default function TaskEdition(props){
	const [ taskData, setTaskData] = React.useState({
    id: -1
  });
	const [ error, setError] = React.useState({
        "type": "",
        "title": "",
        "description": "",
        "time": "",
        "classType": "",
        "target": "",
        "size": ""
  });

  React.useEffect(()=>{
    apiLearningTaskGet( props.currentTaskId).then(response => {
      setTaskData(response.data)
    });
  }, [])

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
          "has_assessment": "",
        }

        if(validator.isEmpty(taskData.type.toString())){
            tempError["type"] = "Please enter the course type";
            validated = false;
          }
      
        if(validator.isEmpty(taskData.title.toString())){
            tempError["title"] = "Please enter the title";
            validated = false;
        }
    
        if(!validator.isInt(taskData.time.toString(), {min: 0, max: 999})){
            tempError["time"] = "Please enter the time";
            validated = false;
          }
    
        if(validator.isEmpty(taskData.class_type.toString())){
          tempError["classType"] = "Please enter the location";
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

        if(taskData.has_assessment){
            if(taskData.assessmentid.length == 0){
                tempError["has_assessment"] = "You said there is some assessment in the task but you have not select any assessment yet";
                validated = false;
            }
        }
    
        setError(tempError);
        return validated;
    }


    /*** When change infomation, record it using the state****/
	const onSave = () => {
		if(validate){
			props.changeLessonList(taskData);
		}else{
			return;
		}
	}

	return (
      <div className="taskEdition">
        <div className='taskEditiontitle1'> Edit Learning Task  </div>

        <div className='taskEditiontitle2'> You may add new learning task for this component... </div>
        {
          typeof taskData != "undefined"?
          // use LDS build-in instead 
          <LearningTaskEditView 
          taskID = {taskData.id} 
          taskData = {taskData} 
          syncTask = {setTaskData} 
          showAssessment = {false}
          error = {error}
          mode = "lesson_edit"/> 
          :
          null

        }
        {/* <LearningTaskEditView 
          taskID = {taskData.id} 
          taskData = {taskData} 
          syncTask = {setTaskData} 
          showAssessment = {false}
          error = {error}
          mode = "lesson_edit"/>  */}
        
        <div className='buttonG'>
          <Button id='cancel' variant="contained" color = {"secondary"} onClick={() => {props.setShowEditionView(false); }}>CANCEL</Button>
          <Button id='save' variant="contained" color = {"primary"} onClick={onSave}> SAVE</Button>
        </div>

	     </div>
     
    )

} 
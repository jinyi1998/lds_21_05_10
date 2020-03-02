import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ComponentTask from './componentTask';
import Button from '@material-ui/core/Button';
import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({
    root: {
        padding: 25,
    },
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

// const LearningPatternTaskEdit = (props) => {
//     const {handleTaskUpdate, componentData} = props
//     const [taskData, setTaskData] =  React.useState([]);
//     const [patternOpts, setPatternOpts] = React.useState([])
//     const [selectedPattern, setSelectedPattern] = React.useState(-1)

   

//     const patternChange = (event) => {
//         setSelectedPattern(event.target.value);
//     }

//     React.useEffect(()=> {
//         fetchlearningPatternID(componentData.id);
//     }
//     , [])

//     React.useEffect(()=> {

//         if(selectedPattern != -1){
//             fetchlearningTaskByPattern(selectedPattern);
//         }  
//     }
//     , [selectedPattern])

//     //#region fetch data related
//     async function fetchlearningPatternID(id) {
//         return await fetch(
//             'http://'+config.get('url')+'/api/learningTask/getLearningPatternByComponent/'+ id,
//             {
//             method: "GET",
//             }
//         )
//         .then(res => res.json())
//         .then(response => {
//             //load the default learning outcomes by api request
//             setPatternOpts(response);
//         })
//         .catch(error => console.log(error));
//     }

//     async function fetchlearningTaskByPattern(id) {
//         return await fetch(
//             'http://'+config.get('url')+'/api/learningTask/getLearningTaskByPattern/'+ id,
//             {
//             method: "GET",
//             }
//         )
//         .then(res => res.json())
//         .then(response => {
//             //load the default learning outcomes by api request
//             return setTaskData(response);
//         })
//         .catch(error => console.log(error));
//       }
//     //#endregion

//     return (
//         <React.Fragment>    
//             <Grid item xs={12}>
//                 <h2>
//                     Choose the recommended lesson pattern based on the selected engineering design and self-directed learning steps
//                 </h2>
//             </Grid>

//             <Grid item xs={12}>
//                 <Select
//                 labelId="pattern-select-required-label"
//                 id="pattern-select-required"
//                 onChange = {patternChange}
//                 fullWidth
//                 >
//                 <MenuItem value= {-1} disabled>
//                     <em>Outcome Type</em>
//                 </MenuItem>

//                 {patternOpts.map((_opts, index)=>
//                     <MenuItem value={_opts} key={index}>
//                         {_opts}
//                     </MenuItem>
//                 )}
//                 </Select>
//             </Grid>

//             <Grid container spacing={5}>
//                 {taskData?.map((_data, index)=>
//                     <ComponentTask 
//                     TaskData={_data} 
//                     componentData={componentData} 
//                     key={index} 
//                     mode="edit" 
//                     index={index}
//                     handleTaskUpdate = {handleTaskUpdate}/>
//                 )}
//             </Grid>
//         </React.Fragment>  
//     )
    
// }

const LearningTasksEdit = (props) => {

    const {handleTaskUpdate, componentData ,taskData} = props
 

    return (
        <Grid container spacing={5}>
            {taskData.map((_data, index)=>
                <ComponentTask 
                TaskData={_data} 
                componentData={componentData} 
                key={index} 
                mode="edit" 
                index={index}
                handleTaskUpdate = {handleTaskUpdate}/>
            )}
        </Grid>
    )
} 

const LearningTasksEditContainer = (props) => {

    const {componentData, mode, onClose} = props;
    //props.mode => tasks/ pattern

    const classes = useStyles();

    const [taskData, setTaskData] =  React.useState([]);

    const { course, dispatch } = React.useContext(ContextStore);


    // update the selected taskData after onChange
    React.useEffect(()=>{
        switch(props.mode){
            default:
                break;
            case "edit":
                setTaskData(componentData.tasks);
                break;
        }
    }
    , [props.mode, course]);
    
    function handleTaskUpdate(data, key){
        const temp = taskData.map( (_data,index) => {
            if(index == key){
                return data;
            }else{
                return _data
            }
        })
        setTaskData(temp);
    }

    const onSaveTask = () => {
        let temp = componentData;
        temp.tasks = taskData

        dispatch({
            type: "UPDATE_COMPONENT",
            value: temp
        });
        onClose(); 
    }


    const displayContent = () => {
        switch(mode){
            default:
                return null;
            case "edit":
                return (
                    <LearningTasksEdit 
                        handleTaskUpdate = {handleTaskUpdate} 
                        componentData = {componentData} 
                        taskData = {taskData}
                    />
                )
            // case "pattern":
            //     return (
            //         <LearningPatternTaskEdit 
            //             handleTaskUpdate = {handleTaskUpdate} 
            //             componentData = {componentData} 
            //         />
            //     )
        }
    }

    return (
        <div className={classes.root}>
             <Grid container spacing={5}>
                 <Grid item xs={12}>
                    {displayContent()}
                 </Grid>
                 <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={onSaveTask}>
                            Save
                        </Button>
                </Grid>
             </Grid>
        </div>
    );

}

export default LearningTasksEditContainer;
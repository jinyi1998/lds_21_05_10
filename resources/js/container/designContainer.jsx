import React from "react";
import Design from './design';
import ActionTool from '../design/actionTool';


import {
    apiCourseDelete, apiCourseCreate, apiCourseUpdate, apiCourseGet,
    apiLearningOutcomePost, apiLearningOutcomeGetOutcomeType, apiLearningOutcomeGetOutcomeLevel,
    apiLearningOutcomeTempGet,
    apiDesignTypeList, apiDesignTypeGet,
    apiOptionsList,
    apiLearningTaskGetPatternOpts,
  } 
  from '../api.js';

import TourGuide from './tourGuide';
import {AppContextStore} from './app';

const courseInitState = { 
    course: {
        unit_title: "",
        level: "",
        no_of_lesson: "",
        description: 1,
        componentid: [],
        components: [],
        outcomes: [],
        outcomeid: [],
        lessons: [],
        isinited: false
    }
};
export const ContextStore = React.createContext({
    course: {
    },
    options: {
        
    },
});

export function combineDispatchs(dispatchs) {
    return function(obj) {
        for (let i = 0; i < dispatchs.length; i++) {
        dispatchs[i](obj);
        }
    };
}

export function courseReducer(state, action) {

    let tempComponent;
    switch (action.type) {
        case "INIT_COURSE":
            action.value["isinited"] = true;
            return Object.assign({}, state, {
                course: action.value
            });
        //#region basic info
     
        case "DESIGN_TYPE":
            return Object.assign({}, state, {
                course: {...state.course, 
                    designType: action.value
                    }
            });
        //#endregion

        //#region Component Related
        
        case "SET_COMPONENT":
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: action.value
                   }
            });
        case "ADD_COMPONENT":
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: [...state.course.components, action.value]
                    }
            });
        case "UPDATE_COMPONENT":
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value.id){
                  _component = action.value;
                }
                return _component;
            }); 
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent
                }
            });
        
        case "DELETE_COMPONENT":
            state.course.components.splice(action.value, 1);
            return Object.assign({}, state, {
                course: {...state.course
                }
            });
        //#endregion

       
        //#region lesson related
        case "UPDATE_LESSON":
            let temp_lesson =  state.course.lesson.map((_lesson)=>{
                if(_lesson.id === action.value.id){
                  _lesson = action.value;
                }
                return _lesson;
              }); 
              return Object.assign({}, state, {
                course: {...state.course, 
                    lesson: temp_lesson
                   }
            });
        //#endregion

        default:
            return state;
    }
}


const DesignContainer = (props) => {
    const [displayGuideTour, setDisplayGuideTour] = React.useState(false);
    const { setLoadingOpen } = React.useContext(AppContextStore);
    
    const [activePage, setActionPage] = React.useState('basic');
    const [activeStep, setActiveStep] = React.useState(parseInt(props.step));

    React.useEffect(()=>{
        setLoadingOpen(true)
        InitDesignOption();
        InitCourseData()

        let user = JSON.parse(props.user);
        if(user['display_tourguide'] == 1){
            setDisplayGuideTour(true);
        }else{
            setDisplayGuideTour(false);
        }          
    },
    []);

    const InitCourseData = () => {
         if(props.courseID == -1){
            fetchNewCourseData();
        }else{
            fetchCourseData(props.courseID);
        }
    }

    const [State, Dispatch] = React.useReducer(
      courseReducer,
      courseInitState
    );

    const refreshCourse = () => {
        fetchCourseData(State.course.id);
    }
    
    const [optionsInit, setOptions] = React.useState({
        designType: [],
        learningOutcomeType: [],
        learningPatternOpts: [],
        taskType: [],
        taskClassType: [],
        taskSize: [],
        taskTarget: [],
        taskResource: [],
        taskElearingResource: [],
    });

    const [taskTypeColorValue, setTaskTypeColorValue] = React.useState({});

    const taskTypeColor = (task_type)=>{

        try{
            var color = taskTypeColorValue.find(x => x.id == task_type);
            return ({
                backgroundColor:  color.color,
                height: "100%",
                width: "12px"
            });
        }catch{
            return ({
                backgroundColor:  "#194d33",
                height: "100%"
            });
        }
    }
    
    async function fetchNewCourseData() {
        setLoadingOpen(true)
        await apiCourseCreate().then(
            response => {
                window.location.href = 'designstudio/'+response.data.id;
            }
        );
    }

    async function fetchCourseData(id) {
        setLoadingOpen(true)
        await apiCourseGet(id).then(response => {
            Dispatch({
                type: "INIT_COURSE",
                value: response.data
            })
            setLoadingOpen(false)
        }).catch(error => console.log(error));
    }
    //#region Init Options Data

    async function fetchDesignTypeData() {

        await apiDesignTypeList().then(response => {
            setOptions(optionsInit=> ({
                ...optionsInit,
                "designType": response.data
            }))
        })
    }
    
    async function fetchlearningTypeTempData() {

        apiLearningOutcomeGetOutcomeType()
        .then(response => {
            setOptions(optionsInit=> ({
                ...optionsInit,
                "learningOutcomeType": response.data,
                "learningTypeTemp": response.data
            }))
        }).catch(error => console.log(error));

    }

    async function fetchlearningPatternOptsData() {
        await apiLearningTaskGetPatternOpts().then(
            response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "learningPatternOpts": response.data
                }));
            }
        )
    }

    async function fetchlearningOptsData() {

        await apiOptionsList().then(response=>{
            setOptions(optionsInit=> ({
                ...optionsInit,
                "taskType": response.data.learningTasktypeOpts,
                "taskClassType": response.data.classTypeOpts,
                "taskSize": response.data.classSizeOpts,
                "taskTarget": response.data.classTargetOpts,
                "taskResource": response.data.resourceOpts,
                "taskElearingResource": response.data.elearningtoolOpts,
            }))
            setTaskTypeColorValue(response.data.learningTasktypeOpts)
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }



    async function InitDesignOption() {

        await fetchlearningOptsData();
        await fetchDesignTypeData();
        await fetchlearningTypeTempData();
        await fetchlearningPatternOptsData();
    }
    //#endregion

      //#region tour guide related
      const [mode, setMode] = React.useState('');
      const [run, setRun] = React.useState(false);
      const [stepIndex, setStepIndex] = React.useState(0);
  
      const tourNextStep = () => {
          setStepIndex(stepIndex + 1);
      }
      //#endregion
    
    const displayDesignStudio = () => {
        if(props.courseID == -1){
            // setLoadingOpen(true);
            return null;
        }else{
            return <Design courseID={props.courseID} step = {props.step}/>
        }
    }

    return (
      <ContextStore.Provider
        value={{
          course: State.course,
          options: optionsInit,
          dispatch: combineDispatchs([Dispatch]),
          fetchCourseData: fetchCourseData,
          refreshCourse: refreshCourse,
          taskTypeColor: taskTypeColor,
          tourSetMode: setMode,
          tourSetRun: setRun,
          tourNextStep: tourNextStep,
          tourStepIndex: stepIndex,
          activeStep: activeStep,
          setActiveStep: setActiveStep,
          activePage: activePage,
          setActionPage: setActionPage
        }}
      >
        <TourGuide 
            mode = {mode}
            setMode = {setMode}
            run = {run}
            setRun = {setRun}
            mainStop = {false}
            stepIndex = {stepIndex}
            setStepIndex = {setStepIndex}
            displayGuideTour = {displayGuideTour}
            setDisplayGuideTour = {setDisplayGuideTour}
        />
        
        {displayDesignStudio()}

        <ActionTool />
        
      </ContextStore.Provider>
    );
}

export default DesignContainer;
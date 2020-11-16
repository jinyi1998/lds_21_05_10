import React from "react";
import Design from './design';
import ActionTool from '../design/actionTool';


import {
    apiCourseCreate, apiCourseGet,
  } 
  from '../api.js';

import TourGuide from './tourGuide';
import {AppContextStore} from './app';

const courseInitState = { 
    course: {
        unit_title: "",
        level: "",
        subject: "",
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
    
    const [activeStage, setActiveStage] = React.useState('basic');
    const [activeStep, setActiveStep] = React.useState(parseInt(props.step)); //step in basic page
    const [activePage, setActivePage] =  React.useState(''); //page in design stage

    React.useEffect(()=>{
        setLoadingOpen(true)
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
          dispatch: combineDispatchs([Dispatch]),
          fetchCourseData: fetchCourseData,
          refreshCourse: refreshCourse,
          tourSetMode: setMode,
          tourSetRun: setRun,
          tourNextStep: tourNextStep,
          tourStepIndex: stepIndex,
          activeStep: activeStep,
          setActiveStep: setActiveStep,
          activeStage: activeStage,
          setActiveStage: setActiveStage,
          activePage: activePage,
          setActivePage: setActivePage
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
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Design from './design';
import config from 'react-global-configuration';

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


const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const DesignContainerNew = (props) => {
    const classes = useStyles();

    React.useEffect(()=>{
        (async function anyNameFunction() {
            setLoadingOpen(true)
            await InitDesignOption();
            InitCourseData()
            setLoadingOpen(false)
          })();
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

    const [loadingOpen, setLoadingOpen] = React.useState(false);
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
        const res = await fetch(
            'http://'+config.get('url')+'/api/course/',
            {
                method: "POST",
            }
        )
            .then(res => res.json())
            .then(response => {
                // Dispatch({
                //     type: "INIT_COURSE",
                //     value: response
                // })
           window.location.href = 'designstudio/'+response.id;
        })
        .catch(error => console.log(error));
    }

    async function fetchCourseData(id) {
        setLoadingOpen(true)
        const res = await fetch(
            'http://'+config.get('url')+'/api/course/'+ id,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                Dispatch({
                    type: "INIT_COURSE",
                    value: response
                })
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }
    //#region Init Options Data

    async function fetchDesignTypeData() {

        const res = await fetch(
            'http://'+config.get('url')+'/api/course/getDesignTypeTemp',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "designType": response
                })
            );
        })
        .catch(error => console.log(error));
    
    }
    
    async function fetchlearningTypeTempData() {

        const res = await fetch(
            'http://'+config.get('url')+'/api/learningOutcome/getOutcomeType/',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "learningOutcomeType": response
            }));
        })
        .catch(error => console.log(error));
    }

    async function fetchlearningPatternOptsData() {

        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getLearningPatternOpts/',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "learningPatternOpts": response
            }));
        })
        .catch(error => console.log(error));
    }

    async function fetchlearningOptsData() {

        const res = await fetch(
            'http://'+config.get('url')+'/api/opts',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskType": response.learningTasktypeOpts,
                    "taskClassType": response.classTypeOpts,
                    "taskSize": response.classSizeOpts,
                    "taskTarget": response.classTargetOpts,
                    "taskResource": response.resourceOpts,
                    "taskElearingResource": response.elearningtoolOpts,
                })
            );
            setTaskTypeColorValue(response.learningTasktypeOpts)
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


    return (
      <ContextStore.Provider
        value={{
          course: State.course,
          options: optionsInit,
          dispatch: combineDispatchs([Dispatch]),
          setLoadingOpen: setLoadingOpen,
          fetchCourseData: fetchCourseData,
          refreshCourse: refreshCourse,
          taskTypeColor: taskTypeColor,
        }}
      >
        <Design courseID={props.courseID}/>
        <Backdrop className={classes.backdrop} open={loadingOpen} onClick={() => setLoadingOpen(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
      </ContextStore.Provider>
    );
}

export default DesignContainerNew;
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Design from './design';
import config from 'react-global-configuration';

const courseInitState = { course: {
        unitTitle: "",
        schoolName: "",
        level: "",
        noOfLessons: 1,
        courseDes: "",
        designType: "",
        components: [
        // {
        //   id: 0,
        //   title: "",
        //   tasks: [
        //     {
        //       id: 0,
        //       title: "",
        //       assessment: [],
        //       time: 0,
        //       classType: "",
        //       target: "",
        //       resource: "",
        //       STEMType: [],
        //       description: "",
        //     }
        //   ],
        //   learningOutcomes: [
        //     {
        //       id: 0,
        //       level: "",
        //       outcomeType: "",
        //       STEMType: [],
        //       description: "",
        //       status: false
        //     }
        //   ]
        // }
        ],
        //learning outcomes in course level
        learningOutcomes: [
        // {
        //   id: 0,
        //   level: "",
        //   outcomeType: "",
        //   STEMType: [],
        //   description: "",
        //   isCourseLevel: false
        // }
        ],
        lesson: [
        //   {
        //     id: 0,
        //     name: "",
        //     tasks: []
        //   }
        ],
        //index of current max learning Outcome ID
        learningOutcomesID : 1
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
            return Object.assign({}, state, {
                course: action.value
            });
        //#region basic info
        case "UNIT_TITLE":
            return Object.assign({}, state, {
                course: {...state.course, unitTitle: action.value}
            });
        case "SCHOOL_NAME":
            return Object.assign({}, state, {
                course: {...state.course, schoolName: action.value}
            });
        case "LEVEL":
            return Object.assign({}, state, {
                course: {...state.course, level: action.value}
            });
        case "NO_OF_LESSON":
            var temp_lesson_arr = [];
            for(var i = 0; i < parseInt(action.value); i++){
                var temp_less = {
                    id: i,
                    name: "lesson_" + (i+1).toString(),
                    tasks: []
                }
                temp_lesson_arr.push(temp_less);
            }
            return Object.assign({}, state, {
                course: {...state.course, 
                    noOfLessons: action.value, 
                    lesson:temp_lesson_arr}
            });
        case "DESIGN_TYPE":
            return Object.assign({}, state, {
                course: {...state.course, 
                    designType: action.value
                    }
            });
        case "COURSE_DES":
            return Object.assign({}, state, {
                course: {...state.course, 
                    courseDes: action.value
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

        //#region learning Task Related
        case "UNLOCKPATTERN":
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value){
                    //clear pattern
                    _component.pattern.tasks.map(_task => _component.tasks.push(_task))
                    // delete _component.pattern
                    _component.pattern = {id : -1, tasks: []}
                }
                return _component;
              }); 
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent
                }
            });
        case "ADD_LEARNINGTASK":
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value.componentid){
                  
                  _component.tasks.push(action.value);
                }
                return _component;
              }); 
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent
                }
            });
        case "UPDATE_LEARNINGTASK":
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value.componentid){
                    
                    let tasks = _component.tasks.map(
                        _task => {
                            if(_task.id == action.value.id){
                                _task = action.value
                            }
                            return _task
                        }
                    )
                    _component.tasks = tasks;
                }
                return _component;
                }); 
            return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent
                }
            });
        case "DELETE_LEARNINGTASK":
            let taskpatternIndex = -1;
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value.componentid){
               
                    taskpatternIndex = _component.pattern.tasks.concat(_component.tasks).findIndex(x => x.id == action.value.taskid);

                //delete learning task with corresponding index
                    _component.tasks = _component.tasks.filter(x => x.id != action.value.taskid)
                //   _component.tasks.splice(action.value.index, 1);
                }
                return _component;
              });

            // update lesson => unlink the related task
            var tempLesson = state.course.lesson;
            if(taskpatternIndex != -1){
                tempLesson =  state.course.lesson.map((_lesson)=>{
                    _lesson.tasks = _lesson.tasks.filter(_lessonTask => !(_lessonTask.componentID == action.value.componentid && _lessonTask.taskIndex == taskpatternIndex));
                    return _lesson
                });
            }
            

              return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent,
                    lesson: tempLesson
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

        //#region learning outcome related
        case "SET_LEARNINGOUTCOME":
            return Object.assign({}, state, {
                course: {...state.course, 
                    learningOutcomes: action.value
                   }
            });

        case "ADD_LEARNINGOUTCOME":
            if(action.value.id  == -1){
                //action.value.id = state.course.learningOutcomes.length + 1;
                action.value.id =  state.course.learningOutcomesID
            }
            if(typeof action.value.componentid != 'undefined'){
                tempComponent =  state.course.components.map((_component)=>{
                    if(_component.id === action.value.componentid){
                      _component.learningOutcomes = [..._component.learningOutcomes, action.value.id]
                    }
                    return _component;
                });
            }else{
                tempComponent =  state.course.components
            }
            
            return Object.assign({}, state, {
                course: {...state.course, 
                    learningOutcomes: [...state.course.learningOutcomes, action.value],
                    components: tempComponent,
                    learningOutcomesID: state.course.learningOutcomesID + 1
                }
            });

        case "DELETE_LEARNINGOUTCOME":
            state.course.learningOutcomes.splice(action.value, 1);
            return Object.assign({}, state, {
                course: {...state.course, 
                }
            });

        case "DELETE_LEARNINGOUTCOME_COMPONENT":
            state.course.learningOutcomes = state.course.learningOutcomes.filter(x => x.componentid != action.value);
            return Object.assign({}, state, {
                course: {...state.course, 
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

const DesignContainer = (props) => {
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
            if(config.get("enableDB")){
                fetchCourseData();
            }else{
                Dispatch({
                    type: "INIT_COURSE",
                    value: props.importJson
                })
            }
        }
    }

    const [State, Dispatch] = React.useReducer(
      courseReducer,
      courseInitState
    );
    
    const [optionsInit, setOptions] = React.useState({});

    const [loadingOpen, setLoadingOpen] = React.useState(false);
    
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
                Dispatch({
                    type: "INIT_COURSE",
                    value: response
                })
                setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }

    async function fetchCourseData() {
        setLoadingOpen(true)
        const res = await fetch(
            'http://'+config.get('url')+'/api/course/'+ State.course.id,
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
                }));
        })
        .catch(error => console.log(error));
    
      }

    async function fetchTaskTypeData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskTypeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskType": response
                }));
        })
        .catch(error => console.log(error));
    }

    async function fetchClassTypeData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskClassTypeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskClassType": response
                }));
        })
        .catch(error => console.log(error));
    }

    async function fetchClassSizeData() {
    
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskSizeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskSize": response
                }));
        })
        .catch(error => console.log(error));
    }

    async function fetchTaskTargetData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskTargetTypeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskTarget": response
                }));
        })
        .catch(error => console.log(error));
    }

    async function fetchTaskResourceData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskResourceTypeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskResource": response
                }));
        })
        .catch(error => console.log(error));
    }

    async function fetchTaskElearningResourceData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningTask/getTaskELeraningResourceTypeOption',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setOptions(optionsInit=> ({
                    ...optionsInit,
                    "taskElearingResource": response
                }));
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
            // console.log(response.resourceOpts);
        })
        .catch(error => console.log(error));
    }



    async function InitDesignOption() {

        if(config.get("enableDB")){
            await fetchlearningOptsData();
            await fetchDesignTypeData();
            await fetchlearningTypeTempData();
            await fetchlearningPatternOptsData();
        }else{
            await fetchDesignTypeData();
            await fetchTaskTypeData();
            await fetchClassTypeData();
            await fetchClassSizeData();
            await fetchTaskTargetData();
            await fetchTaskResourceData();
            await fetchTaskElearningResourceData();
            await fetchlearningTypeTempData();
            await fetchlearningPatternOptsData();
        }
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
        }}
      >
        <Design courseID={props.courseID}/>
        <Backdrop className={classes.backdrop} open={loadingOpen} onClick={() => setLoadingOpen(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
      </ContextStore.Provider>
    );
}

export default DesignContainer;
import React from "react";
import ReactDOM from "react-dom";
import Design from './design';

const courseInitState = { course: {
        id: 0,
        unitTitle: "",
        schoolName: "",
        level: "",
        noOfLessons: "",
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
        ]
    }
};
export const ContextStore = React.createContext({
    course: {
    }
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
    console.log(state);
    console.log(action);
    switch (action.type) {
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
                    level: action.value, 
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
        case "DELETE_LEARNINGTASK":
            tempComponent =  state.course.components.map((_component)=>{
                if(_component.id === action.value.componentid){
                  //delete learning task with corresponding index
                  _component.tasks = _component.tasks.filter(x => x.id != action.value.taskid)
                //   _component.tasks.splice(action.value.index, 1);
                }
                return _component;
              });
              return Object.assign({}, state, {
                course: {...state.course, 
                    components: tempComponent
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

        case "DELETE_LEARNINGOUTCOME":
            state.course.learningOutcomes.splice(action.value, 1);
            return Object.assign({}, state, {
                course: {...state.course, 
                }
            });
        //#endregion
        
        default:
            return state;
    }
}
  
function DesignContainer() {

    const [State, Dispatch] = React.useReducer(
      courseReducer,
      courseInitState
    );
    
    return (
      <ContextStore.Provider
        value={{
          course: State.course,
          dispatch: combineDispatchs([Dispatch])
        }}
      >
        <Design />
      </ContextStore.Provider>
    );
}

export default DesignContainer;
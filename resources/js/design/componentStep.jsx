import React, { Component } from "react";
import {
  List,
  Button
} from "@material-ui/core";


import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import  DesignComponentItem  from './component/componentItem';
import  ComponentSelDialog  from './componentSelDialog';
import {ContextStore} from '../container/designContainer'
import {AppContextStore} from '../container/appContainer';
import InstructionBox from '../components/instructionBox';
import config from 'react-global-configuration';


// component data template
// components: [
//   {
    // id: 0,
    // title: "",
    // tasks: [
    //   {
    //     id: 0,
    //     title: "",
    //     classType: "",
    //     target: "",
    //     resource: "",
    //     STEMType: [],
    //     description: "",
    //   }
    // ],
    // learningOutcomes: [
    //   {
    //     id: 0,
    //     level: "",
    //     outcomeType: "",
    //     STEMType: [],
    //     description: "",
    //     status: false
    //   }
    // ]
//   }
// ],
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
   
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'lightblue',
});

const DesignComponentStep = (props) =>
{ 
    const { course, dispatch } = React.useContext(ContextStore);
    const {options} = React.useContext(AppContextStore);
    // initalize if there is no preset component data 

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // Drag function
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const _items = reorder(
            course.components,
            result.source.index,
            result.destination.index
        );
        //sync the data to root state
        dispatch({
          type: "SET_COMPONENT",
          value: _items
        })
    }

    const addItems = (component) => {
        // component.id = course.components.length+1,
        //sync the data to root state
        let temp_component_id = component.id;
        component.id = course.components.length+1
        //load preload data 

         //learning Task
         
         fetchlearningPatternID(temp_component_id).then(patternID => {
          let pattern = {
            "id": patternID[0],
            "tasks": []
          }
          fetchlearningTaskByPattern(patternID[0]).then(taskData => {
            if(config.get("enablePattern") ){
              pattern.tasks = taskData;
              component.pattern = pattern;
            }else{
              component.tasks = taskData;
            }
          })
          component.patternOptsID = patternID;
        });

        dispatch({
          type: "ADD_COMPONENT",
          value: component
        })

        //learning outcomes
        fetchlearningOutcomes(temp_component_id).then(learningOutcomes => {
          learningOutcomes.map(learningOutcome => {
            learningOutcome.id = -1;
            //auto match the component
            learningOutcome.componentid = component.id;
            dispatch({
              type: "ADD_LEARNINGOUTCOME",
              value: learningOutcome
            })
          });
        })
    
    }

    const delItems = (index) => {
      dispatch({
        type: "DELETE_COMPONENT",
        value: index
      })
    }

    //#region data fetching related

    async function fetchlearningPatternID(id) {
      return await fetch(
          'http://'+config.get('url')+'/api/learningTask/getLearningPatternByComponent/'+ id,
          {
          method: "GET",
          }
      )
      .then(res => res.json())
      .then(response => {
          //load the default learning outcomes by api request
          return response;
      })
      .catch(error => console.log(error));
    }
  
    async function fetchlearningTaskByPattern(id) {
      return await fetch(
          'http://'+config.get('url')+'/api/learningTask/getLearningTaskByPattern/'+ id,
          {
          method: "GET",
          }
      )
      .then(res => res.json())
      .then(response => {
          //load the default learning outcomes by api request
          // console.log(response);
          return response;
      })
      .catch(error => console.log(error));
    }
  
    async function fetchlearningOutcomes(id) {
      return await fetch(
          'http://'+config.get('url')+'/api/learningOutcome/getLearningOutcomeByComponentTemp/'+ id,
          {
          method: "GET",
          }
      )
      .then(res => res.json())
      .then(response => {
          //load the default learning outcomes by api request
          return response;
      })
      .catch(error => console.log(error));
    }
  
    //#endregion
    
    return(
      <React.Fragment>
            <InstructionBox 
                    title="Learning Components" 
                    content= { "These are the pre-defined design components for the template:" 
                    + options.designType.find(x=> x.id == course.designType).description + " "
                    + "STEM to guide you to plan your unit and lesson"
                    }
                    tips="Learning Components is the ... You can order, delete the components, duplicated in this part."
              />
              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)}>
                        {course.components.map((item, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index}>
                            {(provided, snapshot) => (
                                <DesignComponentItem 
                                provided = {provided} 
                                snapshot = {snapshot} 
                                item = {item} 
                                index = {index} 
                                addItems = {addItems}
                                delItems = {delItems}/>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </List>
                    </RootRef>
                  )}
                </Droppable>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth>
                    Add COMPONENT
                </Button>
                <ComponentSelDialog open={open} handleClose={handleClose} addItems ={addItems}/>
              </DragDropContext>
      </React.Fragment>
    );
}

export default DesignComponentStep;

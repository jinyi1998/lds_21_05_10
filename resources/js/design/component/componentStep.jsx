import React, { Component } from "react";
import {
  List,
  Button
} from "@material-ui/core";


import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import  DesignComponentItem  from './componentItem';
import  ComponentSelDialog  from './componentSelDialog';
import {ContextStore} from '../../container/designContainer'
import InstructionBox from '../../components/instructionBox';
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
    const { course, options, dispatch, refreshCourse } = React.useContext(ContextStore);

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

        //sync the data to root state
        var tempComponents =  JSON.parse(JSON.stringify(course.components));
        var sourceComponent = {
          id: tempComponents[result.source.index].id,
          sequence: tempComponents[result.destination.index].sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempComponent = {
              id : tempComponents[i].id,
              sequence:  tempComponents[i].sequence - 1
            }
            fetchUpdateLearningComponent(tempComponent);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempComponent = {
              id : tempComponents[i].id,
              sequence:  tempComponents[i].sequence + 1
            }
            fetchUpdateLearningComponent(tempComponent);
          }
        }
        fetchUpdateLearningComponent(sourceComponent);
       
        // setTimeout(refreshCourse(), 3000);
        // refreshCourse();
        // var sourceComponent = course.components[result.source.index];
        // sourceComponent.sequence = course.components[result.destination.index];
        // fetchUpdateLearningComponent(sourceComponent);
    }

    async function addComponentFromTemplate(id){
        //sync the data to root state
        var tempcomponent = await fetchlearningComponentTemplate(id);
        tempcomponent.component_template_id = id;
        tempcomponent.course_id = course.id;
        fetchAddLearningComponent(tempcomponent);
    }

    async function duplicateComponent(id){
      var tempcomponent = await fetchlearningComponent(id);
      tempcomponent.course_id = course.id;
      fetchAddLearningComponent(tempcomponent);
    } 

    async function deleteComponent(id){
      dispatch({
        type: "DELETE_COMPONENT",
        value: index
      })
    }

    //#region data fetching related

    async function fetchlearningComponentTemplate(id) {
      return await fetch(
          'http://'+config.get('url')+'/api/learningComponentTemplate/'+ id,
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

    async function fetchlearningComponent(id) {
      return await fetch(
          'http://'+config.get('url')+'/api/learningComponent/'+ id,
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
  
    
    async function fetchAddLearningComponent(component ) {
      component.sequence = course.components.length + 1;

      return await fetch(
        'http://'+config.get('url')+'/api/learningComponent',
        {
          method: "POST",
          body:  JSON.stringify(component),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      ).then(res => res.json())
      .then(response => {
        refreshCourse();
      })
    }

    async function fetchUpdateLearningComponent(component ) {
      return await fetch(
        'http://'+config.get('url')+'/api/learningComponent/'+ component.id,
        {
          method: "PUT",
          body:  JSON.stringify(component),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      ).then(res => res.json())
      .then(response => {
          refreshCourse()
      })
    }
    //#endregion
    
    return(
      <React.Fragment>
            <InstructionBox 
                    title="Learning Components" 
                    content= { "These are the pre-defined design components for the template:" 
                    + options.designType.find(x=> x.id == course.design_type_id).description + " "
                    + "STEM to guide you to plan your unit and lesson"
                    }
                    tips="Learning Components is the ... You can order, delete the components, duplicated in this part."
              />
              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)}>
                        {course.components.map((component, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index}>
                            {(provided, snapshot) => (
                                <DesignComponentItem 
                                  provided = {provided} 
                                  snapshot = {snapshot} 
                                  component = {component} 
                                  index = {index} 
                                  duplicateComponent = {duplicateComponent}
                                  deleteComponent = {deleteComponent}/>
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
                <ComponentSelDialog open={open} handleClose={handleClose} addItems ={addComponentFromTemplate}/>
              </DragDropContext>
      </React.Fragment>
    );
}

export default DesignComponentStep;

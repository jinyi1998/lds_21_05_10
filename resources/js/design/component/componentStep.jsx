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
import {
  apiLearningCompGet, apiLearningCompPost, apiLearningCompPut, apiLearningCompDelete,
  apiLearningCompTempGet,
} from '../../api.js';

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

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : '',
});

const DesignComponentStep = (props) =>
{ 
    const { course, options, dispatch, refreshCourse } = React.useContext(ContextStore);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
    const enableAdd = course.permission > 2;
    const enableEdit = course.permission > 2;
    const enableDelete = course.permission > 2;
    const enableDrag = course.permission > 2;
    
    React.useEffect(()=>{
      tourSetRun(false);
      tourSetMode('component_step');
    }, [])

    // initalize if there is no preset component data 

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      tourSetRun(false);
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
      await apiLearningCompDelete(id)
      .then(response => {
        //load the default learning outcomes by api request
        // return response;
        refreshCourse();
      })
      .catch(error => console.log(error));
    }

    //#region data fetching related

    async function fetchlearningComponentTemplate(id) {
      return await apiLearningCompTempGet(id)
      .then(response => {
        return response.data 
      })
      .catch(error => console.log(error));
    }

    async function fetchlearningComponent(id) {
      return await apiLearningCompGet(id)
      .then(response => {
        return response.data 
      })
      .catch(error => console.log(error));
    }
  
    
    async function fetchAddLearningComponent(component) {
      component.sequence = course.components.length + 1;
      return await apiLearningCompPost(component)
      .then( () => {refreshCourse()})
      .catch(error => console.log(error));
    }

    async function fetchUpdateLearningComponent(component) {
      return await apiLearningCompPut(component)
      .then( () => {refreshCourse()})
      .catch(error => console.log(error));
    }
    //#endregion

    const onEnteredDialog = () => {
      tourSetRun(true);
      tourNextStep();
    }
    
    return(
      <React.Fragment>
            <InstructionBox 
                    title="Learning Components" 
                    content= { "These are the pre-defined design components for the template:" 
                    + options.designType.find(x=> x.id == course.design_type_id).description + " "
                    + "STEM to guide you to plan your unit and lesson"
                    }
                    tips= {
                      <React.Fragment>
                        A curriculum component consists of a clear specifiable learning outcome and a sequence of learning tasks to achieve those learning outcomes. 
                      </React.Fragment>
                    }
              />
              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)} data-tour = "component_step">
                        {course.components.map((component, index) => (
                          <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {!(enableDrag)}>
                            {(provided, snapshot) => (
                                <DesignComponentItem 
                                  provided = {provided} 
                                  snapshot = {snapshot} 
                                  component = {component} 
                                  index = {index} 
                                  duplicateComponent = {duplicateComponent}
                                  deleteComponent = {deleteComponent}
                                  enableEdit = {enableEdit}
                                  enableDelete = {enableDelete}
                                  />
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </List>
                    </RootRef>
                  )}
                </Droppable>
                {
                  enableAdd? 
                  <Button variant="outlined" color="primary" onClick={handleClickOpen} fullWidth data-tour = "component_step_add">
                      Add COMPONENT
                  </Button>
                  :
                  null
                }
                
                <ComponentSelDialog open={open} handleClose={handleClose} addItems ={addComponentFromTemplate} onEnteredDialog = {onEnteredDialog}/>
              </DragDropContext>
      </React.Fragment>
    );
}

export default DesignComponentStep;

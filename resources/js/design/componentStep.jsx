import React, { Component } from "react";
import {
  List,
  Button
} from "@material-ui/core";


import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import  DesignComponentItem  from './componentItem';
import  ComponentSelDialog  from './componentSelDialog';
import {ContextStore} from '../container/designContainer'


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
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const DesignComponentStep = (props) =>
{ 
    const { course, dispatch } = React.useContext(ContextStore);

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
    const addItems = (text) => {
       
        //sync the data to root state
        dispatch({
          type: "ADD_COMPONENT",
          value: {...course.components[0], 
            id: course.components.length+1,
            title: text}
        })
    }

    const delItems = (index) => {
      dispatch({
        type: "DELETE_COMPONENT",
        value: index
      })
    }
    
    return(
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {course.components.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
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
    );
}

export default DesignComponentStep;

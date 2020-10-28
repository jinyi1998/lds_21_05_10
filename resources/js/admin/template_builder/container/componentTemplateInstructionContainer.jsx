import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import RootRef from "@material-ui/core/RootRef";

import ComponentInstructionView  from '../component/componentInstructionView';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import {AppContextStore} from '../../../container/app';

import { apiLearningCompTempGetInstructions, apiLearningCompInstructionPut } from '../../../api';

const ComponentTemplateInstructionContainer = (props) => {
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const [ instructions, setInstructions ] = React.useState([]);

    React.useEffect(()=>{
        reloadInstructions();
    }, [props.component_id]);

    const reloadInstructions = () =>{
        setLoadingOpen(true)
        apiLearningCompTempGetInstructions(props.component_id).then((response)=>{
            setInstructions(response.data);
            setLoadingOpen(false)
        })
    }

    const onAddInstruction = () =>{
        var new_instruction = {
            id: -1,
            media: "no_img",
            description: "",
            title: "",
            sequence: instructions.length + 1
        };
        setInstructions((_prev)=> [..._prev, new_instruction]);
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var updates = [];
        setLoadingOpen(true);

        //sync the data to root state
        var tempInstructions =  JSON.parse(JSON.stringify(instructions));

        // tempInstructions.map((_instruction, index)=> {
        //     if(_instruction.componentid.sequence == null){
        //         tempInstructions[index].componentid.sequence = index + 1;
        //     }
        // });

        var sourceInstruction = {
          id : tempInstructions[result.source.index].id,
          component_id : tempInstructions[result.source.index].componentid.component_id,
          sequence: tempInstructions[result.destination.index].componentid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempInstruction = {
                id : tempInstructions[i].id,
                component_id : tempInstructions[i].componentid.component_id,
                sequence: tempInstructions[i].componentid.sequence - 1
            }
            updates.push( apiLearningCompInstructionPut(tempInstruction) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempInstruction = {
              id : tempInstructions[i].id,
              component_id : tempInstructions[i].componentid.component_id,
              sequence: tempInstructions[i].componentid.sequence + 1
            }
            updates.push ( apiLearningCompInstructionPut(tempInstruction) );
          }
        }
        updates.push( apiLearningCompInstructionPut(sourceInstruction) );

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Instruction Sequences Updated")
            reloadInstructions();

        }).catch((error)=> {
            console.log(error);
            displayMsg("error", "Error Occured")
        })
    }

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightgrey' : '',
        width: '100%'
    });
    
    return (
        <React.Fragment>
            <Grid container>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                        <List style={getListStyle(snapshot.isDraggingOver)}>
                        {   
                            instructions.map( 
                                (_instruction, index) => 
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                {(provided, snapshot) => (
                                     <Grid item xs = {12} style ={{margin: 16}}>
                                        <ComponentInstructionView 
                                            provided = {provided} 
                                            snapshot = {snapshot} 
                                            instruction = {_instruction} 
                                            component_id = {props.component_id} 
                                            reloadInstructions = {reloadInstructions}/>
                                    </Grid>
                                )}
                                </Draggable>
                            )
                        }
                        {provided.placeholder}
                        </List>
                    </RootRef>
                )}
                </Droppable>
            </DragDropContext>
               
                <Grid container item xs ={12} justify = "flex-end">
                    <Button variant = "outlined" color = "primary" onClick = {onAddInstruction}>Add Instruction</Button>
                </Grid>
            </Grid>
            

        </React.Fragment>
    );
}

export default ComponentTemplateInstructionContainer;



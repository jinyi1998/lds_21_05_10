import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import RootRef from "@material-ui/core/RootRef";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DesignTypeInstructionView from '../component/designTypeInstructionView';
import {AppContextStore} from '../../../container/app'

import {apiGetDesignTypeInstruction, 
    apiDesignTypeInstructionUploadImg ,
    apiDesignTypeInstructionPost, apiDesignTypeInstructionPut, apiDesignTypeInstructionDelete} from '../../../api';

const DesignTypeInstructionContainer = (props) => {

    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const [ instructions, setInstructions ] = React.useState([]);

    //#region local action
    const addInstruction = () =>{
        var instruction_new = {
            id: -1,
            media: "no_img",
            title: "",
            description: "",
            designtype_id: props.designtype_id
        };
        setInstructions(_prev => ([..._prev, instruction_new]));
    }

    const reloadInstructions = () => {
        setLoadingOpen(true);
        apiGetDesignTypeInstruction(props.designtype_id).then((response)=>{
            setInstructions(response.data);
            setLoadingOpen(false);
        })
    }

    const onSaveInstruction = (instruction) =>{
        if(instruction.id == -1){
            //post
            apiDesignTypeInstructionPost(instruction).then(()=>{
                displayMsg('success', 'Instruction Added')
            }).catch(error=>{
                console.log(error);
                displayMsg('erorr', 'Some Error Ocurred')
            });
           
        }else{
            //put
            apiDesignTypeInstructionPut(instruction).then(()=>{
                displayMsg('success', 'Instruction Updated')
            }).catch(error => {
                console.log(error);
                displayMsg('erorr', 'Some Error Ocurred')
            });
        }
    }

    const onSavePicture = (pictures) => {
        return apiDesignTypeInstructionUploadImg(pictures).then((response)=>{
            return response;
        })
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        var updates = [];
        setLoadingOpen(true);

        //sync the data to root state
        var tempInstructions =  JSON.parse(JSON.stringify(instructions));

        var sourceInstruction = {
          id : tempInstructions[result.source.index].id,
          designtype_id : props.designtype_id,
          sequence: tempInstructions[result.destination.index].designtypeid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempInstruction = {
                id : tempInstructions[i].id,
                designtype_id : props.designtype_id,
                sequence: tempInstructions[i].designtypeid.sequence - 1
            }
            updates.push( apiDesignTypeInstructionPut(tempInstruction) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempInstruction = {
              id : tempInstructions[i].id,
              designtype_id : props.designtype_id,
              sequence: tempInstructions[i].designtypeid.sequence + 1
            }
            updates.push ( apiDesignTypeInstructionPut(tempInstruction) );
          }
        }
        updates.push( apiDesignTypeInstructionPut(sourceInstruction) );

        Promise.all(updates).then(()=>{
            setLoadingOpen(false);
            displayMsg("success", "Instruction Sequences Updated")
            reloadInstructions();

        }).catch((error)=> {
            console.log(error);
            displayMsg("error", "Error Occured")
        })
    }

    const onDeleteInstruction = (instruction) => {
        setLoadingOpen(true);
        apiDesignTypeInstructionDelete(instruction).then(response => {
            reloadInstructions();
            setLoadingOpen(false);
        })
    }

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightgrey' : '',
        width: '100%'
    });
    
    //#endregion

    React.useEffect(()=>{
        reloadInstructions();
    }, [props.designtype_id])

    return (
        <React.Fragment>
            <Grid container >
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <Grid container item xs = {12} spacing = {4} style={getListStyle(snapshot.isDraggingOver)}>
                            {
                                instructions.length == 0?
                                <Grid item xs ={12}>
                                    No instructions...
                                </Grid>
                                :
                                instructions.map((_instruction, index) => 
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <Grid item xs ={12}  >
                                            <DesignTypeInstructionView 
                                                provided = {provided} 
                                                snapshot = {snapshot} 
                                                instruction = {_instruction} 
                                                onSavePicture = {onSavePicture}
                                                onSaveInstruction = {onSaveInstruction}
                                                reloadInstructions = {reloadInstructions}
                                                onDeleteInstruction = {onDeleteInstruction}
                                            />
                                        </Grid>
                                    )}
                                    </Draggable>
                                )
                            }
                                {provided.placeholder}
                            </Grid>
                        </RootRef>
                    )}
                    </Droppable>
                </DragDropContext>
              
                <Grid container item xs ={12} justify = {"flex-end"}>
                    <Grid item xs = {2}>
                        <Button variant = {"outlined"} color = {"primary"} onClick = {addInstruction}>Add Instruction</Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DesignTypeInstructionContainer;
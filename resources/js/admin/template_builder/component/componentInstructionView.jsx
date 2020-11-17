import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import ImageUploader from "react-images-upload";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton  from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import { apiLearningCompInstructionGet, 
    apiLearningCompInstructionPost, 
    apiLearningCompInstructionPut, 
    apiLearningCompInstructionDelete, 
    apiLearningCompInstructionUploadImg} from '../../../api';

import {AppContextStore} from '../../../container/app';

const ComponentInstructionView = (props) => {
    const { setLoadingOpen, returnImgSrc } = React.useContext(AppContextStore);
    const {provided, snapshot, index} = props;

    const [ instruction, setInstruction] = React.useState({
        id: -1,
        media: "",
        title: "",
        description: "",
        component_id: -1
    });
    const [ isEdit, setIsEdit ]= React.useState(false);
    const [ isEditPic, setIsEditPic ] = React.useState(false);
    const [ pictures, setPictures ] = React.useState("");

    React.useEffect(()=>{
        setInstruction(props.instruction);
        setLoadingOpen(false);
    }, [props.instruction])


    //#region local action
    const getDraggable = (provided, snapshot) => {
        if(typeof provided == 'undefined'){
            return (
               null
            );
        }else{
            return (
                {
                    // styles we need to apply on draggables
                    ref: provided.innerRef,
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    style: getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )
                }
            );
        }
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // styles we need to apply on draggables
        ...draggableStyle,
      
        ...(isDragging && {
          background: "rgb(235,235,235)"
        })
    });
    
    
    const handleOnChange = (event) =>{
        switch(event.target.name){
            case 'title':
                setInstruction({...instruction, 'title': event.target.value})
                break;
            case 'description':
                setInstruction({...instruction, 'description': event.target.value})
                break;
        }
    }

    const onDrop = picture => {
        if(picture.length > 0){
            let fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPictures(fileReader.result);
            }
            fileReader.readAsDataURL(picture[0]);
        }else{
            setPictures("");
        }
    }

    const onClickEditPic = () => {
        setIsEditPic(true);
    }

    const onClickCancelEditPic = () => {
        setIsEditPic(false)
        setPictures('');
    }
    
    const onClickEdit = () => {
        setIsEdit(true)
    }

    const onSaveInstructure = () => {
        setLoadingOpen(true);
        if(pictures == ""){
            var temp = {
                ...instruction,
                component_id: props.component_id,
            }
            onSaveInstructureInfo(temp);
        }else{
            //upload the img first
            apiLearningCompInstructionUploadImg(pictures).then((response)=>{
                var temp = {
                    ...instruction,
                    media: response.data.path,
                    component_id: props.component_id,
                }
                onSaveInstructureInfo(temp);
            })
        }
      
        setIsEdit(false)
    }

    const onSaveInstructureInfo = (instruction) => {
        if(instruction.id == -1){
            // create new instruction
            apiLearningCompInstructionPost(instruction).then((response)=>{
                // setInstruction(response.data);
                props.reloadInstructions();
                setLoadingOpen(false);
            })
        }else{
            apiLearningCompInstructionPut(instruction).then((response)=>{
                // setInstruction(response.data)
                props.reloadInstructions();
                setLoadingOpen(false);
            })
        }
    }

    const onDeleteInstructure = () => {
        setLoadingOpen(true)
        if(instruction.id == -1){
            props.reloadInstructions();
        }else{
            apiLearningCompInstructionDelete(instruction).then((repsonse)=>{
                props.reloadInstructions();
            })
        }
     

    }

    const onCancelEdit = () => {
        setIsEdit(false)
    }   

    //#endregion

    const displayView = () => {
        return (
            <React.Fragment>
                 <Grid container item xs = {12} justify = "center">
                    <img src = {returnImgSrc(instruction.media)} style = {{width: 400}}/>
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant="h6">
                        Title
                    </Typography>
                    <Typography variant="body2">
                        {instruction.title}
                    </Typography>
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant="h6">
                        Description
                    </Typography>
                    <Typography variant="body2">
                        {instruction.description}
                    </Typography>
                </Grid>
            </React.Fragment>
        )
    }

    const displayEditView = () => {
        return (
            <React.Fragment>
                <Grid container item xs = {12} justify = "center">
                    {isEditPic?
                    <React.Fragment>
                         <ImageUploader
                                withIcon={true}
                                onChange={onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                                singleImage = {true}
                                withPreview = {true}
                         />
                        {/* <IconButton onClick = {onClickEditPic}><DoneIcon/></IconButton> */}
                        <IconButton onClick = {onClickCancelEditPic}><CloseIcon/></IconButton>
                    </React.Fragment>
                    :
                    <React.Fragment>
                         <img src = {returnImgSrc(instruction.media)} style = {{width: 400}}/>
                         <IconButton onClick = {onClickEditPic}><EditIcon/></IconButton>
                    </React.Fragment>
                    }
                   
                </Grid>

                <Grid item xs = {12}>
                    <TextField label="Title" name = "title" variant="outlined" value = {instruction.title} fullWidth onChange = {handleOnChange}/>
                </Grid>

                <Grid item xs = {12}>
                    <TextField label="Description" name = "description" 
                    variant="outlined" value = {instruction.description}  
                    multiline rows = {4} fullWidth onChange = {handleOnChange}/>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Paper>
                <Grid container item xs ={12}  {...getDraggable(provided, snapshot)}>

                    <Grid container item xs ={11}>
                       {
                       isEdit?
                       displayEditView()
                       :
                       displayView()
                       }
                    </Grid>

                    <Grid container item xs ={1}>
                        {
                            isEdit?
                                <React.Fragment>
                                    <IconButton onClick = {onSaveInstructure}><DoneIcon/></IconButton>
                                    <IconButton onClick = {onCancelEdit}><CloseIcon/></IconButton>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <IconButton onClick = {onClickEdit}><EditIcon/></IconButton>
                                    <IconButton onClick = {onDeleteInstructure}><DeleteIcon/></IconButton>
                                </React.Fragment>
                        }  
                    </Grid>
                </Grid>
            </Paper>
           
        </React.Fragment>
    );
}
export default ComponentInstructionView;
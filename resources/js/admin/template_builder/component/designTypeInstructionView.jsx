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

import {AppContextStore} from '../../../container/app'

const DesignTypeInstructionView = (props) => {
    const {provided, snapshot, index} = props;
    const { setLoadingOpen, returnImgSrc } = React.useContext(AppContextStore);

    const [ instruction, setInstruction] = React.useState({
        id: -1,
        media: "",
        title: "",
        description: "",
        designtype_id: -1
    });
    const [ isEdit, setIsEdit ]= React.useState(false);
    const [ isEditPic, setIsEditPic ] = React.useState(false);
    const [ pictures, setPictures ] = React.useState("");

    React.useEffect(()=>{
        var src = returnImgSrc(props.instruction.media);
        setInstruction({
            ...props.instruction,
            media: src
        });
    },[props.instruction])

    //#region local action
    const onSaveInstructure = () => {
        setLoadingOpen(true);
        if(pictures == ""){
            var request = [];
            request.push(props.onSaveInstruction(instruction));
            Promise.all(request).then(()=>{
                onClickCancelEditPic();
                onCancelEdit();
                props.reloadInstructions();
                setLoadingOpen(false);
            });
        }else{
            props.onSavePicture(pictures).then((response) => {
                var request = [];
                var temp = {
                    ...instruction,
                    media: response.data.path,
                }
                request.push(props.onSaveInstruction(temp));
                Promise.all(request).then(()=>{
                    onClickCancelEditPic();
                    onCancelEdit();
                    props.reloadInstructions();
                    setLoadingOpen(false);
                });
            })
        }
    }

    const onCancelEdit = () => {
        setIsEdit(false);
    }

    const onClickEdit = () => {
        setIsEdit(true);
    }

    const onDeleteInstructure = () => {
        props.onDeleteInstruction(instruction);
    }
    
    const onClickEditPic = () => {
        setIsEditPic(true)
    }

    const onClickCancelEditPic = () =>{
        setIsEditPic(false)
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

    const handleOnChange = (event) => {
        switch(event.target.name){
            case "description":
                setInstruction({
                    ...instruction,
                    "description": event.target.value
                })
                break;
            case "title":
                setInstruction({
                    ...instruction,
                    "title": event.target.value
                })
                break;
        }
    }

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
    
    //#endregion

    //#region display relation
    const displayView = () => {
        return (
            <React.Fragment>
                 <Grid container item xs = {12} justify = "center">
                    <img src = {instruction.media} style = {{width: 400}}/>
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
                         <img src = {instruction.media} style = {{width: 400}}/>
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
    //#endregion

    return (
        <React.Fragment>
            <Paper style = {{padding: 16}}>
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

export default DesignTypeInstructionView;
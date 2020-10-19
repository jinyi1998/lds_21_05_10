import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import CloseIcon from '@material-ui/icons/Close';;

import ImageUploader from "react-images-upload";

import { DesignTypeBuilderContextStore } from '../container/designTypeBuilderContainer';
import {AppContextStore} from '../../../container/app';

import { apiDesignTypePut, apiDesignTypeUploadImg } from '../../../api';

const DesignTypeBuilderBasicInfoView = (props) =>{
    const { designType, refreshDesignType } = React.useContext(DesignTypeBuilderContextStore);
    const { setLoadingOpen, returnImgSrc } = React.useContext(AppContextStore);

    const [ pictures, setPictures] = React.useState("");
    const [ isEditPic, setIsEditPic ] = React.useState(false);
    const [ designTypeInfo, setDesignTypeInfo ] = React.useState({
        name: "",
        description: "",
        hint: "",
        media: ""
    }); 

    React.useEffect(()=>{
        setLoadingOpen(true);
        setDesignTypeInfo({
            id: designType.id,
            name: designType.name,
            description: designType.description,
            hint: designType.hint,
            media: designType.media
        })
        setLoadingOpen(false)
    }, [designType]);

    //#region local action
    const onSaveInfo = () => {

        if(pictures != ""){
            apiDesignTypeUploadImg(pictures).then((response) => {
                var request = designTypeInfo;
                request.media = response.data.path;
                apiDesignTypePut(request).then(()=>{
                    refreshDesignType();
                    if(typeof props.handleNext == 'undefined'){
                        window.location.reload();
                    }else{
                        props.handleNext();
                    }
                })
            })
        }else{
            apiDesignTypePut(designTypeInfo).then(()=>{
                refreshDesignType();
                if(typeof props.handleNext == 'undefined'){
                    window.location.reload();
                }else{
                    props.handleNext();
                }
            })
        }
        
    }

    const handleNext = () =>{
        onSaveInfo();
    }

    const handleOnChange = (event, value) => {
        switch(event.target.name){
            case 'name':
                setDesignTypeInfo({...designTypeInfo, "name": event.target.value});
                break;  
            case 'description':
                setDesignTypeInfo({...designTypeInfo, "description": event.target.value});
                break;
            case 'hint':
                setDesignTypeInfo({...designTypeInfo, "hint": event.target.value});
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

    const onEditPic = () =>{
        setIsEditPic(true);
    }

    const onCancelEditPic = () =>{
        setPictures("");
        setIsEditPic(false);
    }
    //#endregion

    return (
        <React.Fragment>
            <Grid container>
                <Grid container item xs={12} justify="center">
                    {
                        isEditPic?
                        <React.Fragment>
                            <ImageUploader
                                withIcon={true}
                                onChange={onDrop}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                                singleImage = {true}
                                withPreview = {true}
                            />
                            {/* <Button  variant="contained" color="primary" onClick = {onCancelEditPic}>
                                Cancel
                            </Button> */}
                            <IconButton color="primary" aria-label="upload picture" onClick = {onCancelEditPic}>
                                <CloseIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        <React.Fragment>
                             <img src = {returnImgSrc(designTypeInfo.media)} style = {{maxWidth: 400}}/>
                             {/* <Button  variant="contained" color="primary" onClick = {onEditPic}>
                                Edit Picture
                            </Button> */}
                            <IconButton color="primary" aria-label="upload picture" onClick = {onEditPic}>
                                <PhotoCamera />
                            </IconButton>
                        </React.Fragment>
                    }
                   
                   
                </Grid>

                <Grid item xs ={12}>
                    <TextField label="Design Type Name"  fullWidth name = "name" value ={designTypeInfo.name} onChange = {handleOnChange}/>
                </Grid>

                <Grid item xs ={12}>
                    <TextField  label="Description" fullWidth multiline rows = {5} name = "description" value ={designTypeInfo.description} onChange = {handleOnChange}/>
                </Grid>

                <Grid item xs ={12}>
                    <TextField label="Hint" fullWidth  multiline rows = {5}  name = "hint" value ={designTypeInfo.hint} onChange = {handleOnChange}/>
                </Grid>

                <Grid container item xs ={12} justify="flex-end">
                    <Button  variant="contained" color="primary" onClick = {handleNext}>
                        Next
                    </Button>
                </Grid>
               
            </Grid>
        </React.Fragment>
    )
}

export default DesignTypeBuilderBasicInfoView;
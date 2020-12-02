import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskTemplateBuilderContainer from './taskTemplateBuilderContainer';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ImageUploader from "react-images-upload";
import ChipInput from 'material-ui-chip-input'

import PhotoCamera from '@material-ui/icons/PhotoCamera'
import CloseIcon from '@material-ui/icons/Close';;
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import {
    apiLearningPattTempGet,
    apiLearningPattTempPost,
    apiLearningPattTempPut,
    apiLearningPattTempDelete,
    apiLearningPattTempUploadImg
 } from '../../../api';

import {AppContextStore} from '../../../container/app';



const PatternTemplateBuilderContainer = (props) => {
    const [patternTemplate, setPatternTemplate] =  React.useState({
        id: -1,
        tasks: [],
        title: "",
        media: ""
    });
    const [ pictures, setPictures] = React.useState("");
    const [ tags, setTags] = React.useState([]);
    const [ isEditPic, setIsEditPic ] = React.useState(false);

    const [ displayMode, setDisplayMode ] = React.useState('edit');
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ isEditTitle, setIsEditTitle ] = React.useState(false);
    const {setLoadingOpen, returnImgSrc} = React.useContext(AppContextStore);

    React.useEffect(()=> {
        reloadPattern();
        if(typeof props.mode != 'undefined'){
            setDisplayMode(props.mode)
        }
    }, [props.pattern_id])

    const onDropMedia = picture => {
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

    const onEditMedia = () => {
        setIsEditPic(true);
    }

    const onCancelMedia = () => {
        setPictures("");
        setIsEditPic(false);
    }

    const onSaveMedia = () => {
        if( pictures != ""){
            //update pattern media
            apiLearningPattTempUploadImg(pictures).then((response) => {
                var temp  = JSON.parse(JSON.stringify(patternTemplate));
                temp['media'] = response.data.path;
                //avoid adding new tasks
                delete temp['tasks'];
                apiLearningPattTempPut(temp).then(
                    ()=>{
                        reloadPattern();
                        setIsEditTitle(false);
                        setAnchorEl(null);
                        setIsEditPic(false);
                    }
                )
            })

        }
    }   

    const onFinish = () => {
        window.location.href = "../pattern_template";
    }

    const reloadPattern = () => {
        setLoadingOpen(true)
        apiLearningPattTempGet(props.pattern_id).then(
            (response) => {
                setPatternTemplate(response.data);
                setTags(response.data.tags.map(_tag => _tag.name));
                setLoadingOpen(false)
            }
        )
    }

    const onChangeTitle = (event) => {
        setPatternTemplate({
            ...patternTemplate,
            "title":event.target.value
        })
    }

    const onClickRename = () => {
        var temp  = JSON.parse(JSON.stringify(patternTemplate));

        //avoid adding new tasks
        delete temp['tasks'];
        temp['tags'] = tags;
        apiLearningPattTempPut(temp).then(
            ()=>{
                reloadPattern();
                setIsEditTitle(false);
                setAnchorEl(null);
            }
        )
    }

    const onCancelRename = () => {
        reloadPattern();
        setIsEditTitle(false);
        setAnchorEl(null);
    }

    const addPatternTemplate = () => {
        apiLearningPattTempPost(patternTemplate).then(
            ()=>{
                window.location.href = "../pattern_template";
            }
        )
    }

    const deletePatternTemplate = () => {
        apiLearningPattTempDelete(patternTemplate).then(
            ()=> {
                window.location.href = "../pattern_template";
            }
        )
    }

    const handleAddChip = (chip) => {
        setTags([...tags, chip]);
      }
      
    const handleDeleteChip = (chip, index) => {
    // var tags = tags.splice(index, 1)
    var tags_temp = JSON.parse(JSON.stringify(tags));
    tags_temp.splice(index, 1);
    setTags(tags_temp);
    }
    

    const diplayEditView = () => {
        return (
            <Paper style = {{padding: 16}}>
                <Grid container  justify="center" alignItems="center">
                
                <Grid item xs = {12}>
                    {
                        !isEditTitle? 
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs ={10}>
                                <Typography variant="h5">{patternTemplate.title}</Typography>
                                <Typography variant="subtitle">{tags.map( _tag => "#" + _tag + " ")}</Typography>
                            </Grid>
                            <Grid item xs ={2}>
                                <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(event) => { event.stopPropagation(); setAnchorEl(event.currentTarget);}}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="componenet-edit-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={(event) => {event.stopPropagation(); setAnchorEl(null)}}
                                >
                                    <MenuItem onClick={()=> {event.stopPropagation(); setIsEditTitle(true)}}>Rename</MenuItem>
                                    <MenuItem onClick={()=> {event.stopPropagation(); addPatternTemplate()}}>Duplicate</MenuItem>
                                    <MenuItem onClick={()=> {event.stopPropagation(); deletePatternTemplate()}}>Delete</MenuItem>
                                </Menu>
                            </Grid>
                        
                        </Grid>
                        :
                        <Grid container  justify="center" alignItems="center">
                            <Grid container item xs spacing = {4}>
                                <Grid item xs = {12}>
                                    <InputLabel>
                                        Pattern Title
                                    </InputLabel>
                                    <TextField 
                                        variant="filled" 
                                        fullWidth value = {patternTemplate.title} onChange = {(event)=>onChangeTitle(event)}/>
                                </Grid>
                                <Grid item xs = {12}>
                                    <InputLabel>
                                        Tags
                                    </InputLabel>
                                    <ChipInput
                                        value={tags}
                                        onAdd={(chip) => handleAddChip(chip)}
                                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                        fullWidth
                                    />
                                    </Grid>
                            </Grid>
                            <Grid container item xs ={2} justify="center" alignItems="center">
                                <IconButton color = "primary" onClick = {onClickRename}>
                                    <DoneIcon/>
                                </IconButton>
                                <IconButton color = "Secondary" onClick = {onCancelRename}> 
                                    <CancelIcon /> 
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                </Grid>

                <Grid container item xs ={12} justify = {"center"}>
                {
                    isEditPic?
                    <React.Fragment>
                        <Grid item xs = {10}>
                            <ImageUploader
                                withIcon={true}
                                onChange={onDropMedia}
                                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                maxFileSize={5242880}
                                singleImage = {true}
                                withPreview = {true}
                            />
                        </Grid>
                        <Grid container item xs = {2} alignItems = {"center"}>
                            <IconButton color="primary" aria-label="upload picture"  onClick = {onSaveMedia}>
                                <DoneIcon/>
                            </IconButton>
                            <IconButton color="secondary" onClick = {onCancelMedia}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <img src = {returnImgSrc(patternTemplate.media)} style = {{maxWidth: 400}}/>
                        <IconButton color="primary" onClick = {onEditMedia}>
                            <PhotoCamera/>
                        </IconButton>
                    </React.Fragment>
                }
                </Grid>

                <Grid container item xs = {12}>
                    <Grid item xs = {12}>
                        <Typography variant="h6" gutterBottom>
                            Related Task
                        </Typography>     
                    </Grid>

                    <Grid container item xs = {12}>
                        <TaskTemplateBuilderContainer 
                            pattern_id = {patternTemplate.id}
                            tasksData = {patternTemplate.tasks} 
                            onFinish = {reloadPattern}
                            mode = {displayMode}
                        />
                    </Grid>
                    
                </Grid>

                <Grid item xs = {12}>
                    <Button variant = "contained" color = "primary" fullWidth onClick = {onFinish}>Finish</Button>
                </Grid>
            </Grid>
            </Paper>
        );
    }

    const displayListView = () => {
        return (
            <React.Fragment>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>{patternTemplate.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                            <TaskTemplateBuilderContainer 
                                pattern_id = {patternTemplate.id}
                                tasksData = {patternTemplate.tasks} 
                                onFinish = {reloadPattern}
                                mode = {displayMode}
                            />
                    </AccordionDetails>
                </Accordion>
            </React.Fragment>
        )
    }


    const display = () => {
        switch(displayMode){
            default:
            case 'edit':
                return diplayEditView();
            case 'list':
                return displayListView();
        }
    }



    return (
        <React.Fragment>
            {display()}
        </React.Fragment> 
    )
}

export default PatternTemplateBuilderContainer;
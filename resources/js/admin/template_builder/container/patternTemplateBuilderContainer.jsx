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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import {
    apiLearningPattTempGet,
    apiLearningPattTempPost,
    apiLearningPattTempPut,
    apiLearningPattTempDelete
 } from '../../../api';

import {AppContextStore} from '../../../container/app';



const PatternTemplateBuilderContainer = (props) => {
    const [patternTemplate, setPatternTemplate] =  React.useState({
        id: -1,
        tasks: [],
        title: ""
    });
    const [displayMode, setDisplayMode] = React.useState('edit');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isEditTitle, setIsEditTitle] = React.useState(false);
    const {setLoadingOpen} = React.useContext(AppContextStore);

    React.useEffect(()=> {
        reloadPattern();
        if(typeof props.mode != 'undefined'){
            setDisplayMode(props.mode)
        }
    }, [])


    const reloadPattern = () => {
        setLoadingOpen(true)
        apiLearningPattTempGet(props.pattern_id).then(
            (response) => {
                setPatternTemplate(response.data);
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
        var temp  = patternTemplate;
        //avoid adding new tasks
        delete temp['tasks'];
        apiLearningPattTempPut(patternTemplate).then(
            ()=>{
                reloadPattern();
                setIsEditTitle(false);
                setAnchorEl(null);
            }
        )
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
                            <Grid item xs ={10}>
                                <TextField label="Pattern Title" variant="filled" fullWidth value = {patternTemplate.title} onChange = {(event)=>onChangeTitle(event)}/>
                            </Grid>
                            <Grid item xs ={2}>
                                <Button variant = "contained" color = "Primary" onClick = {() => {onClickRename()}}>Confirm</Button>
                                <Button variant = "contained" color = "Secondary" onClick = {() => {setIsEditTitle(false)}}>Cancel</Button>
                            </Grid>
                        </Grid>
                    }
                </Grid>
                
                <Grid container item xs = {12}>
                    <Grid item xs = {12}>
                        Related Task
                    </Grid>

                    <Grid item xs = {12}>
                        <TaskTemplateBuilderContainer 
                            pattern_id = {patternTemplate.id}
                            tasksData = {patternTemplate.tasks} 
                            reloadPattern = {reloadPattern}
                            mode = {displayMode}
                        />
                    </Grid>
                    
                </Grid>

                <Grid item xs = {12}>
                    <Button variant = "contained" color = "Primary" fullWidth onClick = {() => {window.location.href = "../pattern_template"}}>Finish</Button>
                </Grid>
            </Grid>
            </Paper>
        );
    }

    const displayListView = () => {
        return (
            <React.Fragment>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>{patternTemplate.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <TaskTemplateBuilderContainer 
                                pattern_id = {patternTemplate.id}
                                tasksData = {patternTemplate.tasks} 
                                reloadPattern = {reloadPattern}
                                mode = {displayMode}
                            />
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
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
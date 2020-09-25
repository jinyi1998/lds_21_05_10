import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import OutcomeBuilderContainer from './outcomeBuilderContainer';
import TaskTemplateBuilderContainer from './taskTemplateBuilderContainer';
import PatternTemplateBuilderContainer from './patternTemplateBuilderContainer';
import PatternTemplateAddComponentContainer from './patternTemplateAddComponentContainer';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {
    apiLearningCompTempGet,
    apiLearningCompTempPost,
    apiLearningCompTempPut,
    apiLearningCompTempDelete
} from '../../../api';
import {AppContextStore} from '../../../container/app';


const useStyles = makeStyles(theme => ({
    paper : {
        padding: 16,
        margin: 16
    }
  }));


const ComponentTemplateBuilderContainer = (props) => {

    const classes = useStyles();

    const { setLoadingOpen } = React.useContext(AppContextStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isEditTitle, setIsEditTitle] = React.useState(false);
    const [ openPatternSelect, setOpenPatternSelect] = React.useState(false);

    const [ componentTemplate, setComponentTemplate] = React.useState({
       tasks: [],
       patterns: [] 
    });


    React.useEffect(()=> {
        apiLearningCompTempGet(props.component_id).then((response)=>{
            setComponentTemplate(response.data)
        })
    },[])

    //#region local action
    const onClickRename = () => {
        setLoadingOpen(true)
        setAnchorEl(null)
        apiLearningCompTempPost(temp).then(() => {
            window.location.href = "../component_template";
            setLoadingOpen(false)
        })
      
    }

    const onChangeTitle = (event) => {
        setComponentTemplate({
            ...componentTemplate,
            title: event.target.value
        })
    }

    const onDuplicateComponent = () => {
        setLoadingOpen(true)
        var temp = componentTemplate;
        temp['title'] = temp['title'] + "_COPY";
        apiLearningCompTempPost(temp).then(() => {
            setLoadingOpen(false)
            window.location.href = "../component_template";
        })
    }

    const onDeleteComponent = () => {
        setLoadingOpen(true)
        apiLearningCompTempDelete(temp).then(() => {
            setLoadingOpen(false)
            window.location.href = "../component_template";
        })
    }
    //#endregion 

    return (
        <React.Fragment>
              <Paper className ={classes.paper}>
                <Grid container  justify="center" alignItems="center">
                    <Grid item xs = {12}>
                        {
                            !isEditTitle? 
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs ={10}>
                                    <Typography variant="h5">{componentTemplate.title}</Typography>
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
                                        <MenuItem onClick={()=> {event.stopPropagation(); onDuplicateComponent();}}> Duplicate</MenuItem>
                                        <MenuItem onClick={()=> {event.stopPropagation(); onDeleteComponent();}}>Delete</MenuItem>
                                    </Menu>
                                </Grid>
                              
                            </Grid>
                            :
                            <Grid container  justify="center" alignItems="center">
                                <Grid item xs ={10}>
                                    <TextField label="Component Template Title" variant="filled" fullWidth value = {componentTemplate.title} onChange = {(event)=>onChangeTitle(event)}/>
                                </Grid>
                                <Grid item xs ={2}>
                                    <Button variant = "contained" color = "Primary" onClick = {() => {onClickRename()}}>Confirm</Button>
                                    <Button variant = "contained" color = "Secondary" onClick = {() => {setIsEditTitle(false);   setAnchorEl(null)}}>Cancel</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    
                    <Grid item xs = {12}>
                        <Paper className ={classes.paper}> 
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Grid item xs ={12}>
                                    Related Pattern
                                </Grid>
                                <Grid container item xs ={12} >
                                   <OutcomeBuilderContainer />
                                </Grid>
                                <Button variant = "contained" color = "Primary" onClick = {() => {window.location.href = ""}}>Add Related Outcomes</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs = {12}>
                        <Paper className ={classes.paper}> 
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Grid item xs ={12}>
                                    Related Pattern
                                </Grid>
                                <Grid container item xs ={12} >
                                    {
                                        componentTemplate.patterns.map((_pattern => {
                                            return (
                                                <Grid item xs ={12}  style={{padding: 16}}>
                                                    <PatternTemplateBuilderContainer mode = 'list' pattern_id = {_pattern.id}/>
                                                </Grid>
                                            )
                                        }))
                                    }
                                </Grid>

                                <PatternTemplateAddComponentContainer  component_id = {componentTemplate.id} />
                            </Grid>
                        </Paper>
                    </Grid>


                    <Grid item xs = {12}>
                        <Paper className ={classes.paper}>
                            <Grid container>
                                <Grid item xs={12}>
                                    Related Tasks
                                </Grid>
                                
                                <Grid item xs ={12}>
                                    <TaskTemplateBuilderContainer component_id = {componentTemplate.id} tasksData = {componentTemplate.tasks} mode = "edit"/>
                                </Grid>

                            </Grid>
                        
                        </Paper>
                    </Grid>

                    
                    <Grid item xs = {12}>
                        <Button variant = "contained" color = "Primary" fullWidth onClick = {() => {window.location.href = "../component_template"}}>Finish</Button>
                    </Grid>
                </Grid>
             </Paper>
        </React.Fragment>
    );
}

export default ComponentTemplateBuilderContainer;
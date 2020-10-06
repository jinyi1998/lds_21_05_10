import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import ComponentDesignTypeView from '../component/componentDesignTypeView';
import OutcomeBuilderContainer from './outcomeBuilderContainer';
import TaskTemplateBuilderContainer from './taskTemplateBuilderContainer';
import PatternTemplateBuilderContainer from './patternTemplateBuilderContainer';
import PatternTemplateAddComponentContainer from './patternTemplateAddComponentContainer';


import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    apiLearningCompTempGet,
    apiLearningCompTempPost,
    apiLearningCompTempPut,
    apiLearningCompTempDelete,
    apiLearningCompTempDeletePattern
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

    const { setLoadingOpen, options } = React.useContext(AppContextStore);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isEditTitle, setIsEditTitle] = React.useState(false);

    const [ componentTemplate, setComponentTemplate] = React.useState({
       tasks: [],
       patterns: [],
       designtype: {
           id: -1,
           outcomes: []
       }
    });

    React.useEffect(()=> {
        reFreshComponent();
    },[])

    //#region local action
    const onClickRename = () => {
        var temp = componentTemplate;
        setLoadingOpen(true)
        setAnchorEl(null)
        apiLearningCompTempPut(temp).then(() => {
            reFreshComponent();
            setLoadingOpen(false)
        })
    }

    const reFreshComponent = () => {
        setLoadingOpen(true);
        apiLearningCompTempGet(props.component_id).then((response)=>{
            setComponentTemplate(response.data);
            setLoadingOpen(false);
        })
    }

    const onOutcomeFinish = () => {
        reFreshComponent();
    }

    const onPatternFinish = () => {
        reFreshComponent();
    }

    const onTaskFinish = () => {
        reFreshComponent();
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
        temp['designtype_id'] = componentTemplate.designtype.id;
        apiLearningCompTempPost(temp).then(() => {
            setLoadingOpen(false)
            // window.location.href = "../component_template";
        })
    }

    const onDeleteComponent = () => {
        setLoadingOpen(true)
        apiLearningCompTempDelete(temp).then(() => {
            setLoadingOpen(false)
            window.location.href = "../component_template";
        })
    }

    const onDeletePattern = (pattern_id) => {
        var request = {
            'pattern_id': pattern_id,
            'component_id': componentTemplate.id
        }

        apiLearningCompTempDeletePattern(request).then(
            // location.reload()
        );
    }

    const onChangeDesignType = (designtype_id) => {
        var temp = componentTemplate;
        temp['designtype_id'] = designtype_id;
        delete temp.tasks; //avoid creating new tasks
        apiLearningCompTempPut(temp).then(() => {
            window.location.href = "../component_template";
            setLoadingOpen(false)
        })
    }

    const onFinish = () => {
        if(typeof props.onFinish == "undefined"){
            window.location.href = "../component_template";
        }else{
            props.onFinish();
        }
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
                                    <Button variant = "contained" color = "primary" onClick = {() => {onClickRename()}}>Confirm</Button>
                                    <Button variant = "contained" color = "secondary" onClick = {() => {setIsEditTitle(false);   setAnchorEl(null)}}>Cancel</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>

                    <Grid item xs = {12}>
                        <Paper className ={classes.paper}> 
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Grid item xs ={12}>
                                    Design Type
                                </Grid>
                                <Grid item xs = {12}>
                                    <ComponentDesignTypeView 
                                        designtype_id = {componentTemplate.designtype? componentTemplate.designtype.id : -1} onChangeDesignType = {onChangeDesignType}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs = {12}>
                        <Paper className ={classes.paper}> 
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Grid item xs ={12}>
                                    Related Outcome
                                </Grid>
                                <Grid container item xs ={12} >
                                   <OutcomeBuilderContainer 
                                        outcomes = {componentTemplate.outcomes} 
                                        unit_outcomes_opts = {componentTemplate.designtype? componentTemplate.designtype.outcomes : []}
                                        component_id = {componentTemplate.id}
                                        onFinish = {onOutcomeFinish}
                                    />
                                </Grid>
                               
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
                                                <Grid container alignItems="center" justify="center" direction="row" key = {_pattern.id}>
                                                    <Grid item xs ={11}  style={{padding: 16}}>
                                                        <PatternTemplateBuilderContainer 
                                                            mode = 'list' 
                                                            pattern_id = {_pattern.id}
                                                            onFinish = {onPatternFinish}
                                                        />
                                                    </Grid>

                                                    <Grid item xs ={1}>
                                                        <IconButton color="primary" aria-label="add to shopping cart" onClick = {()=>{onDeletePattern(_pattern.id)}}>
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }))
                                    }
                                </Grid>

                                <PatternTemplateAddComponentContainer 
                                    earse_pattern_id = {componentTemplate.patterns.map( _x => _x.id)}  
                                    component_id = {componentTemplate.id} 
                                    onFinish = {onPatternFinish}
                                />
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
                                    <TaskTemplateBuilderContainer 
                                        component_id = {componentTemplate.id} 
                                        tasksData = {componentTemplate.tasks} 
                                        mode = "edit"
                                        onFinish = {onTaskFinish}
                                    />
                                </Grid>

                            </Grid>
                        
                        </Paper>
                    </Grid>

                    
                    <Grid item xs = {12}>
                        <Button variant = "contained" color = "primary" fullWidth onClick = {onFinish}>Finish</Button>
                    </Grid>
                </Grid>
             </Paper>
        </React.Fragment>
    );
}

export default ComponentTemplateBuilderContainer;
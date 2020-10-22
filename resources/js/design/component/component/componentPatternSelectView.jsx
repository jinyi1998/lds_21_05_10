import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';

import LearningTaskView from '../../task/learningTaskView';
import ComponentPatternBinFilterContainer from '../container/componentPatternBinFilterContainer';

import {AppContextStore} from '../../../container/app';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: 400, margin: "5%"
    },
    media: {
        height: 200,
        width: '100%',
        backgroundSize: 'contain'
    },
  }));

const ComponentPatternSelectView = (props) => {
    const classes = useStyles(); 
    const { options, returnImgSrc } = React.useContext(AppContextStore);

    const [ component, setComponent ] = React.useState({
        id: -1,
        outcomes: [],
        patterns: [],
        title: "",
        is_selected: false
    });

    const [ patternOpts, setPatternOpts ] = React.useState([]);
    const [ selectPattern, setSelectPattern ] = React.useState(-1);
    const [ selectDisplayPattern, setSelectDisplayPattern ] = React.useState(-1);
    const [ open, setOpen ] = React.useState(false);
    const [ isEditName, setIsEditName ] = React.useState(false);

    React.useEffect(()=>{
        setComponent(props.component);
        setPatternOpts(props.component.patterns);

        if(props.component.patterns.length == 0){
            //if no pattern, no need to select
            var component_temp = props.component;
            component.is_selected = true;
            props.feedbackComponent(component);
        }
    }, [props.component]);

    const handleOnClick = (e, index) => {
        e.preventDefault();
        setSelectDisplayPattern(index);
        setOpen(true);
    }

    const handleOnSelect = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if(e.target.checked && index != selectPattern){
            setSelectPattern(index);

            var component_temp = props.component;
            component_temp.title = component.title;
            component_temp.patterns = [patternOpts[index]];
            component_temp.is_selected = true;
            props.feedbackComponent(component_temp);
        }else{
            setSelectPattern(-1);

            var component_temp = props.component;
            component_temp.title = component.title;
            component_temp.is_selected = false;
            props.feedbackComponent(component_temp);
        }
    }

    const onRename = (event) => {
        var component_temp = {
            ...component, 
            title: event.target.value
        }
        setComponent(component_temp);
    }

    const onClickDelete = () => {
        props.onDeleteComponent();
    }
    
    const onClickEdit = () => {
        setIsEditName(true);
    }

    const onClickFinishEdit = () => {
        props.feedbackComponent({...props.component, title: component.title});
        setIsEditName(false);
    }

    const displayDisplay = () => {
        if(!(selectDisplayPattern == -1 || patternOpts.length == 0 || typeof patternOpts[selectDisplayPattern] == 'undefined')){
            return (
                <DialogContent>
                    <Grid container alignItems="flex-start">
                        <Grid container item xs = {4}>
                            <Grid container spacing = {2}>
                                <Grid item xs ={12}>
                                    <Typography variant="h6" gutterBottom>Outcomes</Typography>
                                </Grid>
                                {component.outcomes.map((_outcome, index)=> 
                                <Grid container item xs = {12} key = {index}>  
                                    <Grid item xs ={12}>
                                        <Typography display="inline" variant="subtitle1" gutterBottom>{options.learningOutcomeType.find(x => x.id == _outcome.outcomeType).description} </Typography> 

                                        <Typography display="inline" variant="body2" gutterBottom> - {_outcome.description} </Typography>
                                    </Grid>
                                    <Grid item xs ={12}>
                                        <Typography variant="body2" gutterBottom> {_outcome.level} </Typography>
                                    </Grid>
                                </Grid>
                                )}
                            </Grid>
                         
                        </Grid>
    
                        <Grid container item xs = {8}>
                            <Grid item xs ={12}> <Typography variant="h6" gutterBottom> Tasks</Typography></Grid>
                            {patternOpts[selectDisplayPattern].tasks.map((_task, index)=>{
                                return(
                                    <Grid item xs ={12} key = {index}>
                                        <LearningTaskView 
                                            taskID = {_task.id} 
                                            taskData = {_task} 
                                            key = {index}
                                            editBtn = {false}
                                            duplicateBtn = {false}
                                            deleteBtn = {false}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </DialogContent>
            );
        }else{
            return (
                null
            );
        }
       
    }

    return (
        <React.Fragment>
            <Grid container spacing = {4}>
                <Grid container item xs ={12} alignItems="center">
                    {
                        isEditName?
                            <React.Fragment>
                                <Grid item xs ={4}>
                                    <TextField 
                                        label="Title" 
                                        variant="outlined" 
                                        value = {component.title} 
                                        onChange = {(event) => onRename(event)}
                                        fullWidth
                                    />
                                   
                                </Grid>     
                                <Grid item xs = {4} >
                                    <IconButton aria-label="delete" onClick = {onClickFinishEdit}>
                                        <DoneIcon />
                                    </IconButton>
                                </Grid>                          
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Typography variant="h6" display = "inline">
                                    CC {component.sequence} - {component.title}
                                </Typography>

                                <Tooltip title="Edit" aria-label="add">
                                    <IconButton onClick = {onClickEdit}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                             

                                <Tooltip title="Delete" aria-label="add">
                                    <IconButton color="primary" onClick = {onClickDelete}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                    }
                    <Grid item xs>
                        <ComponentPatternBinFilterContainer 
                            originalPatterns = {props.component.patterns} 
                            patternOpts = {patternOpts} 
                            setPatternOpts = {setPatternOpts}/>
                    </Grid>
                   
                </Grid>
                <Grid container>
                    {   
                        patternOpts.length == 0? 
                        <Grid container item xs = {12} justify = "center" alignContent = "center" style = {{margin: 24}}>
                            <Typography variant = "subtitle1">No available patterns</Typography>
                        </Grid>
                        :
                        patternOpts.map((_patternOpt, index)=>{
                            return(
                                <Grid item xs = {4} key ={index}>
                                    <ToggleButton variant="outlined" key ={index} selected = {selectPattern == index} onClick = {(e) => handleOnClick(e, index)}  className = {classes.button}>
                                        <Grid container>
                                            <Grid container item xs ={12} justify = "center">
                                                <img src =  {returnImgSrc(_patternOpt.media)}  style = {{height: 150}}/>
                                            </Grid>

                                            <Grid item xs ={12}>
                                                {_patternOpt.title}
                                            </Grid>

                                            <Grid item xs = {12}>
                                                <Checkbox
                                                    checked={selectPattern == index}
                                                    onClick={(event) => handleOnSelect(event, index)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </ToggleButton>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>
            <Dialog open={open} onClose={()=>setOpen(false)} maxWidth="lg">
                {displayDisplay()}
            </Dialog>
        </React.Fragment>
    )
}
export default ComponentPatternSelectView;
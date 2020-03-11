import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {ContextStore} from '../container/designContainer'

import LearningOutcomeAdd from './learningOutcomeAdd';
import LearningOutcomeAddFromSelect from './learningOutcomeAddFromSelect';
import InstructionBox from '../components/instructionBox';

const useStyles = makeStyles(theme => ({
    list: {
      width: '100%',
    },
    expansionPanelSummary: {
      backgroundColor: "#91bbff"
    },
    appBar: {
        position: 'relative',
      },
  }));

const LearningOutcomeUnit = (props)=>{
    const {options } = React.useContext(ContextStore);
    const {level, outcomeType, STEMType, description, status} = props.learningOutcomeData;
    const { onOpenDelDialog, index } = props;

    const learningTypeTemp = options.learningOutcomeType;
    return (
        <ListItem>
            <ListItemText
                primary={learningTypeTemp.find(x => x.id == outcomeType)?.description + " - " + description}
                secondary={ 
                    ( STEMType.length > 0?  ("STEM: (" +STEMType.map((_STEM) => _STEM) + ") | " )
                    : "")  
                    + "Level:(" +level + ")"
                } 
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick = {()=> onOpenDelDialog(index)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const LearningOutcomeToDo = (props)=>{ 
    const {componentData} = props; 
    var modeLevel = "course";
    const classes = useStyles();

    const { course, dispatch, options } = React.useContext(ContextStore);
    const [learningOutcomeOpen, setLearningOutcomeOpen] = React.useState(false);

    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const [delIndex, setDelIndex] = React.useState(false);
    
    const [addSelector, setAddSelector] = React.useState(false);

    if(typeof componentData !== 'undefined'){
        modeLevel = "component";
    }else{
        modeLevel = "course";
    }

    //#region  action related
    const addLearningOutcome = () => {
        setLearningOutcomeOpen(true);
    }

    const closeAddLearningOutcome = () => {
        setAddSelector();
        setLearningOutcomeOpen(false);
    };


    const handleOnSave = (addedLearningOutcome, action = "") => {
        
        if(modeLevel ==  "course" ){
            addedLearningOutcome.isCourseLevel = true
        }else{
            addedLearningOutcome.isCourseLevel = false
            addedLearningOutcome.componentid = componentData.id;
        }       

        dispatch({
            type: "ADD_LEARNINGOUTCOME",
            value: addedLearningOutcome
        })

        // if(modeLevel ==  "course" ){
        //     //course level 
        //     if(addedLearningOutcome.id == -1){
        //         addedLearningOutcome.id = course.learningOutcomes.length + 1;
        //     }
        //     addedLearningOutcome.isCourseLevel = true
        //     const data_test = [...course.learningOutcomes, addedLearningOutcome];
        //     dispatch({
        //         type: "SET_LEARNINGOUTCOME",
        //         value: data_test
        //       })
        // }else{
        //     //component level 
        //     addedLearningOutcome.isCourseLevel = false
        //     if(action != "select"){
        //         //add new learningout
        //         if(addedLearningOutcome.id == -1){
        //             addedLearningOutcome.id = course.learningOutcomes.length + 1;
        //         }
        //         const data_test = [...course.learningOutcomes, addedLearningOutcome];
        //         dispatch({
        //             type: "SET_LEARNINGOUTCOME",
        //             value: data_test
        //           })
        //     }
        //     //match to component
        //     const data_test = {...componentData, learningOutcomes: [...componentData.learningOutcomes, addedLearningOutcome.id]};
        //     dispatch({
        //         type: "UPDATE_COMPONENT",
        //         value: data_test
        //       })
        // }
    }

    const onOpenDelDialog = (index) => {
        setDelIndex(index);
        setDelDialogOpen(true);
    }
    const onDelOutcomes = () =>{
        if(modeLevel ==  "course" ){
            dispatch({
                type: "DELETE_LEARNINGOUTCOME",
                value: delIndex
              })
        }else{
            let learningOutcome_id = componentData.learningOutcomes[delIndex];
            // del learningOutcomes in all assessment
            componentData.tasks.map(
                _task => {
                    _task.assessment = _task.assessment.filter( x => x != learningOutcome_id)
                }
            )

            // del learningOutcomes in component level
            componentData.learningOutcomes.splice(delIndex, 1);
            dispatch({
                type: "UPDATE_COMPONENT",
                value: componentData
            })
            let temp_learningOutcome = course.learningOutcomes.find (x=> x.id == learningOutcome_id);

            if(temp_learningOutcome.isCourseLevel != true){
                let learningOutcome = course.learningOutcomes.filter( x=> x.id != learningOutcome_id);
                dispatch({
                    type: "SET_LEARNINGOUTCOME",
                    value: learningOutcome
                  })
            }
        }
        //close the dialog
        setDelDialogOpen(false);
    }
    //#endregion

    const displayLearningOutcomeAdd = () => {
        if(modeLevel ==  "course" ){
            return ( <LearningOutcomeAdd onClose={closeAddLearningOutcome} handleOnSave={handleOnSave}/>);
        }else if(addSelector == "addNew"){
            return ( <LearningOutcomeAdd onClose={closeAddLearningOutcome} handleOnSave={handleOnSave}/>);
        }else if(addSelector == "selectFromCourse"){
            return ( <LearningOutcomeAddFromSelect 
                onClose={closeAddLearningOutcome} 
                handleOnSave={handleOnSave} 
                learningOutcomeOpts = {course.learningOutcomes.filter(x=> x.isCourseLevel == true)}/>);
        }else{
            return (
                <React.Fragment>
                     <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={()=>  setLearningOutcomeOpen(false) } aria-label="close">
                            <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            Adding new learning outcome
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={3} margin= {3} >
                        <Grid item xs={12}>
                            <h4> Add learning outcomes that specify what learners will be able to do after this unit</h4>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick = {()=> setAddSelector("selectFromCourse")}>
                            Choose from course-level learning outcomes
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" color="secondary" onClick = {()=> setAddSelector("addNew")}>
                            Add a new learning outcome
                            </Button>
                        </Grid>
                    </Grid>                  
                </React.Fragment>
            );
        }

    }

    const displayLearningOutcomes = () => {
        if(modeLevel == "course"){
            return (
                course.learningOutcomes.map(
                    (_data, index )=>
                        (_data.isCourseLevel == true)?  
                            <LearningOutcomeUnit 
                                learningOutcomeData = {_data} 
                                key={index} 
                                onOpenDelDialog = {onOpenDelDialog} 
                                index = {index}/> 
                            : null
            ))
        }else{
            //component learning outcome
            return (
                componentData.learningOutcomes.map(
                    (_id, index )=>
                    <LearningOutcomeUnit 
                        learningOutcomeData = {course.learningOutcomes.find(x => x.id == _id)} 
                        key={index}  
                        onOpenDelDialog = {onOpenDelDialog} 
                        index = {index}/>  
                    //find learning outcome
                    // course.learningOutcomes.map(
                    //        (_data) => 
                    //         (_data.id == _id)?  
                    //             <LearningOutcomeUnit 
                    //                 learningOutcomeData = {_data} 
                    //                 key={index}  
                    //                 onOpenDelDialog = {onOpenDelDialog} 
                    //                 index = {index}/>  
                    //             : null
                    // )
                )
            )
        }
    }

    const displayDelLearningOutcomeDialog = () => {
        return (
            <React.Fragment>
                <DialogTitle id="form-dialog-title">Warning</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are You Sure To Delete LearningOutcome #({delIndex})
                    This action cannot be recovered
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{setDelDialogOpen(false)}} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>{onDelOutcomes()}} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>

            {/* {modeLevel == "course"? 
                <InstructionBox 
                    title="Unit Level Learning Outcomes" 
                    content= "Please define the learning outcomes for your unit" 
                    tips="Unit Level Learning Outcomes is the overall learning outcomes for the whole unit(course)"
                />
                :
                <InstructionBox 
                    title="Component Level Learning Outcomes" 
                    content= "Please define the learning outcomes for your component" 
                    tips="Component level is the learning outcome for the selected component only"
                />
            } */}

            <ExpansionPanel defaultExpanded	={true}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className = {classes.expansionPanelSummary}
                >
                    <Typography>{modeLevel == "course"? "Unit Level" : "Component Level"} Learning Outcomes</Typography>
                    
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs= {12}>
                        {modeLevel == "course"? 
                            <InstructionBox 
                                title="Unit Level Learning Outcomes" 
                                content= "Please define the learning outcomes for your unit" 
                                tips="Unit Level Learning Outcomes is the overall learning outcomes for the whole unit(course)"
                            />
                            :
                            <InstructionBox 
                                title="Component Level Learning Outcomes" 
                                content= "Please define the learning outcomes for your component" 
                                tips="Component level is the learning outcome for the selected component only"
                            />
                        }
                        </Grid> 
                        <Grid item xs={12}>
                            <List className = {classes.list}>
                                {displayLearningOutcomes()}
                                <Button onClick={addLearningOutcome}>Add Learning Outcome</Button>
                            </List>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                
                <Dialog fullScreen open={learningOutcomeOpen} onClose={closeAddLearningOutcome}>
                    {displayLearningOutcomeAdd()}
                </Dialog>

                <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                    {displayDelLearningOutcomeDialog()}
                </Dialog>
        </ExpansionPanel>
      </React.Fragment>
    );
}

export default LearningOutcomeToDo;
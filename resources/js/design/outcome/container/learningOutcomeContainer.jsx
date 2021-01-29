import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import LearningOutcomeUnit from '../component/learningOutcomeUnit';
import LearningOutcomeEditContainer from './learningOutcomeEditContainer';
import LearningOutcomeSelectContainer from './learningOutcomeSelectContainer';
import InstructionBox from '../../../components/instructionBox';

import QuestionHint from '../../../components/questionHint';
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
    apiLearningOutcomeDelete, apiLearningOutcomeDeletComponentRelation,
    apiLearningOutcomeComponentPut,
    apiLearningOutcomePost, apiLearningOutcomeCoursePut,
    
} from "../../../api.js"

const useStyles = makeStyles(theme => ({
    AccordionSummary: {
      backgroundColor: theme.palette.primary.dark,
      color: 'white'
    },
  }));


const LearningOutcomeContainer = (props)=>{ 
    const {component} = props; 

    var modeLevel = "course";
    if(typeof component !== 'undefined'){
        modeLevel = "component";
    }else{
        modeLevel = "course";
    }

    const classes = useStyles();

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { tourSetMode, tourSetRun, tourNextStep, tourStepIndex } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg, options } = React.useContext(AppContextStore);

    React.useEffect(()=> {
        if(modeLevel == "course"){
            tourSetRun(false);
            tourSetMode('ulo');
        }
    }, [modeLevel])

    React.useEffect(()=>{
        var temp = [];
        if(modeLevel == "course"){
            temp = course.outcomes;
        }else{
            temp = course.outcomes.filter(_outcome => _outcome.componentid.filter(_componentid => _componentid.component_id == component.id).length > 0);
        }
        setOutcomes(temp);
    }, [modeLevel, course])
    
    const [outcomes, setOutcomes] = React.useState([]);

    const [learningOutcomeOpen, setLearningOutcomeOpen] = React.useState(false);

    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const [selectDialogOpen, setSelectDialogOpen] = React.useState(false);

    const [learningOutcomeID, setLearningOutcomeID] = React.useState(-1);
    const [learningOutcome, setLearningOutcome] = React.useState({
        level: -1,
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        bloom_id: -1
    });

    const enableAdd = course.permission > 2; 
    const enableEdit = course.permission > 2; 
    const enableDrag = course.permission > 2; 
    const enableDelete = (course.permission > 2 &&  modeLevel == "course"); 
    const enableDuplicate =  (course.permission > 2 &&  modeLevel == "course"); 
    


    //#region  action related
    const addLearningOutcome = () => {
        tourSetRun(false);
        setLearningOutcomeID(-1);
        setLearningOutcomeOpen(true);
    }

    const editLearningOutcome = (outcome) => {
        setLearningOutcomeID(outcome.id);
        setLearningOutcome(outcome);
        setLearningOutcomeOpen(true);
    }

    const onEnterLearningOutcome = () => {
        if(  modeLevel == "course" && tourStepIndex == 3){
            tourSetRun(true);
            tourNextStep();
        }
    }

    const closeAddLearningOutcome = () => {
        setLearningOutcomeOpen(false);
    };


    const handleOnSave = (addedLearningOutcome, action = "") => {
    }

    const onOpenDelDialog = (outcome) => {
        setLearningOutcome(outcome);
        setDelDialogOpen(true);
    }

    const onDelOutcomes = () =>{
        //close the dialog
        deleteLearningOutcome();
        setDelDialogOpen(false);
    }

    const onDragEnd = (result) => {
        if(modeLevel == 'course'){
            onDragEndCourse(result);
        }else{
            onDragEndComponent(result)
        }
    }

    const onDragEndCourse = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        setLoadingOpen(true);
        var updates = [];

        //sync the data to root state
        var tempOutcomes =  JSON.parse(JSON.stringify(outcomes.sort( (a,b) => a.outcomeType - b.outcomeType).sort((a,b) => a.sequence - b.sequence)));
        tempOutcomes.map((_outcome, index)=> {
            if(_outcome.courseid.sequence == null){
                tempOutcomes[index].courseid.sequence = index + 1;
            }
        });

        var sourceOutcomes = {
          id: tempOutcomes[result.source.index].courseid.id,
          sequence: tempOutcomes[result.destination.index].courseid.sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempOutcome = {
              id : tempOutcomes[i].courseid.id,
              sequence: tempOutcomes[i].courseid.sequence - 1
            }
            updates.push( updateOutcomeSequence(tempOutcome) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempOutcome = {
              id : tempOutcomes[i].courseid.id,
              sequence: tempOutcomes[i].courseid.sequence + 1
            }
            updates.push ( updateOutcomeSequence(tempOutcome));
          }
        }
        updates.push( updateOutcomeSequence(sourceOutcomes));

        Promise.all(updates).then(() => {
            setLoadingOpen(false);
            displayMsg("success", "Outcomes Sequences Updated");
        }).catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Opps, Some error occured");
        })
    }

    const onDragEndComponent = (result) => {

        if (!result.destination) {
            return;
        }

        setLoadingOpen(true);
        var updates = [];

        //sync the data to root state
        var tempOutcomes =  JSON.parse(JSON.stringify(component.outcomeid));
    
        tempOutcomes.map((_outcome, index)=> {
            if(_outcome.sequence == null){
                tempOutcomes[index].sequence = index + 1;
            }
        });

        var sourceOutcomes = {
          id: tempOutcomes[result.source.index].id,
          sequence: tempOutcomes[result.destination.index].sequence
        }

        if(result.source.index < result.destination.index){
          for(var i = result.source.index + 1; i < result.destination.index + 1; i++){
            let tempOutcome = {
              id : tempOutcomes[i].id,
              sequence: tempOutcomes[i].sequence - 1
            }
            // console.log(tempOutcome);
            updates.push( updateOutcomeSequence(tempOutcome) );
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempOutcome = {
              id : tempOutcomes[i].id,
              sequence: tempOutcomes[i].sequence + 1
            }
            // console.log(tempOutcome);
            updates.push( updateOutcomeSequence(tempOutcome) );
          }
        }
        // console.log(sourceOutcomes);
        updates.push( updateOutcomeSequence(sourceOutcomes) );

        Promise.all(updates).then(() => {
            setLoadingOpen(false);
            refreshCourse();
            displayMsg("success", "Outcomes Sequences Updated");
        }).catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Opps, Some error occured");
        })
    }

    const onDuplicateOutcome = (outcome) => {
        setLoadingOpen(true);
        if(modeLevel == "component"){
            outcome.component_id = outcome.componentid[0].component_id;
            outcome.unit_outcome_id = outcome.unit_outcomeid.unit_outcomeid;
            apiLearningOutcomePost(outcome).then(()=>{
                refreshCourse();
                displayMsg('success', 'outcome duplicated');
            }).catch(error => {
                displayMsg('error', 'Error occured');
                console.log(error);
            })

        }else{
            outcome.course_id = outcome.courseid.course_id;
            apiLearningOutcomePost(outcome).then(()=>{
                refreshCourse();
                displayMsg('success', 'outcome duplicated');
            }).catch(error => {
                displayMsg('error', 'Error occured');
                console.log(error);
            })
        }
    }

    const onClickSelectOutcome = () => {
        setSelectDialogOpen(true);
    }

    const onCloseSelectOutcome = () => {
        setSelectDialogOpen(false);
    }
    //#endregion

    //#region Data Request Related 
    async function deleteLearningOutcome() {
        setLoadingOpen(true)
        if(modeLevel == "component" && learningOutcome.isCourseLevel == true){
            //just remove the component relation
            apiLearningOutcomeDeletComponentRelation({
                "outcome_id": learningOutcome.id,
                "component_id": component.id
            }).then(
                ()=>{
                    refreshCourse()
                    setLoadingOpen(false)
                    displayMsg("success", "Outcomes Deleted");
                }
            )
            .catch(error => {
                console.log(error)
                displayMsg("error", "Opps, Some error occured");
            });   

        }else{
            apiLearningOutcomeDelete(learningOutcome.id)
            .then(()=>{
                //load the default learning outcomes by api request
                refreshCourse()
                setLoadingOpen(false)
                displayMsg("success", "Outcomes Deleted");
            })
            .catch(error => {
                console.log(error)
                displayMsg("error", "Opps, Some error occured");
            });   
        }
       
    }

    async function updateOutcomeSequence(outcome_relation) {
    setLoadingOpen(true)
    if(modeLevel == "component"){
        await apiLearningOutcomeComponentPut(outcome_relation).then(
        ).catch(error => console.log(error));   
    }else{
        await apiLearningOutcomeCoursePut(outcome_relation).then(
        ).catch(error => console.log(error));   
    }
    
    }

    //#endregion
    
    //#region Display View Function Related
    const displayLearningOutcomeEdit = () => {
        if(modeLevel ==  "course" ){
            return ( 
                <LearningOutcomeEditContainer 
                    outcomeID = {learningOutcomeID} 
                    courseID= {course.id} 
                    onClose={closeAddLearningOutcome} 
                    handleOnSave={handleOnSave} 
                    learningOutcome = {learningOutcome}
                />
            );
        }else{
            return ( 
                <LearningOutcomeEditContainer 
                    outcomeID = {learningOutcomeID} 
                    componentID = {component.id} 
                    onClose={closeAddLearningOutcome} 
                    handleOnSave={handleOnSave} 
                    learningOutcome = {learningOutcome}
                />);
        }
    }

    const displayLearningOutcomes = () => {
        return (
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                {   
                    outcomes.filter(lo => lo.isCourseLevel == true).length > 0?
                    options.outcomeTypeOpts.map( (_lo_type, index) => 

                        <Accordion defaultExpanded = {true} style = {{width: '100%'} } key = {index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className = {classes.AccordionSummary}
                            >
                                {_lo_type.name}
                            </AccordionSummary>

                            <AccordionDetails>
                            {outcomes.filter(lo => lo.outcomeType == _lo_type.id).filter(lo => lo.isCourseLevel == true).length > 0?
                                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                                    <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <RootRef rootRef={provided.innerRef}>
                                        <List style={getListStyle(snapshot.isDraggingOver)} data-tour ="ulo_display_view">
                                        {
                                            outcomes.filter(lo => lo.outcomeType == _lo_type.id).sort((a,b)=> a.sequence - b.sequence).map(
                                            (_outcome, index )=>
                                                (
                                                    <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled = {!(enableDrag)}>
                                                    {(provided, snapshot) => (
                                                        <LearningOutcomeUnit 
                                                            learningOutcome = {_outcome}
                                                            key={index} 
                                                            provided = {provided} 
                                                            snapshot = {snapshot} 
                                                            component = {component} 
                                                            onOpenDelDialog = {onOpenDelDialog} 
                                                            onOpenEditDialog = {editLearningOutcome}
                                                            onDuplicateOutcome = {onDuplicateOutcome}
                                                            enableEdit = {enableEdit}
                                                            enableDuplicate = {enableDuplicate}
                                                            enableDelete = {enableDelete}
                                                            index = {index}/> 
                                                    )}
                                                    </Draggable>
                                                )
                                            )
                                        }
                                        {provided.placeholder}
                                        </List>
                                        </RootRef>
                                    )}
                                    </Droppable>
                                </DragDropContext>
                                :
                                <ListItem>
                                    <Typography variant = {"caption"} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                        {"There is no outcome under this learning outcome type"}
                                    </Typography>
                                </ListItem>
                                }

                            </AccordionDetails>
                        </Accordion>
                        
                    )
                    :
                    <Grid container spacing = {2}>
                        <Grid item xs = {12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"What intended learning outcomes do you want to achieve by designing this component"}
                            </Typography>
                        </Grid>
                       
                        <Grid item xs = {12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"Add the pre-design learning outcomes step 2 and link to the tasks with assessment"}
                            </Typography>
                        </Grid>

                        <Grid item xs ={12}>
                            <Typography variant = {"body2"} color = "textPrimary" data-tour = "lo_description">
                                {"Design Tips: One learning outcome can be archieved by several tasks. \
                                You might also specify the outcome into several \
                                sub-learning outcomes to indicate how students fulfil the outcome step by step."}
                            </Typography>
                        </Grid>
                    </Grid>
                }
                {
                    enableAdd? 
                        
                            modeLevel == "course"?
                            <Button onClick={addLearningOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                            :
                            <Button onClick={onClickSelectOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                        
                    :
                    null
                }
            </Grid>
        )
    }

    const displayDelLearningOutcomeDialog = () => {
        return (
            <React.Fragment>
                <DialogTitle id="form-dialog-title">Warning</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are You Sure To Delete LearningOutcome #({learningOutcome.id})
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

    const displayComponentSelectDialog = () => {
        if(typeof component != "undefined"){
            return (
                <LearningOutcomeSelectContainer 
                    component_id = {component.id}
                    onClose={onCloseSelectOutcome}
                />
            );
        }
    }
    //#endregion

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightgrey' : '',
        width: '100%'
    });


    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Paper>
                        {displayLearningOutcomes()}
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={learningOutcomeOpen} onClose={closeAddLearningOutcome} onEntered = {onEnterLearningOutcome} maxWidth = {"md"}>
                {displayLearningOutcomeEdit()}
            </Dialog>

            <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                {displayDelLearningOutcomeDialog()}
            </Dialog>

            <Dialog open={selectDialogOpen} onClose={onCloseSelectOutcome} maxWidth = {"md"}>
                {displayComponentSelectDialog()}
            </Dialog>
            
      </React.Fragment>
    );
}

export default LearningOutcomeContainer;
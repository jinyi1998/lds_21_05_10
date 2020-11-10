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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import LearningOutcomeAddFromSelect from '../learningOutcomeAddFromSelect';
import LearningOutcomeUnit from '../component/learningOutcomeUnit';
import LearningOutcomeEditContainer from './learningOutcomeEditContainer';
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
    list: {
      width: '100%',
    },
    AccordionSummary: {
      backgroundColor: "#91bbff"
    },
    appBar: {
        position: 'relative',
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
    
    
    // const [ ulo, setUlo ] = React.useState([]); 
    const [learningOutcomeOpen, setLearningOutcomeOpen] = React.useState(false);
    const [learningOutcomeSelectOpen, setLearningOutcomeSelectOpen] = React.useState(false);

    const [delDialogOpen, setDelDialogOpen] = React.useState(false);

    const [learningOutcomeID, setLearningOutcomeID] = React.useState(-1);
    const [learningOutcome, setLearningOutcome] = React.useState({
        level: -1,
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true
    });


    // React.useEffect(()=>{
    // }, [course.outcome])
    const enableAdd = course.permission > 2; 
    const enableEdit = course.permission > 2; 
    const enableDrag = course.permission > 2; 
    const enableDelete = course.permission > 2; 
    const enableDuplicate =  course.permission > 2; 
    


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
        var tempOutcomes =  JSON.parse(JSON.stringify(course.outcomes.sort( (a,b) => a.outcomeType - b.outcomeType).sort((a,b) => a.sequence - b.sequence)));
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
            refreshCourse()
        ).catch(error => console.log(error));   
    }else{
        await apiLearningOutcomeCoursePut(outcome_relation).then(
            refreshCourse()
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

    const displayLearningOutcomeSelect = () => {
        if(modeLevel == "course"){
            return (<React.Fragment></React.Fragment>);
        }else{
            return (
                <LearningOutcomeAddFromSelect 
                    componentID = {component.id} 
                    onClose={()=> setLearningOutcomeSelectOpen(false)} 
                    handleOnSave={handleOnSave} 
                />
            )
        } 
    }

    const displayLearningOutcomes = () => {
        if(modeLevel == "course"){
            return (
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                        <List style={getListStyle(snapshot.isDraggingOver)} data-tour ="ulo_display_view" style = {{width: "100%"}}>
                                {
                                    options.learningOutcomeType.map(_lo_type => 
                                        <React.Fragment>
                                            <ListSubheader color ="primary">
                                                {_lo_type.description}
                                            </ListSubheader>
                                            {course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).length > 0?
                                            <React.Fragment>
                                                {course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).sort((a,b)=> a.sequence - b.sequence).map(
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
                                                )}
                                            </React.Fragment>
                                            :
                                            <ListItem>
                                                <ListItemText primary = {"There is no outcome under this learning outcome type"} />
                                            </ListItem>
                                        }
                                        </React.Fragment>
                                    )
                                }
                                {/* {course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).map(
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
                                            enableEdit = {enableEdit}
                                            enableDelete = {enableDelete}
                                            index = {index}/> 
                                        )}
                                        </Draggable>
                                    )
                                )} */}
                            {provided.placeholder}
                        </List>
                        </RootRef>
                    )}
                    </Droppable>
                    {
                        enableAdd? 
                        <Button onClick={addLearningOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                        :
                        null
                    }
                    
                    </DragDropContext>
                </Grid>
            )
        }else{
            //component learning outcome
            return (
                <React.Fragment>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        {course.outcomes.map(
                            (_ulo, index )=>
                            (
                                component.outcomes.filter(clo => clo.unit_outcomeid != null).filter( clo => clo.unit_outcomeid.unit_outcomeid == _ulo.id).length > 0 ? 
                                    <DragDropContext onDragEnd={(result) => onDragEnd(result)} key = {index}>
                                            <Droppable droppableId="droppable">
                                            {(provided, snapshot) => (
                                                <RootRef rootRef={provided.innerRef}>
                                                <List style={getListStyle(snapshot.isDraggingOver)} data-tour = "clo_display_view" style = {{width: "100%"}}>
                                                    <ListSubheader color ="primary" data-tour = "clo_ulo_header">Unit Level Learning Outcome: {_ulo.description}</ListSubheader>
                                                    {component.outcomes.filter(clo => clo.unit_outcomeid != null).filter( clo => clo.unit_outcomeid.unit_outcomeid == _ulo.id).map(
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
                                                    )}
                                                    {provided.placeholder}
                                                </List>
                                                </RootRef>
                                    )}
                                        </Droppable>
                                    </DragDropContext>
                                :
                                null
                            )
                        )}
                        {
                            enableAdd?
                            <Button onClick={addLearningOutcome} variant="contained" color="primary"  data-tour="clo_add_button">Add Learning Outcome</Button>
                            :
                            null
                        }
                    </Grid>
                 
                    {/* <Button onClick={()=> setLearningOutcomeSelectOpen(true)} variant="contained" color="secondary">Select Learning Outcome From Unit Level</Button> */}
                </React.Fragment>
            )
        }
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
    //#endregion

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightgrey' : '',
    });

    return (
        <React.Fragment>

            <Accordion defaultExpanded	={true}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className = {classes.AccordionSummary}
                >
                    <div>{modeLevel == "course"? 
                        <Typography variant="subtitle1" gutterBottom>
                            Unit Level Learning Outcomes
                            <QuestionHint title="Unit Level Learning Outcomes is the overall learning outcomes for the whole unit(course)"/> 
                        </Typography>
                        : 
                        <Typography variant="subtitle1" gutterBottom>
                            Component Level Learning Outcomes
                            <QuestionHint title="Specifiable learning outcomes that can be achieved and assessed in this curriculum component. "/> 
                        </Typography>}
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs= {12}>
                        {modeLevel == "course"? 
                            <InstructionBox 
                                title="Unit Level Learning Outcomes" 
                                content= "Please define the learning outcomes for your unit" 
                            />
                            :
                            <InstructionBox 
                                title="Component Level Learning Outcomes" 
                                content= "Please define the learning outcomes for your component" 
                            />
                        }
                        </Grid> 
                        <Grid item xs={12}>
                            {displayLearningOutcomes()}

                        </Grid>
                    </Grid>
                </AccordionDetails>
                
                <Dialog open={learningOutcomeOpen} onClose={closeAddLearningOutcome} onEntered = {onEnterLearningOutcome} maxWidth = {"md"}>
                    {displayLearningOutcomeEdit()}
                </Dialog>

                <Dialog open={learningOutcomeSelectOpen} onClose={()=> setLearningOutcomeSelectOpen(false)} maxWidth = {"md"}>
                    {displayLearningOutcomeSelect()}
                </Dialog>

                <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                    {displayDelLearningOutcomeDialog()}
                </Dialog>
        </Accordion>
      </React.Fragment>
    );
}

export default LearningOutcomeContainer;
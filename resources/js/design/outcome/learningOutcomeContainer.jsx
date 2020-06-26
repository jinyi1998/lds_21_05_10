import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {ContextStore} from '../../container/designContainer'
import config from 'react-global-configuration';

import LearningOutcomeAddFromSelect from './learningOutcomeAddFromSelect';
import LearningOutcomeUnit from './learningOutcomeUnit';
import LearningOutcomeEdit from './learningOutcomeEdit';
import InstructionBox from '../../components/instructionBox';

import QuestionHint from '../../components/questionHint';
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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


const LearningOutcomeContainer = (props)=>{ 
    const {component} = props; 

    var modeLevel = "course";
    if(typeof component !== 'undefined'){
        modeLevel = "component";
    }else{
        modeLevel = "course";
    }

    const classes = useStyles();

    const { course, setLoadingOpen, refreshCourse } = React.useContext(ContextStore);
    const { tourSetMode, tourSetRun, tourNextStep, tourStepIndex } = React.useContext(ContextStore);
    React.useEffect(()=> {
        if(modeLevel == "course"){
            tourSetRun(false);
            tourSetMode('ulo');
        }
    }, [modeLevel])
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

        //sync the data to root state
        var tempOutcomes =  JSON.parse(JSON.stringify(course.outcomes));
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
            updateOutcomeSequence(tempOutcome);
            // fetchUpdateLearningComponent(tempComponent);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempOutcome = {
              id : tempOutcomes[i].courseid.id,
              sequence: tempOutcomes[i].courseid.sequence + 1
            }
            updateOutcomeSequence(tempOutcome);
          }
        }
        updateOutcomeSequence(sourceOutcomes);
    }

    const onDragEndComponent = (result) => {

        if (!result.destination) {
            return;
        }

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
            updateOutcomeSequence(tempOutcome);
            // fetchUpdateLearningComponent(tempComponent);
         }
        }else{

          for(var i = result.destination.index; i < result.source.index; i++){
            let tempOutcome = {
              id : tempOutcomes[i].id,
              sequence: tempOutcomes[i].sequence + 1
            }
            // console.log(tempOutcome);
            updateOutcomeSequence(tempOutcome);
          }
        }
        // console.log(sourceOutcomes);
        updateOutcomeSequence(sourceOutcomes);
    }
    //#endregion

    //#region Data Request Related 
    async function deleteLearningOutcome() {
        setLoadingOpen(true)
        if(modeLevel == "component" && learningOutcome.isCourseLevel == true){
            //just remove the component relation
            fetch(
                'http://'+config.get('url')+'/api/learningOutcome/destroyComponentRelation/'+learningOutcome.id+'/'+component.id,
                {
                method: "DELETE",
                }
            )
            .then(res => res.json())
            .then(response => {
                //load the default learning outcomes by api request
                refreshCourse()
                setLoadingOpen(false)
            })
            .catch(error => console.log(error));   

        }else{
            fetch(
                'http://'+config.get('url')+'/api/learningOutcome/'+learningOutcome.id,
                {
                method: "DELETE",
                }
            )
            .then(res => res.json())
            .then(response => {
                //load the default learning outcomes by api request
                refreshCourse()
                setLoadingOpen(false)
            })
            .catch(error => console.log(error));   
        }
       
      }

      async function updateOutcomeSequence(outcome_relation) {
        setLoadingOpen(true)
        if(modeLevel == "component"){
            return await fetch(
                'http://'+config.get('url')+'/api/componentOutcomeRelation/'+ outcome_relation.id,
                {
                  method: "PUT",
                  body:  JSON.stringify(outcome_relation),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }
              ).then(res => res.json())
              .then(response => {
                  refreshCourse()
              })
        

        }else{
            return await fetch(
                'http://'+config.get('url')+'/api/courseOutcomeRelation/'+ outcome_relation.id,
                {
                  method: "PUT",
                  body:  JSON.stringify(outcome_relation),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                }
              ).then(res => res.json())
              .then(response => {
                  refreshCourse()
              })
        }
       
      }

    //#endregion
    
    //#region Display View Function Related
    const displayLearningOutcomeEdit = () => {
        if(modeLevel ==  "course" ){
            return ( 
                <LearningOutcomeEdit 
                    outcomeID = {learningOutcomeID} 
                    courseID= {course.id} 
                    onClose={closeAddLearningOutcome} 
                    handleOnSave={handleOnSave} 
                    learningOutcome = {learningOutcome}
                />
            );
        }else{
            return ( 
                <LearningOutcomeEdit 
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

    const displayLearningOutcomesNew = () => {
        if(modeLevel == "course"){
            return (
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)} data-tour ="ulo_display_view">

                            {course.outcomes.map(
                                (_outcome, index )=>
                                (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                      {(provided, snapshot) => (
                                          <LearningOutcomeUnit 
                                          learningOutcome = {_outcome}
                                          key={index} 
                                          provided = {provided} 
                                          snapshot = {snapshot} 
                                          component = {component} 
                                          onOpenDelDialog = {onOpenDelDialog} 
                                          onOpenEditDialog = {editLearningOutcome}
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
                <Button onClick={addLearningOutcome} variant="contained" color="primary" data-tour="ulo_add_button">Add Learning Outcome</Button>
                </DragDropContext>
            )
        }else{
            //component learning outcome
            return (
                <React.Fragment>
                    {course.outcomes.map(
                        (_ulo, index )=>
                        (
                            component.outcomes.filter(clo => clo.unit_outcomeid != null).filter( clo => clo.unit_outcomeid.unit_outcomeid == _ulo.id).length > 0 ? 
                                <DragDropContext onDragEnd={(result) => onDragEnd(result)} key = {index}>
                                        <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <RootRef rootRef={provided.innerRef}>
                                            <List style={getListStyle(snapshot.isDraggingOver)} data-tour = "clo_display_view">
                                                <ListSubheader color ="primary" data-tour = "clo_ulo_header">Unit Level Learning Outcome: {_ulo.description}</ListSubheader>
                                                {component.outcomes.filter(clo => clo.unit_outcomeid != null).filter( clo => clo.unit_outcomeid.unit_outcomeid == _ulo.id).map(
                                                    (_outcome, index )=>
                                                    (
                                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided, snapshot) => (
                                                            <LearningOutcomeUnit 
                                                            learningOutcome = {_outcome}
                                                            key={index} 
                                                            provided = {provided} 
                                                            snapshot = {snapshot} 
                                                            component = {component} 
                                                            onOpenDelDialog = {onOpenDelDialog} 
                                                            onOpenEditDialog = {editLearningOutcome}
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
                    <Button onClick={addLearningOutcome} variant="contained" color="primary"  data-tour="clo_add_button">Add Learning Outcome</Button>
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

            <ExpansionPanel defaultExpanded	={true}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className = {classes.expansionPanelSummary}
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
                    
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
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
                            {displayLearningOutcomesNew()}

                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                
                <Dialog open={learningOutcomeOpen} onClose={closeAddLearningOutcome} onEntered = {onEnterLearningOutcome}>
                    {displayLearningOutcomeEdit()}
                </Dialog>

                <Dialog open={learningOutcomeSelectOpen} onClose={()=> setLearningOutcomeSelectOpen(false)}>
                    {displayLearningOutcomeSelect()}
                </Dialog>

                <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                    {displayDelLearningOutcomeDialog()}
                </Dialog>
        </ExpansionPanel>
      </React.Fragment>
    );
}

export default LearningOutcomeContainer;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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

import LearningOutcomeUnit from './learningOutcomeUnit';
import LearningOutcomeAdd from './learningOutcomeAdd';
import InstructionBox from '../../components/instructionBox';

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
    // const [component, setComponent] = React.useState(props.component);
    var modeLevel = "course";
    const classes = useStyles();

    const { course, setLoadingOpen, refreshCourse } = React.useContext(ContextStore);
    const [learningOutcomeOpen, setLearningOutcomeOpen] = React.useState(false);

    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const [delIndex, setDelIndex] = React.useState(-1);


    if(typeof component !== 'undefined'){
        modeLevel = "component";
    }else{
        modeLevel = "course";
    }

    // React.useEffect(()=>{
    //     console.log(props.component)
    //     setComponent(props.component)
    // },[props.component])
    //#region  action related
    const addLearningOutcome = () => {
        setLearningOutcomeOpen(true);
    }

    const closeAddLearningOutcome = () => {
        setLearningOutcomeOpen(false);
    };


    const handleOnSave = (addedLearningOutcome, action = "") => {

    }

    const onOpenDelDialog = (id) => {
        setDelIndex(id);
        setDelDialogOpen(true);
    }

    const onDelOutcomes = () =>{
        
        //close the dialog
        deleteLearningOutcome();
        setDelDialogOpen(false);
    }
    //#endregion

    async function deleteLearningOutcome() {
        setLoadingOpen(true)
        fetch(
            'http://'+config.get('url')+'/api/learningOutcome/'+delIndex,
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

    const displayLearningOutcomeAdd = () => {
        if(modeLevel ==  "course" ){
            return ( <LearningOutcomeAdd courseID= {course.id} onClose={closeAddLearningOutcome} handleOnSave={handleOnSave}/>);
        }else{
            return ( <LearningOutcomeAdd componentID = {component.id} onClose={closeAddLearningOutcome} handleOnSave={handleOnSave}/>);
        }
        // }else if(addSelector == "addNew"){
        //     return ( <LearningOutcomeAdd componentID = {component.id} onClose={closeAddLearningOutcome} handleOnSave={handleOnSave}/>);
        // }else if(addSelector == "selectFromCourse"){
        //     return ( <LearningOutcomeAddFromSelect 
        //         onClose={closeAddLearningOutcome} 
        //         handleOnSave={handleOnSave} 
        //         learningOutcomeOpts = {course.learningOutcomes.filter(x=> x.isCourseLevel == true)}/>);
        // }else{
        //     return (
        //         <React.Fragment>
        //              <AppBar className={classes.appBar}>
        //                 <Toolbar>
        //                     <IconButton edge="start" color="inherit" onClick={()=>  setLearningOutcomeOpen(false) } aria-label="close">
        //                     <CloseIcon />
        //                     </IconButton>
        //                     <Typography variant="h6" className={classes.title}>
        //                     Adding new learning outcome
        //                     </Typography>
        //                 </Toolbar>
        //             </AppBar>
        //             <Grid container spacing={3} margin= {3} >
        //                 <Grid item xs={12}>
        //                     <h4> Add learning outcomes that specify what learners will be able to do after this unit</h4>
        //                 </Grid>

        //                 <Grid item xs={6}>
        //                     <Button variant="contained" color="primary" onClick = {()=> setAddSelector("selectFromCourse")}>
        //                     Choose from course-level learning outcomes
        //                     </Button>
        //                 </Grid>

        //                 <Grid item xs={6}>
        //                     <Button variant="contained" color="secondary" onClick = {()=> setAddSelector("addNew")}>
        //                     Add a new learning outcome
        //                     </Button>
        //                 </Grid>
        //             </Grid>                  
        //         </React.Fragment>
        //     );
        // }

    }

    const displayLearningOutcomes = () => {
        if(modeLevel == "course"){
            return (
                course.outcomes.map(
                    (_outcome, index )=>
                        <LearningOutcomeUnit 
                            learningOutcome = {_outcome}
                            key={index} 
                            onOpenDelDialog = {onOpenDelDialog} 
                            index = {index}/> 
            ))
        }else{
            //component learning outcome
            return (
                component.outcomes.map(
                    (_outcome, index )=>
                        <LearningOutcomeUnit 
                            learningOutcome = {_outcome}
                            key={index} 
                            onOpenDelDialog = {onOpenDelDialog} 
                            index = {index}/> 
            ))
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
                
                <Dialog open={learningOutcomeOpen} onClose={closeAddLearningOutcome}>
                    {displayLearningOutcomeAdd()}
                </Dialog>

                <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                    {displayDelLearningOutcomeDialog()}
                </Dialog>
        </ExpansionPanel>
      </React.Fragment>
    );
}

export default LearningOutcomeContainer;
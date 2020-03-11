import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';

import LearningOutcome from './learningOutcomeToDo';
import AddLearningPatternContainner from './addLearningPattern';
import LearningTasksEditContainer from './learningTasksEdit';
import LearningTaskEdit from './learningTaskEdit'
import LearningPatternEdit from './learningPatternEdit';
import ComponentTask from './componentTask';
import AddLearningTask from './addLearningTask';
import LearningPattern from './learningPattern';


import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {ContextStore} from '../container/designContainer'


const useStyles = makeStyles(theme => ({
    header:{
      backgroundColor: "#de5995",
      width: '2%',
    },
    root: {
      width: '100%',
    },
    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    subheading: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightRegular,
    },
    appBar: {
      position: 'relative',
    },
  }));

  //   tasks: [
//     {
//       id: 0,
//       type: "",
//       title: "",
//       assessment: [],
//       time: 0,
//       classType: "",
//       target: "",
//       resource: "",
//       STEMType: [],
//       description: "",
//     }
//   ],

const Component = (props)=>{

    const classes = useStyles();
    const { course, dispatch } = React.useContext(ContextStore);
    const {componentData, index} = props;

    const [editTaskOpen, setEditTaskOpen] = React.useState(false);
    const [editPatternOpen, setEditPatternOpen] = React.useState(false);
    const [selectMode, setSelectMode] = React.useState(""); //addLearningPatternMode
    
    //edit learning task props
    const [ openTaskAdd, setOpenTaskAdd] = React.useState(false);
    const [ openTaskEdit, setOpenTaskEdit] = React.useState(false);
    const [ selectTask, setSelectTask] = React.useState({});
    const onEditComponentID = componentData.id;

    //#region init data 
    const learningTime = () => {
      var time = 0;
      componentData.tasks.map(_task => time += parseInt(_task.time));
      componentData.pattern?.tasks.map(_task => time += parseInt(_task.time));
      return time;
    };
    //#endregion

    //#region action button
    // const onEditTasks = () => {
    //   setSelectMode("edit");
    //   setEditTaskOpen(true);
    // }
    const onEditTasks = (task) => {
      setSelectTask(task);
      setOpenTaskEdit(true);
    }
    

    const onEditPattern = () => {
      setSelectMode("pattern");
      setEditPatternOpen(true);
    }

    const onAddLearningTask = () => {
      setOpenTaskAdd(true);
    }
    //#endregion

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{index + 1} :  {componentData.title}</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
                </Grid>

                <Grid item xs={12}> 
                  <LearningOutcome componentData ={componentData}/>
                </Grid>
                
                {componentData.patternOptsID.length > 1 ?
                  <Grid item xs={4}>
                   <Button variant="contained" color="primary" onClick={()=>onEditPattern()}>
                       Reload Learning Patterns
                   </Button>
                 </Grid>
                 : 
                 null
                }

                {typeof componentData.pattern == 'undefined' || componentData.pattern.tasks.length == 0?
                  null:  
                  <Grid item xs = {12}>
                      <LearningPattern componentID = {componentData.id} patternData = {componentData.pattern}/>
                  </Grid>
                }

                {componentData.tasks.map((_learningComponentData, index) => 
                  <ComponentTask 
                    key= {index}
                    componentData ={componentData} 
                    TaskData = {_learningComponentData}
                    mode = "view"
                    onEditTasks = {onEditTasks}
                  />
                )}



                <Button variant="contained" color="primary" onClick={()=>onAddLearningTask()}>
                    Add Learning Task
                </Button>

                <AddLearningTask 
                  openTaskAdd = {openTaskAdd}
                  setOpenTaskAdd = {setOpenTaskAdd}
                  onEditComponentID = {onEditComponentID}
                />

                <LearningTaskEdit
                  openTaskEdit = {openTaskEdit}
                  setOpenTaskEdit = {setOpenTaskEdit}
                  onEditComponentID = {onEditComponentID}
                  TaskData = {selectTask}
                />

                <Dialog fullScreen open={editTaskOpen}>
                  <AppBar className={classes.appBar}>
                      <Toolbar>
                          <IconButton edge="start" color="inherit" onClick={()=>  setEditTaskOpen(false)} aria-label="close">
                          <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                          Edit Learning Task
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <LearningTasksEditContainer 
                    componentData ={componentData} 
                    mode={selectMode} 
                    onClose = {()=>  setEditTaskOpen(false)} />
                </Dialog>

                <Dialog fullScreen open={editPatternOpen}>
                  <AppBar className={classes.appBar}>
                      <Toolbar>
                          <IconButton edge="start" color="inherit" onClick={()=>  setEditPatternOpen(false)} aria-label="close">
                          <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                              Edit Learning Pattern
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <LearningPatternEdit 
                    componentData ={componentData} 
                    onClose = {()=>  setEditPatternOpen(false)} />
                </Dialog>
                
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
export default Component;
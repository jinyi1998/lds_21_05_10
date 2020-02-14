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
import ComponentTask from './componentTask';

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
    const {componentData} = props;
    const [addLearningPatternOpen, setAddLearningPatternOpen] = React.useState(false);
    const [selectMode, setSelectMode] = React.useState(""); //addLearningPatternMode

    //#region init data 
    const learningTime = () => {
      var time = 0;
      componentData.tasks.map(_task => time += _task.time);
      return time;
    };
    //#endregion

    //#region action button
    const onEditTasks = () => {
      setSelectMode("edit");
      setAddLearningPatternOpen(true);
    }

    const onAddTasks = () => {
      setSelectMode("add");
      setAddLearningPatternOpen(true);
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
            <Typography className={classes.heading}>{componentData.id} :  {componentData.title}</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
                </Grid>
                <Grid item xs={12}> 
                  <LearningOutcome componentData ={componentData}/>
                </Grid>
               
                {componentData.tasks.map((_learningComponentData, index) => 
                  <ComponentTask 
                    key= {index}
                    componentData ={componentData} 
                    TaskData = {_learningComponentData}
                    mode = "view"
                    onEditTasks = {onEditTasks}
                  />
                )}


                <Button variant="contained" color="primary" onClick={()=>onAddTasks()}>
                    Add Learning Patterns
                </Button>

                <Dialog fullScreen open={addLearningPatternOpen}>
                  <AppBar className={classes.appBar}>
                      <Toolbar>
                          <IconButton edge="start" color="inherit" onClick={()=>  setAddLearningPatternOpen(false)} aria-label="close">
                          <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={classes.title}>
                          Adding new learning outcome
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <AddLearningPatternContainner 
                  componentData ={componentData} 
                  mode={selectMode} 
                  onClose = {()=>  setAddLearningPatternOpen(false)} />
                </Dialog>
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
export default Component;
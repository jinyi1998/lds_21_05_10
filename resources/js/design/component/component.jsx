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

import LearningOutcomeContainer from '../outcome/learningOutcomeContainer';
import AddLearningPatternContainner from '../pattern/addLearningPattern';
import LearningPatternEdit from '../pattern/learningPatternEditView';
import LearningTaskContainer from '../task/learningTaskContainer';
import LearningPatternContainer from '../pattern/learningPatternContainer';


import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {ContextStore} from '../../container/designContainer'
import {ComponentContext} from './componentContainer';
import config from 'react-global-configuration';


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


const Component = ()=>{

    const classes = useStyles();
    const {  component,
      componentID,
      index} = React.useContext(ComponentContext);

  //   React.useEffect(()=>{
  //     fetchlearningComponentData(componentID)
  //   }, [componentID])

  //   React.useEffect(()=>{
  //     fetchlearningComponentData(componentID)
  //   }, [refresh])

  //   async function fetchlearningComponentData(id) {
  //     const res = await fetch(
  //         'http://'+config.get('url')+'/api/learningComponent/'+id,
  //         {
  //         method: "GET",
  //         }
  //     )
  //     .then(res => res.json())
  //     .then(response => {
  //       setComponent(response);
  //     })
  //     .catch(error => console.log(error));
  // }

    //#region init data 
    const learningTime = () => {
      var time = 0;
      component.tasks.map(_task => time += parseInt(_task.time));
      component.patterns?.map( _pattern => 
        _pattern.tasks.map(_task=> time += parseInt(_task.time))
      );
      return time;
    };
    //#endregion

    //#region action button

    //#endregion

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{index + 1} :  {component.title}</Typography>
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={3}>
              
                <Grid item xs={8}>
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
                </Grid>

                <Grid item xs={12}> 
                  <LearningOutcomeContainer component ={component}/>
                </Grid>

                {typeof component.patterns == 'undefined' || component.patterns.length == 0?
                  null:  
                  <Grid item xs = {12}>
                      <LearningPatternContainer componentID = {component.id} patternData = {component.patterns[0]}/>
                  </Grid>
                }

                <Grid item xs = {12}>
                    <LearningTaskContainer componentID = {component.id} tasksData = {component.tasks}/>
                </Grid>
                
              </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
export default Component;
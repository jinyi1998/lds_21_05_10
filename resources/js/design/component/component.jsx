import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';

import LearningOutcomeContainer from '../outcome/learningOutcomeContainer';
import AddLearningPatternContainner from '../pattern/addLearningPattern';
import LearningPatternEdit from '../pattern/learningPatternEditView';
import LearningTaskContainer from '../task/learningTaskContainer';
import LearningPatternContainer from '../pattern/learningPatternContainer';
import {apiLearningCompPut} from '../../api';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app';
import {ComponentContext} from './componentContainer';


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
      selectComIndex,
      setSelectComIndex,
      index} = React.useContext(ComponentContext);
    const {course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [editComponent, setEditComponent] = React.useState(false);
    const [componentTitle, setComponentTitlte] = React.useState(component.title);

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
    const handleChange = (panel) => (event, isExpanded) => {
      setSelectComIndex(selectComIndex != index ? index : -1)
    };

    const onComfirmChange = () => {
      var component_request = {};
      component_request.id = component.id;
      component_request.title = componentTitle;
      setLoadingOpen(true)
      apiLearningCompPut(component_request)
      .then(response => {
        refreshCourse();
        setLoadingOpen(false);
      })  
      setEditComponent(false);
    }
    //#endregion

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded = {index == selectComIndex} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon onClick = {handleChange()}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            data-tour = "component_expand_panel"
          >
            <Grid container spacing = {3}>
             
              <Grid item xs={8}  data-tour = "component_header">
                {
                    editComponent?
                    <TextField value = {componentTitle} onChange = {(event => setComponentTitlte(event.target.value))} fullWidth></TextField>
                    :
                    <React.Fragment>
                      <Typography className={classes.heading}>{index + 1} :  {component.title}</Typography>
                    </React.Fragment>
                }
              </Grid>

              {
                course.permission > 2?
                  
                  <Grid item xs={4} >
                    {
                      editComponent?
                      <Button onClick = {()=>{onComfirmChange()}} >Comfirm</Button>
                      :
                      <IconButton  onClick = {()=>{setEditComponent(true)}} ><EditIcon /></IconButton>
                    }
                   
                  </Grid>
                : 
                null
              }


              <Grid item xs={12} data-tour = "component_time">
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
              </Grid>
            </Grid>
          
          
            
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <Grid container spacing={2}>
              
                {/* <Grid item xs={8}>
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
                </Grid> */}

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
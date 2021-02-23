import React from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DragHandleIcon from '@material-ui/icons/DragHandle';


import LearningOutcomeContainer from '../../outcome/container/learningOutcomeContainer';
import LearningTaskContainer from '../../task/container/learningTaskContainer';
import LearningTaskMainContainer from '../../task/container/learningTaskMainContainer';
import LearningPatternContainer from '../../pattern/container/learningPatternContainer';
import LearningPatternMainContainer from '../../pattern/container/learningPatternMainContainer';
import ComponentPatternTaskContainer from '../container/componentPatternTaskContainer';

import ComponentFloatDashboardContainer from './componentFloatDashboardContainer';

import {getItemStyle, getDraggable} from '../../../dragndrop';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
  apiLearningCompGet, apiLearningCompPost, apiLearningCompPut, apiLearningCompDelete,
  apiLearningCompTempGet,
} from '../../../api.js';


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


export const ComponentContext = React.createContext({});

const ComponentContainer = (props)=>{
  
  const classes = useStyles();

  const {componentID, index} = props;
  const {provided, snapshot} = props;
  const isDraggable = props.isDraggable? props.isDraggable : false;

  const selectCompID = props.selectCompID;
  const setSelectCompID = props.setSelectCompID;
  const {course, refreshCourse, setActivePage } = React.useContext(ContextStore);
  const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
  
  const [component, setComponent] = React.useState(props.component);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editComponent, setEditComponent] = React.useState(false);
  const [componentTitle, setComponentTitlte] = React.useState(component.title);
  const [componentTitleColor, setComponentTitleColor] = React.useState('#FFFFFF');

  React.useEffect(()=>{
    setComponent(props.component);
  }, [props.component])
  
  const learningTime = () => {
    var time = 0;
    component.tasks.map(_task => time += parseInt(_task.time));
    component.patterns?.map( _pattern => 
      _pattern.tasks.map(_task=> time += parseInt(_task.time))
    );
    return time;
  };

    //#region action button
    const handleChange = (panel) => (event, isExpanded) => {
      event.stopPropagation();
      if(isExpanded){
        // setSelectCompID(selectCompID != index ? index : -1)
        setActivePage('componentPlan_' + component.id)
      }else{
        // setSelectCompID(-1)
        setActivePage('componentPlan')
      }
    
    };

    const onComfirmChange = () => {
      var component_request = {};
      component_request.id = component.id;
      component_request.title = componentTitle;

      updateComponent(component_request).then(()=>{
        setEditComponent(false);
        setAnchorEl(null);
      }) 
    }

    async function updateComponent(component){
      setLoadingOpen(true)
      apiLearningCompPut(component)
      .then(response => {
        refreshCourse();
        setLoadingOpen(false);
        displayMsg("success", "Component Updated");
      }).catch(error => {
        console.log(error);
        displayMsg("error", `error: ${error}`);
      })
    }

    async function duplicateComponent(id){
      var tempcomponent = await fetchlearningComponent(id);
      tempcomponent.course_id = course.id;
      tempcomponent.tasks.map(_tasks => delete _tasks['assessmentid']);
      tempcomponent.patterns.map( _pattern => _pattern.tasks.map(_tasks => delete['assessmentid']));
      fetchAddLearningComponent(tempcomponent);
      setAnchorEl(null);
    } 

    async function deleteComponent(id){
      setLoadingOpen(true);
      await apiLearningCompDelete(id)
      .then(response => {
        //load the default learning outcomes by api request
        // return response;
        setLoadingOpen(false);
        displayMsg("success", "Component deleted");
        refreshCourse();
      })
      .catch(error => {
        console.log(error)
        displayMsg("error", "Component deleted");
      });
      setAnchorEl(null);
    }

    async function fetchlearningComponent(id) {
      return await apiLearningCompGet(id)
      .then(response => {
        return response.data 
      })
      .catch(error => console.log(error));
    }

    async function fetchAddLearningComponent(component) {
      setLoadingOpen(true);
      component.sequence = Math.max(...course.components.flatMap(x => x.sequence)) + 1;
      return await apiLearningCompPost(component)
      .then( () => {
        refreshCourse();
        setLoadingOpen(false);
        displayMsg("success", "Component Added");
      })
      .catch(error => console.log(error));
    }
    //#endregion


    return (
        <ComponentContext.Provider value = {{
            component: component,
            componentID: componentID,
            index: index,
            selectCompID: props.selectCompID,
            setSelectCompID: props.setSelectCompID
        }}>
        

          <Accordion 
       
            expanded = {component.id == selectCompID} 
            onChange = {handleChange()}
            {...getDraggable(provided, snapshot)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              data-tour = "component_expand_panel"
              style = {{ 
                "position": "sticky" ,
                "zIndex": 499,
                "backgroundColor": componentTitleColor,
                "top": 60
              }} 
            >
              <Grid container spacing = {3} alignItems = {"center"}>
                {
                  isDraggable?
                  <Grid item xs style = {{maxWidth: "3%"}}>
                    <DragHandleIcon />
                  </Grid>
                  : 
                  null
                }
          

                <Grid container item xs spacing = {3} alignItems = {"center"}>
                  <Grid item xs  data-tour = "component_header">
                    {
                        editComponent?
                        <TextField value = {componentTitle} onChange = {(event => setComponentTitlte(event.target.value))} fullWidth></TextField>
                        :
                        <React.Fragment>
                          <Typography className={classes.heading}>{component.sequence} :  {component.title}</Typography>
                        </React.Fragment>
                    }
                  </Grid>

                  {
                    course.permission > 2?    
                      <Grid item xs={1} >
                        {
                          editComponent?
                          <Button onClick = {(event)=>{ event.stopPropagation(); onComfirmChange()}} >Comfirm</Button>
                          :
                          <React.Fragment>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) => { event.stopPropagation(); setAnchorEl(event.currentTarget);}}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="componenet-edit-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={(event) => {event.stopPropagation(); setAnchorEl(null)}}
                            >
                              <MenuItem onClick={(e)=> {e.stopPropagation(); setEditComponent(true)}}>Rename</MenuItem>
                              <MenuItem onClick={(e)=> {e.stopPropagation(); duplicateComponent(component.id)}}>Duplicate</MenuItem>
                              <MenuItem onClick={(e)=> {e.stopPropagation(); deleteComponent(component.id)}}>Delete</MenuItem>
                            </Menu>
                          </React.Fragment>
                        
                        }
                      
                      </Grid>
                    : 
                      null
                  }
                </Grid>
              </Grid>
            </AccordionSummary>

            <AccordionDetails style = {{ 
                  "position": "flex" ,
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} data-tour = "component_time">
                      <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
                  </Grid>

                  <Grid container item xs = {5}>
                    <Grid item xs={12}> 
                      <LearningOutcomeContainer component ={component}/>
                    </Grid>
                  </Grid>

                  <Grid container item xs = {7} spacing={2} alignContent = {"flex-start"}> 
                    <Grid item xs = {12}>
                      <ComponentPatternTaskContainer component = {component} />
                    </Grid>
                  </Grid>

                </Grid>
            </AccordionDetails>
          </Accordion>

          <ComponentFloatDashboardContainer/>
         
        </ComponentContext.Provider>
    );
  }
export default ComponentContainer;
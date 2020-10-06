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
import { Grid } from '@material-ui/core';

import LearningOutcomeContainer from '../outcome/learningOutcomeContainer';
import LearningTaskContainer from '../task/learningTaskContainer';
import LearningPatternContainer from '../pattern/learningPatternContainer';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import {ContextStore} from '../../container/designContainer'
import {AppContextStore} from '../../container/app';
import {ComponentContext} from './componentContainer';

import {
  apiLearningCompGet, apiLearningCompPost, apiLearningCompPut, apiLearningCompDelete,
  apiLearningCompTempGet,
} from '../../api.js';


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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [editComponent, setEditComponent] = React.useState(false);
    const [componentTitle, setComponentTitlte] = React.useState(component.title);
    const [componentTitleColor, setComponentTitleColor] = React.useState('#FFFFFF');
    

    //#region init data 
    React.useEffect(()=>{
      // window.removeEventListener('scroll', handleScroll);
      // handleScroll();
      // window.addEventListener("scroll", handleScroll);
    }, [selectComIndex]);

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
      event.stopPropagation();
      if(isExpanded){
        setSelectComIndex(selectComIndex != index ? index : -1)
      }else{
        setSelectComIndex(-1)
      }
    
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
      setAnchorEl(null);
    }

    const handleScroll = () => {
      if (window.pageYOffset > 250) {
          if(index == selectComIndex && componentTitleColor != 'yellow'){
            setComponentTitleColor('yellow');   
          }else if(index != selectComIndex){
            setComponentTitleColor('#FFFFFF');   
          }
      }else{
        setComponentTitleColor('#FFFFFF');   
      }
    }

    async function duplicateComponent(id){
      var tempcomponent = await fetchlearningComponent(id);
      tempcomponent.course_id = course.id;
      fetchAddLearningComponent(tempcomponent);
      setAnchorEl(null);
    } 

    async function deleteComponent(id){
      await apiLearningCompDelete(id)
      .then(response => {
        //load the default learning outcomes by api request
        // return response;
        refreshCourse();
      })
      .catch(error => console.log(error));
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
      component.sequence = course.components.length + 1;
      return await apiLearningCompPost(component)
      .then( () => {refreshCourse()})
      .catch(error => console.log(error));
    }
    //#endregion

    return (
      <div className={classes.root}>
        <Accordion expanded = {index == selectComIndex} onChange = {handleChange()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
            data-tour = "component_expand_panel"
            style = {{ 
              "position": "sticky" ,
              "zIndex": 499,
              "backgroundColor": componentTitleColor,
              "top": 60
            }} 
          >
            <Grid container spacing = {3}>
             
              <Grid item xs={11}  data-tour = "component_header">
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
                          <MenuItem onClick={()=> {event.stopPropagation(); setEditComponent(true)}}>Rename</MenuItem>
                          <MenuItem onClick={()=> {event.stopPropagation(); duplicateComponent(component.id)}}>Duplicate</MenuItem>
                          <MenuItem onClick={()=> {event.stopPropagation(); deleteComponent(component.id)}}>Delete</MenuItem>
                        </Menu>
                      </React.Fragment>
                     
                    }
                   
                  </Grid>
                : 
                null
              }


              <Grid item xs={12} data-tour = "component_time">
                  <Typography className={classes.subheading}>Estimated learning time: {learningTime()} min(s)</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails style = {{ 
              "position": "flex" ,
            }}  >
              <Grid container spacing={2}>

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
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
export default Component;
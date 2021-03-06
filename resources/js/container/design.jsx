import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import DesignStepper from '../design/component/designStepper';
import DesignStageStepper from '../design/component/designStageStepper';

import StemPracticeContainer from '../design/stemPractice/container/stemPracticeContainer';
import DesignInfo from '../design/courseInfo';
import DesignComponentStep from '../design/learningComponent/componentStep';
import LearningOutcomeContainer from '../design/outcome/container/learningOutcomeContainer';
import ComponentSelectContainer from '../design/learningComponent/container/componentSelectContainer';
import PrintableContainer from '../design/printable/printableContainer';
import DashBoardContainer from '../design/dashboard/dashboardContainer';
import ComponentPlanContainer from '../design/learningComponent/container/componentPlanContainer';
import LessonPlan from '../design/lesson/container/lessonPlanContainer';
import TimelineContainer from '../design/timeline/src/timelineContainer'
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import InfoIcon from '@material-ui/icons/Info';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import PieChartIcon from '@material-ui/icons/PieChart'
import TimelineIcon from '@material-ui/icons/Timeline';

import UnitPlanContainer from '../design/unitPlanContainer';
import {ContextStore} from '../container/designContainer'
import {AppContextStore} from '../container/app';


import {
  apiCourseUpdate, apiCourseClearComponent,
  apiLearningOutcomePost, 
  apiDesignTypeGet,
} 
from '../api.js';
import { countBy } from 'lodash';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  gridList: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'scroll',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  layout: {
    padding: '16px'
  },
  flex: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
  },
  toolbar: {
    paddingRight: 0, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerList: {
    backgroundColor: 'rgb(0, 0, 0, 0.08)'
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    width: "24px",
  },
  pageListText: {
    fontSize: '0.7rem'
  },
  pageListItem: {
    backgroundColor: 'rgb(255, 255, 255, 1) !important',
    color: theme.palette.primary.main,
    fontWeight: '700 !important'
  }
}));

const steps = ['STEM PRACTICE', 'COURSE/ CURRICULUM UNIT INFO', 'LEARNING OUTCOMES', 'CURRICULUM COMPONENTS OVERVIEW',  'START YOUR DESIGN'];

const PageListMenu = (props) => {
  const {activeStage, setActiveStage} = props;
  const [extended, setExtend] = React.useState(true);
  const classes = useStyles();

  const { course} = React.useContext(ContextStore);

  const getIconStyle = (selected) =>
  {
    if(selected){
      return {
        color: "primary"
      }
    }else{
      return {
        color: "default"
      }
    }
  }

  const getTextStyle = (selected) =>
  {
    if(selected){
      return {
        fontWeight: "bold" 
      }
    }else{
      return {
        fontWeight: "500"
      }
    }
  }

  const onClickTimeline = () => {
    console.log(course);
    if(course.lessons[0]?.time % 15 == 0 || course.lessons[0]?.time%10 == 0){
      window.open(
        `/timeline/${props.course_id}`
      ,'_blank'
      )
    }else{
      window.alert("Your lesson time cannot rounded by 10/ 15, the current timeline does not support this");
    }
 
  }

  return (
    <div
      classes={
        clsx(classes.drawerPaper, !extended && classes.drawerPaperClose)
      }
      style = {{
        position: "sticky", 
        top: document.getElementById('top_menu')?.style.height > 0? document.getElementById('top_menu')?.style.height : 0,
        transition: "width 2s",
        maxWidth: "240px",
      }}
    >
      {
        extended?
        <div style= {{width: "240px"}}>
          <div className={classes.toolbarIcon}>
              <IconButton onClick={() => {setExtend(false)}}>
                  <ChevronLeftIcon />
              </IconButton>
          </div>
          <List component="nav" aria-label="" className={classes.drawerList}>
            {/* <ListSubheader>Course Overview</ListSubheader> */}
            <ListItem
              button
              selected={activeStage === 'courseinfo'}
              onClick={(event) => setActiveStage('courseinfo')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <InfoIcon {...getIconStyle(activeStage === 'courseinfo')}/>
              </ListItemIcon>
              <ListItemText primary="Course Information" 
                primaryTypographyProps = {{
                  variant: "subtitle2",
                  style: {...getTextStyle(activeStage === 'courseinfo')}
                }}
              />
            </ListItem>
    
            <ListItem
              button
              selected={activeStage === 'learningOutcomes'}
              onClick={(event) => setActiveStage('learningOutcomes')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <AssignmentTurnedInIcon {...getIconStyle(activeStage === 'learningOutcomes')}/>
              </ListItemIcon>
              <ListItemText primary="Learning Outcomes" 
                primaryTypographyProps = {{
                  variant: "subtitle2",
                  style: {...getTextStyle(activeStage === 'learningOutcomes')}
                }}/>
            </ListItem>
  
            <ListItem
              button
              selected={activeStage === 'componentPlan' || activeStage.split("_")[0] == 'componentPlan'}
              onClick={(event) => setActiveStage('componentPlan')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <ViewHeadlineIcon {...getIconStyle(activeStage === 'componentPlan' || activeStage.split("_")[0] == 'componentPlan')}/>
              </ListItemIcon>
              <ListItemText 
                primary="Curriculum Component" 
                primaryTypographyProps = {{
                  variant: "subtitle2",
                  style: {...getTextStyle(activeStage === 'componentPlan' || activeStage.split("_")[0] == 'componentPlan')}
                }}/>
            </ListItem>

            {
              activeStage === 'componentPlan' || activeStage.split("_")[0] == 'componentPlan'?
              course.components.map(_comp => 
                <ListItem
                key = {_comp.id}
                button
                selected={activeStage === ('componentPlan_' + _comp.id)}
                onClick={(event) => setActiveStage('componentPlan_' + _comp.id)}
                classes = {{
                  selected: classes.pageListItem
                }}
              >
                <ListItemText 
                  primary={ "CC" + _comp.sequence + "-" + _comp.title} 
                  primaryTypographyProps = {{
                    noWrap: true, 
                    variant: "caption", 
                    style: {marginLeft: 24, ...getTextStyle(activeStage === 'componentPlan_' + _comp.id)}
                  }} 
                />
              </ListItem>
              )
              :
              null
            }
    
            <ListItem
              button
              selected={activeStage === 'lessonPlan'}
              onClick={(event) => setActiveStage('lessonPlan')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <AvTimerIcon {...getIconStyle(activeStage === 'lessonPlan')}/>
              </ListItemIcon>
               
              <ListItemText 
                primary="Lesson Plan" 
                primaryTypographyProps = {{
                  variant: "subtitle2", 
                  style: {...getTextStyle(activeStage === 'lessonPlan')}
                }}/>
            </ListItem>
    
            <ListItem
              button
              selected={activeStage === 'timeline'}
              onClick={onClickTimeline}
            >
               <ListItemIcon>
                  <TimelineIcon  {...getIconStyle(activeStage === 'timeline')}/>
                </ListItemIcon>
              <ListItemText primary="Timeline" />
            </ListItem>
    
            {/* <ListSubheader>Review Stage</ListSubheader> */}
              <ListItem
                button
                selected={activeStage === 'finish'}
                onClick={(event) => setActiveStage('finish')}
                classes = {{
                  selected: classes.pageListItem
                }}
              >
                <ListItemIcon>
                  <PieChartIcon  {...getIconStyle(activeStage === 'finish')}/>
                </ListItemIcon>
                <ListItemText primary="Review" 
                  primaryTypographyProps = {{
                    variant: "subtitle2",
                    style: {...getTextStyle(activeStage === 'finish')}
                  }}/>
              </ListItem>
          </List>
        </div>
        :
        <div className={classes.toolbarIcon}>
          <List component="nav" aria-label="" className={classes.drawerList}>
            <IconButton onClick={() => {setExtend(true)}}>
                <ChevronRightIcon />
            </IconButton>
            <ListItem
              button
              selected={activeStage === 'courseinfo'}
              onClick={(event) => setActiveStage('courseinfo')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
            </ListItem>
    
            <ListItem
              button
              selected={activeStage === 'learningOutcomes'}
              onClick={(event) => setActiveStage('learningOutcomes')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
          
            </ListItem>
    
            <ListItem
              button
              selected={activeStage === 'componentPlan' || activeStage.split("_")[0] == 'componentPlan'}
              onClick={(event) => setActiveStage('componentPlan')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
                <ListItemIcon>
                  <ViewHeadlineIcon />
                </ListItemIcon>
            </ListItem>
    
            <ListItem
              button
              selected={activeStage === 'lessonPlan'}
              onClick={(event) => setActiveStage('lessonPlan')}
              classes = {{
                selected: classes.pageListItem
              }}
            >
                <ListItemIcon>
                  <AvTimerIcon  />
                </ListItemIcon>
            </ListItem>

            <ListItem
              button
              selected={activeStage === 'timeline'}
              onClick={onClickTimeline}
            >
                <ListItemIcon>
                  <TimelineIcon  {...getIconStyle(activeStage === 'timeline')}/>
                </ListItemIcon>
            </ListItem>

              <ListItem
                button
                selected={activeStage === 'finish'}
                onClick={(event) => setActiveStage('finish')}
                classes = {{
                  selected: classes.pageListItem
                }}
              >
                <ListItemIcon>
                  <PieChartIcon  />
                </ListItemIcon>
              </ListItem>
          </List>
        </div>
      }
     
      
    </div>
  );
}

const Design = (props) => {
  
  const classes = useStyles();

  const {courseID} = props;
  const { course, dispatch, 
    activeStage, setActiveStage, 
    activeStep, setActiveStep,
    activePage, setActivePage 
  } = React.useContext(ContextStore);
  const { setLoadingOpen, options} = React.useContext(AppContextStore);
  
  //#region data init
  //preload learningOutcome (Unit Level)
  
  //preload learningComponent
  async function fetchInitDataWithDesignType() {
    var updates = [];
    setLoadingOpen(true);

    updateCourse();
    apiDesignTypeGet(course.designType).then(
      response => {
        console.log( response.data.outcomes);
        //outcome
        response.data.outcomes.map((_outcome) => {
          var _outcome_temp = _outcome;
          _outcome_temp.course_id = course.id;
          _outcome_temp.stemtypes_id = _outcome.stemtypesid.map(x=>x.stem_type_id);
          updates.push( apiLearningOutcomePost(_outcome_temp) );
        })
      }
    );
    
    Promise.all(updates).then(()=>{
      setLoadingOpen(false)
    })
  }

  async function clearCourseComponent() {
    await apiCourseClearComponent(course.id).then(
      response => {return response}
    )
  }

  async function updateCourse(is_finish = false) {
    setLoadingOpen(true)  
    await apiCourseUpdate({
      "course_id": course.id,
      "design_type_id": course.designType,
      "is_finish": is_finish
    })
    .then(
      response => {
        dispatch({
            type: "INIT_COURSE",
            value: response.data
        })
        setLoadingOpen(false)
    })
    .catch(error => console.log(error));
}

  // init the data once design type is changed
  React.useEffect(() => {

      if(course.designType != "" && course.designType != null){
        clearCourseComponent();
        fetchInitDataWithDesignType().then(()=>{
          handleNext();
        });
      }
    
  }, [course.designType]);

  React.useEffect(() => {
    initDesign();
  }, [course.isinited]);

  React.useEffect(()=>{
    if( activeStage == ''){
      initDesign();
    }
  }, [activeStage])


  const initDesign = () => {
    setLoadingOpen(true)

    if(course.id != -1){
      if(course.isinited){
        if(course.components.length == 0 ){
          setLoadingOpen(false)
          if(course.unit_title == ""  && course.outcomes.length > 0){
            setActiveStep(1);
          }else if(course.outcomes.length > 0){
            setActiveStep(2);
          }else{
            setActiveStep(0);
          }
          // setActiveStep(props.step - 1);
        }else{
          setLoadingOpen(false)
          if(props.step == 0){
            setActiveStage('designStage');
            setActivePage('componentPlan');
          }else if(props.step == 5){
            setActiveStage('designStage');
            setActivePage('finish');
          }else{
            setActiveStage('designStage');
            setActivePage('componentPlan');
          }
        }
      }
    }else{
      setLoadingOpen(false)
    }
  }
  
  const handleNext = () => {
    if(activeStep + 1 == steps.length){
      //final step
      setActiveStage('designStage');
      setActivePage('componentPlan');
      // onFinish();
    }else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onFinish = () => {
    updateCourse(true).then(
      (response) => {
        window.location.href = "/mydesign";
      }
    )
  }
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
             <StemPracticeContainer handleNext = {handleNext}/>
             <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              {activeStep !== 0 &&(
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
              )}
            </div>
          </React.Fragment>
        )
      case 1:
        return (
          <React.Fragment>
             <DesignInfo handleBack = {handleBack} handleNext = {handleNext} isStep = {true}/>
          </React.Fragment>
        )
      case 2:
        return (
          <React.Fragment>
             <LearningOutcomeContainer />
             <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              {activeStep !== 0 &&(
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    data-tour = "next"
                  >
                    {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                  </Button>
              )}
            </div>
          </React.Fragment>
        )
      case 3:
        return (
          <React.Fragment>
            <ComponentSelectContainer handleNext = {handleNext} />
          </React.Fragment>
        )
      case 4:
        setActiveStage('designStage');
        setActivePage('componentPlan');
        break;
      
      case 5:
        setActiveStage('finish');
        break;
      default:
        return <div> Some Error Occur </div>;
    }
  }

  const getActiveStage = () => {
    switch (activeStage){
      default:
      case 'basic': 
        return (
          <React.Fragment>
            <DesignStepper activeStep = {activeStep} steps={steps} setActiveStep = {setActiveStep} />
            <div style = {{padding: 32}}>
              {getStepContent(activeStep)}
            </div>
          </React.Fragment>
        );
      case 'designStage':
        return(
          <React.Fragment>
              <Grid container>
               
                <Grid item style = {{marginLeft: 0}}>
                  <PageListMenu activeStage ={activePage} setActiveStage ={setActivePage} course_id = {courseID}/> 
                </Grid>
                
                <Grid item xs style = {{marginLeft: 16}}>
                  <Grid container item xs = {12}  style = {{width: '100%', padding: 16}} >
                    {/* <Paper style = {{width: '100%', padding: 16, margin: 16}}> */}
                      <Grid item xs = {12}>
                        <Typography variant="h6" gutterBottom style = {{fontWeight: 900}}>
                          {course.unit_title}
                        </Typography>
                      </Grid>

                      <Grid item xs = {12}>
                        <Typography variant={"subtitle1"} gutterBottom>
                          By {course.createdby.name} @{course.createdby.school}
                        </Typography>
                      </Grid>
                    {/* </Paper> */}
                  </Grid>
                  {getDesignStageContent()}
                </Grid>
              </Grid>
          </React.Fragment>
        )

        case 'dashboard':
          return(
            <React.Fragment>
                <Grid container item xs>
                  <DashBoardContainer />
                </Grid>
            </React.Fragment>
          )
    }
  }

  const getDesignStageContent = () => {
    if(activePage.split('_')[0] == "componentPlan"){
      if(typeof activePage.split('_')[1] != "undefined"){
          return(
            <Grid container item xs spacing = {2}>
              <Grid item xs = {12}>
                <ComponentPlanContainer component_id = {activePage.split('_')[1]}/>
              </Grid>
              <Grid container item xs = {12} justify = {"flex-end"}>
                <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('lessonPlan')}> Next </Button>
              </Grid>
            </Grid>
          );
      }
    }
    switch (activePage){
      case 'unitPlan':
        return(          
          <Grid item xs>
            <UnitPlanContainer/>
            <Grid container item xs = {12} justify = {"flex-end"}>
              <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('finish')}> Next </Button>
            </Grid>
          </Grid>
        );

      case 'componentPlan':
        return(
          <Grid container item xs spacing = {2}>
            <Grid item xs = {12}>
              <ComponentPlanContainer/>
            </Grid>
            <Grid container item xs = {12} justify = {"flex-end"}>
              <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('lessonPlan')}> Next </Button>
            </Grid>
          </Grid>
        );
      case 'lessonPlan':
         return(
          <Grid item xs>
            <LessonPlan/>
            <Grid container item xs = {12} justify = {"flex-end"}>
              <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('componentPlan')}> Back </Button>
              <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('finish')}> Next </Button>
            </Grid>
          </Grid>
        );

        case 'timeline':
          return(
           <Grid item xs>
             <TimelineContainer/>
             <Grid container item xs = {12} justify = {"flex-end"}>
               <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('componentPlan')}> Back </Button>
               <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActivePage('finish')}> Next </Button>
             </Grid>
           </Grid>
         );

      case 'learningOutcomes':
        return( 
            <Grid item xs >
              <LearningOutcomeContainer  />
            </Grid>
        );
      case 'courseinfo':
        return(
          <React.Fragment>
           <Grid item xs  style={{maxHeight: '100%'}}>
              <DesignInfo handleBack = {()=>{}} handleNext = {()=>{}} isStep = {false}/>
            </Grid>
          </React.Fragment>
        )
      case 'dashboard':
        return(
          <React.Fragment>
              <Grid item xs>
                <DashBoardContainer />
              </Grid>
          </React.Fragment>
        )
      case 'finish':
        return(
          <Grid item xs>
            <PrintableContainer isPrint = {false} courseid = {courseID}/>
            <Grid container item xs ={12} justify = {"flex-end"}>
              <Grid item xs = {2}>
                <Button variant = {"outlined"} color = {"secondary"} onClick = {()=>setActivePage('componentPlan')} fullWidth> {course.permission > 2? "Edit" : "Back"}</Button>
              </Grid>
              <Grid item xs = {2}>
                <Button variant = {"outlined"} color = {"primary"} onClick = {onFinish} fullWidth>Finish</Button>
              </Grid>
            </Grid>
          </Grid>
        )
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container style = {{paddingTop: 16, paddingBottom: 16}}>
            <Grid item xs = {12}>
              {getActiveStage()}
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Design;
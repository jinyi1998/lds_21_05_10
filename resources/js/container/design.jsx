import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import DesignStepper from '../design/designStepper';
import DesignStageStepper from '../design/component/designStageStepper';

import StemPracticeContainer from '../design/stemPractice/container/stemPracticeContainer';
import DesignInfo from '../design/courseInfo';
import DesignComponentStep from '../design/learningComponent/componentStep';
import LearningOutcomeContainer from '../design/outcome/container/learningOutcomeContainer';
import ComponentSelectContainer from '../design/learningComponent/container/componentSelectContainer';
import PrintableContainer from '../design/printable/printableContainer';
import DashBoardContainer from '../design/dashboard/dashboardContainer';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ExploreIcon from '@material-ui/icons/Explore';

import UnitPlanContainer from '../design/unitPlanContainer';
import {ContextStore} from '../container/designContainer'
import {AppContextStore} from '../container/app';

import {
  apiCourseUpdate, apiCourseClearComponent,
  apiLearningCompTempGet, apiLearningCompTempPost,
  apiLearningCompPost,
  apiLearningOutcomePost, apiLearningOutcomeGetOutcomeType, apiLearningOutcomeGetOutcomeLevel,
  apiLearningOutcomeTempGet,
  apiDesignTypeGet,
} 
from '../api.js';

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
  }
}));

// const steps = ['STEM PRACTICE', 'UNIT', 'UNIT LEVEL LEARNING OUTCOMES', 'CURRICULUM COMPONENTS OVERVIEW',  'CURRICULUM COMPONENT DESIGN', 'UNIT REVIEW'];
const steps = ['STEM PRACTICE', 'UNIT', 'UNIT LEVEL LEARNING OUTCOMES', 'CURRICULUM COMPONENTS OVERVIEW',  'START YOUR DESIGN'];

const PageMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {activePage, setActionPage} = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (name) => {
    if(name!=""){
      setActionPage(name);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button color = {"primary"} variant = {"contained"} aria-haspopup="true" onClick={handleClick} style = {{margin: 16}}>
        <MenuIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=> handleClose(activePage)}
      >
        <MenuItem onClick={() => handleClose("courseinfo")}  selected = {activePage == "courseinfo"}>Course Information</MenuItem>
        <MenuItem onClick={() => handleClose("learningOutcomes")} selected = {activePage == "learningOutcomes"}>Unit Level Learning Outcomes</MenuItem>
        {/* <MenuItem onClick={() => handleClose("majorStep")}  selected = {activePage == "majorStep"}>Curriculum Components</MenuItem> */}
        <CssBaseline />
        <MenuItem onClick={() => handleClose("unitPlan")}  selected = {activePage == "unitPlan"}>Curriculum Component Design</MenuItem>
        <CssBaseline />
      
        {/* <MenuItem onClick={() => handleClose("review")} selected = {activePage == "review"}>Your Design</MenuItem> */}
      </Menu>
    </div>
  );
}

const PageListMenu = (props) => {
  const {activePage, setActionPage} = props;
  return (

    <List component="nav" aria-label="main mailbox folders" style = {{ 
      position: "sticky",
      top: 72}}
    >
      <ListSubheader>Course Overview</ListSubheader>
      <ListItem
        button
        selected={activePage === 'courseinfo'}
        onClick={(event) => setActionPage('courseinfo')}
      >
        {/* <ListItemIcon>
          <InfoIcon />
        </ListItemIcon> */}
        <ListItemText primary="Course Information" />
      </ListItem>

      <ListItem
        button
        selected={activePage === 'learningOutcomes'}
        onClick={(event) => setActionPage('learningOutcomes')}
      >
        {/* <ListItemIcon>
          <InfoIcon />
        </ListItemIcon> */}
        <ListItemText primary="Unit Level Learning Outcomes" />
      </ListItem>

      <ListSubheader>Design Stage</ListSubheader>
      <ListItem
        button
        selected={activePage === 'unitPlan'}
        onClick={(event) => setActionPage('unitPlan')}
      >
        {/* <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon> */}
        <ListItemText primary="Curriculum Component Design" />
      </ListItem>

      <ListSubheader>Review Stage</ListSubheader>
        <ListItem
          button
          selected={activePage === 'finish'}
          onClick={(event) => setActionPage('finish')}
        >
          {/* <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon> */}
          <ListItemText primary="Review" />
        </ListItem>
    </List>
   
  );
}

const Design = (props) => {
  
  const classes = useStyles();

  const {courseID} = props;
  const { course, dispatch, activePage, setActionPage, activeStep, setActiveStep } = React.useContext(ContextStore);
  const { setLoadingOpen, options} = React.useContext(AppContextStore);
  
  //#region data init
  //preload learningOutcome (Unit Level)
  async function importOutcomeTemplateToCourse(outcome) {
    await apiLearningOutcomePost(outcome)
    .then(response=> {return response.data})
  }

  //preload learningComponent
  async function fetchInitDataWithDesignType() {
    var updates = [];
    setLoadingOpen(true);

    updateCourse();
    apiDesignTypeGet(course.designType).then(
      response => {
        //outcome
        response.data.outcomes.map((_outcome) => {
          var _outcome_temp = _outcome;
          _outcome_temp.course_id = course.id
          updates.push( importOutcomeTemplateToCourse(_outcome_temp) );
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
        // fetchlearningTypeTempData();
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
    if( activePage == ''){
      initDesign();
    }
  }, [activePage])


  const initDesign = () => {
    setLoadingOpen(true)
    if(courseID != -1){
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
              // setActiveStep(4);
            setActionPage('unitPlan')
          }else if(props.step == 5){
            setActionPage('finish')
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
      setActionPage('unitPlan');
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
             {/* <DesignComponentStep /> */}
             {/* <div className={classes.buttons}>
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
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              )}
            </div> */}
            <ComponentSelectContainer handleNext = {handleNext} />
          </React.Fragment>
        )
      case 4:
        setActionPage('unitPlan');
        break;
        // return (
        //   <React.Fragment>

        //     <UnitPlanContainer/>
        //      <div className={classes.buttons}>
        //       {activeStep !== 0 &&(
        //             <Button
        //             variant="contained"
        //             color="primary"
        //             onClick={handleNext}
        //             className={classes.button}
        //             data-tour = "next"
        //           >
        //             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        //           </Button>
        //       )}
        //     </div>
        //   </React.Fragment>
        // )
      
      case 5:
        setActionPage('finish');
        break;
        // return (
        //   <React.Fragment>
        //      <PrintableContainer isPrint = {false} courseid = {courseID}/>
        //      {activeStep !== 0 && (
        //         <Button onClick={handleBack} className={classes.button}>
        //           Back
        //         </Button>
        //       )}
        //      {activeStep !== 0 &&(
        //             <Button
        //             variant="contained"
        //             color="primary"
        //             onClick={handleNext}
        //             className={classes.button}
        //             data-tour = "next"
        //           >
        //             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        //           </Button>
        //       )}
        //   </React.Fragment>
        // )
      default:
        return <div> Some Error Occur </div>;
    }
  }

  const getActivePage = () => {
    switch (activePage){
      default:
      case 'basic': 
        return (
          <React.Fragment>
            <DesignStepper activeStep = {activeStep} steps={steps} setActiveStep = {setActiveStep} />
            <div>
              {getStepContent(activeStep)}
            </div>
          </React.Fragment>
        );
      case 'majorStep':
        return (
          <React.Fragment>
            <PageMenu  activePage ={activePage} setActionPage ={setActionPage}/>
            <DesignComponentStep/>
          </React.Fragment>
          );
      case 'unitPlan':
        return(
          <React.Fragment>
            {/* <DesignStageStepper activeStep = {0}/> */}
            <Grid container>
              <Grid item xs ={1}>
                <PageListMenu activePage ={activePage} setActionPage ={setActionPage}/> 
              </Grid>
              <Grid item xs ={11}>
                <UnitPlanContainer/>
                <Grid container item xs = {12} justify = {"flex-end"}>
                  <Button variant = {"outlined"} color = {"primary"} onClick = {()=>setActionPage('finish')}> Next </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <PageMenu activePage ={activePage} setActionPage ={setActionPage}/> */} 
        </React.Fragment>
        );
      case 'learningOutcomes':
          return( 
          <React.Fragment>
            {/* <DesignStageStepper activeStep = {1}/> */}
            <Grid container>
              <Grid item xs ={1}>
                <PageListMenu activePage ={activePage} setActionPage ={setActionPage}/> 
              </Grid>
              <Grid item xs ={11}>
                <LearningOutcomeContainer  />
              </Grid>
            </Grid>
            {/* <PageMenu activePage ={activePage} setActionPage ={setActionPage}/> */}

       </React.Fragment>);
      case 'courseinfo':
        return(
          <React.Fragment>
            {/* <DesignStageStepper activeStep = {1}/> */}
            <Grid container>
              <Grid item xs ={1}>
                <PageListMenu activePage ={activePage} setActionPage ={setActionPage}/> 
              </Grid>
              <Grid item xs ={11} style={{maxHeight: '100%', overflow: 'auto'}}>
              <DesignInfo handleBack = {()=>{}} handleNext = {()=>{}} isStep = {false}/>
              </Grid>
            </Grid>
            {/* <PageMenu activePage ={activePage} setActionPage ={setActionPage}/> */}

          </React.Fragment>
        )
      case 'dashboard':
        return(
          <React.Fragment>
            <DesignStageStepper activeStep = {1}/>
            <DashBoardContainer />
          </React.Fragment>
        )
      case 'finish':
          return(
            <React.Fragment>
              {/* <DesignStageStepper activeStep = {1}/> */}
              <Grid container>
                <Grid item xs ={1}>
                  <PageListMenu activePage ={activePage} setActionPage ={setActionPage}/> 
                </Grid>

                <Grid item xs ={11}>
                  <PrintableContainer isPrint = {false} courseid = {courseID}/>
                  <Grid container item xs ={12} justify = {"flex-end"}>
                    <Grid item xs = {2}>
                      <Button variant = {"outlined"} color = {"secondary"} onClick = {()=>setActionPage('unitPlan')} fullWidth> Edit </Button>
                    </Grid>
                    <Grid item xs = {2}>
                      <Button variant = {"outlined"} color = {"primary"} onClick = {onFinish} fullWidth>Finish</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
             
              
            </React.Fragment>
          )

    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} style ={{padding: "16px"}}>
          <Grid container spacing = {4}>
            <Grid item xs = {12}>
              {getActivePage()}
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Design;
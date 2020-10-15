import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DesignStepper from '../design/designStepper';

import DesignType from '../design/approachType';
import DesignInfo from '../design/courseInfo';
import DesignComponentStep from '../design/component/componentStep';
import BasicReview from '../design/basicReview';
import LearningOutcomeContainer from '../design/outcome/learningOutcomeContainer';
import PrintableContainer from '../design/printable/printableContainer';
import DashBoardContainer from '../design/dashboard/dashboardContainer';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import UnitPlanContainer from '../design/unitPlanContainer';
import {ContextStore} from '../container/designContainer'
import {AppContextStore} from '../container/app';
import config from 'react-global-configuration';

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
  }
}));

const steps = ['STEM PRACTICE', 'UNIT', 'UNIT LEVEL LEARNING OUTCOMES', 'CURRICULUM COMPONENTS OVERVIEW',  'CURRICULUM COMPONENT DESIGN', 'UNIT REVIEW'];

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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=> handleClose(activePage)}
      >
        <MenuItem onClick={() => handleClose("courseinfo")}  selected = {activePage == "courseinfo"}>Course Information</MenuItem>
        <MenuItem onClick={() => handleClose("learningOutcomes")} selected = {activePage == "learningOutcomes"}>Unit Level Learning Outcomes</MenuItem>
        <MenuItem onClick={() => handleClose("majorStep")}  selected = {activePage == "majorStep"}>Curriculum Components</MenuItem>
        <CssBaseline />
        <MenuItem onClick={() => handleClose("unitPlan")}  selected = {activePage == "unitPlan"}>Curriculum Component Design</MenuItem>
        <CssBaseline />
      
        {/* <MenuItem onClick={() => handleClose("review")} selected = {activePage == "review"}>Your Design</MenuItem> */}
      </Menu>
    </div>
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
    updateCourse();
    apiDesignTypeGet(course.designType).then(
      response => {
        //component
        response.data.componentsid.map((data, index) => {
          getComponentTemplateData(data.component_id).then(component => {
            component.component_template_id = component.id
            component.course_id = course.id
            component.sequence = index + 1
            importComponentTemplateToComponent(component)
          });
        })

        //outcome
        response.data.outcomes.map((_outcome) => {
          var _outcome_temp = _outcome;
          _outcome_temp.course_id = course.id
          importOutcomeTemplateToCourse(_outcome_temp);
        })
      }
    )
  }

  async function getComponentTemplateData(id) {

    return await apiLearningCompTempGet(id)
    .then(respsonse => {return respsonse.data})
  }

  async function clearCourseComponent() {
    await apiCourseClearComponent(course.id).then(
      response => {return response}
    )
  }

  async function importComponentTemplateToComponent(componentTemplate) {
    apiLearningCompPost(componentTemplate)
    .then(response => {
      return response.data;
    })
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
    setLoadingOpen(true)
    if(courseID != -1){
      if(course.isinited){

        if(course.components.length == 0){
          setLoadingOpen(false)
        }else{
          setLoadingOpen(false)
          if(props.step == 0){
              setActiveStep(1);
          }
        }
      }
    }else{
      setLoadingOpen(false)
    }
  }, [course.isinited]);
  


  const handleNext = () => {
    if(activeStep + 1 == steps.length){
      //final step
      // setActionPage('unitPlan');
      updateCourse(true).then(
        (response) => {
          window.location.href = "/mydesign";
        }
      )
    }else{
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
             <DesignType handleNext = {handleNext}/>
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
        // return  <LearningOutcomeToDo />
      case 3:
        return (
          <React.Fragment>
             <DesignComponentStep />
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
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              )}
            </div>
          </React.Fragment>
        )
      case 4:
        return (
          <React.Fragment>
            <UnitPlanContainer/>
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
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              )}
            </div>
          </React.Fragment>
        )
      
      case 5:
        return (
          <React.Fragment>
             <PrintableContainer isPrint = {false} courseid = {courseID}/>
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
          </React.Fragment>
        )
        // return <DesignComponentStep />;
      // case 3:
      //   return  <BasicReview />
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
          <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
            <UnitPlanContainer/>
        </React.Fragment>
        );
      case 'learningOutcomes':
          return( 
          <React.Fragment>
            <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
            <LearningOutcomeContainer  />
       </React.Fragment>);
      case 'review':
        return( 
        <React.Fragment>
          <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
          <BasicReview/>
        </React.Fragment>);
      case 'courseinfo':
        return(
          <React.Fragment>
            <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
            <DesignInfo handleBack = {()=>{}} handleNext = {()=>{}} isStep = {false}/>
          </React.Fragment>
        )
        case 'dashboard':
          return(
            <React.Fragment>
              <DashBoardContainer />
            </React.Fragment>
          )      
    }
  }


  const displayTitle = () => {
    switch(activePage){
      case 'basic': 
        return "Basic Setup";
      case 'majorStep':
        return "Learning Components"
      case 'unitPlan':
        return "Unit Design"
      case 'learningOutcomes':
          return "Unit Level Learning Outcomes"
      case 'courseinfo':
          return "Course Information"
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
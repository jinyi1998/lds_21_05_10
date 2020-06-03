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


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import UnitPlanContainer from '../design/unitPlanContainer';
import {ContextStore} from '../container/designContainer'
import config from 'react-global-configuration';

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

const steps = ['SUBJECT', 'UNIT', 'UNIT LEVEL LEARNING OUTCOMES', 'CURRICULUM COMPONENTS OVERVIEW',  'CURRICULUM COMPONENTS DESIGN'];

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
  const [activePage, setActionPage] = React.useState('basic');
  const [activeStep, setActiveStep] = React.useState(0);
  
  const { course, dispatch, options, setLoadingOpen } = React.useContext(ContextStore);
  
  //#region data init
  //preload learningOutcome (Unit Level)
  // async function fetchlearningTypeTempData() {
  //   const res = await fetch(
  //       'http://'+config.get('url')+'/api/learningOutcome/getDefaultOutcomeByLearningType/'+course.designType,
  //       {
  //       method: "GET",
  //       }
  //   )
  //   .then(res => res.json())
  //   .then(response => {
  //       //load the default learning outcomes by api request
  //       dispatch({
  //         type: "SET_LEARNINGOUTCOME",
  //         value: response
  //       })
  //   })
  //   .catch(error => console.log(error));
  // }

  //preload learningOutcome (Unit Level)
  async function fetchlearningOutcomeTempData() {
    const res = await fetch(
      'http://'+config.get('url')+'/api/learningOutcomeTemplate/getOutcomeTempByDesignType/'+ course.designType,
      {
      method: "GET",
      }
    ).then(res => res.json())
    .then(response => {
        response.map( (_outcome, index) => {
          console.log(_outcome);
          var _outcome_temp = _outcome;
          _outcome_temp.course_id = course.id
          importOutcomeTemplateToCourse(_outcome_temp);

      })
    })
  }


  async function importOutcomeTemplateToCourse(outcome) {
    return await fetch(
      'http://'+config.get('url')+'/api/learningOutcome',
      {
        method: "POST",
        body:  JSON.stringify(outcome),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(res => res.json())
    .then(response => {
      return response;
    })
  }

  //preload learningComponent
  async function fetchlearningComponentTempData() {
    updateCourse();
    const res = await fetch(
      'http://'+config.get('url')+'/api/learningComponent/getDefaultLearningComponentByDesignType2/'+ course.designType,
      {
      method: "GET",
      }
    ).then(res => res.json())
    .then(response => {
        response.map( (templateID, index) => {
        // learning componet
        getComponentTemplateData(templateID).then(component => {
          component.component_template_id = component.id
          component.course_id = course.id
          component.sequence = index + 1
          importComponentTemplateToComponent(component)
        });
      })
    })
  }

  async function getComponentTemplateData(id) {

    return await fetch(
      'http://'+config.get('url')+'/api/learningComponentTemplate/'+ id,
      {
      method: "GET",
      }
    ).then(res => res.json())
  }

  async function clearCourseComponent() {
    var json = {
      course_id: course.id
    };
    return await fetch(
      'http://'+config.get('url')+'/api/course/clearCourseComponent',
      {
        method: "POST",
        body:  JSON.stringify(json),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(res => res.json())
    .then(response => {
      return response;
    })
  }

  async function importComponentTemplateToComponent(componentTemplate) {
    return await fetch(
      'http://'+config.get('url')+'/api/learningComponent',
      {
        method: "POST",
        body:  JSON.stringify(componentTemplate),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(res => res.json())
    .then(response => {
      return response;
    })
  }

  async function updateCourse() {
    setLoadingOpen(true)  

    var json = {
        "design_type_id": course.designType,
    };
    const res = await fetch(
        'http://'+config.get('url')+'/api/course/'+ course.id,
        {
          method: "PUT",
          body:  JSON.stringify(json),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
    )
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: "INIT_COURSE",
                value: response
            })
            setLoadingOpen(false)
    })
    .catch(error => console.log(error));
}

  //preload learningTask
  async function saveCourse(){
    window.location.href = "/mydesign";
  }

  //#endregion

  // init the data once design type is changed
  React.useEffect(() => {

      if(course.designType != "" && course.designType != null){
        // fetchlearningTypeTempData();
        clearCourseComponent();
        fetchlearningComponentTempData();
        fetchlearningOutcomeTempData();
        handleNext();
      }
    
  }, [course.designType]);

  React.useEffect(() => {
    setLoadingOpen(true)
    if(courseID != -1){

      if(course.isinited){

        // if(course.components.length == 0){
        //   setLoadingOpen(false)
        // }else if(course.unit_title == "" || course.description == "" || course.level == ""  ){
        //   setLoadingOpen(false)
        //   setActiveStep(1);
        // }else{
        //   setLoadingOpen(false)
        //   return setActionPage('unitPlan');
        // }

        if(course.components.length == 0){
          setLoadingOpen(false)
        }else{
          setLoadingOpen(false)
          setActiveStep(1);
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
      window.location.href = "/mydesign";
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
                    {/* {activeStep === steps.length - 1 ? 'Save' : 'Next'} */}
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
        return <DesignInfo />
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
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              )}
            </div>
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
            {/* <Grid item xs = {12}>
              <Typography component="h1" variant="h4" align="center">
                {displayTitle()}
              </Typography>
            </Grid> */}
            <Grid item xs = {12}>
              {getActivePage()}
            </Grid>
            {/* <Grid item xs = {12}>
              <Button color="primary" variant="contained" onClick={() => {saveCourse()} } fullWidth > Close</Button>
            </Grid> */}
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Design;

if (document.getElementById('design')) {
    ReactDOM.render(<Design />, document.getElementById('design'));
}

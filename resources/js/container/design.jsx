import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DesignStepper from '../design/designStepper';

import DesignType from '../design/approachType';
import DesignInfo from '../design/courseInfo';
import DesignComponentStep from '../design/componentStep';
import BasicReview from '../design/basicReview';
import LearningOutcomeToDo from '../design/learningOutcomeToDo';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import UnitPlanContainer from '../design/unitPlanContainer';
import {ContextStore} from '../container/designContainer'

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

const steps = ['SUBJECT', 'UNIT', 'LEARNING COMPONENTS'];

const course = {
  id: 0,
  unitTitle: "",
  schoolName: "",
  level: "",
  noOfLessons: "",
  courseDes: "",
  designType: "",
  components: [
    // {
    //   id: 0,
    //   title: "",
    //   tasks: [
    //     {
    //       id: 0,
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
    //   learningOutcomes: [
    //     {
    //       id: 0,
    //       level: "",
    //       outcomeType: "",
    //       STEMType: [],
    //       description: "",
    //       status: false
    //     }
    //   ]
    // }
  ],
  //learning outcomes in course level
  learningOutcomes: [
    // {
    //   id: 0,
    //   level: "",
    //   outcomeType: "",
    //   STEMType: [],
    //   description: "",
    //   isCourseLevel: false
    // }
  ],
  lesson: [
    {
      id: 0,
      name: "",
      tasks: []
    }
  ]
}

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
        <MenuItem onClick={() => handleClose("learningComp")} selected = {activePage == "learningComp"}>Learning Component (Course Level)</MenuItem>
        <CssBaseline />
        <MenuItem onClick={() => handleClose("unitPlan")}  selected = {activePage == "unitPlan"}>Unit Info</MenuItem>
        <MenuItem onClick={() => handleClose("majorStep")}  selected = {activePage == "majorStep"}>Major Step</MenuItem>
        <CssBaseline />
        <MenuItem onClick={() => handleClose("review")} selected = {activePage == "review"}>Your Design</MenuItem>
      </Menu>
    </div>
  );
}

const Design = () => {
  
  const classes = useStyles();

  const [activePage, setActionPage] = React.useState('basic');
  const [activeStep, setActiveStep] = React.useState(0);
  const [courseData, setCourseData] = React.useState(course);
  const { course, dispatch } = React.useContext(ContextStore);
  
  //#region data init
  //preload learningOutcome
  async function fetchlearningTypeTempData() {
    const res = await fetch(
        `http://localhost:8000/api/learningOutcome/getDefaultOutcomeByLearningType/`+course.designType,
        {
        method: "GET",
        }
    )
    .then(res => res.json())
    .then(response => {
        //load the default learning outcomes by api request
        dispatch({
          type: "SET_LEARNINGOUTCOME",
          value: response
        })
    })
    .catch(error => console.log(error));
  }

  //preload learningComponent
  async function fetchlearningComponentTempData() {

      const res = await fetch(
          `http://localhost:8000/api/learningComponent/getDefaultLearningComponentByDesignType/`+ course.designType,
          {
          method: "GET",
          }
      )
      .then(res => res.json())
      .then(response => {
          //load the default learning outcomes by api request

          response.map( _respond => {
            const taskData = fetchlearningTaskTempData(_respond.id).then(taskData => {
              _respond.tasks = taskData;
            });
          });
          dispatch({
            type: "SET_COMPONENT",
            value: response
          })
      
      })
      .catch(error => console.log(error));

  }

  //preload learningTask
  async function fetchlearningTaskTempData(id) {
    return await fetch(
        `http://localhost:8000/api/learningTask/getDefaultLearningTaskByComponent/`+ id,
        {
        method: "GET",
        }
    )
    .then(res => res.json())
    .then(response => {
        //load the default learning outcomes by api request
        return response;
    })
    .catch(error => console.log(error));
  }
  //#endregion

  // init the data once design type is changed
  React.useEffect(() => {
      if(course.designType != ""){
        fetchlearningTypeTempData();
        fetchlearningComponentTempData();
        handleNext();
      }
    
  }, [course.designType]);

  const handleNext = () => {
    if(activeStep + 1 == steps.length){
      //final step
      setActionPage('majorStep');
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
        return <DesignType />
      case 1:
        return <DesignInfo />
      // case 2:
      //   return <DesignComponentStep />;
      case 2:
        return  <LearningOutcomeToDo />
      case 3:
        return  <BasicReview />
      default:
        return <div> hello </div>;
    }
  }

  const getActivePage = () => {
    switch (activePage){
      default:
      case 'basic': 
        return (
          <React.Fragment>
            <DesignStepper activeStep = {activeStep} steps={steps} />
            <div>
              {getStepContent(activeStep)}
            </div>
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
      case 'learningComp':
          return( 
          <React.Fragment>
            <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
            <LearningOutcomeToDo  />
       </React.Fragment>);
      case 'review':
        return( 
        <React.Fragment>
          <PageMenu activePage ={activePage} setActionPage ={setActionPage}/>
          <BasicReview/>
        </React.Fragment>);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Learning Design Studio
          </Typography>
          {getActivePage()}
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default Design;

if (document.getElementById('design')) {
    ReactDOM.render(<Design />, document.getElementById('design'));
}

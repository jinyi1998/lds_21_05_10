
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

import SideMenu from '../components/sideMenu';
import TopMenu from '../components/topMenu';

import DesignContainer from './designContainer';
import MyDesign from '../dashboard/myDesign';
import PublicDesign from '../dashboard/publicDesign';
import UsergroupContainer from '../usergroup/container/usergroupContainer';
import UsergroupsListViewContainer from '../usergroup/container/usergroupsListViewContainer';
import DashboardContainer from '../admin/dashboard/container/dashboardContainer';
import UserMgmtContainer from '../admin/usersmanagement/container/usersMgmtContainer';
import TemplateBuilderContainer from '../admin/template_builder/container/templateBuilderContainer';
import ComponentTemplateViewListContainer from '../admin/template_builder/container/componentTemplateViewListContainer';
import PatternTemplateViewListContainer from '../admin/template_builder/container/patternTemplateViewListContainer';
import PatternTemplateBuilderContainer from '../admin/template_builder/container/patternTemplateBuilderContainer';
import ComponentTemplateBuilderContainer from '../admin/template_builder/container/componentTemplateBuilderContainer';

import {
  apiCourseDelete, apiCourseCreate, apiCourseUpdate, apiCourseGet,
  apiLearningOutcomePost, apiLearningOutcomeGetOutcomeType, apiLearningOutcomeGetOutcomeLevel,
  apiLearningOutcomeTempGet,
  apiDesignTypeList, apiDesignTypeGet,
  apiOptionsList,
  apiLearningTaskGetPatternOpts,
} 
from '../api.js';


export const AppContextStore = React.createContext({
  taskTypeColor : () => {

  }
});
const drawerWidth = 240;

const  useStyles = makeStyles(theme => ({
  appBarShift: {
    marginLeft: drawerWidth,
    maxWidth: `calc(91% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: '#fff',
  },
}));

const App = (props) => {

  const [currentModule, setCurrentModule] = React.useState(props.module);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [loadingOpen, setLoadingOpen] = React.useState(false);

  const classes = useStyles();

  const [optionsInit, setOptions] = React.useState({
    designType: [],
    learningOutcomeType: [],
    learningPatternOpts: [],
    taskType: [],
    taskClassType: [],
    taskSize: [],
    taskTarget: [],
    taskResource: [],
    taskElearingResource: [],
});
const [taskTypeColorValue, setTaskTypeColorValue] = React.useState({});

const taskTypeColor = (task_type)=>{

    try{
        var color = taskTypeColorValue.find(x => x.id == task_type);
        return ({
            backgroundColor:  color.color,
            height: "100%",
            width: "12px"
        });
    }catch{
        return ({
            backgroundColor:  "#194d33",
            height: "100%"
        });
    }
}

  //#region Init Options Data

  async function fetchDesignTypeData() {

    await apiDesignTypeList().then(response => {
        setOptions(optionsInit=> ({
            ...optionsInit,
            "designType": response.data
        }))
    })
  }

  async function fetchlearningTypeTempData() {

      apiLearningOutcomeGetOutcomeType()
      .then(response => {
          setOptions(optionsInit=> ({
              ...optionsInit,
              "learningOutcomeType": response.data,
              "learningTypeTemp": response.data
          }))
      }).catch(error => console.log(error));

  }

  async function fetchlearningPatternOptsData() {
      await apiLearningTaskGetPatternOpts().then(
          response => {
              setOptions(optionsInit=> ({
                  ...optionsInit,
                  "learningPatternOpts": response.data
              }));
          }
      )
  }

  async function fetchlearningOptsData() {

      await apiOptionsList().then(response=>{
          setOptions(optionsInit=> ({
              ...optionsInit,
              "taskType": response.data.learningTasktypeOpts,
              "taskClassType": response.data.classTypeOpts,
              "taskSize": response.data.classSizeOpts,
              "taskTarget": response.data.classTargetOpts,
              "taskResource": response.data.resourceOpts,
              "taskElearingResource": response.data.elearningtoolOpts,
          }))
          setTaskTypeColorValue(response.data.learningTasktypeOpts)
          setLoadingOpen(false)
      })
      .catch(error => console.log(error));
  }



  async function InitDesignOption() {

      await fetchlearningOptsData();
      await fetchDesignTypeData();
      await fetchlearningTypeTempData();
      await fetchlearningPatternOptsData();
  }
  //#endregion

  React.useEffect(()=> {
    InitDesignOption();
  }, [])


  const displayModule = () => {
    switch (currentModule){
      default:
        // return <DesignContainer courseID= {props.value} user = {props.user} step = {props.step}/>;
        break
      case 'designstudio':
          return <DesignContainer courseID= {props.course_id} user = {props.user} step = {props.step}/>;
      case 'mydesign':
        return <MyDesign/>;
      case 'publicdesign':
        return <PublicDesign/>;
      case 'usergroup':
        return  <UsergroupContainer user = {props.user}  usergroupid = {props.usergroupid}/>
      case 'usergroups':
        return <UsergroupsListViewContainer user = {props.user}/>;
      case 'admin_dashboard':
        return <DashboardContainer />
      case 'admin_template_builder':
        return <TemplateBuilderContainer/>
      case 'admin_component_template':
        return <ComponentTemplateViewListContainer />
      case 'admin_component_template_builder':
        return <ComponentTemplateBuilderContainer component_id = {props.component_id}/>
      case 'admin_pattern_template':
        return <PatternTemplateViewListContainer />
      case 'admin_pattern_template_builder':
        return <PatternTemplateBuilderContainer pattern_id = {props.pattern_id}/>
      case 'admin_usersmanagement':
        return <UserMgmtContainer/>
    }
  }

  return (
    <AppContextStore.Provider
      value={{
        currentModule: currentModule,
        setCurrentModule: setCurrentModule,
        sideMenuOpen: sideMenuOpen,
        setSideMenuOpen: setSideMenuOpen,
        setLoadingOpen: setLoadingOpen,
        options: optionsInit,
        taskTypeColor: taskTypeColor,
      }}
    >
      <Grid container>
          <Grid item xs ={12} style = {{height: 72}}>
              <TopMenu user = {props.user}/>
          </Grid>

            <Grid item xs ={1}>
                <SideMenu user = {props.user}/>
            </Grid>
            
            <Grid xs = {11} item className={clsx(sideMenuOpen && classes.appBarShift)}>
                {displayModule()}
                {/* test */}
            </Grid>
      </Grid>

      <Backdrop className={classes.backdrop} open={loadingOpen} onClick={() => setLoadingOpen(false)}>
            <CircularProgress color="inherit" />
      </Backdrop>

    </AppContextStore.Provider>
  );
}
export default App;
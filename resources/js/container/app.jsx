
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

//#region template management
import TemplateBuilderContainer from '../admin/template_builder/container/templateBuilderContainer';
import DesignTypeBuilderContainer from '../admin/template_builder/container/designTypeBuilderContainer';
import DesignTypeViewListContainer from '../admin/template_builder/container/designTypeViewListContainer';
import ComponentTemplateViewListContainer from '../admin/template_builder/container/componentTemplateViewListContainer';
import PatternTemplateViewListContainer from '../admin/template_builder/container/patternTemplateViewListContainer';
import PatternTemplateBuilderContainer from '../admin/template_builder/container/patternTemplateBuilderContainer';
import ComponentTemplateBuilderContainer from '../admin/template_builder/container/componentTemplateBuilderContainer';
//#endregion

//#region site management related
import SiteManagementContainer from '../admin/sitemanagement/container/siteManagementContainer';
import ClassSizeOptsContainer from '../admin/sitemanagement/container/classSizeOptsContainer';
import ClassTargetOptsContainer from '../admin/sitemanagement/container/classTargetOptsContainer';
import ClassTypeOptsContainer from '../admin/sitemanagement/container/classTypeOptsContainer';
import ELearningToolsOptsContainer from '../admin/sitemanagement/container/elearningToolsOptsContainer';
import ResourceOptsContainer from '../admin/sitemanagement/container/resourceOptsContainer';
import TaskTypeOptsContainer from '../admin/sitemanagement/container/taskTypeOptsContainer';
//#endregion

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
    maxWidth: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 9999,
    color: '#fff',
  },
  normal: {
    margin: 36,
    maxWidth: `calc(100% - 72px)`,
  }
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

  const returnImgSrc = (image_url) => {
    if(typeof image_url == "string"){
      var temp = image_url;

      if( temp.substring(0, 1) == "/"){

      }else{
        temp = "/"+temp;
      }
     
      var http = new XMLHttpRequest();
  
      http.open('HEAD', temp, false);
      http.send();

      if (http.status != 404){
        return temp;
      }else{
        // image not found
        return "/asset/image/data-not-found.png";
      }
    }else{
      return "/asset/image/data-not-found.png";
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

      //#region admin_temps_management
      case 'admin_design_type_builder':
        return <DesignTypeBuilderContainer designtype_id = {props.designtype_id}/>
      case 'admin_design_type':
        return <DesignTypeViewListContainer/>
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
      //#endregion

      case 'admin_usersmanagement':
        return <UserMgmtContainer/>

      //#region admin_site_management_related
      case 'admin_site_management':
        return <SiteManagementContainer />;
      case 'admin_classsize_opts':
        return <ClassSizeOptsContainer />;
      case 'admin_classtype_opts':
        return <ClassTypeOptsContainer />;
      case 'admin_classtarget_opts':
        return <ClassTargetOptsContainer />;
      case 'admin_resource_opts':
        return <ResourceOptsContainer />;
      case 'admin_elearningtool_opts':
        return <ELearningToolsOptsContainer />;
      case 'admin_tasktype_opts':
        return <TaskTypeOptsContainer />;
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
        returnImgSrc: returnImgSrc
      }}
    >
      <Grid container>
          <Grid item xs ={12} style = {{height: 72}}>
              <TopMenu user = {props.user}/>
          </Grid>

            <Grid item style = {{width: 72}}>
                <SideMenu user = {props.user}/>
            </Grid>
            
            <Grid xs item className={clsx(sideMenuOpen && classes.appBarShift, !sideMenuOpen && classes.normal)}>
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
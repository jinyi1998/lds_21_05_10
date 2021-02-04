
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import SideMenu from '../components/sideMenu';
import TopMenu from '../components/topMenu';

import DesignContainer from './designContainer';
import MyDesignContainer from '../dashboard/container/myDesignContainer';
import PublicDesignContainer from '../dashboard/container/publicDesignContainer';
import UsergroupContainer from '../usergroup/container/usergroupContainer';
import UsergroupsListViewContainer from '../usergroup/container/usergroupsListViewContainer';
import DashboardContainer from '../admin/dashboard/container/dashboardContainer';
import UserMgmtContainer from '../admin/usersmanagement/container/usersMgmtContainer';
import TimelineContainer from '../design/timeline/src/timelineContainer'

//#region template management
import TemplateBuilderContainer from '../admin/template_builder/container/templateBuilderContainer';
import DesignTypeBuilderContainer from '../admin/template_builder/container/designTypeBuilderContainer';
import DesignTypeViewListContainer from '../admin/template_builder/container/designTypeViewListContainer';
import ComponentTemplateViewListContainer from '../admin/template_builder/container/componentTemplateViewListContainer';
import PatternTemplateViewListContainer from '../admin/template_builder/container/patternTemplateViewListContainer';
import PatternTemplateBuilderContainer from '../admin/template_builder/container/patternTemplateBuilderContainer';
import ComponentTemplateBuilderContainer from '../admin/template_builder/container/componentTemplateBuilderContainer';
import PatternBinCategoryListContainer from '../admin/template_builder/container/patternBinCategoryListContainer';
import PatternBinCategoryContainer from '../admin/template_builder/container/patternBinCategoryContainer';
import PatternBinContainer from '../admin/template_builder/container/patternBinContainer';
//#endregion

//#region site management related
import SiteManagementContainer from '../admin/sitemanagement/container/siteManagementContainer';
import ClassSizeOptsContainer from '../admin/sitemanagement/container/classSizeOptsContainer';
import ClassTargetOptsContainer from '../admin/sitemanagement/container/classTargetOptsContainer';
import ClassTypeOptsContainer from '../admin/sitemanagement/container/classTypeOptsContainer';
import ELearningToolsOptsContainer from '../admin/sitemanagement/container/elearningToolsOptsContainer';
import ResourceOptsContainer from '../admin/sitemanagement/container/resourceOptsContainer';
import TaskTypeOptsContainer from '../admin/sitemanagement/container/taskTypeOptsContainer';
import MoodleModContainer from '../admin/sitemanagement/container/moodleModContainer';
import TaxonomyCategoryContainer from '../admin/sitemanagement/container/taxonomyCategoryContainer'
//#endregion

import {
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
    margin: 24,
    maxWidth: `calc(100% - 0px)`,
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = (props) => {

  const [currentModule, setCurrentModule] = React.useState(props.module);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [loadingOpen, setLoadingOpen] = React.useState(false);
  const [ responseOpen, setResponseOpen ] = React.useState(false);
  const [ responseType, setResponseType ] = React.useState("error");
  const [ responseMsg, setResponseMsg ] = React.useState("error");

  const classes = useStyles();

  const [optionsInit, setOptions] = React.useState({
    designType: [],
    taskType: [],
    taskClassType: [],
    taskSize: [],
    taskTarget: [],
    taskResource: [],
    taskElearingResource: [],
    bloomLvlOpts: [],
    outcomeTypeOpts: [],
    STEMTypeOpts: [],
    taxonomyCategory: []
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
      if(image_url == ""){
        return "/asset/image/data-not-found.png";
      }
      
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

  const displayMsg = (type, msg) => {
    setResponseType(type);
    setResponseMsg(msg);
    setResponseOpen(true);
  }
  
  const handleClose = () => {
    setResponseOpen(false);
  }

  //#region Init Options Data

  async function fetchDesignTypeData() {

    return apiDesignTypeList().then(response => {
        // setOptions(optionsInit=> ({
        //     ...optionsInit,
        //     "designType": response.data
        // }))
        return {"designType": response.data};
    })
  }

  async function fetchlearningOptsData() {

      return apiOptionsList().then(response=>{

          setTaskTypeColorValue(response.data.learningTasktypeOpts)
          return {
            "designType": response.data.designType,
            "taskType": response.data.learningTasktypeOpts,
            "taskClassType": response.data.classTypeOpts,
            "taskSize": response.data.classSizeOpts,
            "taskTarget": response.data.classTargetOpts,
            "taskResource": response.data.resourceOpts,
            "taskElearingResource": response.data.elearningtoolOpts,
            "bloomLvlOpts": response.data.bloomLvlOpts,
            "outcomeTypeOpts": response.data.outcomeTypeOpts,
            "STEMTypeOpts": response.data.STEMTypeOpts,
            "taxonomyCategory": response.data.taxonomyCategory
          }
      })
      .catch(error => console.log(error));
  }



  async function InitDesignOption() {
    setLoadingOpen(true)
    var updates = [];
    updates.push(fetchlearningOptsData());

    Promise.all(updates).then((response)=>{
      var temp = {};
      response.map(_response => {
        Object.keys(_response).map(_key => {
          temp[_key] = _response[_key];
        })
      });
      setOptions(temp);
      setLoadingOpen(false)
    });
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
      case 'timeline':
        return  <TimelineContainer/>;
      case 'designstudio':
          return <DesignContainer courseID= {props.course_id} user = {props.user} step = {props.step}/>;
      case 'mydesign':
        return <MyDesignContainer/>;
      case 'publicdesign':
        return <PublicDesignContainer/>;
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
      case 'admin_pattern_bin_category_list':
        return < PatternBinCategoryListContainer/>;
      case 'admin_pattern_bin_category':
        return < PatternBinCategoryContainer patternbin_category_id = {props.patternbin_category_id}/>;
      case 'admin_pattern_bin':
        return < PatternBinContainer  patternbin_id = {props.patternbin_id}/>;
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
      case 'admin_moodlemod':
        return <MoodleModContainer />;
      case 'admin_taxcategory':
        return <TaxonomyCategoryContainer />;
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
        returnImgSrc: returnImgSrc,
        displayMsg: displayMsg
      }}
    >
      <Grid container>
          <Grid item xs ={12} style = {{height: 72}}>
              <TopMenu user = {props.user}/>
          </Grid>

            <Grid item>
                <SideMenu user = {props.user}/>
            </Grid>
            
            <Grid xs item className={clsx(sideMenuOpen && classes.appBarShift, !sideMenuOpen && classes.normal)}>
                {displayModule()}
            </Grid>
      </Grid>

      <Backdrop className={classes.backdrop} open={loadingOpen} onClick={() => setLoadingOpen(false)}>
            <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={responseOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={responseType}>
            {responseMsg}
        </Alert>
      </Snackbar>

    </AppContextStore.Provider>
  );
}
export default App;
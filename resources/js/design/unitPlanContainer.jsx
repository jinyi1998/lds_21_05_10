import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LessonPlan from './lesson/container/lessonPlanContainer';
import DashBoardContainer from './dashboard/dashboardContainer';

import {ContextStore} from '../container/designContainer'
import ComponentPlanContainer from './componentPlanContainer';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      padding: 0
    },
    root2:{
        height: "100%"
    },
    menu:{
      padding: 0,
      width: "100%"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  
//Start of tab Panel Compontent
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        className = {classes.root2}
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
// END of tab Panel Compontent


const UnitPlanContainer = (props)=>{
    const classes = useStyles(); 
    const [value, setValue] = React.useState(0);
    const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
  
    const handleChange = (event, mode) => {
        if(mode == 0){
          tourSetRun(false);
          tourSetMode('unit_design_component');
        }else if(mode == 1){
          tourSetRun(false);
          tourSetMode('unit_design_lesson');
        }
        setValue(mode);
    };

    React.useEffect(
     ()=>{
      if(value == 0){
        tourSetRun(false);
        tourSetMode('unit_design_component');
      }else if(value == 1){
        tourSetRun(false);
        tourSetMode('unit_design_lesson');
      }
     },[])

     
    return (
        <Grid container spacing = {3}>
            <Grid item xs = {12}>
              <AppBar position="static">
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="Component Plan" {...a11yProps(0)} />
                      <Tab label="Lesson Plan" {...a11yProps(1)} />
                      {/* <Tab label="Dashboard" {...a11yProps(2)} /> */}
                  </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                  <ComponentPlanContainer />
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <LessonPlan />
              </TabPanel>
              {/* <TabPanel value={value} index={2}>
                  <DashBoardContainer />
              </TabPanel> */}
            </Grid>
        </Grid>
       
    );
}

export default UnitPlanContainer;
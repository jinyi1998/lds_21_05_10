import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import CourseSharePublic from '../component/courseSharePublic'
import CourseShareUsergroup from '../component/courseShareUsergroup';
import CourseShareUser from '../component/courseShareUser';
import CourseSharePublicOutsideSys from '../component/courseSharePublicOutsideSys';

import {apiCourseGetPermission, apiCourseUpdatePermission} from '../../api.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
        
           </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`
    };
  }
  
  

const CourseShareContainer = (props) => {
    const {open, onClose, courseData} = props;

   
    const [permissionArr, setPermissionArr] = React.useState({
        "public_permission": [],
        "user_permission": [],
        "usergroup_permission": []
    });

    // const [permissionArr, setPermissionArr] = React.useState(props.courseData.permission);

    const [courseType, setCourseType] = React.useState(courseData.coursetype);
    const [usergroup, setUsergroup] = React.useState(props.usergroup);

    React.useEffect(()=>{
        apiCourseGetPermission(courseData.id)
        .then(response => {
            response.data['user_permission'] = response.data['user_permission'].filter(_x => _x.user_id != courseData.created_by)
            setPermissionArr(response.data)
        })
    }, [])

    React.useEffect(()=>{
        setUsergroup(props.usergroup);
    }, [props])

    const handleChangeCoursetype = (event, value) => {
        setCourseType(value)
    }
    
    const updatePermission = () => {
        let request = {
            'course_id': courseData.id,
            'permission': permissionArr
        }; 
        apiCourseUpdatePermission(request)
        .then((response) => {
            onClose();
        });
    }

    return (
        <React.Fragment>
            
            <Dialog
                open={open}
                onClose={onClose}      
            >
                <DialogTitle id="alert-dialog-title">Share Setting</DialogTitle>
                <DialogContent  style = {{minWidth: 500, minHeight: 100}}>
                    <div >
                        <Tabs
                            // orientation="vertical"
                            variant="scrollable"
                            value={courseType}
                            onChange={handleChangeCoursetype}
                            aria-label="Vertical tabs example"
                        >
                            <Tab label="Users"  value = {1} {...a11yProps(1)} />
                            <Tab label="Groups" value = {2} {...a11yProps(2)} />
                            <Tab label="Public" value = {3} {...a11yProps(3)} />
                            <Tab label="Public (WITHOUT SIGN IN LDS)" value = {4} {...a11yProps(4)} />
                        </Tabs>

                        <TabPanel value={courseType} index={1}>
                            <React.Fragment>
                                <CourseShareUser courseid= {courseData.id} permissionArr = {permissionArr} setPermissionArr = {setPermissionArr}/>
                            </React.Fragment>
                        </TabPanel>

                        <TabPanel value={courseType} index={2}>
                            <CourseShareUsergroup courseid= {courseData.id} usergroup = {usergroup} permissionArr = {permissionArr} setPermissionArr = {setPermissionArr}/>
                        </TabPanel>

                        <TabPanel value={courseType} index={3}>
                            <React.Fragment>
                                <CourseSharePublic courseid= {courseData.id} permissionArr = {permissionArr} setPermissionArr = {setPermissionArr} />
                            </React.Fragment>
                        </TabPanel>

                        <TabPanel value={courseType} index={4}>
                            <React.Fragment>
                                <CourseSharePublicOutsideSys course_id= {courseData.id} />
                            </React.Fragment>
                        </TabPanel>
                    </div>
                   
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>onClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>updatePermission()} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default CourseShareContainer;
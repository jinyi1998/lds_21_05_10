import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import UsergroupDesign from '../component/usergroupDesign';
import UsergroupMemberList from '../component/usergroupMemberList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  apiUserUsergroupGet,
  apiUserUsergroupUserTempUpdate, apiUserUsergroupUserTempDelete,
  apiUserUsergroupUserDelete
} from '../../api.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const ContextStore = React.createContext({
  user: {}
  
});


const UsergroupContainer = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [usergroup, setUsergroup] = React.useState({
    users: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //#region request related
  async function fetchUsergroupData() {
    await apiUserUsergroupGet(props.usergroupid)
    .then(response => {
      setUsergroup(response.data);
    })
    .catch(error => console.log(error));
}

async function approveUserJoinGroup(id) {

  await apiUserUsergroupUserTempUpdate({id: id})
  .then(response => {
    setUsergroup(response.data);
  })
  .catch(error => console.log(error));
}

async function declineUserJoinGroup(id) {

  await apiUserUsergroupUserTempDelete(id)
  .then(response => {
    setUsergroup(response.data);
  })
  .catch(error => console.log(error));
}


async function removeUser(id) {
  await apiUserUsergroupUserDelete(id)
  .then(response => {
    setUsergroup(response.data);
  })
  .catch(error => console.log(error));

}

removeUser
//#endregion request related

React.useEffect(()=>{
  fetchUsergroupData();
},[])

  return (
    <ContextStore.Provider
      value = {{
        user: props.user
      }}
    >
       <React.Fragment>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Design Garden" {...a11yProps(0)} />
              <Tab label="Member Management" {...a11yProps(1)} />
              {/* <Tab label="Setting" {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <UsergroupDesign usergroupid = {props.usergroupid}/>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <UsergroupMemberList 
                usergroup = {usergroup} 
                approveUserJoinGroup = {approveUserJoinGroup}
                declineUserJoinGroup = {declineUserJoinGroup}
                removeUser = {removeUser}

            />
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            Setting
          </TabPanel> */}
      </React.Fragment>

    </ContextStore.Provider>
   
    

  );
}

export default UsergroupContainer;

if (document.getElementById('usergroup')) {
    ReactDOM.render(<UsergroupContainer 
        user = {document.getElementById('usergroup').dataset.user}  
        usergroupid = {document.getElementById('usergroup').dataset.usergroupid}
    />, document.getElementById('usergroup'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import GroupIcon from '@material-ui/icons/Group';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import BuildIcon from '@material-ui/icons/Build';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import {AppContextStore} from '../container/app';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  toolbar: {
    paddingRight: 0, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

 const SideMenu = (props) => {


  const user = JSON.parse(props.user);
  const { currentModule, sideMenuOpen, setSideMenuOpen } = React.useContext(AppContextStore);

  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    window.location.href = "/"+index;
  };

  const highlightModule = () => {
    switch (currentModule){
      default:
        console.log(currentModule);
        return "";

      case 'mydesign':
      case 'designstudio':
        return 'mydesign';

      case 'publicdesign':
        return 'publicdesign';

      case 'usergroups':
        return 'usergroups';

      case 'admin_dashboard':
        return 'admin_dashboard';

      case 'admin_usersmanagement':
        return 'admin_usersmanagement';

      case 'admin_template_builder':
      case 'admin_design_type_builder':
      case 'admin_design_type':
      case 'admin_template_builder':
      case 'admin_component_template':
      case 'admin_component_template_builder':
      case 'admin_pattern_template':
      case 'admin_pattern_template_builder':
      case 'admin_pattern_bin_category_list':
      case 'admin_pattern_bin_category':
      case 'admin_pattern_bin': 
        return 'admin_template_builder';

      case 'admin_site_management':
      case 'admin_classsize_opts':
      case 'admin_classtype_opts':
      case 'admin_classtarget_opts':
      case 'admin_resource_opts':
      case 'admin_elearningtool_opts':
      case 'admin_tasktype_opts':
      case 'admin_moodlemod':
        return 'admin_site_management';
    }
  }

  const displayAdminMenu = () => {
    if(user.is_admin){
      return (
        <React.Fragment>
           <Divider variant="middle" />
          <ListSubheader color = "primary"> 
            <Typography variant="caption" display="block" noWrap = {false}><b>Admin</b></Typography>
          </ListSubheader>
            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/dashboard')} 
              selected={highlightModule() == 'admin_dashboard'} 
            >
                <ListItemIcon>
                    <LineStyleIcon />
                </ListItemIcon>
                <ListItemText primary= "Dashboard" />
            </ListItem>

            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/usersmanagement')} 
              selected={highlightModule() == 'admin_usersmanagement'} 
            >
              <ListItemIcon>
                  <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>

            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/template_builder')} 
              selected={highlightModule() == 'admin_template_builder'} 
            >
              <ListItemIcon>
                  <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Template Builder" />
            </ListItem>


            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/sitemanagement')} 
              selected={highlightModule() == 'admin_site_management'} 
            >
              <ListItemIcon>
                  <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Site Management" />
            </ListItem>


        </React.Fragment>
      );
    }else{
      return null;
    }
  }

  return (
      <React.Fragment>
      {
        sideMenuOpen?
          <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !sideMenuOpen && classes.drawerPaperClose),
          }}
          open={sideMenuOpen}
          style = {{position: "sticky", top: "72px"}}
      >
          <div className={classes.toolbarIcon}>
              <IconButton onClick={() => {setSideMenuOpen(!sideMenuOpen)}}>
                  <ChevronLeftIcon />
              </IconButton>
          </div>

          <Divider />

          <List>
              <div>
                  <ListItem button  
                          onClick={event => handleListItemClick(event, 'mydesign')} 
                          selected={highlightModule() == 'mydesign'} 
                          >
                      <ListItemIcon>
                          <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="My Design" />
                  </ListItem>
                  <ListItem button
                          onClick={event => handleListItemClick(event, 'publicdesign')} 
                          selected={highlightModule() == 'publicdesign'}
                          >
                      <ListItemIcon>
                          <ShoppingCartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Public Design" />
                  </ListItem>

                  <ListItem button
                          onClick={event => handleListItemClick(event, 'usergroups')} 
                          selected={highlightModule() == 'usergroups'}
                          >
                      <ListItemIcon>
                          <GroupIcon />
                      </ListItemIcon>
                      <ListItemText primary="User Groups" />
                  </ListItem>
              </div>

              {displayAdminMenu()}
          </List>
          <Divider />
      </Drawer>
      :
      null
      }  
       
      </React.Fragment>
    )
}
export default SideMenu;

if (document.getElementById('sidemenu')) {
  ReactDOM.render(<SideMenu/>, document.getElementById('sidemenu'));
}
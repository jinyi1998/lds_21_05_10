
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
import { parseJSON } from 'jquery';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
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
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

 const SideMenu = (props) => {


  const user = parseJSON(props.user);
  const { currentModule, sideMenuOpen, setSideMenuOpen } = React.useContext(AppContextStore);

  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    window.location.href = "/"+index;
  };

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
              selected={currentModule == 'admin_dashboard'} 
            >
                <ListItemIcon>
                    <LineStyleIcon />
                </ListItemIcon>
                <ListItemText primary= "Dashboard" />
            </ListItem>
            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/usersmanagement')} 
              selected={currentModule == 'admin_usersmanagement'} 
            >
              <ListItemIcon>
                  <PermContactCalendarIcon />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem button  
              onClick={event => handleListItemClick(event, 'admin/template_builder')} 
              selected={currentModule == 'admin_template_builder'} 
            >
              <ListItemIcon>
                  <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Template Builder" />
            </ListItem>

        </React.Fragment>
      );
    }else{
      return null;
    }
  }

  return (
      <React.Fragment>
    
        <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !sideMenuOpen && classes.drawerPaperClose),
            }}
            open={sideMenuOpen}
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
                            selected={currentModule == 'mydesign'} 
                            >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Design" />
                    </ListItem>
                    <ListItem button
                            onClick={event => handleListItemClick(event, 'publicdesign')} 
                            selected={currentModule == 'publicdesign'}
                            >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Public Design" />
                    </ListItem>

                    <ListItem button
                            onClick={event => handleListItemClick(event, 'usergroups')} 
                            selected={currentModule == 'usergroups'}
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
      </React.Fragment>
    )
}
export default SideMenu;

if (document.getElementById('sidemenu')) {
  ReactDOM.render(<SideMenu/>, document.getElementById('sidemenu'));
}
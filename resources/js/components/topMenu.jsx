
import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ToolMenu from './toolMenu';

import {AppContextStore} from '../container/app';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

 const TopMenu = (props) => {

  const classes = useStyles();
  const user = JSON.parse(props.user);

  const { currentModule, sideMenuOpen, setSideMenuOpen } = React.useContext(AppContextStore);

  return (
      <React.Fragment>
        <CssBaseline />
        
        <AppBar className={clsx(classes.appBar, sideMenuOpen && classes.appBarShift)}  id = "top_menu">
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={()=> {setSideMenuOpen(!sideMenuOpen)}}
                className={clsx(classes.menuButton, sideMenuOpen && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  Learning Design Studio
              </Typography>
              <ToolMenu user ={user}/>
            </Toolbar>
        </AppBar>

      </React.Fragment>
    )
}
export default TopMenu;

if (document.getElementById('topmenu')) {
  ReactDOM.render(<TopMenu value={document.getElementById('topmenu').dataset.user} />, document.getElementById('topmenu'));
}
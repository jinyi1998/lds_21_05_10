
import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import MyDesign from '../dashboard/myDesign';
import PublicDesign from '../dashboard/publicDesign';
import Design from '../container/design';
import ToolMenu from './toolMenu';
import DesignContainer from './designContainer';


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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

 const AppContainer = (props) => {

  const classes = useStyles();

  // general menu
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedIndex, setSelectedIndex] = React.useState('myDesign');
  React.useEffect(()=>{
    if(props.firstLogin){
      setSelectedIndex('design');
    }else{

    }
  },
  [])

  const [courseID, setCourseID] = React.useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const displayContent = () =>{
      switch (selectedIndex){
        default:
        case 'myDesign':
          return <MyDesign handleListItemClick = {handleListItemClick} setCourseID = {setCourseID}/>;
          break;
        case 'publicDesign':
          return <PublicDesign handleListItemClick = {handleListItemClick} setCourseID = {setCourseID}/>;
          break;
        case 'design':
          return <DesignContainer courseID = {courseID}/>;
          break;
      }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Learning Design Studio
          </Typography>
          <ToolMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            <div>
                <ListItem button  
                          onClick={event => handleListItemClick(event, 'myDesign')} 
                          selected={selectedIndex == 'myDesign'} >
                  <ListItemIcon>
                      <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Design" />
                </ListItem>
                <ListItem button
                          onClick={event => handleListItemClick(event, 'publicDesign')} 
                          selected={selectedIndex == 'publicDesign'}>
                  <ListItemIcon>
                      <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Public Design" />
                </ListItem>
            </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
               {displayContent()}
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* user menu dialog */}
    </div>
  );
}
export default AppContainer;

if (document.getElementById('dashboard')) {
    ReactDOM.render(<AppContainer firstLogin = {false}/>, document.getElementById('dashboard'));
}
if (document.getElementById('dashboard2')) {
  ReactDOM.render(<AppContainer firstLogin = {true}/>, document.getElementById('dashboard2'));
}

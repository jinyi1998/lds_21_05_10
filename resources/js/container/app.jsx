
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

export const AppContextStore = React.createContext({

});
const drawerWidth = 240;

const  useStyles = makeStyles(theme => ({
  appBarShift: {
    marginLeft: drawerWidth,
    maxWidth: `calc(83% - ${drawerWidth}px)`,
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

  const displayModule = () => {
    switch (currentModule){
      default:
        // return <DesignContainer courseID= {props.value} user = {props.user} step = {props.step}/>;
        break
      case 'designstudio':
          return <DesignContainer courseID= {props.value} user = {props.user} step = {props.step}/>;
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
        setLoadingOpen: setLoadingOpen
      }}
    >
      <Grid container>
          <Grid item xs ={12} style = {{height: 72}}>
              <TopMenu user = {props.user}/>
          </Grid>

            <Grid item xs ={1}>
                <SideMenu user = {props.user}/>
            </Grid>
            
            <Grid item xs ={10} className={clsx(sideMenuOpen && classes.appBarShift)}>
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
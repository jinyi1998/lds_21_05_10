import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import BuildIcon from '@material-ui/icons/Build';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PollIcon from '@material-ui/icons/Poll';
import GetAppIcon from '@material-ui/icons/GetApp';
import {ContextStore} from '../container/designContainer';
import {apiFileCourseExport, apiFileCourseDownload} from '../api.js';
// import {}

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const actions = [
//   { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <ImportExportIcon />, name: 'Export Json', action: 'export'},
  { icon: <PrintIcon />, name: 'Print', action: 'print' },
  { icon: <LaptopMacIcon />, name: "DesignStudio", action: "designstudio"},
  { icon: <PollIcon/>, name: 'Dashboard', action: 'dashboard'}
//   { icon: <ShareIcon />, name: 'Share', action: 'share' },
//   { icon: <FavoriteIcon />, name: 'Like' },
];

export default function ActionTool() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { course, activeStage, setActiveStage, setActivePage } = React.useContext(ContextStore);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const handleOnClickAction = (action) => {
    switch(action){
        default:
            break;
        case 'export':
            apiFileCourseExport(course.id)
            .then(response => {
              window.open('/file/downloadCourseJson/'+response.data, '_blank');         
            });
            break;
        case 'print':
            window.open('/printpdf/'+course.id, '_blank');         
            break;
        case 'share':
            break;
        case 'designstudio':
            setActiveStage('designStage');
            setActivePage('componentPlan');
            break;
        case 'dashboard':
            setActiveStage('dashboard');
            // setActivePage('dashboard');
            break;
    }
  }

  return (
    <SpeedDial
        ariaLabel="action tool"
        className={classes.speedDial}
        icon={<BuildIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction= "up"
    >
        {actions.map((action) => {

          switch(action.action){
            default:
              return(
                <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleOnClickAction(action.action)}
                />
              )
            case 'export':
            case 'print':
              if(course.permission > 1){
                return(
                  <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleOnClickAction(action.action)}
                  />
                )
              }else{
                return null;
              }
            case 'designstudio':
              if(!(activeStage == "dashboard")){
                return null;
              }else{
                return(
                  <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleOnClickAction(action.action)}
                  />
                )
              }
            case 'dashboard':
              if(activeStage == "dashboard"){
                return null;
              }else{
                return(
                  <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={() => handleOnClickAction(action.action)}
                  />
                )
              }
          }
        
        })}
    </SpeedDial>
  );
}
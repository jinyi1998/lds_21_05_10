import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { red } from '@material-ui/core/colors';
import DesignTypeBox from './approachTypeBox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {ContextStore} from '../container/designContainer'

const useStyles = makeStyles(theme => ({

    gridList: {
      display: 'flex',
      justifyContent: 'center',
      // overflow: 'scroll',
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));



const DesignType = (props) => {
  const classes = useStyles();
  // const [designType, setDesignType] = React.useState([]); 
  const { course, options, dispatch } = React.useContext(ContextStore);
  const designType = options.designType? options.designType : [];
  const {handleNext} = props;
  const [open, setOpen] = React.useState(false);
  const [warningType, setWarningType] =  React.useState('match');
  const [value, setValue] = React.useState(-1);


  const displayWarningDialog = () => {
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Warning!!!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {warningType == "match"?
           "Detected you have selected the same design before. Are you going to re-initalize the all outcomes/ components/ lessons data?"
           :
           "Detected you select a different design. The system will re-initalize all of the outcomes/ components/ lessons data. Are you sure to continue"
           }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          {warningType == "match"?
            <React.Fragment>
               <Button onClick={()=>{setOpen(false); handleNext()}} color="primary">
                  Skip Data re-initalize
              </Button>
              <Button onClick={()=>{onDispatch(); setOpen(false);}} color="primary">
                  Continue with Data re-initalize
              </Button>
            </React.Fragment>
           
            :
            null
          }
           {warningType == "different"?
            <React.Fragment>
                <Button onClick={()=>setOpen(false)} color="primary">
                  Cancel
              </Button>
              <Button onClick={()=>{onDispatch(); setOpen(false);}} color="primary">
                  Continue
              </Button>
            </React.Fragment>
            :
            null
          }
        </DialogActions>
      </Dialog>
    )
  }


  // async function fetchDesignTypeData() {

  //   const res = await fetch(
  //       'http://'+config.get('url')+'/api/course/getDesignTypeTemp',
  //       {
  //       method: "GET",
  //       }
  //   )
  //       .then(res => res.json())
  //       .then(response => {
  //         setDesignType(response);
  //   })
  //   .catch(error => console.log(error));

  // }

  // React.useEffect(() => {
  //   fetchDesignTypeData();
  // }, []);

  const onClick = (event, design_type) => {
      // event.preventDefault();

      if(course.components.length == 0){
          dispatch({
            type: "DESIGN_TYPE",
            value: design_type
          });
      }else{
        if(design_type == course.design_type_id){
          setWarningType('match');
          setValue(design_type);
          setOpen(true);
        }else{
          setWarningType('different');
          setValue(design_type);
          setOpen(true);
        }
      }
      // dispatch({
      //   type: "DESIGN_TYPE",
      //   value: value
      // });
  };

  const onDispatch = () => {
    dispatch({
      type: "DESIGN_TYPE",
      value: value
    });
  }




  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose the disciplinary practice for your STEM curriculum unit
      </Typography>
      <GridList className={classes.gridList} cols={4}>
          {designType.map((_data, i) => (
            <DesignTypeBox designBoxData={_data} key={i} onClick={onClick}>
            </DesignTypeBox>
          ))}
      </GridList>

      {displayWarningDialog()}
    </React.Fragment>
  );
}

export default DesignType;
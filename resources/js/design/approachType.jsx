import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import DesignTypeBox from './approachTypeBox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import DesignTypeInstruction from './designTypeInstruction';

import QuestionHint from '../components/questionHint';
import {ContextStore} from '../container/designContainer';

const useStyles = makeStyles(theme => ({

  gridList: {
    minHeight: 450,
    margin: 10,
    flexWrap: 'nowrap',
  }
}));



const DesignType = (props) => {
  const classes = useStyles();
  // const [designType, setDesignType] = React.useState([]); 
  const { course, options, dispatch } = React.useContext(ContextStore);
  const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
  const designType = options.designType? options.designType : [];
  const {handleNext} = props;
  const [open, setOpen] = React.useState(false);
  const [instructionID, setInstructionID] = React.useState(1);
  const [instructionOpen, setInstructionOpen] = React.useState(false);
  const [warningType, setWarningType] =  React.useState('match');
  const [value, setValue] = React.useState(-1);

  React.useEffect(()=> {
    tourSetRun(false);
    tourSetMode('design_type');
  }, [])

  const onClickMore = (id) => {
    setInstructionID(id);
    setInstructionOpen(true);
  }

  const displayInstructionDialog = () => {
    return (
      <Dialog
        open={instructionOpen}
        onClose={()=>setInstructionOpen(false)}
        fullWidth={false}
        maxWidth = "xl"
        BackdropProps={{
          backgroundColor: "transparent"
         }
        }
        PaperProps ={{
          backgroundColor: "transparent"
        }}
      >
        <DesignTypeInstruction design_type_id = {instructionID} />
      </Dialog>
    )
  }

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
  };

  const onDispatch = () => {
    dispatch({
      type: "DESIGN_TYPE",
      value: value
    });
  }


  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs = {12}>
          <Typography variant="h6" gutterBottom>
            Choose the disciplinary practice for your STEM curriculum unit
            <QuestionHint title = {<div>
              "The aim of STEM education is to equip students with knowledge and skills in the four STEM disciplines, for example, scientific inquiry, application of technological knowledge, design thinking, logical thinking, and so on. 
              <br/>
              In order to strengthen students’ ability to integrate knowledge and experiences like the experts in the fields of STEM, the learning design needs to provide students with opportunities to experience an authentic practice format in STEM areas.
              <br/>
              There are two authentic practice formats in STEM, engineering design and scientific investigation. 
              <br/>
              “Engineering design” refers to STEM lessons that provide students with opportunities to construct some products, while “Scientific investigation” refers to lessons in which students design and conduct a scientific investigation to address a scientific problem. We refers to these two authentic practice formats in STEM as disciplinary practice." 
            </div>}/>
          </Typography>
        </Grid>
        <Grid item xs = {12}>
          <GridList className={classes.gridList}>
            {designType.map((_data, i) => (
                <DesignTypeBox designBoxData={_data} key={i} onClick={onClick} onClickMore = {onClickMore}>
                </DesignTypeBox>
            ))}
          </GridList>
        </Grid>
        {displayInstructionDialog()}
        {displayWarningDialog()}
      </Grid>
     
    
      {/* <GridList className={classes.gridList} cols={4} data-tour = "designtype_list">
          {designType.map((_data, i) => (
            <DesignTypeBox designBoxData={_data} key={i} onClick={onClick} onClickMore = {onClickMore}>
            </DesignTypeBox>
          ))}
      </GridList> */}
     
  
    </React.Fragment>
  );
}

export default DesignType;
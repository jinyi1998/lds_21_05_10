import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import CancelIcon from '@material-ui/icons/Cancel';

import StemPractice from '../component/stemPractice';
import StemPracticeInstruction from '../component/stemPracticeInstruction';

import QuestionHint from '../../../components/questionHint';
import {ContextStore} from '../../../container/designContainer';
import {AppContextStore} from '../../../container/app';

const useStyles = makeStyles(theme => ({

  gridList: {
    minHeight: 450,
    // margin: 10,
    flexWrap: 'nowrap',
  }
}));



const StemPracticeContainer = (props) => {
  const classes = useStyles();
  // const [designType, setDesignType] = React.useState([]); 
  const { course, dispatch } = React.useContext(ContextStore);
  const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
  const {options} = React.useContext(AppContextStore);
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
        <Grid container justify = "flex-end">
          <IconButton onClick = {()=>setInstructionOpen(false)} edge = "start">
            <CancelIcon />
          </IconButton>
        </Grid>
        
        <StemPracticeInstruction design_type_id = {instructionID} onSelectSTEMPractice = {onSelectSTEMPractice}/>
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
           "Detected you have selected the same design before. Are you going to re-initalize the all outcomes data?"
           :
           "Detected you select a different design. The system will re-initalize all of the outcomes data. Are you sure to continue"
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

  const onSelectSTEMPractice = (design_type_id) => {
      // event.preventDefault();

      if(course.outcomes.length == 0){
          dispatch({
            type: "DESIGN_TYPE",
            value: design_type_id
          });
      }else{
        if(design_type_id == course.design_type_id){
          setWarningType('match');
          setValue(design_type_id);
          setOpen(true);
        }else{
          setWarningType('different');
          setValue(design_type_id);
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
            What do you want your students to become? 
            <QuestionHint title = {<div>
              By answering this question, we hope that you will have a preliminary idea of what opportunities to provide for students to solve in a real-world scenario, and what to do to equip them with relevant knowledge and skills in the fields of STEM. 
              <br />
              We usually adopt two practices “engineering design” and “scientific investigation” as the disciplinary practices to engage learners in STEM. 

            </div>}/>
          </Typography>
        </Grid>
        <Grid item xs = {12}>
          <GridList className={classes.gridList}>
            {designType.map((_data, i) => (
                <StemPractice designBoxData={_data} key={i} onSelectSTEMPractice={onSelectSTEMPractice} onClickMore = {onClickMore} />
            ))}
          </GridList>
        </Grid>
        {displayInstructionDialog()}
        {displayWarningDialog()}
      </Grid>
    </React.Fragment>
  );
}

export default StemPracticeContainer;
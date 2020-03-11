import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ContextStore} from '../container/designContainer'
import validator from 'validator';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const DesignInfo = (props) => {

  const classes = useStyles();
  const { course, options, dispatch } = React.useContext(ContextStore);

  const [courseData, setCourseData] = React.useState(course);
  const [error, setError] = React.useState({
    "unitTitle": "",
    "schoolName": "",
    "level": "",
    "noOfLessons": "",
    "courseDes": "",
  });
  
  const validate = () => {
    var validated = true;
    var tempError = {
      "unitTitle": "",
      "schoolName": "",
      "level": "",
      "noOfLessons": "",
      "courseDes": "",
    }

    if(validator.isEmpty(courseData.unitTitle.toString())){
      tempError["unitTitle"] = "Please enter the course unit title";
      // setError({...error, unitTitle: "Please enter the course unit title"})
      validated = false;
    }

    if(validator.isEmpty(courseData.schoolName.toString())){
      tempError["schoolName"] = "Please enter the school name";
      // setError({...error, schoolName: "Please enter the school name"})
      validated = false;
    }

    if(validator.isEmpty(courseData.level.toString())){
      tempError["level"] = "Please enter the course level";
      // setError({...error, level: "Please enter the course level"})
      validated = false;
    }

    if(!validator.isInt(courseData.noOfLessons.toString(), {min: 1, max: 100})){
       tempError["noOfLessons"] = "Please enter the number of lessons between 1 and 100";
       setError({...error, noOfLessons: "error"})
       validated = false;
    }

    if(validator.isEmpty(courseData.courseDes.toString())){
      tempError["courseDes"] = "Please enter the course description";
      // setError({...error, courseDes: "Please enter the course description"})
      validated = false;
    }

    setError(tempError);
    return validated;
  }

  const onChange = (event) => {


    setCourseData( {...courseData, [event.target.id]: event.target.value} 
    );

    // handleUpdate(event.target.name, event.target.value);
    // dispatch({
    //   type: event.target.name,
    //   value: event.target.value
    // });
  }

  const onNext = () => {
    if(validate()){
      dispatch({
        type: "UNIT_TITLE",
        value: courseData.unitTitle
      });
  
      dispatch({
        type: "SCHOOL_NAME",
        value: courseData.schoolName
      });
  
      dispatch({
        type: "LEVEL",
        value: courseData.level
      });
  
      dispatch({
        type: "NO_OF_LESSON",
        value: courseData.noOfLessons
      });
  
      dispatch({
        type: "COURSE_DES",
        value: courseData.courseDes
      });
  
      handleNext();
    }
    
  }

  const {handleNext, handleBack} =  props;

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
          Design type: STEM ({options.designType.find(x => x.id== course.designType)?.name})
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          <TextField  
          id="unitTitle" 
          name="UNIT_TITLE" 
          label="Unit Title" 
          value = {courseData.unitTitle}
          error = {! (error["unitTitle"]=="")}
          helperText= {! (error["unitTitle"]=="")? error["unitTitle"]:  ""}
          fullWidth 
          onChange={onChange}/>
        </Grid>

        <Grid item xs={6} md={6}>
          <TextField 
          id="schoolName" 
          name="SCHOOL_NAME"
          value = {courseData.schoolName} 
          label="School Name"  
          error = {! (error["schoolName"]=="")}
          helperText= {! (error["schoolName"]=="")? error["schoolName"]:  ""}
          fullWidth 
          onChange={onChange}/>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField 
            id="level" 
            name="LEVEL" 
            label="Level" 
            value = {courseData.level}
            error = {! (error["level"]=="")}
            helperText= {! (error["level"]=="")? error["level"]:  ""}
            fullWidth 
            onChange={onChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField 
            id="noOfLessons" 
            name="NO_OF_LESSON" 
            label="No. Of Lesson" 
            type="number"
            value = {courseData.noOfLessons}
            error = {! (error["noOfLessons"]=="")}
            helperText= {! (error["noOfLessons"]=="")? error["noOfLessons"]:  ""}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">lesson(s)</InputAdornment>}}
            onChange={onChange} />
        </Grid>

        
        <Grid item xs={12} md={12}>
          <TextField 
            id="courseDes" 
            name="COURSE_DES" 
            value = {courseData.courseDes} 
            label="Course Description" 
            multiline
            error = {! (error["courseDes"]=="")}
            helperText= {! (error["courseDes"]=="")? error["courseDes"]:  ""}
            fullWidth 
            rows={5}
            onChange={onChange}/>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
          <Button onClick={handleBack}>
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => onNext()}
          >
            Next
          </Button>
      </div>
    </React.Fragment>
  );
}

export default DesignInfo;
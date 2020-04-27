import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ContextStore} from '../container/designContainer'
import config from 'react-global-configuration';
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
  const { course, options, dispatch, setLoadingOpen } = React.useContext(ContextStore);

  const [ courseData, setCourseData ] = React.useState(course);
  const [ lesson_time, setLessonTime ] = React.useState(0);

  const [error, setError] = React.useState({
    "unit_title": "",
    "level": "",
    "no_of_lesson": "",
    "description": "",
    "lesson_time": "",
  });
  
  const validate = () => {
    var validated = true;
    var tempError = {
      "unit_title": "",
      "level": "",
      "no_of_lesson": "",
      "description": "",
      "lesson_time": "",
    }

    if(validator.isEmpty(courseData.unit_title.toString())){
      tempError["unit_title"] = "Please enter the course unit title";
      // setError({...error, unitTitle: "Please enter the course unit title"})
      validated = false;
    }

    // if(validator.isEmpty(courseData.schoolName.toString())){
    //   tempError["schoolName"] = "Please enter the school name";
    //   // setError({...error, schoolName: "Please enter the school name"})
    //   validated = false;
    // }

    if(validator.isEmpty(courseData.level.toString())){
      tempError["level"] = "Please enter the course level";
      // setError({...error, level: "Please enter the course level"})
      validated = false;
    }

    if(!validator.isInt(courseData.no_of_lesson.toString(), {min: 1, max: 100})){
       tempError["no_of_lesson"] = "Please enter the number of lessons between 1 and 100";
      //  setError({...error, no_of_lesson: "error"})
       validated = false;
    }

    if(!validator.isInt(lesson_time.toString(), {min: 0, max: 120})){
      tempError["lesson_time"] = "Please enter the time of lessons between 1 and 12-";
     //  setError({...error, no_of_lesson: "error"})
      validated = false;
   }

    if(validator.isEmpty(courseData.description.toString())){
      tempError["description"] = "Please enter the course description";
      // setError({...error, courseDes: "Please enter the course description"})
      validated = false;
    }

    setError(tempError);
    return validated;
  }

  const onChange = (event) => {
    if(event.target.id == "lesson_time"){
      setLessonTime(event.target.value);
    }
    else{
      setCourseData( {...courseData, [event.target.id]: event.target.value});
    }   
  }

  const onNext = () => {
    if(validate()){
      // dispatch({
      //   type: "UNIT_TITLE",
      //   value: courseData.unitTitle
      // });
  
      // dispatch({
      //   type: "SCHOOL_NAME",
      //   value: courseData.schoolName
      // });
  
      // dispatch({
      //   type: "LEVEL",
      //   value: courseData.level
      // });
  
      // dispatch({
      //   type: "NO_OF_LESSON",
      //   value: courseData.noOfLessons
      // });
  
      // dispatch({
      //   type: "COURSE_DES",
      //   value: courseData.courseDes
      // });
      updateCourse();
  
      handleNext();
    }
  }

  async function updateCourse() {
    setLoadingOpen(true)
    var course_json = {
      course_id: course.id,
    }
    await fetch(
      'http://'+config.get('url')+'/api/course/clearCourseLesson',
      {
        method: "POST",
        body:  JSON.stringify(course_json),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )

    for(var i = 0; i<courseData.no_of_lesson; i++){
      var lessonjson = {
        "time": lesson_time,
        "title": 'Lesson' + (i+1),
        "sequence": i + 1,
        "course_id": course.id,
      };
      await fetch(
        'http://'+config.get('url')+'/api/lesson',
        {
          method: "POST",
          body:  JSON.stringify(lessonjson),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      )
          .then(res => res.json())
          .then(response => {
              setLoadingOpen(false)
      })
      .catch(error => console.log(error));
    }
    

    var json = {
        "unit_title": courseData.unit_title,
        "level": courseData.level,
        "no_of_lesson": courseData.no_of_lesson,
        "description": courseData.description,
    };
    const res = await fetch(
        'http://'+config.get('url')+'/api/course/'+ course.id,
        {
          method: "PUT",
          body:  JSON.stringify(json),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
    )
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: "INIT_COURSE",
                value: response
            })
            setLoadingOpen(false)
    })
    .catch(error => console.log(error));
}

  const {handleNext, handleBack} =  props;

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
          Design type: STEM ({options.designType.find(x => x.id== course.design_type_id)?.name})
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <TextField  
          id="unit_title" 
          name="unit_title" 
          label="Unit Title" 
          value = {courseData.unit_title}
          error = {! (error["unit_title"]=="")}
          helperText= {! (error["unit_title"]=="")? error["unit_title"]:  ""}
          fullWidth 
          onChange={onChange}/>
        </Grid>

        {/* <Grid item xs={6} md={6}>
          <TextField 
          id="schoolName" 
          name="SCHOOL_NAME"
          value = {courseData.schoolName} 
          label="School Name"  
          error = {! (error["schoolName"]=="")}
          helperText= {! (error["schoolName"]=="")? error["schoolName"]:  ""}
          fullWidth 
          onChange={onChange}/>
        </Grid> */}
        
        <Grid item xs={12} md={6}>
          <TextField 
            id="level" 
            name="level" 
            label="Level" 
            value = {courseData.level}
            error = {! (error["level"]=="")}
            helperText= {! (error["level"]=="")? error["level"]:  ""}
            fullWidth 
            onChange={onChange} />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <TextField 
            id="lesson_time" 
            name="lesson_time" 
            label="Time per lesson" 
            type="number"
            value = {lesson_time}
            error = {! (error["lesson_time"]=="")}
            helperText= {! (error["lesson_time"]=="")? error["lesson_time"]:  ""}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">min(s)</InputAdornment>}}
            onChange={onChange} />
        </Grid> */}

        <Grid item xs={12} md={6}>
          <TextField 
            id="no_of_lesson" 
            name="no_of_lesson" 
            label="No. Of Lesson" 
            type="number"
            value = {courseData.no_of_lesson}
            error = {! (error["no_of_lesson"]=="")}
            helperText= {! (error["no_of_lesson"]=="")? error["no_of_lesson"]:  ""}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">lesson(s)</InputAdornment>}}
            onChange={onChange} />
        </Grid>

        
        <Grid item xs={12} md={12}>
          <TextField 
            id="description" 
            name="description" 
            value = {courseData.description} 
            label="Course Description" 
            multiline
            error = {! (error["description"]=="")}
            helperText= {! (error["description"]=="")? error["description"]:  ""}
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
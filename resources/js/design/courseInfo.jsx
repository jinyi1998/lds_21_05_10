import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import validator from 'validator';
import ChipInput from 'material-ui-chip-input'
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import QuestionHint from '../components/questionHint';

import {ContextStore} from '../container/designContainer';
import {AppContextStore} from '../container/app';
import {
  apiLessonDelete, apiLessonCreate, apiLessonUpdate,
  apiCourseUpdate, apiCourseClearLesson
} 
from '../api.js';

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
  const { course, dispatch } = React.useContext(ContextStore);
  const { setLoadingOpen, options} = React.useContext(AppContextStore);
  const { tourSetMode, tourSetRun, tourNextStep } = React.useContext(ContextStore);
  React.useEffect(()=> {
    tourSetRun(false);
    tourSetMode('course_info');
  }  
  , [])

  const [ courseData, setCourseData ] = React.useState(course);
  const [ tags, setTags ] = React.useState(course.tags.map( _tag => _tag.name));
  const [ lesson_time, setLessonTime ] = React.useState(0);
  const [ lessonWarning, setLessonWarning ] = React.useState(false);
  const [ showMore, setShowMore ] = React.useState(false)
  const [error, setError] = React.useState({
    "unit_title": "",
    "level": "",
    "subject": "",
    "no_of_lesson": "",
    "description": "",
    "lesson_time": "",
  });
  
  React.useEffect(()=>{
    if(courseData.lessons.length> 0){
      setLessonTime(courseData.lessons[0].time)
    }
  }, [courseData.lessons])

  const validate = () => {
    var validated = true;
    var tempError = {
      "unit_title": "",
      "subject": "",
      "level": "",
      "no_of_lesson": "",
      "description": "",
      "lesson_time": "",
    }

    if(validator.isEmpty(courseData.unit_title.toString())){
      tempError["unit_title"] = "Please enter the course topic";
      // setError({...error, unitTitle: "Please enter the course unit title"})
      validated = false;
    }

    // if(validator.isEmpty(courseData.schoolName.toString())){
    //   tempError["schoolName"] = "Please enter the school name";
    //   // setError({...error, schoolName: "Please enter the school name"})
    //   validated = false;
    // }

    if(validator.isEmpty(courseData.level.toString())){
      tempError["level"] = "Please enter the grade";
      // setError({...error, level: "Please enter the course level"})
      validated = false;
    }

    if(!validator.isInt(parseInt(courseData.no_of_lesson).toString(), {min: 1, max: 100})){
       tempError["no_of_lesson"] = "Please enter the number of lessons between 1 and 100";
      //  setError({...error, no_of_lesson: "error"})
       validated = false;
    }

    if(!validator.isInt(lesson_time.toString(), {min: 0, max: 240})){
      tempError["lesson_time"] = "Please enter the time of lessons between 1 and 240";
     //  setError({...error, no_of_lesson: "error"})
      validated = false;
   }

    // if(validator.isEmpty(courseData.description.toString())){
    //   tempError["description"] = "Please enter the course description";
    //   // setError({...error, courseDes: "Please enter the course description"})
    //   validated = false;
    // }

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
      if(courseData.permission > 2){
        updateCourse();
      }
      
      handleNext();
    }
  }

  const onSave = () => {
    
    if(parseInt(course.no_of_lesson) > parseInt(courseData.no_of_lesson)){
      setLessonWarning(true);
    }else{
      if(validate()){
        if(courseData.permission > 2){
          updateCourse();
        }
      }
    }
  }

  const onConfirm = () =>{
    if(validate()){
      updateCourse();
      setLessonWarning(false);
    }
  }

  async function updateCourse() {

    setLoadingOpen(true)

    if(course.lessons.length > 0){
      // already init-ed the lesson
      if(parseInt(course.no_of_lesson) > parseInt(courseData.no_of_lesson)){
        //del lesson
        for(var i = parseInt(courseData.no_of_lesson); i < parseInt(course.no_of_lesson); i++){
        
          await apiLessonDelete(course.lessons[i].id).then(response => {
            setLoadingOpen(false)
          })
          .catch(error => console.log(error));
        }

      }else if(parseInt(course.no_of_lesson) < parseInt(courseData.no_of_lesson)){
        //add new lesson 
        for(var i = parseInt(course.no_of_lesson); i < parseInt(courseData.no_of_lesson); i++){
          let int_i = parseInt(i);

          await apiLessonCreate( {
            "time": lesson_time,
            "title": 'Lesson' + (int_i + 1),
            "sequence": int_i + 1,
            "course_id": course.id,
          })
          .then(response => {
              setLoadingOpen(false)
          })
          .catch(error => console.log(error));
        }
      }
      
      // update existing lesson time
      for(var i = 0; i < parseInt(course.no_of_lesson); i++){
        if(course.lessons[i].time == lesson_time){
          continue;
        }
        await apiLessonUpdate( {
          "lesson_id": course.lessons[i].id,
          "time": lesson_time,
        })
        .then(response => {
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
      }

    }else{
        
      await apiCourseClearLesson(course.id);
          
      // init the lesson with input no of lesson
        for(var i = 0; i<parseInt(courseData.no_of_lesson); i++){
          
          await apiLessonCreate( {
            "time": lesson_time,
            "title": 'Lesson' + (i + 1),
            "sequence": i + 1,
            "course_id": course.id,
          })
          .then(response => {
              setLoadingOpen(false)
          })
          .catch(error => console.log(error));
        }
    }

    await apiCourseUpdate( {
      "course_id": course.id,
      "unit_title": courseData.unit_title,
      "level": courseData.level,
      "no_of_lesson": parseInt(courseData.no_of_lesson),
      "description": courseData.description,
      "subject": courseData.subject,
      'tags': tags.map(_tags => {
        return {
          "name": _tags
        }
      }),
      'school': courseData.school,
      'sch_cc_goal': courseData.sch_cc_goal,
      'technology': courseData.technology,
      'prior_knowledge': courseData.prior_knowledge,
      'maximum_enrollment_number': courseData.maximum_enrollment_number,
      'highlight': courseData.highlight,
      'reflection': courseData.reflection,
    }).then(response => {
      dispatch({
        type: "INIT_COURSE",
        value: response.data
      })
      setLoadingOpen(false)
    }) .catch(error => console.log(error));
}


  const handleAddChip = (chip) => {
    setTags([...tags, chip]);
  }
  
  const handleDeleteChip = (chip, index) => {
    // var tags = tags.splice(index, 1)
    var tags_temp = JSON.parse(JSON.stringify(tags));
    tags_temp.splice(index, 1);
    setTags(tags_temp);
  }

  const {handleNext, handleBack, isStep} =  props;

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
          Design type: {options.designType.find(x => x.id== course.design_type_id)?.name}
      </Typography>

      <Grid container spacing={2} data-tour = "course_info">
        <Grid item xs={12} md={12}>
          <TextField  
          id="unit_title" 
          name="unit_title" 
          label="Topic" 
          data-tour = "unit_title"
          value = {courseData.unit_title}
          error = {! (error["unit_title"]=="")}
          helperText= {! (error["unit_title"]=="")? error["unit_title"]:  ""}
          fullWidth 
          disabled = {!(courseData.permission > 2)}
          onChange={onChange}/>
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            School
          </InputLabel>
          <TextField 
            id="school" 
            name="school" 
            data-tour = "school"
            value = {courseData.school}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
         
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            School Level Curriculum Goal
          </InputLabel>
          <TextField 
            id="sch_cc_goal" 
            name="sch_cc_goal" 
            data-tour = "sch_cc_goal"
            value = {courseData.sch_cc_goal}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <InputLabel>
            Grade/ Level
            <QuestionHint title= {
              <React.Fragment>
                Teachers are expected to complete the blank “level” by adding the grade level of targeted students. 
                <br />
                Teachers may consider learners’ characteristics, like Grade 5 students, when filling this blank. 
                <br/>
                It is always important for teachers to think from a learner’s perspective when designing a unit.
              </React.Fragment>
            }/>
          </InputLabel>
          <TextField 
            id="level" 
            name="level" 
            data-tour = "level"
            value = {courseData.level}
            error = {! (error["level"]=="")}
            helperText= {! (error["level"]=="")? error["level"]:  ""}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
         
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            Subject
          </InputLabel>
          <TextField 
            id="subject" 
            name="subject" 
            data-tour = "subject"
            value = {courseData.subject}
            error = {! (error["subject"]=="")}
            helperText= {! (error["subject"]=="")? error["subject"]:  ""}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
         
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            Number of Lesson
            <QuestionHint title = {
              <React.Fragment>
              Teachers should think about whether it is realistic to ask students to 
              complete the tasks and achieve the learning outcomes in the no. of lessons given.
              </React.Fragment>
            }/>
          </InputLabel>
          <TextField 
            id="no_of_lesson" 
            name="no_of_lesson" 
            data-tour = "no_of_lesson"
            type="number"
            value = {parseInt(courseData.no_of_lesson)}
            error = {! (error["no_of_lesson"]=="")}
            helperText= {! (error["no_of_lesson"]=="")? error["no_of_lesson"]:  ""}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">lesson(s)</InputAdornment>}}
            disabled = {!(courseData.permission > 2)}
            onChange={onChange} />
        </Grid>

        <Grid item xs={6} md={6}>
          <InputLabel>
            Time Per Lesson
          </InputLabel>
          <TextField 
            id="lesson_time" 
            name="lesson_time" 
            type="number"
            value = {lesson_time}
            error = {! (error["lesson_time"]=="")}
            helperText= {! (error["lesson_time"]=="")? error["lesson_time"]:  ""}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">min(s)</InputAdornment>}}
            onChange={onChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            Technology
          </InputLabel>
          <TextField 
            id="technology" 
            name="technology" 
            data-tour = "technology"
            value = {courseData.technology}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel>
            Prior Knowledge
          </InputLabel>
          <TextField 
            id="prior_knowledge" 
            name="prior_knowledge" 
            data-tour = "prior_knowledge"
            value = {courseData.prior_knowledge}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
        </Grid>

        {/* practice！！！！！！！！！！！！ */}
        <Grid item xs={12} md={6}>
          <InputLabel>
            Maximum enrollment number
          </InputLabel>
          <TextField 
            id="maximum_enrollment_number" 
            name="maximum_enrollment_number" 
            data-tour = "maximum_enrollment_number"
            value = {courseData.maximum_enrollment_number}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            onChange={onChange} />
        </Grid>
            
        <Grid item xs={12} md={12}>
          <InputLabel>
            Description
            <QuestionHint title = {
                <React.Fragment>
                  Learning design is an iterative process. 
                  <br/>
                  As a starting point, we would advise teachers to put down some keywords there, which may be elaborated or modified later. These keywords can be related to the teaching content, learning experiences, pedagogical approach and so on. 
                  <br/>
                  Also if this were to be done by a collaborative team, then different members can contribute different keywords. 
                </React.Fragment>
            }/>
          </InputLabel>
          <TextField 
            id="description" 
            name="description" 
            data-tour = "description"
            value = {courseData.description} 
            error = {! (error["description"]=="")}
            helperText= {! (error["description"]=="")? error["description"]:  ""}
            disabled = {!(courseData.permission > 2)}
            fullWidth 
            multiline
            rows={5}
            onChange={onChange}/>
        </Grid>

        <Grid item xs = {12}>
          <InputLabel>
            Tags
            <QuestionHint title = {
                <React.Fragment>
                 The tags could be used for searching in the "My Design" and "Public Design" area.
                </React.Fragment>
            }/>
          </InputLabel>
          <ChipInput
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
              fullWidth
          />
        </Grid>

          
        <Grid item xs = {12}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setShowMore(!showMore)
            }}
          >
            {showMore? "Show Less": "Show More"}
          </Link>
        </Grid>

        {
          showMore?
            [
              <Grid item xs={12}>
                <InputLabel>
                  Highlight
                </InputLabel>
                <TextField 
                  id="highlight" 
                  name="highlight" 
                  data-tour = "highlight"
                  value = {courseData.highlight}
                  disabled = {!(courseData.permission > 2)}
                  placeholder = {"What do you think it is the most satisfying/ innovative part of the LD..."}
                  fullWidth 
                  multiline
                  rows={5}
                  onChange={onChange} />
              </Grid>
            ,
            <Grid item xs={12}>
              <InputLabel>
                Reflection
              </InputLabel>
              <TextField 
                id="reflection" 
                name="reflection" 
                data-tour = "reflection"
                value = {courseData.reflection}
                disabled = {!(courseData.permission > 2)}
                placeholder = {"How this LD may be further improved in future implementations..."}
                fullWidth 
                multiline
                rows={5}
                onChange={onChange} />
            </Grid>
            ]
            :
            null
        }

        <Grid item xs = {12}>
          <Link
              variant="body2"
              onClick={() => {
                window.open('https://forms.gle/tfnsD4BVAj1BF2e36', '_blank');
              }}
            >
              Evidence of achieved outcomes +
            </Link>
        </Grid>
      </Grid>

    
      
      
      <div className={classes.buttons}>
          {isStep? 
            <Button onClick={handleBack}>
              Back
            </Button>
          :
            null
          }

          {isStep? 
            <Button
            variant="contained"
            color="primary"
            onClick={() => onNext()}
            data-tour = "course_info_save"
          >
            Next
          </Button>
          :
          courseData.permission > 2?
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSave()}
              data-tour = "course_info_save"
            >
              Save
            </Button>
            :
            null
          }
         
      </div>

      <Dialog open={lessonWarning} onClose={() => setLessonWarning(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                <DialogTitle id="form-dialog-title">Warning!!!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Detected you have decreased the number of lessons. It will delete the lessons behind the no of lesson. Are you sure to continue?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setLessonWarning(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onConfirm()} data-tour ="course_info_save">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    </React.Fragment>
  );
}

export default DesignInfo;
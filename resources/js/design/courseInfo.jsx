import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {ContextStore} from '../container/designContainer'

const DesignInfo = (props) => {

  const { course, options, dispatch } = React.useContext(ContextStore);
  
  const onChange = (event) => {

    // handleUpdate(event.target.name, event.target.value);
    dispatch({
      type: event.target.name,
      value: event.target.value
    });
  }

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
          Design type: STEM ({options.designType.find(x => x.id== course.designType)?.name})
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={6} md={6}>
          <TextField  
          id="unit_title" 
          name="UNIT_TITLE" 
          label="Unit Title" 
          defaultValue = {course.unitTitle}
          fullWidth 
          onChange={onChange}/>
        </Grid>

        <Grid item xs={6} md={6}>
          <TextField 
          id="school_name" 
          name="SCHOOL_NAME"
          defaultValue = {course.schoolName} 
          label="School Name"  
          fullWidth 
          onChange={onChange}/>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField 
            id="level" 
            name="LEVEL" 
            label="Level" 
            defaultValue = {course.level}
            fullWidth 
            onChange={onChange} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField 
            id="noOfLesson" 
            name="NO_OF_LESSON" 
            label="No. Of Lesson" 
            type="number"
            defaultValue = {course.noOfLessons}
            fullWidth 
            InputProps={{endAdornment: <InputAdornment position="end">lesson(s)</InputAdornment>}}
            onChange={onChange} />
        </Grid>

        
        <Grid item xs={12} md={12}>
          <TextField 
            id="course_description" 
            name="COURSE_DES" 
            defaultValue = {course.courseDes} 
            label="Course Description" 
            multiline
            fullWidth 
            rows={5}
            onChange={onChange}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DesignInfo;
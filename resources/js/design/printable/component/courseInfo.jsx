import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {PrintableStore} from '../printableContainer';

const CourseInfo = () => {
    const {course, options} = React.useContext(PrintableStore);
    return (
        <React.Fragment>
            <Grid container>

                <Grid item xs ={12}>
                    Course Title： {course.unit_title}
                </Grid>

                <Grid item xs ={12}>
                    Design Type: {options.designType.find(x => x.id == course.design_type_id)?.name}
                </Grid>

                <Grid item xs ={6}>
                    Course Level: {course.level}
                </Grid>

                <Grid item xs ={3}>
                    Number of lessons: {course.no_of_lesson}
                </Grid>
                
                <Grid item xs ={12}>
                    Course Description: {course.description}
                </Grid>

            </Grid>
        </React.Fragment>
    )
};

export default CourseInfo;
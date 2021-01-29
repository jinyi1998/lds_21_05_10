import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import CourseInfo from './component/courseInfo';
import UnitOutcome from './component/unitOutcome';
import Components from './component/components';
import Lessons from './component/lessons';

import {PrintableStore} from './printableContainer';

const PrintableContent = () => {
    const {course, options} = React.useContext(PrintableStore);

    return (
        <React.Fragment >
            <Grid container spacing = {4} id = "pdfdiv" style = {{padding: 24}}>
                <Grid item xs = {12}>
                    <Typography variant = "h5"> 
                        <Box textAlign="center"> Learning Design Plan</Box>
                    </Typography>
                    <Typography variant = "subtitle1"> 
                        <Box textAlign="center"> Design By {course.createdby? course.createdby.name : null}@{course.createdby? course.createdby.school : null} </Box>
                    </Typography>
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant = "h6"> Course information </Typography>
                    <CourseInfo />
                </Grid>


                <Grid item xs = {12}>
                    <Typography variant = "h6"> Outcomes </Typography>
                    <UnitOutcome />
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant = "h6"> Components </Typography>
                    <Components />
                </Grid>

                <Grid item xs = {12}>
                    <Typography variant = "h6"> Lessons </Typography>
                    <Lessons />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PrintableContent;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RootRef from "@material-ui/core/RootRef";
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {AppContextStore} from '../../../container/app';
import {ContextStore} from '../../../container/designContainer'

const ComponentPatternSelectConfirmView = (props) => {

    const { course } = React.useContext(ContextStore);
    const { options } = React.useContext(AppContextStore);


    const importComponentTempToComponent = () => {
        if(typeof props.importComponentTempToComponent != 'undefined'){
            props.importComponentTempToComponent();
        }
    }

    const onCloseDialog = () => {
        if(typeof props.onCloseDialog){
            props.onCloseDialog();
        }
    }
    
    return ( 
        <React.Fragment>
            <DialogContent>
                <Typography variant="subtitle1" gutterBottom>
                    Review your course info, learning outcomes, cirriculum component patterns before you start to edit your course activites.
                    <br />
                    You can also edit these information at the Design Phase.
                </Typography>
                <Grid container>
                    <Grid container item xs = {12}>
                        <Grid container item xs = {12}>
                            <Typography variant="subtitle1" gutterBottom>
                                1. Design Type
                            </Typography>
                        </Grid>

                        <Grid container item xs = {12}>
                            <Typography variant="body2" gutterBottom>
                                {options.designType.find(_opts => _opts.id == course.design_type_id)?.name}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid container item xs = {12}>
                        <Grid container item xs = {12}>
                            <Typography variant="subtitle1" gutterBottom>
                                2. Course Info
                            </Typography>
                        </Grid>

                        <Grid container item xs = {12}>
                            <Paper style = {{width: '100%', padding: 16}}>
                                <Grid container item xs = {12}>
                                    <Grid item xs = {12}>
                                        <Typography variant="body2" gutterBottom>
                                            Course Title: {course.unit_title}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <Typography variant="body2" gutterBottom>
                                            Course Grade: {course.level}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <Typography variant="body2" gutterBottom>
                                            Subject: {course.subject}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <Typography variant="body2" gutterBottom>
                                            Number of Lesson: {course.no_of_lesson}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <Typography variant="body2" gutterBottom>
                                            Time Per lesson: {course.lessons.length> 0? course.lessons[0].time : 0}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <Typography variant="body2" gutterBottom>
                                            Description: {course.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container item xs = {12}>
                        <Grid container item xs = {12}>
                            <Typography variant="subtitle1" gutterBottom>
                                3. Unit Learning Outcomes
                            </Typography>
                        </Grid>

                        <Grid container item xs = {12}>
                            { options.outcomeTypeOpts?.map((_lo_type, index) => 
                                <Grid container item xs = {12} key = {index}>
                                    <Paper style = {{width: '100%', padding: 16}}>
                                        <Grid container item xs = {12}>
                                            <Typography variant="subtitle1" gutterBottom> {_lo_type.name} </Typography>
                                        </Grid>

                                        <Grid container item xs = {12}>
                                        
                                                {course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).length > 0?
                                                    course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).map(_ulo => 
                                                        <Typography variant="body2" gutterBottom> {_ulo.description} </Typography>
                                                    )
                                                    : 
                                                    <Typography variant="body2" gutterBottom> No LO under this type </Typography>
                                                }
                                        </Grid>
                                    </Paper>
                                </Grid>
                                )
                            }
                        </Grid>
                    </Grid>


                    <Grid container item xs = {12}>
                        <Grid container item xs = {12}>
                            <Typography variant="subtitle1" gutterBottom>
                                4. CC and Patterns
                            </Typography>
                        </Grid>

                        <Grid container item xs = {12} spacing = {2}>
                            {props.components.map(_component => 
                                <Grid container item xs = {12} >
                                    <Paper style = {{width: '100%', padding: 16}}>
                                        <Grid container item xs = {12} spacing = {2}>
                                                <Grid item xs = {12}>
                                                    <Typography variant="body2" gutterBottom>{"CC" + _component.sequence + " - " + _component.title}</Typography>
                                                </Grid>

                                                <Grid item xs = {12}>
                                                    <Typography variant="caption" gutterBottom> {_component.patterns.length> 0? _component.patterns[0].title : null}</Typography>
                                                </Grid>
                                        
                                        </Grid>
                                    </Paper>
                                </Grid>
                               
                            )}
                        </Grid>
                    </Grid>



                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog} variant = {"outlined"}>
                    I need more time here
                </Button>
                <Button onClick={()=>{importComponentTempToComponent()}} color="secondary" autoFocus variant = {"outlined"}>
                    I am ready to go!
                </Button>
            </DialogActions>
        </React.Fragment>
    );
}

export default ComponentPatternSelectConfirmView;
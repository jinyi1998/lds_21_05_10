import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import LessonAnalysisContainer from './lessonAnalysisContainer';
import ComponentAnalysisContainer from './componentAnalysisContainer';
import CourseAnalysisContainer from './courseAnalysisContainer';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));




const DashBoardContainer = ()=>{
    const [module, setModule] = React.useState("course");
    const classes = useStyles();

    const displayMenu = () => {
        return(
            <React.Fragment>
                 <Paper className={classes.paper}>
                    <MenuList>
                        <MenuItem onClick = {()=>{setModule("course")}} selected = {module == "course"}  style={{whiteSpace: 'normal'}} >
                            Course Analysis
                        </MenuItem>
                        <MenuItem onClick = {()=>{setModule("component")}} selected = {module == "component"}  style={{whiteSpace: 'normal'}}>
                            Curriculum Component Analysis
                        </MenuItem>
                        <MenuItem onClick = {()=>{setModule("lesson")}} selected = {module == "lesson"}  style={{whiteSpace: 'normal'}}>
                            Lesson Analysis
                        </MenuItem>
                    </MenuList>
                </Paper>
            </React.Fragment>
        );
    }
    
    const displayContent = () => {
      switch(module){
            default:
                return (
                    <div>
                        No this module
                    </div>
                );
            case "course":
                return (
                    <React.Fragment>
                        <CourseAnalysisContainer />
                    </React.Fragment>
                );
            case "component":
                return (
                    <React.Fragment>
                        <ComponentAnalysisContainer />
                    </React.Fragment>
                );
            case "lesson":
                return (
                    <React.Fragment>
                        <LessonAnalysisContainer />
                    </React.Fragment>
                );
      }
    }

    return (
        <Grid container spacing = {3}>
            <Grid item xs = {2}>
                {displayMenu()}
            </Grid>
            <Grid item xs = {10}>
                {displayContent()}
            </Grid>
        </Grid>
       
    );
}

export default DashBoardContainer;
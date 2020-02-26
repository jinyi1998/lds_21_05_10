import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Component from './component';
import { Grid } from '@material-ui/core';
import {ContextStore} from '../container/designContainer'
import InstructionBox from '../components/instructionBox';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const UnitPlan = (props)  => {
  const classes = useStyles();
  const { course, dispatch } = React.useContext(ContextStore);

  return (
    <div className={classes.root}>
        <Grid container spacing = {3}>
            <Grid item xs={12}>
                <InstructionBox 
                    title="Unit Plan" 
                    content= "You can customize the Unit design based on the recommended learning outcomes and learning tasks." 
                    tips=""
                />
            </Grid>
            {course.components.map((_components, index)=>(
                <Grid item xs={12} key = {index}>
                    <Component componentData = {_components} key= {index} index = {index}/>
                </Grid>
            ))}
        </Grid>
    </div>
  );
}
export default UnitPlan;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Component from './component/component';
import ComponentContainer from './component/componentContainer';
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
            {/* {course.componentid.map((_component, index)=>(
                <Grid item xs={12} key = {index}>
                    <ComponentContainer componentID = {_component.component_id} key= {index} index = {index}/>
                </Grid>
            ))} */}

            {course.components.map((_component, index)=>(
                <Grid item xs={12} key = {index}>
                    <ComponentContainer component = {_component} componentID = {_component.id} key= {index} index = {index}/>
                </Grid>
            ))}
        </Grid>
    </div>
  );
}
export default UnitPlan;
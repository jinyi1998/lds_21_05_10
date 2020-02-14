import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Component from './component';
import { Grid } from '@material-ui/core';
import {ContextStore} from '../container/designContainer'

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
                <p> You can customize the Unit design based on the recommended learing outcomes and design patterns </p>
            </Grid>
            {course.components.map((_components, index)=>(
                <Grid item xs={12} key = {index}>
                    <Component componentData = {_components} key= {index}/>
                </Grid>
            ))}
        </Grid>
    </div>
  );
}
export default UnitPlan;
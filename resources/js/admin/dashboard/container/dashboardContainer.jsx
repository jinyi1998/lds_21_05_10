import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 240,
        padding: 20,
        marginRight: 40
    }
}));

const DashboardContainer = (props) => {

    const classes = useStyles();

    return (
        <Grid container spacing = {2}>
            <Grid item xs = {12}>
                <Paper className = {classes.paper}>
                    User
                </Paper>
            </Grid>

            <Grid item xs = {8}>
                <Paper className = {classes.paper}>
                    Template
                </Paper>
            </Grid>

            <Grid item xs = {4}>
                <Paper className = {classes.paper}>
                    Template
                </Paper>
            </Grid>

        </Grid>
    );
}

export default DashboardContainer;
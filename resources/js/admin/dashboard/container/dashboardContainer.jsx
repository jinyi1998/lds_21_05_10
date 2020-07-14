import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserMgmtDashboardContainer from './userMgmtDashboardContainer'


const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 360,
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
                    User Modules
                    <UserMgmtDashboardContainer />
                </Paper>
            </Grid>

            <Grid item xs = {12}>
                <Paper className = {classes.paper}>
                    Template Management
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DashboardContainer;
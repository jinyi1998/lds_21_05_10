import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Line} from 'react-chartjs-2';

import {apiUserMgmtDashboard} from '../../../api';


const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 360,
        padding: 20,
        marginRight: 40
    }
}));



const TemplateMgmtDashboardContainer = (props) => {

    const classes = useStyles();
    const [todayUser, setTodayUser] = React.useState([]);
    const [sevenDaysUser, setSevenDaysUser] = React.useState([]);


    const fetchUserData = () => {
        apiUserMgmtDashboard().then( response => {
            handleUserData(response.data);
        })
        .catch(error => console.log(error))
    }


    const handleUserData = (data) => {
        setTodayUser(data.today_users);
    }


    React.useEffect(()=>{
        fetchUserData();
    }, [])


    return (
        <Grid container spacing = {2}>
            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                        Total Design Type Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {todayUser.length}
                    </Typography>
                    
                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                    Total Design Component Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {todayUser.length}
                    </Typography>

                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                        Total Design Pattern Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {todayUser.length}
                    </Typography>

                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    );
}

export default TemplateMgmtDashboardContainer;
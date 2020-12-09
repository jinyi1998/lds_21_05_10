import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Filter1Icon from '@material-ui/icons/Filter1';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import GroupIcon from '@material-ui/icons/Group';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: 400, margin: "5%"
    },
    media: {
        height: 200,
        width: '100%',
        backgroundSize: 'contain'
    },
  }));

const SiteManagement = () => {
    const classes = useStyles(); 

    const displayDesignType = () => {
        return (
        <Button 
            className = {classes.button}
            variant="outlined" 
            onClick={ (event)=>{window.location.href = "tasktype_opts"}}  
        >
            <Grid container>
                <Grid item xs ={12}>
                    <Filter1Icon  className = {classes.media}/>
                </Grid>
                <Grid item xs = {12}>
                    <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                        Tasks Type
                    </Typography>
                </Grid>
                <Grid  item xs = {12}>
                    <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                        Edit the default task Type Here
                    </Typography>
                </Grid>
            </Grid>
        </Button>
        );
    }

    const displayClassSize = () => {
        return (
            <Button 
                className = {classes.button}
                variant="outlined" 
                onClick={ (event)=>{window.location.href = "classsize_opts"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <GroupIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            Class Size
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default Class Size Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        );
    }

    const displayClassType = () => {
        return(
            <Button 
                className = {classes.button}
                variant="outlined" 
                onClick={ (event)=>{window.location.href = "classtype_opts"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <RoomIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            Class Type
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default Class Type Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        );
    }

    const displayClassTarget = () => {
        return(
            <Button 
                className = {classes.button}
                variant="outlined" 
                onClick={ (event)=>{window.location.href = "classtarget_opts"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <GpsNotFixedIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            Class Target
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default Class Target Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        );
    }

    const displayResource = () => {
        return (
            <Button 
                className = {classes.button}
                variant="outlined" 
                onClick={ (event)=>{window.location.href = "resource_opts"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <AssignmentIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            Resource
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default Resource Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        )
    }

    const displayELearningTool = () => {
        return (
            <Button 
                className = {classes.button}
                variant="outlined" 
                onClick={ (event)=>{window.location.href = "elearningtool_opts"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <ImportantDevicesIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            E-Learning Tools
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default e-learning tools Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        );
    }

    const displayMoodleMod = () => {
        return (
            <Button 
            className = {classes.button}
            variant="outlined" 
            onClick={ (event)=>{window.location.href = "moodlemod"}}  
            >
                <Grid container>
                    <Grid item xs ={12}>
                        <WhatshotIcon  className = {classes.media}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                            Moodle Mod
                        </Typography>
                    </Grid>
                    <Grid  item xs = {12}>
                        <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                            Edit the default Moodle Mod Mapping Options Here
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        );
    }

    return (
        <React.Fragment>
            <Grid container spacing = {4}>
                <Grid container item xs ={3} justify="center">
                    {displayDesignType()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayClassSize()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayClassType()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayClassTarget()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayResource()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayELearningTool()}
                </Grid>

                <Grid container item xs ={3} justify="center">
                    {displayMoodleMod()}
                </Grid>
                
            </Grid>
        </React.Fragment>
    );
}

export default SiteManagement;
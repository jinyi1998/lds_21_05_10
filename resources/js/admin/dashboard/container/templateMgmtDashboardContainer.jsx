import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Line} from 'react-chartjs-2';

import {apiLearningCompTempList, apiDesignTypeList, apiLearningPattTempList} from '../../../api';


const useStyles = makeStyles((theme) => ({
    paper: {
        minHeight: 360,
        padding: 20,
        marginRight: 40
    }
}));



const TemplateMgmtDashboardContainer = (props) => {

    const classes = useStyles();
    const [templateData, setTemplateData] = React.useState({
        design_type: 0,
        component_temp: 0,
        pattern_temp: 0
    })

    const fetchDesignType = () => {
        apiDesignTypeList().then( response => {
            setTemplateData( prev => ({...prev, design_type: response.data.length}))
        })
        .catch(error => console.log(error))
    }

    const fetchCompTemp = () => {
        apiLearningCompTempList().then( response => {
            setTemplateData( prev => ({...prev, component_temp: response.data.length}))
        })
        .catch(error => console.log(error))
    }

    const fetchPattTemp = () => {
        apiLearningPattTempList().then( response => {
            setTemplateData( prev => ({...prev, pattern_temp: response.data.length}))
        })
        .catch(error => console.log(error))
    }

    React.useEffect(()=>{
        fetchDesignType();
        fetchCompTemp();
        fetchPattTemp();
    }, [])


    return (
        <Grid container spacing = {2}>
            <Grid item xs = {12}>
                <Typography variant="h6" gutterBottom color = "textPrimary">
                    Template Management Dashboard
                </Typography>
            </Grid>
            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                        Total Design Type Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {templateData.design_type}
                    </Typography>
                    
                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        <Link href="design_type">
                            Go To Details
                        </Link>
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                    Total Design Component Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {templateData.component_temp}
                    </Typography>

                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        <Link href="component_template">
                            Go To Details
                        </Link>
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs = {4}>
                <Paper className = {classes.paper}>  
                    <Typography variant="h6" gutterBottom color = "primary">
                        Total Design Pattern Template 
                    </Typography>

                    <Typography variant="h4" gutterBottom color = "inherit">
                       {templateData.pattern_temp}
                    </Typography>

                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        On {new Date().toLocaleDateString()}
                    </Typography>
                    
                    <br/>
                    <br/>
                    <Typography variant="body2" gutterBottom color = "secondary">
                        <Link href="pattern_template">
                            Go To Details
                        </Link>
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    );
}

export default TemplateMgmtDashboardContainer;
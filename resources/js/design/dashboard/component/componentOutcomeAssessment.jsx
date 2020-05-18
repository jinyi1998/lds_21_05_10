import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WarningIcon from '@material-ui/icons/Warning';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '66.66%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

const ComponentOutcomeAssessment = (props)=>{
    
    const classes = useStyles();
    const {data} = props;

    const displayColor = (boolean) => {
        if(boolean){
            return {"backgroundColor": "#00BFFF77"}
        }else{
            return {"backgroundColor": "#00BFFF11"}
        }
    }

    const displayWarnText = (boolean) => {
        if(boolean){
            return ""
        }else{
            return (
            <React.Fragment>
                 <WarningIcon/>
                 This outcome does not match a task assessment
            </React.Fragment>
            )
        }
    }

    const displayOutcomeDetail = (_task) => {
        if(_task.has_assessment){
            // has assessment
            return (
                <ExpansionPanel
                key = {_task.id}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id= {_task.id}
                        style = {displayColor(_task.has_assessment)}
                    >
                        <Typography className={classes.heading}>Learning Outcome: {_task.description} </Typography>
                    </ExpansionPanelSummary>
    
                    <ExpansionPanelDetails>
                        <List component="nav">
                           { _task.learningtask_id.map( (_id, index) => 
                                {
                                    return (
                                        <ListItem 
                                            alignItems="center"
                                            key = {"learning_task_"+_id}
                                        >
                                            <ListItemText
                                                primary = { "learning task #" + _id  + "--" +  _task.learningtask_title[index]}
                                                key = {"learning_task_"+_id}
                                            />
                                         </ListItem>
                                    )
                                }
                           )} 
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
          
        }else{
            return (
                <ListItem 
                button
                alignItems="center"
                style = {displayColor(_task.has_assessment)}
                key = {1}
            >
                <ListItemText 
                    primary={"Learning Outcome: "+ _task.description} 
                    secondary = {displayWarnText(_task.has_assessment)}
                    key = {1}
                />
            </ListItem>

            )
           
        }
    }
    
    return (
        <Grid container item xs = {12} alignContent="center">
            <Grid item xs = {12} >
                <List component="nav">
                    {
                        data.map(_task => 
                            displayOutcomeDetail(_task)
                        )
                    }
                </List>
            </Grid>
        </Grid>             
    );
}

export default ComponentOutcomeAssessment;
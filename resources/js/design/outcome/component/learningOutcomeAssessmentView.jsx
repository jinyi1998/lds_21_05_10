import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import {AppContextStore} from '../../../container/app';

const useStyles = makeStyles((theme) => ({
    customWidth: {
        maxWidth: 500
    },
}));

const LearningOutcomeAssessmentView = (props) => {

    const classes = useStyles();
    const { options, taskTypeColor} = React.useContext(AppContextStore);

    const [open, setOpen] = React.useState(false);
    const [tasks, setTasks ] = React.useState([]);

    React.useEffect( () => {
        if(typeof props.tasks != 'undefined'){
            setTasks(props.tasks)
        }
    }, [props.tasks])


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const displayIcon = () => {
        if(tasks.length > 0){
            return(   
            <IconButton size = {"small"} color = {"inherit"} style = {{color: "green"}}>
                <AssignmentTurnedInIcon />
            </IconButton>
            )
        }else{
            return(   
            <IconButton size = {"small"} color = {"secondary"}>
                <AssignmentLateIcon />
            </IconButton>
            )
        }
    }

    const displayLOAssessment = () => {
        return (
            <Grid container style = {{minWidth: 300}}>
                {
                    tasks.length > 0?
                    
                        tasks.map(_task =>  
                        <Grid container key = {_task.id}>
                            <Grid item xs={1} height="100%">
                                <div style={taskTypeColor(_task.type)} /> 
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="caption" gutterBottom style={{fontWeight: '600'}}>
                                    {_task.title}
                                </Typography>
                            
                            </Grid>
                        </Grid>
                        )
                    :
                    <Grid item xs = {12}>
                        <Typography variant="caption" gutterBottom>
                            No any assessment for this outcome
                        </Typography>
                    </Grid>
                }
               
            </Grid>
        );
    }

    return (
        props.isShow?
            <Tooltip 
                title={displayLOAssessment()} open = {open} onClose={handleClose} onOpen={handleOpen} 
                classes={{ tooltip: classes.customWidth }}
                placement="right-end"
            >
               {displayIcon()}
            </Tooltip>
            :
            null
    );
}

export default LearningOutcomeAssessmentView;
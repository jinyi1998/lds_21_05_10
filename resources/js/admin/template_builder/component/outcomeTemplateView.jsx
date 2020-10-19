import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';

import {AppContextStore} from '../../../container/app';


const OutcomeTemplateView = (props) => {
    const { setLoadingOpen, options } = React.useContext(AppContextStore);
    const [outcome, setOutcome] = React.useState({
        "outcomeType": -1,
        "STEMType": "",
        "level": -1,
        "id": -1,
        "description": ""
    });
    const learningTypeTemp = options.learningOutcomeType;
    const enableEdit = true;
    const enableDelete = true;

    React.useEffect(()=>{setOutcome(props.outcome);}, [props.outcome])

    return (
        <React.Fragment>
            <ListItem
                ContainerComponent="li">
                <ListItemIcon>
                    <DragHandleIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component={'span'} display="inline" color = "textPrimary" data-tour = "lo_type">
                                { learningTypeTemp.find(x => x.id == outcome.outcomeType)?.description}
                                </Typography>
                            - 
                            <Typography component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                {outcome.description}
                                </Typography>
                        </React.Fragment>
                    }
                    secondary={ 
                        <React.Fragment>
                            {
                                outcome.outcomeType == 3?
                                null
                                :
                                <Typography component={'span'} display="inline" color = "textPrimary" data-tour = "lo_stem_type"> STEM TYPE: ( {
                                    outcome.STEMType == ""?
                                        "N/A"
                                        :
                                        outcome.STEMType
                                } )  </Typography>
                            }
                        
                            <Typography component={'span'} display="inline" color = "textPrimary" data-tour = "lo_level"> Bloom Taxonomy Level: {outcome.level}   </Typography>
                            {/* <Typography component={'span'} display="inline" color = "textSecondary">{(outcome.isCourseLevel)? "Unit LO": ""}</Typography> */}
                        </React.Fragment>
                    } 
                />
                <ListItemSecondaryAction>
                    {
                        enableEdit?
                        <Tooltip title="Edit">
                            <IconButton edge="end" aria-label="edit" onClick = {() => props.onEditOutcome(outcome)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        null
                    }
                    
                    {
                        enableDelete?
                        <Tooltip title="Delete">
                            <IconButton edge="end" aria-label="delete" onClick = {() => props.onDeleteOutcome(outcome)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        null
                    }
                
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
}

export default OutcomeTemplateView;
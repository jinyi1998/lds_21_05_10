import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import config from 'react-global-configuration';


import {ContextStore} from '../../container/designContainer'

const LearningOutcomeUnit = (props)=>{
    const {options, setLoadingOpen } = React.useContext(ContextStore);
    const {learningOutcomeID} = props;
    const { onOpenEditDialog, onOpenDelDialog, index } = props;
    const {provided, snapshot} = props;

    const learningTypeTemp = options.learningOutcomeType;

    const [outcome, setOutcome] = React.useState(props.learningOutcome);
    async function fetchLearningOutcome() {
        setLoadingOpen(true)
        fetch(
            'http://'+config.get('url')+'/api/learningOutcome/'+learningOutcomeID,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setOutcome(response);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));   
      }
    
    const getItemStyle = (isDragging, draggableStyle) => ({
        // styles we need to apply on draggables
        ...draggableStyle,
        
        ...(isDragging && {
            background: "rgb(235,235,235)"
        })
    });

    React.useEffect(()=>{
        setOutcome(props.learningOutcome);
    }, [props.learningOutcome]);

    return (
        <ListItem
        ContainerComponent="li"
        ContainerProps={{ ref: provided.innerRef }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
        )}>
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
                <IconButton edge="end" aria-label="edit" onClick = {()=> onOpenEditDialog(outcome)} data-tour = "lo_edit">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick = {()=> onOpenDelDialog(outcome)} data-tour ="lo_delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
export default LearningOutcomeUnit;
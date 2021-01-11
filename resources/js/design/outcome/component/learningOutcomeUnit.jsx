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

import LearningOutcomeAssessmentView from './learningOutcomeAssessmentView';
import {AppContextStore} from '../../../container/app';

const LearningOutcomeUnit = (props)=>{
    
    const { setLoadingOpen, options } = React.useContext(AppContextStore); 
    const { enableEdit, enableDuplicate, enableDelete} = props;
    const { onOpenEditDialog, onOpenDelDialog, index } = props;
    const { provided, snapshot } = props;

    const [outcome, setOutcome] = React.useState(props.learningOutcome);
    const [slo, setSlo] = React.useState([]);

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

    React.useEffect(()=>{
        if(typeof props.component != 'undefined'){
            var temp = outcome.slo_outcome.filter(_outcome => _outcome.componentid.filter(_componentid => _componentid.component_id == props.component.id).length > 0);
            setSlo(temp);
        }else{
            setSlo(outcome.slo_outcome);
        }
    }, [outcome]);

    const onDuplicateOutcome = (outcome) =>{
        if(typeof props.onDuplicateOutcome == 'undefined'){
            console.log('error occur');
        }else{
            props.onDuplicateOutcome(outcome)
        }
    }

    return (
        <React.Fragment>
               {/* LO */}
              <ListItem
                key = {outcome.id}
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
                            <Typography component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                {outcome.description}
                            </Typography>
                            <LearningOutcomeAssessmentView 
                                tasks = {outcome.tasks?.filter(
                                    _task => {
                                        if(typeof props.component == "undefined"){
                                            return false;
                                        }
                                        if(_task.componentid?.component_id == props.component.id){
                                            return true;
                                        }else if(_task.patternid?.componentid?.component_id == props.component.id){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }
                                )}
                                isShow = {typeof props.component != "undefined"}
                            />
                        </React.Fragment>
                    }
                    secondary={ 
                        <React.Fragment>
                            {
                                outcome.outcomeType == 3?
                                null
                                :
                                <Typography variant = {'caption'} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_stem_type"> STEM TYPE: ( {
                                        outcome.stemtypesid.length > 0?
                                       
                                        outcome.stemtypesid.map( x => options.STEMTypeOpts.find( _opts => x.stem_type_id == _opts.id).name).join(',')
                                        :
                                        "N/A"
                                } )  </Typography>
                            }
                        
                            <Typography variant = {'caption'} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_level"> 
                                Bloom Taxonomy Level: {options.bloomLvlOpts.find( x => x.id == outcome.bloom_id)?.name }  
                            </Typography>
                        </React.Fragment>
                    } 
                />
                <ListItemSecondaryAction>
                    {
                        enableEdit?
                        <IconButton edge="end" aria-label="edit" onClick = {()=> onOpenEditDialog(outcome)} data-tour = "lo_edit">
                            <EditIcon />
                        </IconButton>
                        :
                        null
                    }
                    {/* {
                        enableDuplicate?
                        <IconButton edge="end" aria-label="edit" onClick = {()=> onDuplicateOutcome(outcome)} data-tour = "">
                            <FileCopyIcon />
                        </IconButton>
                        :
                        null
                    } */}
                    {
                        enableDelete?
                        <IconButton edge="end" aria-label="delete" onClick = {()=> onOpenDelDialog(outcome)} data-tour ="lo_delete">
                            <DeleteIcon />
                        </IconButton>
                        :
                        null
                    }
                
                </ListItemSecondaryAction>
            </ListItem>

            {/* SLO */}
            <Grid container>
            {
                slo.map(
                    _slo =>
                    <Grid container item xs = {12}key = {_slo.id}>
                        <Grid item xs = {1}>
                        </Grid>

                        <Grid item xs = {10}>
                            <Typography variant = {"caption"} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                {_slo.description}
                            </Typography>
                            
                        </Grid> 

                        <Grid item xs = {1}>
                            <LearningOutcomeAssessmentView 
                                tasks = {_slo.tasks?.filter(
                                    _task => {
                                        if(typeof props.component == "undefined"){
                                            return false;
                                        }
                                        if(_task.componentid?.component_id == props.component.id){
                                            return true;
                                        }else if(_task.patternid?.componentid?.component_id == props.component.id){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }
                                )}
                                isShow = {typeof props.component != "undefined"}
                            />
                        </Grid>
                    </Grid>
                )
            }
            </Grid>
            
            
        </React.Fragment>
      
    );
}
export default LearningOutcomeUnit;
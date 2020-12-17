import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    const loinit = {
        level: -1,
        outcomeType: -1,
        STEMType: "",
        description: "",
        isCourseLevel: true,
        unit_outcome_id: -1,
        slo_outcome: [],
        stemtypesid: []
    }
    const [outcome, setOutcome] = React.useState(loinit);
    const enableEdit = true;
    const enableDelete = true;

    const [slo, setSlo] = React.useState([]);
    React.useEffect(()=>{
        setOutcome(props.outcome);
    }, [props.outcome])


    React.useEffect(()=>{
        if(typeof props.component_id != 'undefined'){
            var temp = outcome.slo_outcome.filter(_outcome => _outcome.componentid.filter(_componentid => _componentid.component_id == props.component_id).length > 0);
            setSlo(temp);
        }else{
            setSlo(outcome.slo_outcome);
        }
    }, [outcome]);
    
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

            <Grid container>
            {
                slo?.map(
                    _slo =>
                    <Grid container item xs = {12}key = {_slo.id}>
                        <Grid item xs = {1}>
                        </Grid>

                        <Grid item xs = {11}>
                            <Typography variant = {"caption"} component={'span'} display="inline" color = "textPrimary" data-tour = "lo_description">
                                {_slo.description}
                            </Typography>
                        </Grid> 
                    </Grid>
                )
            }
            </Grid>
        </React.Fragment>
    );
}

export default OutcomeTemplateView;
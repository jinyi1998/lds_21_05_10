import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';


import {PrintableStore} from '../printableContainer';

const Outcome = (props) => {
    const outcome = props.outcome;
    const {course, options} = React.useContext(PrintableStore);

    return (
        <Grid container item xs ={12}>
            <Grid container item xs = {12}>
                <Grid item xs = {1}>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </Grid>
                <Grid item xs >
                    <Typography variant = {"subtitle2"} display = {"block"}>
                        {outcome.description}
                    </Typography>
                    <Typography variant = {"caption"} display = {"block"}>
                        {options.bloomLvlOpts.find( x => x.id == outcome.bloom_id)?.name } 
                    </Typography>
                </Grid>
            </Grid>

            {
                //slo
                outcome.slo_outcome.map( (_slo, index) => 
                <Grid container item xs = {12} justify = {"flex-end"} key = {index}>
                    <Grid container item xs = {10}>
                        <Grid item xs>
                            <Typography variant = {"caption"} display = {"block"}>
                                {_slo.description}
                            </Typography>
                            <Typography variant = {"caption"} display = {"block"}>
                                {options.bloomLvlOpts.find( x => x.id == _slo.bloom_id)?.name }  
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                )
            }
          
        </Grid>
    );
}

const UnitOutcome = () => {
    const {course, options} = React.useContext(PrintableStore);
    return (
        <Grid container spacing={2}>
            {
                options.outcomeTypeOpts.map(
                    (_outcome_type, index) => 
                    <Grid container item xs ={12} key = {index}>
                        <Grid item xs = {12}>
                            <Typography variant = {"subtitle1"}>
                                {_outcome_type.name}
                            </Typography>
                        </Grid>
                     
                        {course.outcomes.filter( x=> x.outcomeType == _outcome_type.id).map(outcome => 
                            <Outcome outcome = {outcome} key = {outcome.id}
                        />
                        )}
                    </Grid>
                    
                )
            }
        </Grid>
    )
}

export default UnitOutcome;
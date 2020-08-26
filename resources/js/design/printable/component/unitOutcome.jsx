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

    return (
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <FolderIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary= {outcome.description}
            secondary={outcome.level ? outcome.level  : null}
            />
        </ListItem>
    );
}

const UnitOutcome = () => {
    const {course, options} = React.useContext(PrintableStore);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <div>
                <List dense={true}>
                    {course.outcomes.map(outcome => <Outcome outcome = {outcome} key = {outcome.id}/>)}
                </List>
            </div>
            </Grid>
        </Grid>
    )
}

export default UnitOutcome;
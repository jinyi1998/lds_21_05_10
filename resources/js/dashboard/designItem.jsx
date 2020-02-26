import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const DesignItem = (props) => {
    const {courseData, setCourseID, handleListItemClick} = props;
    const test = JSON.parse(courseData.data);

    const onClick = () => {
        handleListItemClick(event, 'design');
        setCourseID(courseData.id);
    }
    return (
        <ListItem button onClick={()=>onClick()}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={test.unitTitle+" - "+test.courseDes}  secondary="Last update @ 6 Feb, 2020" />
            <ListItemSecondaryAction>
                Delete | Duplicated  
            </ListItemSecondaryAction>
        </ListItem>

    );
}

export default DesignItem;
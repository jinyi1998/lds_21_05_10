import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShareIcon from '@material-ui/icons/Share';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import config from 'react-global-configuration';

import CourseShareDialog from './courseShareDialog';

import {apiCourseDelete} from '../api.js';

const DesignItem = (props) => {
    const {courseData, usergroup} = props;
    const updated_at = courseData.updated_at;
    const creator = courseData.createdby;
    const enableShare = props.enableShare? props.enableShare : false;
    const enableDelete = props.enableDelete? props.enableDelete : false;


    const [shareDialogOpen, setShareDialogOpen] = React.useState(false); 
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const onClick = () => {
        window.location.href = "/designstudio/"+ courseData.id;
    }

    const onClickShare = () => {
        setShareDialogOpen(true)
    }

    const onClickDelete = () => {
        setDeleteDialogOpen(true)
    }

    const deleteCourse = () => {
        apiCourseDelete(courseData.id).then(
            response => {
                location.reload();
            }
        )
        .catch(error => console.log(error));
    }


    return (
        <React.Fragment>
            <ListItem button onClick={()=>onClick()}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText 
                    primary={courseData.unit_title+" - "+courseData.description}  
                    secondary={"Update At:" + updated_at + " || " + "Created By: " + creator.name + "@" + creator.school} />
                <ListItemSecondaryAction>
                    {
                        enableShare?
                        <IconButton aria-label="share" onClick = {onClickShare}>
                            <ShareIcon />
                        </IconButton>
                        :
                        null
                    }
                  
                    {
                        enableDelete? 
                        <IconButton aria-label="delete" onClick = {onClickDelete}>
                            <DeleteIcon />
                        </IconButton>
                        : 
                        null
                    }
                </ListItemSecondaryAction>
            </ListItem>

            
            <CourseShareDialog  
                open={shareDialogOpen}   
                onClose={()=>setShareDialogOpen(false)} 
                courseData = {courseData} 
                usergroup = {usergroup}
            />


            <Dialog
                open={deleteDialogOpen}
                onClose={()=>setDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are going to delete this course. Once you delete this course, all the data cannot be recovered. Are you sure to do so?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>deleteCourse()} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>


    );
}

export default DesignItem;
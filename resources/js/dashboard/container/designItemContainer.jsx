import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

import CourseShareContainer from './courseShareContainer';

import {AppContextStore} from '../../container/app';

import {
    apiCourseGet, apiCourseDelete,
    apiFileCourseImport 
} from '../../api.js';

const DesignItemContainer = (props) => {

    const {courseData, usergroup} = props;
    const { setLoadingOpen, displayMsg} = React.useContext(AppContextStore);
    const creator = courseData.createdby;

    const enableDuplicate = props.enableDuplicate? props.enableDuplicate : false;;
    const enableShare = props.enableShare? props.enableShare : false;
    const enableDelete = props.enableDelete? props.enableDelete : false;


    const [shareDialogOpen, setShareDialogOpen] = React.useState(false); 
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const onClickDesign = () => {
        if(courseData.is_finish){
            window.location.href = "/designstudio/"+ courseData.id + "/6";
       }else{
            window.location.href = "/designstudio/"+ courseData.id;
       }
    }

    const onClickDuplicate = () => {
        setLoadingOpen(true);
        apiCourseGet(courseData.id)
        .then(response => {
            response.data['unit_title'] = response.data['unit_title'] + "_COPY";
            apiFileCourseImport(response.data)
            .then(
                response => {
                    setLoadingOpen(false);
                    displayMsg("success", "duplicated success");
                    window.location.reload();
                }
            )
        })
        .catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Error Occured");
            console.log(error);

        });
    }

    const onClickShare = () => {
        setShareDialogOpen(true)
    }

    const onClickDelete = () => {
        setDeleteDialogOpen(true)
    }

    const deleteCourse = () => {
        setLoadingOpen(true)
        apiCourseDelete(courseData.id).then(
            response => {
                setLoadingOpen(false)
                displayMsg("success", "Learning Design Deleted");
                location.reload();
            }
        )
        .catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Error Occured");
            console.log(error)
        });
    }

    const displayProgress = () => {
       if(courseData.is_finish){
            return "Finished";
       }else{
            return "In progress";
       }
    }

    return (
        <React.Fragment>
            <TableRow hover style = {{cursor: "pointer"}}>
                <TableCell component="th">
                    {courseData.is_pin? <LocalPlayIcon /> : <DashboardIcon /> }
                </TableCell>
                <TableCell component="th" scope="row"  onClick={onClickDesign}>
                    <Grid container>

                    </Grid>
                    <ListItemText 
                    primary={courseData.unit_title}  
                    secondary={"Created At:" + courseData.created_at + " || " + "Created By: " + creator.name + "@" + creator.school + " || " + "Progress: " + displayProgress() } />
                </TableCell>
                <TableCell component="th">
                    {
                        enableDuplicate?
                        <Tooltip title = "duplicate">
                            <IconButton aria-label="duplicate" onClick = {()=>{onClickDuplicate()}}>
                            <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        
                        :
                        null
                    }
                    {
                        enableShare?
                        <Tooltip title = "share">
                            <IconButton aria-label="share" onClick = {onClickShare}>
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        null
                    }
                  
                    {
                        enableDelete? 
                        <Tooltip title = "delete">
                            <IconButton aria-label="delete" onClick = {onClickDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        : 
                        null
                    }
                </TableCell>
            </TableRow>

            
            <CourseShareContainer  
                open={shareDialogOpen}   
                onClose={()=>setShareDialogOpen(false)} 
                courseData = {courseData} 
                usergroup = {usergroup}
            />


            <Dialog
                open={deleteDialogOpen}
                onClose={()=>setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
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

export default DesignItemContainer;
import React, { Component } from "react";

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const DesignComponentItem = (props) => {

    const {provided, snapshot, component, index, renameComponent, duplicateComponent, deleteComponent, taskTypeColor} = props;
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);
    const {enableEdit, enableDelete} = props;
    const [editName, setEditName] = React.useState(component.title);
    const [isEditName, setIsEditName] = React.useState(false);

    const getDraggable = (provided, snapshot) => {
        if(typeof provided == 'undefined'){
            return (
               null
            );
        }else{
            return (
                {
                    // styles we need to apply on draggables
                    ref: provided.innerRef,
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    style: getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )
                }
            );
        }
    }
    //#region Action Buttion Start
    const onChangeRenameComponent = (event) => {
        event.stopPropagation();
        setEditName(event.target.value);
    }

    const onClickRenameComponent = (event) =>{
        event.stopPropagation();
        setIsEditName(true)
    }
    const onClickComfirmRenameComponemt = (event) => {
        event.stopPropagation();
        var temp_component = {id: component.id, title: component.title};
        temp_component.title = editName;
        renameComponent(temp_component);
        setIsEditName(false)
    }

    const onClickCancelRenameComponemt = (event) => {
        event.stopPropagation();
        setEditName(component.title);
        setIsEditName(false)
    }

    const onClickDuplicateComponent = (event) =>{
        event.stopPropagation();
        duplicateComponent(component.id)
    }

    const onClickDeleteComponent = (event) => {
        event.stopPropagation();
        setDelDialogOpen(true)
    }
    //#endregion

    return(
        <React.Fragment>
              <ExpansionPanel {...getDraggable(provided, snapshot)} key = {index}>
                <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={2}>
                        <Grid item xs = {10}>
                            <ControlCameraIcon />
                            {
                                isEditName?
                                    <TextField id="component_title" label="title" variant="outlined" value = {editName} onChange = {onChangeRenameComponent} style = {{width : "75%"}} onClick={e => {e.stopPropagation()}}/>
                                    :
                                    <Typography display= "inline" style={{fontWeight: "bold"}} > {component.title}</Typography>
                            }
                           
                        </Grid>
                        <Grid item xs = {2}>
                            {
                                isEditName?
                                <React.Fragment>
                                    <Button onClick = {(e)=> onClickComfirmRenameComponemt(e)}  variant="contained" color="primary">
                                        Confirm
                                    </Button>
                                    <Button onClick = {(e)=> onClickCancelRenameComponemt(e)}  variant="contained" color="primary">
                                        Cancel
                                    </Button>
                                </React.Fragment>
                                :
                                <React.Fragment>

                                    {
                                        (enableEdit)?
                                        <Tooltip title="Rename Component" placement="top-end">
                                            <IconButton onClick ={(e)=>onClickRenameComponent(e)} data-tour = "component_step_rename">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        null
                                    }
                                    {
                                        (enableEdit)?
                                        <Tooltip title="Duplicate Component" placement="top-end">
                                            <IconButton onClick ={(e)=>onClickDuplicateComponent(e)} data-tour = "component_step_duplicate">
                                                <FileCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        null
                                    }
                                    {
                                        (enableDelete)?
                                        <Tooltip title="Delete Component" placement="top-end">
                                            <IconButton onClick ={(e)=>onClickDeleteComponent(e)} data-tour = "component_step_delete">
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        null
                                    }
                                </React.Fragment>
                            }
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            {
                                component.patterns.length > 0?
                                component.patterns[0].tasks.map(
                                    (_task) => 
                                    <Grid container>
                                        <Grid item xs = {1}> 
                                            <div style={taskTypeColor(_task.type)}/>
                                        </Grid>
                                        <Grid item xs = {11}>
                                            {_task.title}
                                        </Grid>
                                    </Grid>
                                )
                                :
                                null
                            }
                            {
                                component.tasks.map(
                                    (_task) => 
                                    <Grid container>
                                        <Grid item xs = {1}> 
                                            <div style={taskTypeColor(_task.type)}/>
                                        </Grid>
                                        <Grid item xs = {11}>
                                            {_task.title}
                                        </Grid>
                                    </Grid>
                                )
                            }
                            
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
             {/* <ListItem
                ContainerComponent="li"
                ContainerProps={{ ref: provided.innerRef }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )}
                >
                <ListItemIcon data-tour = "component_step_drag">
                    <DragHandleIcon />
                </ListItemIcon>
                <ListItemText
                    // primary={"Step" + (index+1)}
                    primary = {component.title}
                    // data-tour = "component_step_drag"
                />
                <ListItemSecondaryAction>
                    {
                        enableEdit?
                        <IconButton onClick ={()=>duplicateComponent(component.id)} data-tour = "component_step_duplicate">
                            <FileCopyIcon />
                        </IconButton>
                        :
                        null
                    }
                    {
                        enableDelete?
                        <IconButton onClick ={()=>setDelDialogOpen(true)} data-tour = "component_step_delete">
                            <DeleteIcon/>
                        </IconButton>
                        :
                        null
                    }
                   
                </ListItemSecondaryAction>
            </ListItem> */}
        
             <Dialog open={delDialogOpen} onClose={()=>{setDelDialogOpen(false)}}>
                <DialogTitle id="form-dialog-title">Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are You Sure To Delete Component #({index})
                        This action cannot be recovered after deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={()=>{setDelDialogOpen(false)}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{deleteComponent(component.id); setDelDialogOpen(false)} } color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
       
    );   
}

export default DesignComponentItem;
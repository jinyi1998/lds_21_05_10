import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Button
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const DesignComponentItem = (props) => {

    const {provided, snapshot, item, index, addItems, delItems} = props;
    const [delDialogOpen, setDelDialogOpen] = React.useState(false);

    return(
        <React.Fragment>
             <ListItem
                ContainerComponent="li"
                ContainerProps={{ ref: provided.innerRef }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                )}
                >
                <ListItemIcon>
                    <DragHandleIcon />
                </ListItemIcon>
                <ListItemText
                    primary={"Step" + (index+1)}
                    secondary = {item.title}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick ={()=>addItems(item.title)}>
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton onClick ={()=>setDelDialogOpen(true)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        
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
                    <Button onClick={()=>{delItems(index); setDelDialogOpen(false)} } color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
       
    );   
}

export default DesignComponentItem;
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DesignComponentSelPair from './componentSelPair';

const ComponentSelDialog = (props) => {
    const {handleClose, open, delItem} = props;

    const [component, setComponent] = React.useState("");

    const handleAdd = () => {
        delItem(component);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                Are you 
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick ={()=>handleAdd()}>
                    
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ComponentSelDialog;
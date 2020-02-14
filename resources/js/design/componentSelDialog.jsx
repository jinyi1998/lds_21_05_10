import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DesignComponentSelPair from './componentSelPair';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dialog: {
       
    },
    dialogContent: {
        margin: 10
    }
});
  
const ComponentSelDialog = (props) => {
    const {handleClose, open, addItems} = props;
    const classes = useStyles();
    const [component, setComponent] = React.useState("");

    const handleAdd = () => {
        addItems(component);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent className = {classes.dialogContent}>
                <DesignComponentSelPair component = {component} setComponent = {setComponent}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick ={()=>handleAdd()} color="secondary">
                    Add Design Step
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ComponentSelDialog;
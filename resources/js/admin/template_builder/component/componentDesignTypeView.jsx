import React from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import {AppContextStore} from '../../../container/app';

const ComponentDesignTypeView = (props) => {
    const { setLoadingOpen, options } = React.useContext(AppContextStore);

    const [locking, setLocking] = React.useState(true);
    const [warningOpen, setWarningOpen] = React.useState(false);
    const [designTypeID , setDesignTypeID] = React.useState(-1);

    React.useEffect(()=>{
        setLoadingOpen(true)
    }, [])
    
    React.useEffect(()=>{
        setDesignTypeID(props.designtype_id)
        setLoadingOpen(false)
    }
    ,[props.designtype_id])

    //#region local action
    const onChangeDesignType = (event) => {
        setDesignTypeID(event.target.value);
    }

    const onConfirmSave = () => {
        props.onChangeDesignType(designTypeID);
        setWarningOpen(false)
    }

    //#endregion

    return (
        <React.Fragment>
              <Grid container >
                <Grid item xs = {10}>
                    <Select fullWidth value = {designTypeID} disabled = {locking} onChange = {onChangeDesignType}>
                        {options.designType.map((_designType) => 
                            <MenuItem value = {_designType.id} key = {_designType.id}>{_designType.name}</MenuItem>
                        )}
                    </Select>
                </Grid>

                <Grid item xs = {2}>
                        {
                            locking?
                            <Button onClick = {()=>setLocking(false)}><LockOpenIcon /></Button>
                            :
                            <React.Fragment>
                                    <IconButton color="primary" onClick = {()=>setWarningOpen(true)}>
                                        <DoneIcon/>
                                    </IconButton>
                                    <IconButton color="secondary" onClick = {()=>setLocking(true)}>
                                        <CancelIcon/>
                                    </IconButton>
                                    {/* <Button  variant = "contained" color = "secondary" onClick = {()=>setLocking(true)}>Cancel</Button>
                                    <Button  variant = "contained" color = "primary" onClick = {()=>setWarningOpen(true)}>Confirm</Button> */}
                            </React.Fragment>
                        }
                </Grid>
                
            </Grid>

            <Dialog open={warningOpen} onClose={() => setWarningOpen(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to change the design type? This action will clear all your related component outcome!!!
                    </DialogContentText>
                </DialogContent>
        
                <DialogActions>
                    <Button onClick={() => setWarningOpen(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => onConfirmSave()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )

}

export default ComponentDesignTypeView;
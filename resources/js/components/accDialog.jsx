import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const AccDialog = (props) => {

    const {accDialogOpen, handleAccClose} = props;
    return (
        <Dialog open={accDialogOpen} onClose={()=> handleAccClose()} aria-labelledby="form-dialog-title">
            <form>
                <DialogTitle id="form-dialog-title">Account</DialogTitle>
                <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            id="firstName"
                            label="Name"
                            autoFocus
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Current Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            autoComplete="new-password"
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirm_new_password"
                            label="Confirm New Password"
                            type="password"
                            id="confirm_new_password"
                            autoComplete="current-password"
                        />
                    </Grid> 
                </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleAccClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAccClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AccDialog;
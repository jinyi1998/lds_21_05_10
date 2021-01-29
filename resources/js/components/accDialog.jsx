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
import config from 'react-global-configuration';
import validator from 'validator';
import {apiUserChangePassword} from '../api';

const AccDialog = (props) => {

    async function updatePassword() {

        return apiUserChangePassword(user).then((response)=>{
            if(response.data == "success"){
                handleAccClose();
              }else{
                setError({...error, password: "auth_fail, please check your password"})
              }
        });
      }

    const {accDialogOpen, handleAccClose} = props;

    const [error, setError] = React.useState({
        "email": "",
          "name": "",
          "password": "",
          "new_password": "",
          "new_password_confirm": "",
    });
      
    const validate = () => {
        var validated = true;
        var tempError = {
          "email": "",
          "name": "",
          "password": "",
          "new_password": "",
          "new_password_confirm": "",
        }
    
        if(validator.isEmpty(user.name.toString())){
            tempError["name"] = "Please enter the user name";
            validated = false;
        }

        if(validator.isEmpty(user.password.toString())){
            tempError["password"] = "Please enter the current password";
            validated = false;
          }

        if(validator.isEmpty(user.new_password.toString())){
            tempError["new_password"] = "Please enter the new password";
            validated = false;
        }

        if(validator.isEmpty(user.new_password_confirm.toString())){
            tempError["new_password_confirm"] = "Please enter the confirm new password ";
            validated = false;
        }
        

        if(user.new_password_confirm != user.new_password){
            tempError["new_password"] = "New password does not equal new_password_confirm .Please enter the new password";
            tempError["new_password_confirm"] = "Please check the confirm new password";
            validated = false;
        }
        setError(tempError);
        return validated;
    }

    const [user, setUser] = React.useState({
        "id": props.user.id,
        "name": props.user.name,
        "email": props.user.email,
        "password": "",
        "new_password": "",
        "new_password_confirm": "",
    });

    const onChange = (event) => {
        setUser( {...user, [event.target.id]: event.target.value});
    }

    const onClickSubmit = () => {
        if(validate()){
            updatePassword();
        }
    }

    return (
        <Dialog open={accDialogOpen} onClose={()=> handleAccClose()} aria-labelledby="form-dialog-title">
            <form>
                <DialogTitle id="form-dialog-title">Account</DialogTitle>
                <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            name="name"
                            variant="outlined"
                            value = {user.name}
                            required
                            id="name"
                            onChange = {onChange}
                            label="Name"
                            error = {! (error["name"]=="")}
                            helperText= {! (error["name"]=="")? error["name"]:  ""}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            required
                            id="email"
                            label="Email Address"
                            value = {user.email}
                            name="email"
                            onChange = {onChange}
                            error = {! (error["email"]=="")}
                            helperText= {! (error["email"]=="")? error["email"]:  ""}
                            disabled
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
                            onChange = {onChange}
                            value = {user.password}
                            error = {! (error["password"]=="")}
                            helperText= {! (error["password"]=="")? error["password"]:  ""}
                            id="password"
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
                            onChange = {onChange}
                            value = {user.new_password}
                            error = {! (error["new_password"]=="")}
                            helperText= {! (error["new_password"]=="")? error["new_password"]:  ""}
                            id="new_password"
                            autoComplete="new-password"
                        />
                    </Grid> 

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="new_password_confirm"
                            label="Confirm New Password"
                            type="password"
                            onChange = {onChange}
                            value = {user.new_password_confirm}
                            error = {! (error["new_password_confirm"]=="")}
                            helperText= {! (error["new_password_confirm"]=="")? error["new_password_confirm"]:  ""}
                            id="new_password_confirm"
                        />
                    </Grid> 
                </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleAccClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{onClickSubmit()}} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AccDialog;
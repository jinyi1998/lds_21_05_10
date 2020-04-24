import React from 'react';
import ReactDOM from 'react-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  FormLabel,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import config from 'react-global-configuration';
import validator from 'validator';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          VillayalliV
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
const LoginForm = () => {
    const classes = useStyles();
    const [data, setData] = React.useState({
      "email": "",
      "password": "",
    })
    const onClick = (event) => {
        event.preventDefault();
        // window.location.href = "/mydesign";
        if(validate()){
          document.form.submit();
        }
        console.log(data);
    };

    const dataOnChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      })
    }

    const [error, setError] = React.useState({
      "name": "",
      "email": "",
      "password": "",
    });
    
    const validate = () => {
      var validated = true;
      var tempError = {
        "name": "",
        "email": "",
        "password": "",
      }
  
      // if(validator.isEmpty(data.name.toString())){
      //   tempError["name"] = "Please enter the user name";
      //   // setError({...error, level: "Please enter the course level"})
      //   validated = false;
      // }
  
  
      if(!validator.isEmail(data.email.toString())){
        tempError["email"] = "Please enter the correct email";
        // setError({...error, unitTitle: "Please enter the course unit title"})
        validated = false;
      }
  
      if(validator.isEmpty(data.password.toString())){
        tempError["password"] = "Please enter the password";
        // setError({...error, level: "Please enter the course level"})
        validated = false;
      }
      setError(tempError);
      return validated;
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign In
                </Typography>
                <form id="form" name="form" className={classes.form} method="POST" action="login">
                    <Grid container spacing={2}>
                    
                        <Grid item xs={12}>
                          <FormLabel name="lbl_email">E-Mail Address:</FormLabel>
                          <TextField 
                            name ="email" 
                            value={data.email} 
                            onChange = {dataOnChange}  
                            error = {! (error["email"]=="")}
                            helperText= {! (error["email"]=="")? error["email"]:  ""}
                            fullWidth/>
                        </Grid>

                        <Grid item xs={12}>
                          <FormLabel name="lbl_password">Password:</FormLabel>
                          <TextField 
                            name ="password" 
                            type = "password"
                            value={data.password} 
                            onChange = {dataOnChange} 
                            error = {! (error["password"]=="")}
                            helperText= {! (error["password"]=="")? error["password"]:  ""}
                            fullWidth/>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick = {onClick}
                    >
                        Sign In
                    </Button>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      href="/"
                    >
                      Cancel
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="register" variant="body2">
                            Do not have an account? Register!
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default LoginForm;

if (document.getElementById('loginForm')) {
    ReactDOM.render(<LoginForm />, document.getElementById('loginForm'));
}

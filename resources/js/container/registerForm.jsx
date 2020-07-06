import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from 'react-global-configuration';
import validator from 'validator';

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
  
const RegisterForm = (props) => {

    const classes = useStyles();

    const [data, setData] = React.useState({
      "name": "",
      "email": "",
      "school": "",
      "password": "",
      "passwordcomfirm": ""
    })

    const dataOnChange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      })
    }

    const onClick = (event) => {
      event.preventDefault();
      // window.location.href = "/designstudio";
      if(validate()){
        // console.log(JSON.stringify(data));
        register();
      }
  };


  const [error, setError] = React.useState({
    "name": "",
    "email": props.errors.email? props.errors.email : "",
    "school": "",
    "password": props.errors.password? props.errors.password : "",
    "passwordcomfirm": props.errors.passwordcomfirm? props.errors.passwordcomfirm : "",
  });
  
  const validate = () => {
    var validated = true;
    var tempError = {
      "name": "",
      "email": "",
      "school": "",
      "password": "",
      "passwordcomfirm": "",
    }

    if(validator.isEmpty(data.name.toString())){
      tempError["name"] = "Please enter the user name";
      validated = false;
    }


    if(!validator.isEmail(data.email.toString())){
      tempError["email"] = "Please enter the correct email";
      validated = false;
    }

    if(validator.isEmpty(data.school.toString())){
      tempError["school"] = "Please enter the school";
      validated = false;
    }

    if(validator.isEmpty(data.password.toString())){
      tempError["password"] = "Please enter the password";
      validated = false;
    }

    if(data.password != data.passwordcomfirm){
      tempError["password"] = "Please check the password again. The password is different from password comfirm.";
      tempError["passwordcomfirm"] = "Please check the password again. The password is different from password comfirm.";
      validated = false;
    }

    setError(tempError);
    return validated;
  }
  async function register() {
    document.form.submit();
  }
    
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form id= "form" name="form" className={classes.form}  action="/register" method="POST">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value = {data.name}
                  onChange = {dataOnChange}
                  error = {! (error["name"]=="")}
                  helperText= {! (error["name"]=="")? error["name"]:  ""}
                  autoFocus
                />
              </Grid>
           
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value = {data.email}
                  onChange = {dataOnChange}
                  error = {! (error["email"]=="")}
                  helperText= {! (error["email"]=="")? error["email"]:  ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="school"
                  label="School"
                  name="school"
                  value = {data.school}
                  onChange = {dataOnChange}
                  error = {! (error["school"]=="")}
                  helperText= {! (error["school"]=="")? error["school"]:  ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value = {data.password}
                  onChange = {dataOnChange}
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
                  name="passwordcomfirm"
                  label="Password Comfirm"
                  type="password"
                  value = {data.passwordcomfirm}
                  onChange = {dataOnChange}
                  error = {! (error["passwordcomfirm"]=="")}
                  helperText= {! (error["passwordcomfirm"]=="")? error["passwordcomfirm"]:  ""}
                  id="passwordcomfirm"
                />
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
              Sign Up
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
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

            <input type="hidden" name = "_token" value = {$('meta[name="csrf-token"]').attr('content')} />
          </form>
        </div>
      </Container>
    );
  }
export default RegisterForm;

if (document.getElementById('registerForm')) {

    var errors =  {};
    try {
       errors =  JSON.parse(document.getElementById('registerForm').dataset.errors);
    } catch (e) {

    }
    ReactDOM.render(<RegisterForm errors = {errors}/>, document.getElementById('registerForm'));
}

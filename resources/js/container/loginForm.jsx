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
    const onClick = (event) => {
        event.preventDefault();
        window.location.href = "/mydesign";
    };

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
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <FormLabel name="lbl_email">E-Mail:</FormLabel>
                        <TextField name ="email" defaultValue="" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                        <FormLabel name="lbl_password">Password:</FormLabel>
                        <TextField name ="password" defaultValue="" fullWidth/>
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

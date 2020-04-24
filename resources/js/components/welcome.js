import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
  
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://www.indianstudentsgermany.org/wp-content/uploads/2016/12/students_can_make_studying_fun_and_efficient_by_using_memory_tools-678x381.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '50% 10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGrid: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 55,
    right:10
  },
  btn: {
    width: 150,
    marginLeft: 20
  }
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Learning Design Studio
          </Typography>
          <br/>
          <Typography component="h3">
            Learning Design Studio is a one-stop platform for you to prepare learing design for enhancing the lesson quality. 
            Accessible from anywhere, you will find the strong support on pedagogies with customerized tempplates and useful tips. 
          </Typography>
          <br/>
          <Button variant="contained" color="primary" href="register">
              LET's GET STARTED
          </Button>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
        <Grid item xs={false} sm={4} md={7} className={classes.btnGrid}>
            <Button variant="contained" color="primary" href="login" className={classes.btn}>
                Log in
            </Button>
            <Button variant="contained" color="primary" onClick={()=> window.open("https://ldshe.cite.hku.hk/users/about/guide.php", "_blank")} className={classes.btn}>
                Watch a demo
            </Button>
        </Grid> 
      </Grid>
    </Grid>
  );
}


if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}

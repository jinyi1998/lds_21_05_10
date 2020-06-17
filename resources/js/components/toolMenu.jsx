import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import config from 'react-global-configuration';

import LangDialog from './languageDialog';
import AccDialog from './accDialog';

const ToolMenu = (props) => {
     //user menu 
    const {user} = props;
    const [displayTourguide, setDisplayTourguide] = React.useState(props.user.display_tourguide == 1);
    const [anchorEl, setUserMenuOpen] = React.useState(null);

    const onClickUserIcon = event => {
        setUserMenuOpen(event.currentTarget);
    };

    const OnCloseUserMenu = (type) => {
        switch(type){
            default:
                break;
            case 'language':
                handleLangOpen();
                break;
            case 'myaccount':
                handleAccOpen(); 
                break;
            case 'logout':
                location.href = "/logout";
                break;
        }
        setUserMenuOpen(null);
    };

    const OnChnageTourGuide = () => {
        var test = !displayTourguide;
        setDisplayTourguide(test);
        setUserDisplayTourGuide(test);
    }

    async function setUserDisplayTourGuide(enable) {
        const res = await fetch(
            'http://'+config.get('url')+'/api/user/tourguide',
            {
                method: "PUT",
                body:  JSON.stringify({
                    "display_tourguide": enable
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then(res => res.json())
            .then(response => {
                location.reload();
            })
        .catch(error => console.log(error));
    }

    // lang dailog
    const [langDialogOpen, setLangOpen] = React.useState(false);

    const handleLangOpen = () => {
        setLangOpen(true);
    };
  
    const handleLangClose = () => {
        setLangOpen(false);
    };

    // my account dailog
   const [accDialogOpen, setAccOpen] = React.useState(false);

   const handleAccOpen = () => {
        setAccOpen(true);
   };
 
   const handleAccClose = () => {
        setAccOpen(false);
   };


    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={onClickUserIcon}>
                <NotificationsIcon />
            </Button>

            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={OnCloseUserMenu}
            >   
               
                <Card variant="outlined" >
                    <Grid container alignContent="center" alignItems= "center" justify = "center" spacing={1}>
                        <Grid item xs ={12} container alignContent="center" alignItems= "center" justify = "center">
                            <Avatar> {user.name.substring(0, 1)}</Avatar> 
                        </Grid>
                        <Grid item xs ={12} container alignContent="center" alignItems= "center" justify = "center">
                        <Typography  color="textPrimary">
                                {user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs ={12} container alignContent="center" alignItems= "center" justify = "center">
                        <Typography variant="body2" component="p" color="textSecondary">
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs ={12} container alignContent="center" alignItems= "center" justify = "center">
                            <Button size="small" onClick={()=>OnCloseUserMenu('myaccount')}>Change your password</Button>
                        </Grid>
                    </Grid>
                </Card>
                <MenuItem >
                    <FormControlLabel
                        control={<Switch checked = {displayTourguide} onChange={()=>{OnChnageTourGuide()}}/>}
                        label="Turn On Design Studio Tutourial"
                    />
                </MenuItem>
                <MenuItem onClick={()=> OnCloseUserMenu('language')}>Language Setting</MenuItem>
                <MenuItem onClick={()=>OnCloseUserMenu('logout')}>Logout</MenuItem>
             
            </Menu>

            <AccDialog accDialogOpen = {accDialogOpen}  handleAccClose = {handleAccClose} user = {user}/>
            <LangDialog langDialogOpen = {langDialogOpen} handleLangClose = {handleLangClose}/>
            
        </div>
    );
}

export default ToolMenu;
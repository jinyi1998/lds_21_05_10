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

import LangDialog from './languageDialog';
import AccDialog from './accDialog';

const ToolMenu = () => {
     //user menu 
    const [anchorEl, setUserMenuOpen] = React.useState(null);

    const onClickUserIcon = event => {
        setUserMenuOpen(event.currentTarget);
    };

    const OnCloseUserMenu = (type) => {
        switch(type){
            default:
            case 'language':
                handleLangOpen();
                break;
            case 'myaccount':
                handleAccOpen(); 
                break;
            case 'logout':
                location.href = "login";
                break;
        }
        setUserMenuOpen(null);
    };

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
                <MenuItem onClick={()=> OnCloseUserMenu('language')}>Lanuage Setting</MenuItem>
                <MenuItem onClick={()=>OnCloseUserMenu('myaccount')}>My account</MenuItem>
                <MenuItem onClick={()=>OnCloseUserMenu('logout')}>Logout</MenuItem>
            </Menu>

            <AccDialog accDialogOpen = {accDialogOpen}  handleAccClose = {handleAccClose}/>
            <LangDialog langDialogOpen = {langDialogOpen} handleLangClose = {handleLangClose}/>
            
        </div>
    );
}

export default ToolMenu;
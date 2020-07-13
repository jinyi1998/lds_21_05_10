import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UsergroupListViewCard from '../component/usergroupListViewCard';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import UsergroupInfoEditView from '../component/usergroupInfoEditView';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import config from 'react-global-configuration';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    apiUserUsergroupList, apiUserUsergroupCreate,
    apiUserUsergroupUserCreate
  } from '../../api.js';

export const ContextStore = React.createContext({
    setLoadingOpen: ()=> {},
    user: {}
});

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

  
const UsergroupsListViewContainer = (props) => {
    const classes = useStyles();
    const [usergroups, setUsergroups] = React.useState([]);
    const [usergroup, setUsergroup] = React.useState({
        "name": "",
        "description": "",
        "type": 1,
    });
    const [user, setUser] = React.useState(JSON.parse(props.user));

    const [createGroupViewOpen, setCreateGroupViewOpen] = React.useState(false);
    const [joinGroupWarningOpen, setJoinGroupWarningOpen] = React.useState(false);
    const [loadingOpen, setLoadingOpen] = React.useState(false)

    React.useEffect(()=>{
        fetchusergroups()
    }, [])


    //#region API Data
    async function fetchusergroups() {
        setLoadingOpen(true)

        await apiUserUsergroupList()
        .then(response => {
            setUsergroups(response.data)
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }

    async function createUsergroup() {
        setLoadingOpen(true)
        var json = {
            ...usergroup,
            users: [{
                "user_id": user.id
            }]
        }
        await apiUserUsergroupCreate(json)
        .then(response => {
            fetchusergroups()
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }

    async function userJoinUsergroup(usergroup_id) {
        setLoadingOpen(true)
        var json = {
            'user_id': user.id,
            'usergroup_id': usergroup_id
        }
        await apiUserUsergroupUserCreate(json)
        .then(response => {
            fetchusergroups()
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }

    //#endregion

    const onClickCreateGroup = () => {
        setUsergroup({
            "name": "",
            "description": "",
            "type": 1,
        })
        setCreateGroupViewOpen(true)
    }

    const onClickCreateGroupSave = () => {
        createUsergroup();
        setCreateGroupViewOpen(false);
    }

    const displayPublicUserGroups = () => {
        return (
            <Grid container margin = {3} item xs={12}>
            <Paper style={{minHeight: "500px", padding: 16, width: '100%'}}>
                <Typography variant="subtitle1" color = "textSecondary" gutterBottom>
                    Public Group 
                </Typography>
            
                <Grid container item xs={12} spacing = {4}>
                    {usergroups.filter(_usergroup => _usergroup.type == 1).length == 0?
                        <Grid container item  xs={12}>
                          No Public Group @ this moment
                        </Grid>
                        :
                        usergroups.filter(_usergroup => _usergroup.type == 1).map( _usergroup => 
                        <Grid container item  xs={4} key = {_usergroup.id}>
                            <UsergroupListViewCard 
                                usergroup = {_usergroup} 
                                user = {user} 
                                userJoinUsergroup = {userJoinUsergroup} 
                                key = {_usergroup.id} 
                                setJoinGroupWarningOpen = {setJoinGroupWarningOpen}/>
                        </Grid>
                    )}
                </Grid>
            </Paper>
            </Grid>
        );
    }

    const displayPrivateUserGroups = () => {
        return (
            <Grid container margin ={3} item xs={12}>
            <Paper  style={{minHeight: "500px", padding: 16, width: '100%'}}>
                <Typography variant="subtitle1" color = "textSecondary" gutterBottom>
                    Prive Group 
                </Typography>
            
                <Grid container item xs={12} spacing = {4} >
                    {usergroups.filter(_usergroup => _usergroup.type == 2).length == 0?
                        <Grid container item  xs={12}>
                          You have not yet join any private group
                        </Grid>
                        :
                        usergroups.filter(_usergroup => _usergroup.type == 2).map( _usergroup => 
                            <Grid container item  xs={4} key = {_usergroup.id}>
                                <UsergroupListViewCard 
                                    usergroup = {_usergroup}  
                                    user = {user} 
                                    userJoinUsergroup = {userJoinUsergroup} 
                                    key = {_usergroup.id} 
                                    setJoinGroupWarningOpen = {setJoinGroupWarningOpen}/>
                            </Grid>
                    )}
                </Grid>
            </Paper>
            </Grid>
        );
    }

    return (
        <ContextStore.Provider
        value = {{
            setLoadingOpen: setLoadingOpen,
            user: user
        }}
        >
            <React.Fragment>
                <Backdrop className={classes.backdrop} open={loadingOpen} onClick={() => setLoadingOpen(false)}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Grid container spacing = {2}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={onClickCreateGroup}  startIcon={<AddIcon />} >
                            Add Group
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {displayPublicUserGroups()}
                    </Grid>

                    <Grid item xs={12}>
                    {displayPrivateUserGroups()}
                    </Grid>
                </Grid>

                <Dialog open={createGroupViewOpen} onClose={() => setCreateGroupViewOpen(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                    <DialogTitle id="form-dialog-title">Create User group </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You may create your own user group here...
                        </DialogContentText>
                        <UsergroupInfoEditView usergroup = {usergroup} setUsergroup = {setUsergroup}/>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setCreateGroupViewOpen(false)} >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick = {() => onClickCreateGroupSave()}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog open={joinGroupWarningOpen} onClose={() => setJoinGroupWarningOpen(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                    <DialogTitle id="form-dialog-title">Warning </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You need to join the group first...
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setJoinGroupWarningOpen(false)} >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ContextStore.Provider>
    );
}
export default UsergroupsListViewContainer;
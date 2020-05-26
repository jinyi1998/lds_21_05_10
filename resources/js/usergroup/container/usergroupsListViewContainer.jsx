import React from 'react';
import ReactDOM from 'react-dom';
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

const UsergroupsListViewContainer = (props) => {
    const [usergroups, setUsergroups] = React.useState([]);
    const [usergroup, setUsergroup] = React.useState({
        "name": "",
        "description": "",
        "type": 1,
    });
    const [user, setUser] = React.useState(JSON.parse(props.user));
    console.log(user);
    const [createGroupViewOpen, setCreateGroupViewOpen] = React.useState(false);
    const [joinGroupWarningOpen, setJoinGroupWarningOpen] = React.useState(false);

    React.useEffect(()=>{
        fetchusergroups()
    }, [])


    //#region API Data
    async function fetchusergroups() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/usergroup/',
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            setUsergroups(response)
        })
        .catch(error => console.log(error));
    }

    async function createUsergroup() {
        var json = {
            ...usergroup,
            users: [{
                "user_id": user.id
            }]
        }
        const res = await fetch(
            'http://'+config.get('url')+'/api/usergroup/',
            {
                method: "POST",
                body:  JSON.stringify(json),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        .then(res => res.json())
        .then(response => {
            // setUsergroups(response)
            fetchusergroups()
        })
        .catch(error => console.log(error));
    }

    async function userJoinUsergroup(usergroup_id) {
        var json = {
            'user_id': user.id,
            'usergroup_id': usergroup_id
        }
        const res = await fetch(
            'http://'+config.get('url')+'/api/usergroupuser',
            {
                method: "POST",
                body:  JSON.stringify(json),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        .then(res => res.json())
        .then(response => {
            // setUsergroups(response)
            fetchusergroups()
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
        <React.Fragment>
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
    );
}
export default UsergroupsListViewContainer;

if (document.getElementById('usergroups')) {
    ReactDOM.render(<UsergroupsListViewContainer user = {document.getElementById('topmenu').dataset.user}/>, document.getElementById('usergroups'));
}
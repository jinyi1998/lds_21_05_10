import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import config from 'react-global-configuration';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {ContextStore} from '../container/usergroupContainer';


const UsergroupMemberList = (props) => {
    const {approveUserJoinGroup, declineUserJoinGroup, removeUser} = props;
    const [usergroup, setUsergroup] = React.useState(props.usergroup);
    const { setLoadingOpen } = React.useContext(ContextStore);


    React.useEffect(()=>{
        setUsergroup(props.usergroup);
    },[props])


    //#region action button relation
    const onClickApprove = (user) => {
        approveUserJoinGroup(user.relation_id);
    }

    const onClickDecline = (user) => {
        declineUserJoinGroup(user.relation_id);
    }

    const onClickRemove = (user) => {
        removeUser(user.relation_id);
    }
    //#endregion

    return (
        <React.Fragment>
        <Grid container spacing={4} justify="space-between">
            <Grid item xs = {12}>
                <Typography variant="h6" color="inherit" noWrap>
                    User Group Membership Area
                </Typography>
            </Grid>
             
             
            <Grid item xs = {12}>
                <Paper>
                    <List>
                       <ListSubheader> Current Group Users</ListSubheader>
                       {
                           usergroup.users.length == 0? 
                            <ListItem key = {1}>
                                No Members...
                            </ListItem>
                            :
                            usergroup.users.map(user => 
                                <ListItem key = {user.id}>
                                    <ListItemIcon>
                                        <DashboardOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={user.name+" @ "+user.school}  
                                        secondary={"Join date:" + user.created_at }
                                    />
                                    <ListItemSecondaryAction>
                                        {
                                            user.id == usergroup.create_by?
                                            null
                                            :
                                            <ListItemIcon aria-label="remove" onClick = {()=>onClickRemove(user)}>
                                                <DeleteOutlineIcon />
                                            </ListItemIcon>
                                        }
                                       
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                       }
                        <ListSubheader> Waiting Approve Group Users</ListSubheader>
                        {
                           usergroup.userstemp.length == 0? 
                            <ListItem key = {1}>
                                No user request to join this group...
                            </ListItem>
                            :
                            usergroup.userstemp.map(user => 
                                <ListItem key = {user.id}>
                                    <ListItemIcon>
                                    <DashboardOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={user.name+" @ "+user.school}  
                                        secondary={"Join date:" + user.created_at }
                                    />
                                    <ListItemSecondaryAction>
                                        {/* <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CheckCircleIcon />}
                                            onClick = {onClickApprove}
                                        >
                                            Approve
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<CancelIcon />}
                                            onClick = {onClickDecline}
                                        >
                                            Decline
                                        </Button> */}
                                       

                                        <IconButton aria-label="approve" onClick = {()=> onClickApprove(user)}> 
                                            <CheckCircleIcon />
                                        </IconButton>
                    
                                        <IconButton aria-label="decline" onClick = {()=> onClickDecline(user)}>
                                            <CancelIcon />
                                        </IconButton>
                    
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                       }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </React.Fragment>  
    )
}
export default UsergroupMemberList;

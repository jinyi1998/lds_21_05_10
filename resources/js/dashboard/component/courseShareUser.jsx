import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import PermissionSelectBox from './permissionSelectBox';
import UserSearchBox from '../../components/userSearchBox';

const CourseShareUser = (props) => {
    const [userPermission, setUserPermission] = React.useState(props.permissionArr['user_permission']);

    const setPermission = (id, value) => {
        var userPermission_json =  JSON.parse(JSON.stringify(userPermission));
        if( userPermission_json.filter( x => x.user_id == id).length > 0){
            userPermission_json.find( x => x.user_id == id).permission = value;
            setUserPermission(userPermission_json)
        }
    }

    const userOnClick = (user) => {
        var userPermission_json =  JSON.parse(JSON.stringify(userPermission));
        if( userPermission_json.filter( x => x.user_id == user.id).length > 0){
            //do nothing
        }else{
            let newPermission = {
                course_id: props.courseid,
                user_id: user.id,
                name: user.name,
                permission: 1
            }

            setUserPermission([...userPermission, newPermission])
        }
    }

    React.useEffect(()=> {
        props.setPermissionArr({
            ...props.permissionArr,
            'user_permission': userPermission
        })
    },[userPermission])

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs = {12}>
                    <UserSearchBox userOnClick = {userOnClick} />
                </Grid>
                <Grid item xs = {12}> 
                    <List>
                    {
                        userPermission.length > 0?
                        userPermission.map(_user=>
                                <ListItem key={_user.user_id} role={undefined} dense style = {{padding : 10}}>

                                    <ListItemText id={_user.user_id} primary={_user.name} />

                                    <ListItemSecondaryAction style = {{width: 300}}>
                                        <PermissionSelectBox id = {_user.user_id} permission = {_user.permission} setPermission = {setPermission}/> 
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        :
                        <ListItem dense button>
                            No User
                        </ListItem>
                    }
                    </List>
                  
                </Grid>
            </Grid>
      
        </React.Fragment>
    )
}

export default CourseShareUser;
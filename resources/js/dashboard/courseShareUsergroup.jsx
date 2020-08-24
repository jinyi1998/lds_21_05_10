import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PermissionSelectBox from './permissionSelectBox';


const CourseShareUsergroup = (props) => {
    const [usergroup, setUsergroup]= React.useState(props.usergroup);
    const [usergroupPermission, setUsergroupPermission] = React.useState(props.permissionArr['usergroup_permission']);

    React.useEffect(()=>{
        setUsergroup(props.usergroup);
    }, [props.usergroup])

    React.useEffect(()=>{
        props.setPermissionArr({
            ...props.permissionArr,
            'usergroup_permission': usergroupPermission
        })
    },[usergroupPermission])

    const setPermission = (id, value) => {
        var usergroupPermission_json =  JSON.parse(JSON.stringify(usergroupPermission));
        if( usergroupPermission_json.filter( x => x.usergroup_id == id).length > 0){
            usergroupPermission_json.find( x => x.usergroup_id == id).permission = value;
            setUsergroupPermission(usergroupPermission_json)
        }else{
            let new_usergroupPermission = {
                course_id: props.courseid,
                usergroup_id: id,
                permission: value
            }

            setUsergroupPermission([...usergroupPermission_json, new_usergroupPermission])
        }
    }

    return (
        <List>
        {
            usergroup.length > 0?
                usergroup.map(_usergroup=>
                    <ListItem key={_usergroup.id} role={undefined} dense style = {{padding : 10}}>

                        <ListItemText id={_usergroup.id} primary={_usergroup.name} />

                        <ListItemSecondaryAction style = {{width: 300}}>
                            <PermissionSelectBox 
                            id={_usergroup.id} 
                            permission = {usergroupPermission.find( x => x.usergroup_id == _usergroup.id)? usergroupPermission.find( x => x.usergroup_id == _usergroup.id).permission : -1} 
                            setPermission = {setPermission} />
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            :
            <ListItem dense button>
                No Available User Group
            </ListItem>
        }
        </List>
    );
}

export default CourseShareUsergroup;
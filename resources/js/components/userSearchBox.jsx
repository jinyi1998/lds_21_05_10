import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import {apiUserSearch} from '../api';
import CircularProgress from '@material-ui/core/CircularProgress';


const UserSearchBox = (props) => {
    const [userList, setUserList] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [loading, setLoadling] = React.useState(false);


    const onSearch = (event) => {
        setSearch(event.target.value)
    }

    const userOnClick = (user) => {
        props.userOnClick(user)
    }

    React.useEffect(()=> {
        if(search.length > 3 ){
            setLoadling(true)
            apiUserSearch(search)
            .then((response)=>{
                setUserList(response.data);
                setLoadling(false);
                // setSearch("");
            })
        }else{
            setUserList([]);
        }
    }, [search])

    

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs = {12}>
                    <TextField id="outlined-basic" label="Search User" variant="outlined" value = {search} onChange = {onSearch} fullWidth/>
                </Grid>

                <Grid item xs = {12}>
                    
                </Grid>

                <Grid item xs = {12}>
                    {
                        userList.length > 0?
                            <Paper style = {{padding: 10}}>
                            {
                                loading == true?
                                <React.Fragment>
                                    <CircularProgress color = "secondary"/>
                                </React.Fragment>
                                :
                                <List>
                                {     
                                    userList.map(_user=>
                                        <ListItem key={_user.id} role={undefined} dense  button style = {{padding : 5}} >
                                            <ListItemIcon>
                                                <PermIdentityIcon />
                                            </ListItemIcon>
                    
                                            <ListItemText id={_user.id} primary={_user.name} secondary = {_user.email}/>
                    
                                            <ListItemSecondaryAction style = {{minWidth: 200}}>
                                                <PersonAddIcon onClick = {() => userOnClick(_user)}/>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )

                                }
                                </List>
                            }   
                            </Paper> 
                        :
                        null   
                    }
                      
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UserSearchBox;
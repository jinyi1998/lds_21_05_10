import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DesigmItem from '../../dashboard/designItem';
import Typography from '@material-ui/core/Typography';
import config from 'react-global-configuration';
import {ContextStore} from '../container/usergroupContainer';

const UsergroupDesign = (props)=>{

    const [courseList, setCourseList] = React.useState([]);
    const [usergroup, setUsergroup] = React.useState([]); 
    const { user, setLoadingOpen } = React.useContext(ContextStore);

    //call api to get the data
    async function fetchData() {
        setLoadingOpen(true)
        const res = await fetch(
            'http://'+config.get('url')+'/api/course/showUsergroup/'+props.usergroupid,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setCourseList(response);
                setLoadingOpen(false)
                // console.log(response);
        })
        .catch(error => console.log(error));

    }
    
    async function fetchUsergroupData() {
        setLoadingOpen(true)
        const res = await fetch(
            'http://'+config.get('url')+'/api/course/getAvaUserGroup/',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setUsergroup(response);
                setLoadingOpen(false)
                // console.log(response);
        })
        .catch(error => console.log(error));

    }

    React.useEffect(() => {
        fetchData();
        fetchUsergroupData();
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={4} justify="space-between">
                <Grid item xs = {12}>
                    <Typography variant="h6" color="inherit" noWrap>
                        User Group Sharing Design Aera
                    </Typography>
                </Grid>
                 
                 
                <Grid item xs = {12}>
                    <Paper>
                        <List>
                           {
                               courseList.length == 0? 
                                <ListItem>
                                    no available design
                                </ListItem>
                                :
                                courseList.map(_course => 
                                    <DesigmItem 
                                        key ={_course.id} 
                                        courseData = {_course}
                                        usergroup = {usergroup}
                                        enableShare = {false}
                                        enableDelete = {false}
                                    />
                                )
                           }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>  
    );
}
export default UsergroupDesign;
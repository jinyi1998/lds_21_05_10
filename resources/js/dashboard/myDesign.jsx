import React from 'react';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DesigmItem from './designItem';
import Typography from '@material-ui/core/Typography';
import config from 'react-global-configuration';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {apiUserAvaGroup, apiCourseList, apiFileCourseImport} from '../api.js';

const MyDesign = (props)=>{

    const [courseList, setCourseList] = React.useState([]);
    const [usergroup, setUsergroup] = React.useState([]); 

    // const {setImportJson} = props;
    // const {handleListItemClick, setCourseID} = props;

    let fileReader = new FileReader();
    fileReader.onload = event => {
        apiFileCourseImport(JSON.parse(event.target.result))
        .then(response => {
            // console.log(response);
            window.location.reload(false); 
        });
    };

    const handleFile = (event) => {
        fileReader.readAsText(event.target.files[0])
    }

    //call api to get the data
    async function fetchData() {

        await apiCourseList()
            .then(response => {
                setCourseList(response.data);
        })
        .catch(error => console.log(error));

    }
    
    async function fetchUsergroupData() {
        await apiUserAvaGroup().then(response => {
            setUsergroup(response.data);
        })
        .catch(error => console.log(error));
    }

    React.useEffect(() => {
        fetchData();
        fetchUsergroupData();
    }, []);

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        My Design Area
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "designstudio"} }>
                        Add new design
                    </Button>
                    <Button variant="contained"component="label" color='secondary'>
                        <CloudUploadIcon />
                        Upload File
                        <input
                            type="file"
                            accept=".json"
                            onChange = {handleFile}
                            hidden
                        />
                    </Button>
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
                                        enableShare = {true}
                                        enableDelete = {true}
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
export default MyDesign;
if (document.getElementById('mydesign')) {
    ReactDOM.render(<MyDesign/>, document.getElementById('mydesign'));
}
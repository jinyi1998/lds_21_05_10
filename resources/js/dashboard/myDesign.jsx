import React from 'react';
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

const MyDesign = (props)=>{

    const [courseList, setCourseList] = React.useState([]);

    const {setImportJson} = props;
    const {handleListItemClick, setCourseID} = props;

    let fileReader = new FileReader();
    fileReader.onload = event => {
        setImportJson(JSON.parse(event.target.result));
        setCourseID(1);
        handleListItemClick(event, 'design');
    };

    const handleFile = (event) => {
        fileReader.readAsText(event.target.files[0])
    }

    //call api to get the data
    async function fetchData() {

        const res = await fetch(
            'http://'+config.get('url')+'/api/course/',
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
            setCourseList(response);
            // console.log(courseList);
            // console.log(response);
        })
        .catch(error => console.log(error));

    }
    
    React.useEffect(() => {
        if(config.get('enableDB')){
            fetchData();
        }
    }, []);


    const buttonOnClick = (event) => {
        handleListItemClick(event, 'design');
        setCourseID(-1);
    }

    const displayCourseList = () => {
        if(Object.entries(courseList).length === 0 && courseList.constructor === Object || courseList.length == 0){
            return (
                <ListItem>
                  no available design
                </ListItem>
            );
        }else{
            return (
            <div>
                {Object.keys(courseList).map((_key_courseList) =>  
                    <DesigmItem 
                    key ={_key_courseList} 
                    courseData = {courseList[_key_courseList]}
                    setCourseID = {setCourseID} 
                    handleListItemClick = {handleListItemClick}
                /> ) }
            </div>);
        }
    }



    return (
        <React.Fragment>
            <Grid container spacing={4} justify="space-between">
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Learning Design Studio
                    </Typography>
                </Grid>
                 
                 
                <Grid item xs = {4}>
                    
                    {config.get("enableDB")?  
                        null
                        :
                        (
                            
                        <React.Fragment>
                            <Button
                            variant="contained"
                            component="label"
                            >
                                <CloudUploadIcon />
                                Upload File
                                <input
                                    type="file"
                                    onChange = {handleFile}
                                    hidden
                                />
                            </Button>
                        </React.Fragment>)
                    }
                    <Button variant="contained" color="primary" onClick={ (event)=> buttonOnClick(event) }>
                        Add new design
                    </Button>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <List>
                            <div>
                                {displayCourseList()}
                            </div>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>  
    );
}
export default MyDesign;
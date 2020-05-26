import React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const UsergroupInfoEditView = (props) => {
    const syncUsergroup = props.setUsergroup;
    const [usergroup, setUsergroup] = React.useState(props.usergroup);

    const handleChange = (event) => {
        switch(event.target.name){
            case "usergroup_type":
                setUsergroup({...usergroup ,type: event.target.value})
                break;
            case "groupname":
                setUsergroup({...usergroup ,name: event.target.value})
                break;
            case "description":
                setUsergroup({...usergroup ,description: event.target.value})
                break;
        }
    }

    React.useEffect(()=> {
        syncUsergroup(usergroup)
    }, [usergroup])

    return (
        <React.Fragment>
            <Paper style = {{padding: 16}}>
                <Grid container spacing = {4}>
                    <Grid item xs = {12}>
                        <FormControl fullWidth>
                            <InputLabel id="usergroup-type-label">User Group Type</InputLabel>
                            <Select
                                labelId="usergroup-type-label"
                                id="usergroup-type-select"
                                name = "usergroup_type"
                                value={usergroup.type}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value={1}>Public Group</MenuItem>
                                <MenuItem value={2}>Private Group</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs = {12}>
                        <TextField 
                        // id={"title-"+ taskID} 
                        name="groupname" 
                        label="Group Name" 
                        variant="filled" 
                        onChange={handleChange} 
                        value={usergroup.name} 
                        // error = {! (error["title"]=="")}
                        // helperText= {! (error["title"]=="")? error["title"]:  ""}
                        multiline
                        fullWidth/>
                    </Grid>


                    <Grid item xs = {12}>
                        <TextField 
                        // id={"title-"+ taskID} 
                        name="description" 
                        label="Group Description" 
                        variant="filled" 
                        onChange={handleChange} 
                        value={usergroup.description} 
                        // error = {! (error["title"]=="")}
                        // helperText= {! (error["title"]=="")? error["title"]:  ""}
                        rows="4"
                        multiline
                        fullWidth/>
                    </Grid>

                </Grid>
            </Paper>
        </React.Fragment>
    );
}

export default UsergroupInfoEditView;
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import config from 'react-global-configuration';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import {apiCourseUpdate} from '../api.js';


const CourseShareDialog = (props) => {
    const {open, onClose, courseData, usergroup} = props;
    const [courseType, setCourseType] = React.useState(courseData.coursetype);
    const [usergroupCheck, setUsergroupCheck] = React.useState([]);


    // const initUsergroupCheck = () => {
    //     const newChecked = [...usergroupCheck];
    //     usergroup.map( _usergroup => newChecked.push(_usergroup.id))
    //     return newChecked;
    // }

    React.useEffect(()=>{
        var temp = [];
        usergroup.map( _usergroup => {
            if(courseData.usergroupid.filter(x => x.usergroup_id == _usergroup.id).length > 0){
                temp.push(_usergroup.id);
            }
        })
        setUsergroupCheck(temp);
    }, [props.usergroup])

    const handleToggle = (value) => () => {
        const currentIndex = usergroupCheck.indexOf(value);
        const newChecked = [...usergroupCheck];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setUsergroupCheck(newChecked);
    };

    const handleChangeCoursetype = (event) => {
        setCourseType(event.target.value)
    }

    const updateCourse = () => {
        var json = {
          coursetype:  courseType,
        };
        json['course_id'] = courseData.id;
        
        json["usergroupid"] = [];
        if(usergroupCheck.length > 0){
            usergroupCheck.map(_usergroup_id => json["usergroupid"].push({
                usergroup_id: _usergroup_id,
                course_id: courseData.id
            }))

        }

        apiCourseUpdate(json)
        .then(response => {
            onClose();
        })
        .catch(error => console.log(error))
    }

    const displayUsergroupList = () => {
        if(courseType == 2){
            return (
                <React.Fragment>
                        <List>
                            {
                                usergroup.length > 0?
                                    usergroup.map(_usergroup=>
                                        <ListItem key={_usergroup.id} role={undefined} dense button onClick={handleToggle(_usergroup.id)}>
                                            <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={usergroupCheck.indexOf(_usergroup.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                            </ListItemIcon>
                                            <ListItemText id={_usergroup.id} primary={_usergroup.name} />
                                        </ListItem>
                                    )
                                :
                                <ListItem dense button>
                                    No Available User Group
                                </ListItem>
                            }
                        </List>
                </React.Fragment>
            )

        }else{
            return null;
        }
    }

    return (
        <React.Fragment>
            
            <Dialog
                open={open}
                onClose={onClose}      
            >
                <DialogTitle id="alert-dialog-title">Share Setting</DialogTitle>
                <DialogContent  style = {{minWidth: 500, minHeight: 100}}        >
                    
                    <FormControl fullWidth>
                        <InputLabel id="course-type-select-label">Course Type</InputLabel>
                        <Select
                        labelId="course-type-select-label"
                        id="course-type-select"
                        value={courseType}
                        onChange={handleChangeCoursetype}
                        >
                            <MenuItem value={-1} disabled>Please select course share type</MenuItem>
                            <MenuItem value={1}>Private</MenuItem>
                            <MenuItem value={2}>Group</MenuItem>
                            <MenuItem value={3}>Public</MenuItem>
                        </Select>
                    </FormControl>

                    {displayUsergroupList()}
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>onClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>updateCourse()} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>


    );
}

export default CourseShareDialog;
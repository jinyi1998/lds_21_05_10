import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const PermissionSelectBox = (props) => {
    const [permission, setPermission] = React.useState(props.permission);

    const onChange = (event) => {
        setPermission(event.target.value);
    }

    React.useEffect(()=>{
        props.setPermission(props.id, permission);
    },[permission])

    return (
        <React.Fragment>
            <FormControl fullWidth>
                <InputLabel id="course-type-select-label">Permission</InputLabel>
                <Select
                    labelId="course-type-select-label"
                    id="course-type-select-test"
                    value = {permission}
                    onChange = {onChange}
                >
                    <MenuItem value={-1}>Permission Denied</MenuItem>
                    <MenuItem value={1}>Can View</MenuItem>
                    <MenuItem value={2}>Can Print</MenuItem>
                    <MenuItem value={3}>Can Edit</MenuItem>
                    <MenuItem value={4}>Can Delete</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
}

export default PermissionSelectBox;
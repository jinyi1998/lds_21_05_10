import React from 'react';
import PermissionSelectBox from './permissionSelectBox';

const CourseSharePublic = (props) => {
    const [publicPermission, setPublicPermission] = React.useState(props.permissionArr['public_permission']);

    const setPermission = (id, value) => {
        var permission = [{
            "course_id": props.courseid,
            "permission": value
        }]
        setPublicPermission(permission);
    }

    React.useEffect(() => {
        props.setPermissionArr({
            ...props.permissionArr,
            'public_permission': publicPermission
        })
    }, [publicPermission])

    return (
        <React.Fragment>
            <PermissionSelectBox permission = {publicPermission[0]? publicPermission[0]['permission'] : -1} setPermission = {setPermission}/>
        </React.Fragment>
    )
}

export default CourseSharePublic;
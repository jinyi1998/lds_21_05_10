import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {apiPublicSharingGetByCourse, apiPublicSharingPost, apiPublicSharingDelete} from '../../api';


const CourseSharePublicOutsideSys = (props) => {
    const [isShare, setIsShare] = React.useState(false);
    const [publicShare, setPublicShare] = React.useState({
        id: -1,
        token : ""
    });

    React.useEffect(()=>{
        refreshToken()
    }, [])

    function refreshToken(){
        apiPublicSharingGetByCourse({course_id: props.course_id}).then((response)=>{
            if(typeof response.data.id != 'undefined'){
                setIsShare(true)
                setPublicShare(response.data)
            }else{
                setIsShare(false)
            }
        })
    }

    const onGenerateLink = () => {
        apiPublicSharingPost({
            course_id: props.course_id
        }).then(()=>{
            refreshToken();
        })
    }

    const onCloseLink = () => {
        apiPublicSharingDelete({
            id: publicShare.id
        }).then(()=>{
            refreshToken();
        })
    }

    return (
        <React.Fragment>
            <Grid container>
                {
                    isShare?
                    [
                        <Grid item xs = {12}>
                            <TextField
                                id="filled-share-link"
                                label="Share Link"
                                helperText="Anyone with this link can view the Learning Design without sign in. "
                                variant="filled"
                                value = {window.location.origin + '/publicsharing/' + publicShare.token}
                                fullWidth
                            />
                       </Grid>
                        ,
                        <Grid item xs = {12}>
                         <Button 
                            variant = {"contained"} 
                            color = {"secondary"} 
                            onClick = {onCloseLink}
                            fullWidth
                        > 
                            Close The Public (WITHOUT SIGN IN LDS) Sharing
                        </Button>
                        </Grid>
                    ]
                    
                    :
                    <Grid item xs = {12}>
                        <Button 
                            variant = {"contained"} 
                            color = {"primary"}  
                            onClick = {onGenerateLink}
                            fullWidth
                        > 
                            Generate The Link 
                        </Button>
                    </Grid>
                }

            </Grid>

        </React.Fragment>
    );
}

export default CourseSharePublicOutsideSys;
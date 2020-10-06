import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DesignTypeBuilderContextStore} from '../container/designTypeBuilderContainer';

const DesignTypeBuilderBasicInfoView = (props) =>{
    const { designType } = React.useContext(DesignTypeBuilderContextStore);
    const [designTypeInfo, setDesignTypeInfo] = React.useState({
        name: "",
        description: "",
        hint: "",
        media: ""
    }); 

    React.useEffect(()=>{
        setDesignTypeInfo({
            name: designType.name,
            description: designType.description,
            hint: designType.hint,
            media: designType.media
        })
    }, [designType]);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs ={12}>
                    <TextField label="Design Type Name"  fullWidth value ={designTypeInfo.name} />
                </Grid>
                <Grid item xs ={12}>
                    <TextField  label="Description" fullWidth multiline rows = {5} value ={designTypeInfo.description} />
                </Grid>
                <Grid item xs ={12}>
                    <TextField label="Hint" fullWidth  multiline rows = {5} value ={designTypeInfo.hint} />
                </Grid>

                <Grid item xs={12}>
                    {designTypeInfo.media}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default DesignTypeBuilderBasicInfoView;
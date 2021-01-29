import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { apiLearningCompTempPost, apiDesignTypeCompTempDelete, apiLearningCompTempDelete } from '../../../api';

import ComponentTemplateBuilderContainer from '../container/componentTemplateBuilderContainer';
import {DesignTypeBuilderContextStore} from '../container/designTypeBuilderContainer';

const DesignTypeBuilderComponentView = (props) => {
    const { designType, refreshDesignType } = React.useContext(DesignTypeBuilderContextStore);
    const [ editComponent, setEditComponent ] = React.useState(-1);
    const [ editComponentDialogOpen, setEditComponentDialogOpen] = React.useState(false);

    const onAddComponent = () => {
        //create new empty component
        var request = {
            "designtype_id": designType.id,
            "title": "new component"
        }
        apiLearningCompTempPost(request).then(
            (response) =>{
                if(typeof response.data.id != 'undefined'){
                    refreshDesignType();
                    setEditComponent(response.data.id);
                    setEditComponentDialogOpen(true);
                } 
            }
        )

        //open dialog for editing
    }

    const onEditComponent = (component_id) => {
        setEditComponent(component_id);
        setEditComponentDialogOpen(true);
    }

    const onFinishEditComponent = () =>{
        refreshDesignType();
        setEditComponentDialogOpen(false);
    }

    const onDeleteComponent = (component) => {
        var request = {
            id: component.relation_id,
        }
        apiDesignTypeCompTempDelete(request).then(()=>{
            refreshDesignType();
        })
    }



    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs = {12}>
                    <Typography>Related Components</Typography>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <List>
                        {
                            designType.components.map((_component)=>{
                                return(
                                    <ListItem key = {_component.id}>
                                        <ListItemText
                                            primary={_component.title}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Edit">
                                                <IconButton edge="end" aria-label="edit" onClick = {()=>onEditComponent(_component.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete">
                                                <IconButton edge="end" aria-label="delete" onClick = {() => onDeleteComponent(_component)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>      
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Paper>
                    <Button variant="contained" color="primary" fullWidth onClick = {onAddComponent}> Add New Component</Button>
                </Grid>
            </Grid>

            <Dialog onClose={() => setEditComponentDialogOpen(false)} open={editComponentDialogOpen} maxWidth = "md">
                {
                    editComponent == -1?
                    "Error... Please try again or report to Andy @ CITE"
                    :
                    <ComponentTemplateBuilderContainer component_id = {editComponent} onFinish = {onFinishEditComponent}/>
                }
            </Dialog>
        </React.Fragment>
    );
}

export default DesignTypeBuilderComponentView;
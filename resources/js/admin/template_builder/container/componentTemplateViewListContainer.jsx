import React from 'react';
import ReactDOM from 'react-dom';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import DesigmItem from './designItem';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DashboardIcon from '@material-ui/icons/Dashboard';

import {
    apiDesignTypeList, 
    apiLearningCompTempList
} from '../../../api';
import {AppContextStore} from '../../../container/app';

const ComponentTemplateViewListContainer = (props) => {

    const [designType, setDesignType] = React.useState([]);
    const [componentTemplates, setComponentTemplates] = React.useState([]);
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const fetchDesignTypes = () => {
        apiDesignTypeList().then(
            response => {
                setDesignType(response.data)
                setLoadingOpen(false)
            }
        )
    }

    const fetchComponentTemplates = () => {
        apiLearningCompTempList().then(
            response => {
                setComponentTemplates(response.data)
                setLoadingOpen(false)
            }
        )
    }
    React.useEffect(()=>{
        setLoadingOpen(true);
        fetchDesignTypes();
        fetchComponentTemplates();
    }
    ,[])

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Learning Component Template
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "component_template_builder_new"} }>
                        Add New Component Template
                    </Button>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <List>
                           {
                               designType.length == 0? 
                                <ListItem>
                                    no available design
                                </ListItem>
                                :
                                componentTemplates.map(_component => 
                                    <ListItem button key = {_component.id}  onClick={ () => {window.location.href = "component_template_builder/"+ _component.id} }>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                         <ListItemText 
                                            primary=  {_component.title } 
                                            secondary={"Update At:" + _component.updated_at + " || " + "Created By: " + _component.updated_by} 
                                        />
                                    </ListItem>
                                )
                           }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ComponentTemplateViewListContainer;
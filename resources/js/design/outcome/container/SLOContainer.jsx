import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';


import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app'

import {
    apiLearningOutcomePost, apiLearningOutcomePut
} from '../../../api.js';


const SLOContainer = (props) => {
    const slo = props.slo;
    const component_id = props.component_id;
    const uloid = props.uloid;
    const [isChecked, setIsChecked] = React.useState(initCheck());
    const [isEdit, setIsEdit] = React.useState(false);
    const [editName, setEditName] = React.useState(props.slo.description);

    const { course, refreshCourse } = React.useContext(ContextStore);
    const { options, setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    //#region local action
    function initCheck () {
        if(typeof component_id != undefined){
            if(typeof slo.componentid != "undefined" &&  slo.componentid.filter(x  => x.component_id == component_id).length > 0){
                return true;
            }
            return false;
        }else{
            return false;
        }
    }

    const onClickEdit = () => {
        setIsEdit(true);
    }
    
    const onClickCancel = () => {
        setIsEdit(false);
    }   

    const onClickDone = () => {
        onSaveSLO();
    }

    const onChangeEditName = (event) => {
        setEditName(event.target.value)
    }

    const onClickCheckBox = (event) => {
        setIsChecked(event.target.checked);
        var request = JSON.parse(JSON.stringify(slo));
        if(event.target.checked && typeof component_id != undefined){
            request['component_id'] = component_id;
        }else if(!event.target.checked && typeof component_id != undefined){
            delete request['component_id'];
            request['del_component_id'] = component_id;
        }else{
            delete request['component_id'];
        }
        if(typeof props.handleSLOSave != 'undefined'){
            props.handleSLOSave(request);
        }
    }

    const onSaveSLO = () => {
        var request = JSON.parse(JSON.stringify(slo));
        request['unit_outcome_id'] = uloid;
        request['description'] = editName;
        request['isCourseLevel'] = false;
        


        if(typeof props.handleSLOSave != 'undefined'){
            if(slo.description == ""){
                props.handleSLOSave(request, 'add');
            }else{
                props.handleSLOSave(request);
            }
         

             if(request['id'] > 0){
                //update
                onClickCancel();
            }else{
                //create
                setEditName("");
                onClickCancel();
            }
        }
    }

    const onDeleteSLO = () => {
        var request = JSON.parse(JSON.stringify(slo));

        if(typeof props.handleSLODelete != 'undefined'){
            props.handleSLODelete(request);
        }
    }
    //#endregion

    return (
        <Grid container justify = {"space-between"} alignItems = {"center"} spacing = {8}>
            {
                (typeof component_id != 'undefined' && slo.description != "" )?
                <Grid item xs = {2}>
                        <Checkbox
                            checked={isChecked}
                            onChange={onClickCheckBox}
                        />
                </Grid>
                :
                null    
            }
            <Grid item xs >
                {
                    isEdit?
                    <TextField label = {'Description of SLO'} value = {editName} fullWidth onChange = {onChangeEditName}/>
                    :
                    <Typography variant = {"caption"}>
                        {slo.description}
                    </Typography>
                }
            </Grid>
            <Grid item xs = {2}>
                {
                    isEdit?
                    <ButtonGroup size = {"small"}>
                        <IconButton aria-label="done" onClick = {onClickDone}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton aria-label="cancel" onClick = {onClickCancel}>
                            <CancelIcon />
                        </IconButton>
                    </ButtonGroup>
                    :
                    (slo.id > 0 || slo.description != "") ?
                        <ButtonGroup size = {"small"}>
                            <IconButton  aria-label="edit" onClick = {onClickEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick = {onDeleteSLO}>
                                <DeleteIcon />
                            </IconButton>
                        </ButtonGroup>
                        :
                        <ButtonGroup size = {"small"}>
                            <IconButton  aria-label="edit" onClick = {onClickEdit}>
                                <AddIcon />
                            </IconButton>
                        </ButtonGroup>  
                }
            </Grid>
        </Grid>
    )
}

export default SLOContainer
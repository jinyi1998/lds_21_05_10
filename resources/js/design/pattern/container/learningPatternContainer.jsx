import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from  '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import LearningTaskContainer from '../../task/container/learningTaskContainer';

import {ComponentContext} from '../../learningComponent/container/componentContainer';
import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import RootRef from "@material-ui/core/RootRef";
import {getDraggable, getListStyle} from '../../../dragndrop';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
    apiLearningPatternPut, apiLearningPatternPost, apiLearningPatternDelete
} from '../../../api.js';

const LearningPatternContainer = (props) => {
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
    const { component } = React.useContext(ComponentContext);
    const [ duplicateDialog, setDuplicateDialog ] = React.useState( false );
    const [ duplicateTo, setDuplicateTo ] = React.useState(component.id);
    const [ moveDialog, setMoveDialog ] = React.useState( false );
    const [ moveTo, setMoveTo ] = React.useState(component.id);
    const [ editPattern, setEditPattern ] = React.useState(false); //rename pattern
    const [ editPatternName, setEditPatternName ] = React.useState(props.patternData.title);

    const {provided, snapshot, index} = props;
    const {setOpenPattern, onOpenPattern} = props;

    const [pattern, setPattern] = React.useState(props.patternData);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const enablePatternDrag = props.enableDrag;
    const enableDrag = course.permission > 2;
    const enableDuplicate = course.permission > 2;

    React.useEffect(() => {
        setPattern(props.patternData);
    }, [props.patternData])

    const canEdit = course.permission > 2;


    //#region local function

    const onDuplicate = () => {
        setLoadingOpen(true);

        if(duplicateTo > 0){
            var pattern_temp = JSON.parse(JSON.stringify(pattern));
            pattern_temp['component_id'] = duplicateTo;
            apiLearningPatternPost(pattern_temp).then((response)=>{
                refreshCourse()
                displayMsg('success', 'pattern duplicated');
                onCloseDuplicateDialog();

            }).catch(error => {
                setLoadingOpen(false);
                displayMsg('error', 'error when pattern duplicate ')
                console.log(error);
                onCloseDuplicateDialog();
            })
            
        }else{
            setLoadingOpen(false);
            displayMsg('error', 'error when pattern duplicate ')
            onCloseDuplicateDialog();
        }
        setAnchorEl(null);
    }

    const onClickDuplicate = (e) => {
        e.stopPropagation();
        setDuplicateDialog(true);
    }

    const onMoveTask = () => {
        setLoadingOpen(true);

        if(moveTo > 0){
            var pattern_temp = JSON.parse(JSON.stringify(pattern));
            pattern_temp['component_id'] = moveTo;
            apiLearningPatternPost(pattern_temp).then((response)=>{
                refreshCourse()
                onDelete();
                displayMsg('success', 'pattern moving');
                onCloseMoveDialog();

            }).catch(error => {
                setLoadingOpen(false);
                displayMsg('error', 'error when pattern moving ')
                console.log(error);
                onCloseMoveDialog();
            })
            
        }else{
            setLoadingOpen(false);
            displayMsg('error', 'error when pattern moving ')
            onCloseDuplicateDialog();
        }
        setAnchorEl(null);
    }

    const onClickMove = (e) => {
        e.stopPropagation();
        setMoveDialog(true);
    }

    const onDelete = () => {
        setLoadingOpen(true);
        apiLearningPatternDelete(pattern.id).then(()=>{
            refreshCourse()
            displayMsg('success', 'pattern deleted')
        }).catch(error => {
            setLoadingOpen(false);
            displayMsg('error', 'pattern deleted error');
            console.log(error);
        })
        setAnchorEl(null)
    }

    const onDuplicateChange = (e) => {
        setDuplicateTo(e.target.value);
    }

    const onCloseDuplicateDialog = () => {
        setDuplicateDialog (false)
    }

    const onMoveChange = (e) => {
        setMoveTo(e.target.value);
    }

    const onCloseMoveDialog = () => {
        setMoveDialog (false)
    }

    const handleExpandChange = (event, isExpanded) => {
        var openPattern_temp = JSON.parse(JSON.stringify(onOpenPattern));
        if(isExpanded){
            openPattern_temp.push(pattern.id);
        }else{
            openPattern_temp.splice(openPattern_temp.indexOf(pattern.id), 1);
        }
        console.log(openPattern_temp);
        // setOpenPattern(isExpanded ? pattern.id : -1);
        setOpenPattern(openPattern_temp);
    };

    const onChangePatternName = (event) => {
        setEditPatternName(event.target.value);
    }

    const onConfirmChangePatternName = (event) => {
        event.stopPropagation();
        setLoadingOpen(true)

        var request = {
            id: pattern.id,
            title: editPatternName,
        }
        apiLearningPatternPut(request).then((response) => {
            // console.log(response);
            refreshCourse();
            setEditPattern(false);
            setLoadingOpen(false);
        }).catch(error => {
            console.log(error);
            setLoadingOpen(false);
        })
    }

    const onClickChangePatternName = (event) => {
        event.stopPropagation();
        setEditPattern(true);
        setAnchorEl(null)
    }

    const onCancelPatternName = (event) => {
        event.stopPropagation();
        setEditPattern(false);
        setEditPatternName(pattern.title);
    }
    //#endregion
    return (
        <React.Fragment>
            <Droppable droppableId = {"pattern_" + pattern.id} type = "sub_level">
            {(provided_drop, snapshot_drop) => (
                <div style={getListStyle(snapshot_drop.isDraggingOver, 'yellow')}>
                      {provided_drop.placeholder}
                        <RootRef rootRef={provided_drop.innerRef}>
                        <Accordion  
                            data-tour = "component_pattern_view"  
                            onChange = {handleExpandChange}
                            expanded={ onOpenPattern.indexOf(pattern.id) != -1 }
                            {...getDraggable(provided, snapshot)} 
                        > 
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                        <Grid container>
                            {typeof provided == 'undefined' || !enablePatternDrag?    
                                null
                            :
                                <Grid item xs ={1} container  justify="flex-start" alignItems="center">
                                    <DragHandleIcon />
                                </Grid>
                            }
                            <Grid container item xs justify = "center" alignItems = "center">
                                <Grid item xs = {12} >
                                    {
                                        editPattern?
                                        <TextField 
                                            value = {editPatternName} 
                                            onChange = {onChangePatternName}
                                            onClick = {e => e.stopPropagation()} 
                                            fullWidth 
                                        />
                                        :
                                        <Typography  data-tour = "component_pattern_title" variant = {"subtitle2"}>
                                            {pattern.title}
                                        </Typography>
                                    }
                            
                                
                                </Grid>
                            </Grid>
                            {   
                                canEdit ? 
                                <Grid item xs = {2}>
                                    {
                                        editPattern?
                                        <React.Fragment>
                                            <IconButton
                                                onClick={onConfirmChangePatternName}
                                            >
                                                <DoneIcon />
                                            </IconButton>

                                            <IconButton
                                                onClick={onCancelPatternName}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={(event) => { event.stopPropagation(); setAnchorEl(event.currentTarget);}}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="pattern-edit-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={(event) => {event.stopPropagation(); setAnchorEl(null)}}
                                            >
                                                <MenuItem onClick={onClickChangePatternName}>
                                                    <ListItemIcon><EditIcon/></ListItemIcon>
                                                    Rename
                                                </MenuItem>
                                                <MenuItem onClick={onClickDuplicate}>
                                                    <ListItemIcon>
                                                        <FileCopyIcon/>
                                                    </ListItemIcon>
                                                    Duplicate
                                                </MenuItem>

                                                <MenuItem onClick={onClickMove}>
                                                    <ListItemIcon>
                                                        <LocalShippingIcon/>
                                                    </ListItemIcon>
                                                    Move
                                                </MenuItem>
                                                
                                                <MenuItem onClick={(e)=> {e.stopPropagation(); onDelete()}}>
                                                    <ListItemIcon>
                                                        <DeleteIcon/>
                                                    </ListItemIcon>
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                        </React.Fragment>    
                                    }
                                </Grid>
                                : 
                                null 
                            }
                        
                        </Grid>

                    </AccordionSummary>
                    <AccordionDetails>
                        <LearningTaskContainer 
                            pattern_id = {pattern.id} 
                            tasksData = {pattern.tasks} 
                            enableDrag = {enableDrag}
                            enableDuplicate = {enableDuplicate}
                            enableMove = {false}
                        />
                    </AccordionDetails>
                </Accordion>
                    </RootRef>
                </div>
            )}
            </Droppable>
            {/* duplicate dialog */}
            <Dialog open={duplicateDialog} onClose={onCloseDuplicateDialog} maxWidth = "md" style = {{minHeight: 400}}>
                <DialogTitle>
                    Duplicate Learning Pattern
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select the component you wanna duplicate to.
                    </DialogContentText>
                    <Grid container item xs = {12}>
                        <FormControl>
                            <InputLabel>Duplicate To</InputLabel>
                            <Select 
                                value={duplicateTo}
                                onChange={onDuplicateChange}
                            >
                                {
                                    course.components.map( (_component,index) => 
                                    <MenuItem value={_component.id} key = {index}>
                                        {_component.title}
                                    </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onCloseDuplicateDialog} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={onDuplicate} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {/* move dialog */}
            <Dialog open={moveDialog} onClose={onCloseMoveDialog} maxWidth = "md" style = {{minHeight: 400}}>
                <DialogTitle>
                    Move Learning Pattern
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select the component you wanna move to.
                    </DialogContentText>
                    <Grid container item xs = {12}>
                        <FormControl>
                            <InputLabel>Duplicate To</InputLabel>
                            <Select 
                                value={moveTo}
                                onChange={onMoveChange}
                            >
                                {
                                    course.components.map( (_component,index) => 
                                    <MenuItem value={_component.id} key = {index}>
                                        {_component.title}
                                    </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onCloseMoveDialog} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={onMoveTask} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment> 
    );
}
export default LearningPatternContainer;
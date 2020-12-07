import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
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

import LearningTaskContainer from '../../task/container/learningTaskContainer';

import {ComponentContext} from '../../learningComponent/container/componentContainer';
import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningPatternGet, apiLearningPatternPost, apiLearningPatternDelete
} from '../../../api.js';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%',
        margin: 16
    },
    contentGrid: {
        textAlign: "left"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    chip: {
        margin: 2,
    },
}));


const LearningPatternContainer = (props) => {
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);
    const { component } = React.useContext(ComponentContext);

    const {provided, snapshot, index} = props;

    const classes = useStyles();
    
    const [pattern, setPattern] = React.useState(props.patternData);
    const [ isEdit, setIsEdit ] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const enablePatternDrag = props.enableDrag;
    const enableDrag = course.permission > 2;
    const enableDuplicate = course.permission > 2;

    React.useEffect(() => {
        setPattern(props.patternData);
    }, [props.patternData])

    const canEdit = course.permission > 2;


    //#region local function
    const getItemStyle = (isDragging, draggableStyle) => ({
        // styles we need to apply on draggables
        ...draggableStyle,
      
        ...(isDragging && {
          background: "rgb(235,235,235)"
        }),
        width: "calc(100% - 4px)"
    });
    
    const getDraggable = (provided, snapshot) => {
        if(typeof provided == 'undefined'){
            return (
               null
            );
        }else{
            return (
                {
                    // styles we need to apply on draggables
                    ref: provided.innerRef,
                    ...provided.draggableProps,
                    ...provided.dragHandleProps,
                    style: getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                    )
                }
            );
        }
    }

    const onEditPattern = () => {

    }

    const onDuplicate = () => {
        setLoadingOpen(true);
        var pattern_temp = JSON.parse(JSON.stringify(pattern));
        pattern_temp['component_id'] = component.id;
        apiLearningPatternPost(pattern_temp).then((response)=>{
            refreshCourse()
            displayMsg('success', 'pattern duplicated')
        }).catch(error => {
            setLoadingOpen(false);
            displayMsg('error', 'error when pattern duplicate ')
            console.log(error);
        })
        setAnchorEl(null);
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
    //#endregion
    return (
        <React.Fragment>
            <Accordion  data-tour = "component_pattern_view"  {...getDraggable(provided, snapshot)} > 
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
                        <Grid item xs >
                            <Typography  data-tour = "component_pattern_title" variant = {"subtitle2"}>   {pattern.title}</Typography>
                        </Grid>
                        {   
                            canEdit ? 
                            <Grid item xs = {2}>
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
                                    {/* <MenuItem onClick={()=> {event.stopPropagation(); setEditComponent(true)}}>
                                        <ListItemIcon><EditIcon/></ListItemIcon>
                                        Rename
                                    </MenuItem> */}
                                    <MenuItem onClick={(e)=> {e.stopPropagation(); onDuplicate()}}>
                                        <ListItemIcon><FileCopyIcon/></ListItemIcon>
                                        Duplicate
                                    </MenuItem>
                                    <MenuItem onClick={(e)=> {e.stopPropagation(); onDelete()}}>
                                        <ListItemIcon><DeleteIcon/></ListItemIcon>
                                        Delete
                                    </MenuItem>
                                    </Menu>
                                </React.Fragment>    
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
                    />
                </AccordionDetails>
            </Accordion>
        </React.Fragment> 
    );
}
export default LearningPatternContainer;
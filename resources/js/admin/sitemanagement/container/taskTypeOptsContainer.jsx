import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputAdornment from '@material-ui/core/InputAdornment';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {AppContextStore} from '../../../container/app';
import { apiTaskTypeOptsList, apiTaskTypeOptsPost, apiTaskTypeOptsPut} from '../../../api';

const TaskTypeOptsContainer = () => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ taskTypeOpts, setResourceOpts ] = React.useState([]);
    const [ isEditOpen, setIsEditOpen ] = React.useState(false);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ editOpt, setEditOpt] = React.useState({
        id: -1,
        description: "",
        color: "#971217"
    })
    const defaultColor = [
        {"description": "Receiving & Interpreting Information", color: "#48448a"},
        {"description": "Explorations through Conversation", color: "#91b541"},
        {"description": "Construction: Conceptual / Visual Artefacts", color: "#ff5513"},
        {"description": "Presentations, Performance Illustrations", color: "#ffc500"},
        {"description": "Information Exploration", color: "#4cc981"},
        {"description": "Self-/Peer-assessment", color: "#b759ef"},
        {"description": "Revision", color: "#82009d"},
        {"description": "Tangible / Immersive Investigation", color: "#abd848"},
        {"description": "Reflection", color: "#7f1b72"},
        {"description": "Presentations, Performance Illustrations", color: "#ffc500"},
        {"description": "Test / Assessment", color: "#48aeda"},
        {"description": "Construction: Tangible / Manipulable Artifacts", color: "#ff8d00"},
    ];
    const [ custColor, setCustColor ] = React.useState('#971217');  

    const reloadTaskTypeOpts = () => {
        setLoadingOpen(true)
        apiTaskTypeOptsList().then((response) => {
            setResourceOpts(response.data);
            setLoadingOpen(false);
        })
    }

    React.useEffect(()=>{
        reloadTaskTypeOpts();
    }, [])

    //#region local action
    const handleOnChange = (event) => {
        switch (event.target.name){
            default:
            case 'description':
                setEditOpt({
                    ...editOpt,
                    "description": event.target.value
                });
                break;
             
            case 'color':
                setEditOpt({
                    ...editOpt,
                    "color": event.target.value
                });
                break;
        }
     
    }

    const handleCustColorChange = (event) => {
        var color = "#" + event.target.value.replace('#', '');
        if(color.length > 7){
            color = color.substring(0,7);
        }
        setCustColor(color);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onSaveOpt = () => {
        if(editOpt.id == -1){
            //create
            apiTaskTypeOptsPost(editOpt).then(()=>{
                reloadTaskTypeOpts();
            })
        }else{
            //update
            apiTaskTypeOptsPut(editOpt).then(()=>{
                reloadTaskTypeOpts();
            })
        }
        setIsEditOpen(false)
    }

    const onOpenEditDialog = (id) => {
        if(id == -1){
            setEditOpt({
                id: -1,
                description: "",
                color: "#971217"
            });
            setCustColor('#971217')
        }else{
            var temp = taskTypeOpts.find(x => x.id == id);
            if(defaultColor.filter(x => x.color == temp.color).length == 0){
                setCustColor(temp.color)
            }
            setEditOpt(temp);
        }
        
        setIsEditOpen(true);
    }

    const onCloseEditDialog = () => {
        setIsEditOpen(false);
    }
    //#endregion

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Task Type Options Management
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={()=> onOpenEditDialog(-1) }>
                        Add Task Type Options
                    </Button>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <Table
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                            >
                            <TableHead/>

                            <TableBody>
                                {taskTypeOpts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_taskTypeOpts ) => (
                                        <TableRow key = {_taskTypeOpts.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" style = {{backgroundColor: _taskTypeOpts.color}}>
                                            
                                            </TableCell>
                                            <TableCell component="th" scope="row"  onClick={ () => onOpenEditDialog(_taskTypeOpts.id) }>
                                                <ListItemText 
                                                    primary = {_taskTypeOpts.description}
                                                    secondary= {
                                                        "Updated By:" + _taskTypeOpts.updatedby.name + "@" + _taskTypeOpts.updated_at
                                                        + " || " 
                                                        + "Created By: " + _taskTypeOpts.createdby.name + "@" + _taskTypeOpts.created_at } 
                                                />
                                            </TableCell>
                                            <TableCell component="th">
                                                <IconButton color="primary" onClick = {() => {event.preventDefault(); onOpenEditDialog(_taskTypeOpts.id);}}>
                                                    <EditAttributesIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                          </Table>
                           <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={taskTypeOpts.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        
                    </Paper>
                </Grid>
            </Grid>
            <Dialog onClose={onCloseEditDialog} open={isEditOpen}  maxWidth = "md">
                <DialogTitle> {editOpt.id == -1? "Add Tasks Type Option " : "Edit Tasks Type Option"}</DialogTitle>
                <DialogContent style = {{minWidth: 600}}>
                     <TextField label = "Description" value = {editOpt.description} onChange = {handleOnChange} fullWidth name = "description"/>
                     
                     <FormControl fullWidth>
                     <InputLabel >Display Color</InputLabel>
                     <Select value = {editOpt.color} fullWidth name = "color" onChange = {handleOnChange}>
                         <ListSubheader>Default Colors</ListSubheader>
                        {defaultColor.map((_color, index) =>  
                            <MenuItem value={_color.color} key = {index}>
                                <Grid container>
                                    <Grid item xs = {2}  style = {{backgroundColor: _color.color}}/>
                                    
                                    <Grid container item xs = {10} justify= "center">
                                        {_color.color}
                                    </Grid>
                                </Grid>
                            </MenuItem>)}
                            <ListSubheader>Customized Color</ListSubheader>
                            <MenuItem value={custColor} onClick= {(e)=> {e.preventDefault() ;e.stopPropagation();}} key = {defaultColor.length}>
                                <Grid container>
                                    <Grid item xs = {2}  style = {{backgroundColor: custColor}}/>
                                    
                                    <Grid container item xs = {10} justify= "center" >
                                        <TextField 
                                            value = {custColor}
                                            onClick= {(e)=> {e.preventDefault() ;e.stopPropagation(); }} 
                                            onChange = {handleCustColorChange}/>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                    </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onCloseEditDialog} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={onSaveOpt} color="primary" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default TaskTypeOptsContainer;
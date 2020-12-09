import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

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
import { apiMoodleModList, apiMoodleModPost, apiMoodleModPut} from '../../../api';

const MoodleModContainer = () => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ moodleMods, setMoodleMods ] = React.useState([]);
    const [ isEditOpen, setIsEditOpen ] = React.useState(false);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ editOpt, setEditOpt] = React.useState({
        id: -1,
        name: "",
        name_moodle: ""
    })

    const reloadMoodleMod = () => {
        setLoadingOpen(true)
        apiMoodleModList().then((response) => {
            setMoodleMods(response.data);
            setLoadingOpen(false);
        })
    }

    React.useEffect(()=>{
        reloadMoodleMod();
    }, [])

    //#region local action
    const onChangeName = (event) => {
        setEditOpt({
            ...editOpt,
            "name": event.target.value
        })
    }

    const onChangeNameMoodle = (event) => {
        setEditOpt({
            ...editOpt,
            "name_moodle": event.target.value
        })
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
            apiMoodleModPost(editOpt).then(()=>{
                reloadMoodleMod();
            })
        }else{
            //update
            apiMoodleModPut(editOpt).then(()=>{
                reloadMoodleMod();
            })
        }
        setIsEditOpen(false)
    }

    const onOpenEditDialog = (id) => {
        if(id == -1){
            setEditOpt({
                id: -1,
                description: ""
            });
        }else{
            var temp = moodleMods.find(x => x.id == id);
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
                        Moodle Mod Mapping Options Management
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={()=> onOpenEditDialog(-1) }>
                        Add New Moodle Mod Mapping Options
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
                                {moodleMods
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_moodleMod ) => (
                                        <TableRow key = {_moodleMod.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" scope="row"  onClick={ () => onOpenEditDialog(_moodleMod.id) }>
                                                <ListItemText 
                                                    primary = {_moodleMod.name}
                                                    secondary= {
                                                        "Updated By:" + _moodleMod.updatedby.name + "@" + _moodleMod.updated_at
                                                        + " || " 
                                                        + "Created By: " + _moodleMod.createdby.name + "@" + _moodleMod.created_at } 
                                                />
                                            </TableCell>
                                            <TableCell component="th">
                                                <IconButton color="primary" onClick = {() => {event.preventDefault(); onOpenEditDialog(_moodleMod.id);}}>
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
                                count={moodleMods.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        
                    </Paper>
                </Grid>
            </Grid>
            <Dialog onClose={onCloseEditDialog} open={isEditOpen}  maxWidth = "md">
                <DialogTitle> {editOpt.id == -1? "Add Moodle Mod Mapping Option " : "Edit Moodle Mod Mapping Option"}</DialogTitle>
                <DialogContent style = {{minWidth: 600}}>
                    <Grid container>
                        <Grid item xs ={12} >
                            <TextField 
                                label = "Name" 
                                value = {editOpt.name} 
                                onChange = {onChangeName} 
                                fullWidth/>
                        </Grid>
                        <Grid item xs = {12}>
                        <TextField 
                                label = "Name Moodle" 
                                value = {editOpt.name_moodle} 
                                onChange = {onChangeNameMoodle} 
                                fullWidth/>
                        </Grid>
                    </Grid>
                   
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

export default MoodleModContainer;
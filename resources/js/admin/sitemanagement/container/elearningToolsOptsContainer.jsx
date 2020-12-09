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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {AppContextStore} from '../../../container/app';
import { 
    apiMoodleModList,
    apiElearningToolOptsList, apiElearningToolOptsGet, apiElearningToolOptsPost, apiElearningToolOptsPut
} from '../../../api';

const ELearningToolsOptsContainer = () => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ elearningToolOpts, setElearningToolOpts ] = React.useState([]);
    const [ moodleMods, setMoodleMods ] = React.useState([]);
    const [ isEditOpen, setIsEditOpen ] = React.useState(false);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ editOpt, setEditOpt] = React.useState({
        id: -1,
        description: "",
        moodlemod_id: -1,
    })

    const reloadElearningToolOpts = () => {
        setLoadingOpen(true)
        apiElearningToolOptsList().then((response) => {
            setElearningToolOpts(response.data);
            setLoadingOpen(false);
        })
    }

    const reloadMoodleMod = () => {
        setLoadingOpen(true)
        apiMoodleModList().then((response) => {
            setMoodleMods(response.data);
            setLoadingOpen(false);
        })
    }

    React.useEffect(()=>{
        reloadElearningToolOpts();
        reloadMoodleMod();
    }, [])

    //#region local action
    const handleOnChange = (event) => {
        setEditOpt({
            ...editOpt,
            "description": event.target.value
        })
    }

    const handleOnMoodleModChange = (event) => {
        setEditOpt({
            ...editOpt,
            "moodlemod_id": event.target.value
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
            apiElearningToolOptsPost(editOpt).then(()=>{
                reloadElearningToolOpts();
            })
        }else{
            //update
            apiElearningToolOptsPut(editOpt).then(()=>{
                reloadElearningToolOpts();
            })
        }
        setIsEditOpen(false)
    }

    const onOpenEditDialog = (id) => {
        if(id == -1){
            setEditOpt({
                id: -1,
                description: "",
                moodlemod_id: -1
            });
        }else{
            apiElearningToolOptsGet(id).then((response)=>{

                setEditOpt({
                    id: id,
                    description: response.data.description,
                    moodlemod_id: response.data.moodlemodid? response.data.moodlemodid.moodle_mod_id : -1
                });
            })
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
                        Elearning Tool Options Management
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={()=> onOpenEditDialog(-1) }>
                        Add New Elearning Tool Options
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
                                {elearningToolOpts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_elearningToolOpts ) => (
                                        <TableRow key = {_elearningToolOpts.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" scope="row"  onClick={ () => onOpenEditDialog(_elearningToolOpts.id) }>
                                                <ListItemText 
                                                    primary = {_elearningToolOpts.description}
                                                    secondary= {
                                                        "Updated By:" + _elearningToolOpts.updatedby.name + "@" + _elearningToolOpts.updated_at
                                                        + " || " 
                                                        + "Created By: " + _elearningToolOpts.createdby.name + "@" + _elearningToolOpts.created_at } 
                                                />
                                            </TableCell>
                                            <TableCell component="th">
                                                <IconButton color="primary" onClick = {() => {event.preventDefault(); onOpenEditDialog(_elearningToolOpts.id);}}>
                                                    <EditAttributesIcon />
                                                </IconButton>
                                                {/* <IconButton color="primary" onClick = {() => {event.preventDefault();}}>
                                                    <DeleteForeverIcon />
                                                </IconButton> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                          </Table>
                           <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={elearningToolOpts.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        
                    </Paper>
                </Grid>
            </Grid>
            <Dialog onClose={onCloseEditDialog} open={isEditOpen}  maxWidth = "md">
                <DialogTitle> {editOpt.id == -1? "Add Elearning Tool Option " : "Edit Elearning Tool Option"}</DialogTitle>
                <DialogContent style = {{minWidth: 600}}>
                    <Grid container>
                        <Grid item xs = {12}>
                            <TextField label = "Description" value = {editOpt.description} onChange = {handleOnChange} fullWidth/>
                        </Grid>
                        <Grid item xs = {12}>
                            <FormControl fullWidth>
                                <InputLabel>Moodle Mapping</InputLabel>
                                <Select
                                    value={editOpt.moodlemod_id}
                                    onChange={handleOnMoodleModChange}
                                    fullWidth
                                >
                                    <MenuItem value={-1}>Not yet map to any moodle mod</MenuItem>
                                    {
                                        moodleMods.map(_moodleMod => 
                                            <MenuItem value={_moodleMod.id}>{_moodleMod.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
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

export default ELearningToolsOptsContainer;
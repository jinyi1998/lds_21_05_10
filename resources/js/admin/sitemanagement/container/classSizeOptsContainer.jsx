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
import { apiClassSizeOptsList, apiClassSizeOptsPost, apiClassSizeOptsPut} from '../../../api';

const ClassSizeOptsContainer = () => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ classSizeOpts, setClassSizeOpts ] = React.useState([]);
    const [ isEditOpen, setIsEditOpen ] = React.useState(false);
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ editOpt, setEditOpt] = React.useState({
        id: -1,
        description: ""
    })

    const reloadClassSizeOpts = () => {
        setLoadingOpen(true)
        apiClassSizeOptsList().then((response) => {
            setClassSizeOpts(response.data);
            setLoadingOpen(false);
        })
    }

    React.useEffect(()=>{
        reloadClassSizeOpts();
    }, [])

    //#region local action
    const handleOnChange = (event) => {
        setEditOpt({
            ...editOpt,
            "description": event.target.value
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
            apiClassSizeOptsPost(editOpt).then(()=>{
                reloadClassSizeOpts();
            })
        }else{
            //update
            apiClassSizeOptsPut(editOpt).then(()=>{
                reloadClassSizeOpts();
                
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
            var temp = classSizeOpts.find(x => x.id == id);
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
                        Class Size Options Management
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={()=> onOpenEditDialog(-1) }>
                        Add New Class Size Options
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
                                {classSizeOpts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_classSizeOpts ) => (
                                        <TableRow key = {_classSizeOpts.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" scope="row"  onClick={ () => onOpenEditDialog(_classSizeOpts.id) }>
                                                <ListItemText 
                                                    primary = {_classSizeOpts.description}
                                                    secondary= {
                                                        "Update By:" + _classSizeOpts.updatedby.name + "@" + _classSizeOpts.updated_at
                                                        + " || " 
                                                        + "Created By: " + _classSizeOpts.createdby.name + "@" + _classSizeOpts.created_at } 
                                                />
                                            </TableCell>
                                            <TableCell component="th">
                                                <IconButton color="primary" onClick = {() => {event.preventDefault(); onOpenEditDialog(_classSizeOpts.id);}}>
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
                                count={classSizeOpts.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        
                    </Paper>
                </Grid>
            </Grid>
            <Dialog onClose={onCloseEditDialog} open={isEditOpen}  maxWidth = "md">
                <DialogTitle> {editOpt.id == -1? "Add Class Size Option " : "Edit Class Size Option"}</DialogTitle>
                <DialogContent style = {{minWidth: 600}}>
                     <TextField label = "Description" value = {editOpt.description} onChange = {handleOnChange} fullWidth/>
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

export default ClassSizeOptsContainer;
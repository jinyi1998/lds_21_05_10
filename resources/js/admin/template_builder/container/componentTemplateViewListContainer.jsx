import React from 'react';

import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { 
    apiLearningCompTempList,
    apiLearningCompTempDelete
} from '../../../api';
import {AppContextStore} from '../../../container/app';

const ComponentTemplateViewListContainer = (props) => {

    const [ componentTemplates, setComponentTemplates ] = React.useState([]);
    const [ componentsDisplay, setComponentsDisplay] = React.useState([]);
    const [ searchText, setSearchText ] = React.useState("");
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);

    const { setLoadingOpen } = React.useContext(AppContextStore);

    const fetchComponentTemplates = () => {
        apiLearningCompTempList().then(
            response => {
                setComponentTemplates(response.data)
                setLoadingOpen(false)
            }
        )
    }

    const onDeleteComponent = (component) => {
        apiLearningCompTempDelete(component).then(
            response => {
                fetchComponentTemplates()
            }
        )
    }

    React.useEffect(()=>{
        setLoadingOpen(true);
        fetchComponentTemplates();
    }
    ,[])

    React.useEffect(()=>{
        setComponentsDisplay(componentTemplates);
    }, [componentTemplates])

    React.useEffect(()=>{
        onSearch();
    }, [searchText])


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const onSearch = () =>{
        if(searchText.length > 0){
            var temp = componentTemplates.filter((_component) => _component.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0);
            setComponentsDisplay(temp);
        }else{
            setComponentsDisplay(componentTemplates);
        }
    }

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Learning Component Template
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "component_template_builder"} }>
                        Add New Component Template
                    </Button>
                </Grid>


                <Grid container item xs = {12} justify = {"flex-end"}>
                    <Grid item xs ={2}>
                        <TextField variant = {"outlined"} label = {"Search"} value = {searchText} onChange = {onChangeSearchText} />
                    </Grid>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <Table size={'medium'}>
                            <TableHead/>
                            <TableBody>
                                {
                                    componentsDisplay.length == 0?
                                    <TableRow hover style = {{cursor: "pointer"}}>
                                        <TableCell component="th">
                                            No Available Components
                                        </TableCell>
                                </TableRow>
                                :
                                componentsDisplay
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_component ) => (
                                        <TableRow key ={_component.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" scope="row"  onClick={ () => {window.location.href = "component_template_builder/"+ _component.id} }>
                                                <ListItemText 
                                                    primary=  {_component.title } 
                                                    secondary={
                                                        "Update By:" + _component.updatedby.name + '@' + _component.updated_at
                                                        + " || " 
                                                        + "Created By: " + _component.createdby.name + "@" + _component.created_at} 
                                                />
                                            </TableCell>
                                            <TableCell component="th">
                                                {/* <IconButton color="primary" aria-label="add to shopping cart" onClick = {() => {event.preventDefault(); onDeleteComponent(_component)}}>
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
                                count={componentsDisplay.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ComponentTemplateViewListContainer;
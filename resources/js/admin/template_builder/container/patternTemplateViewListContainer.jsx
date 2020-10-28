import React from 'react';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DashboardIcon from '@material-ui/icons/Dashboard';

import {apiLearningPattTempList, apiLearningPattTempDelete} from '../../../api';
import {AppContextStore} from '../../../container/app';

const PatternTemplateViewListContainer = (props) => {

    const [ patterns, setPatterns ] = React.useState([]);
    const [ patternsDisplay, setPatternsDisplay ] =  React.useState([]);
    const [ searchText, setSearchText ] = React.useState("");
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);

    const { setLoadingOpen } = React.useContext(AppContextStore);

    const fetchPatterns = () => {
        apiLearningPattTempList().then(
            response => {
                setPatterns(response.data)
                setLoadingOpen(false)
            }
        )
    }

    //#region local action start

    const onEnterPatternTemplateDetail = (id) => {
        window.location.href = "pattern_template_builder/" + id;
    }

    const onDeletePatternTemplate = (pattern) => {
        apiLearningPattTempDelete(pattern).then(()=>{
            fetchPatterns();
        })
    }

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
            var temp = patterns.filter((_pattern) => _pattern.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0);
            setPatternsDisplay(temp);
        }else{
            setPatternsDisplay(patterns);
        }
    }
    //#endregion local action end

    React.useEffect(()=>{
        setLoadingOpen(true);
        fetchPatterns();
    }
    ,[])

    React.useEffect(()=>{
        setPatternsDisplay(patterns);
    }, [patterns])

    React.useEffect(()=>{
        onSearch();
    }, [searchText])

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Patterns Template Management
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "pattern_template_builder"} }>
                        Add new pattern
                    </Button>
                </Grid>

                <Grid container item xs = {12} justify = {"flex-end"}>
                    <Grid item xs = {2}>
                        <TextField variant = {"outlined"} value = {searchText} onChange = {onChangeSearchText} label = {"Search"}/>
                    </Grid>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        <Table size={'medium'} >
                            <TableHead/>
                            <TableBody>
                                {
                                    patternsDisplay.length == 0 ?
                                    <TableRow hover style = {{cursor: "pointer"}}>
                                        <TableCell component="th" scope="row">
                                            No Available Pattern
                                        </TableCell>
                                    </TableRow>
                                    :
                                    patternsDisplay
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((_pattern ) => (
                                            <TableRow key ={_pattern.id} hover style = {{cursor: "pointer"}}>
                                                <TableCell component="th" scope="row"  onClick={ () => {onEnterPatternTemplateDetail(_pattern.id)} }>
                                                    <ListItemText 
                                                        primary=  {_pattern.title } 
                                                        secondary={"Update By:" + _pattern.updated_at + "@" + _pattern.updatedby.name
                                                                    + " || " + 
                                                                    "Created By: " + _pattern.created_at + "@"+ _pattern.createdby.name} 
                                                    />
                                                </TableCell>
                                                <TableCell component="th">
                                                    <IconButton color="primary" aria-label="add to shopping cart" onClick = {() => {event.preventDefault(); onDeletePatternTemplate(_pattern)}}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                }   
                            </TableBody>
                          </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={patternsDisplay.length}
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

export default PatternTemplateViewListContainer;
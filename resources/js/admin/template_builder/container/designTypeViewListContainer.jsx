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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {apiDesignTypeList} from '../../../api';
import {AppContextStore} from '../../../container/app';

const DesignTypeViewListContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ designType, setDesignType ] = React.useState([]);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);
  
    const fetchDesignTypes = () => {
        apiDesignTypeList().then(
            response => {
                setDesignType(response.data)
                setLoadingOpen(false)
            }
        )
    }


    //#region local action
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onEnterDesignTypeDetail = (designtype_id) => {
        window.location.href="./design_type_builder/"+ designtype_id;
    }
    //#endregion

    React.useEffect(()=>{
        setLoadingOpen(true);
        fetchDesignTypes();
    }
    ,[])


    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Design Type Template
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "designstudio"} }>
                        Add new design type
                    </Button>
                </Grid>

                <Grid item xs = {12}>
                    <Paper>
                        {/* <List>
                           {
                               designType.length == 0? 
                                <ListItem>
                                    no available design
                                </ListItem>
                                :
                                designType.map(_designtype => 
                                    <ListItem button key = {_designtype.id} onClick = {()=>{window.location.href="./design_type_builder/"+ _designtype.id;}}>
                                        <ListItemIcon>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                         <ListItemText 
                                            primary=  {_designtype.name } 
                                            secondary={"Update At:" + _designtype.updated_at + " || " + "Created By: " + _designtype.updated_by} 
                                        />
                                    </ListItem>
                                )
                           }
                        </List> */}
                        <Table
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                            >
                            <TableHead/>

                            <TableBody>
                                {designType
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_designtype ) => (
                                        <TableRow key ={_designtype.id} hover >
                                            <TableCell component="th" scope="row"  onClick={ () => {onEnterDesignTypeDetail(_designtype.id)} }>
                                                <ListItemText 
                                                    primary=  {_designtype.name } 
                                                    secondary={"Update At:" + _designtype.updated_at + " || " + "Created By: " + _designtype.updated_by} 
                                                />
                                            </TableCell>
                                            {/* <TableCell component="th">
                                                <IconButton color="primary" aria-label="add to shopping cart" onClick = {() => {event.preventDefault(); onDeletePatternTemplate(_pattern)}}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={designType.length}
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
}

export default DesignTypeViewListContainer;
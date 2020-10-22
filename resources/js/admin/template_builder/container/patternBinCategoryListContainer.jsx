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

import {apiPatternbinCategoryList, apiPatternbinCategoryPost} from '../../../api';
import {AppContextStore} from '../../../container/app';

const PatternBinCategoryListContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ patternBinCategoryList, setPatternBinCategoryList ] = React.useState([]);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);
  
    const reloadPatternBinCategory = () => {
        apiPatternbinCategoryList().then(
            response => {
                setPatternBinCategoryList(response.data)
                setLoadingOpen(false)
            }
        )
    }


    //#region local action
    const onAddNewCategory = () => {
        var request = {
            "name": "New Pattern Pin Category"
        }
        apiPatternbinCategoryPost(request).then((response)=>{
            reloadPatternBinCategory();
            window.location.href="./patternbin_category/"+ response.data.id;
        })
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onEnterPatternBinCategoryDetail = (patternBinCategory_id) => {
        window.location.href="./patternbin_category/"+ patternBinCategory_id;
    }
    //#endregion

    React.useEffect(()=>{
        setLoadingOpen(true);
        reloadPatternBinCategory();
    }
    ,[])


    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Pattern Bin Categories
                    </Typography>
                </Grid>
                 
                <Grid item xs = {4} >
                    <Button variant="contained" color="primary" onClick={ onAddNewCategory}>
                        Add new pattern bin category
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
                                {patternBinCategoryList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_patternBinCategory ) => (
                                        <TableRow key ={_patternBinCategory.id} hover style = {{cursor: "pointer"}}>
                                            <TableCell component="th" scope="row"  onClick={ () => {onEnterPatternBinCategoryDetail(_patternBinCategory.id)} }>
                                                <ListItemText 
                                                    primary=  {_patternBinCategory.name } 
                                                    secondary={ "Update By:" + _patternBinCategory.updatedby.name + '@' + _patternBinCategory.updated_at
                                                    + " || " 
                                                    + "Created By: " + _patternBinCategory.createdby.name + '@' + _patternBinCategory.created_at}  
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
                            count={patternBinCategoryList.length}
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

export default PatternBinCategoryListContainer;
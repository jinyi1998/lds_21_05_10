import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DesigmItemContainer from './designItemContainer';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import {AppContextStore} from '../../container/app';
import {apiCourseShowAll, apiCourseShowUsergroup} from '../../api.js';

const PublicDesignContainer = (props)=>{

    const [ courseList, setCourseList ] = React.useState([]);
    const [ courseListOpts, setCourseListOpts ] =  React.useState([]);
    const [ searchText, setSearchText ] = React.useState("");
    const [ usergroup, setUsergroup ] = React.useState([]); 
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

    const { setLoadingOpen } = React.useContext(AppContextStore);

    //call api to get the data
    async function reloadCourseList() {
        setLoadingOpen(true)
        await apiCourseShowAll().then(
            response => {
                setCourseList(response.data)
                setLoadingOpen(false)
            }
        )
        .catch(error => console.log(error));
    }

    async function fetchUsergroupData() {
        setLoadingOpen(true)
        await apiCourseShowUsergroup().then(response => {
            setUsergroup(response.data);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));
    }
    
    React.useEffect(() => {
        reloadCourseList();
        fetchUsergroupData();
    }, []);


    React.useEffect(()=>{
        setCourseListOpts(courseList);
    }, [courseList])

    React.useEffect(()=>{
        onFilterCourseListOpts();
    }, [searchText])

    //#region local function
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value)
    }
    
    const onFilterCourseListOpts = () => {
        setLoadingOpen(true);
        if(searchText.length > 0){
            var temp = courseList.filter(_course => {
                if(typeof _course.description != 'undefined' && typeof _course.unit_title != 'undefined'){
                    return (_course.description.toUpperCase().indexOf(searchText.toUpperCase()) != -1 
                    || _course.unit_title.toUpperCase().indexOf(searchText.toUpperCase()) != -1) ;
                }
            })
            setCourseListOpts(temp);
        }else{
            setCourseListOpts(courseList);
        } 
        setLoadingOpen(false);
    }
    //#endregion

    return (
        <React.Fragment>
            <Grid container spacing={4} justify="space-between">
                <Grid item xs = {4}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Public Design Aera
                    </Typography>
                </Grid>
                 
                 
                <Grid item xs = {4}>        
                    <Button variant="contained" color="primary" onClick={ () => {window.location.href = "designstudio"} }>
                        Add new design
                    </Button>
                </Grid>

                <Grid container item = {12} justify = {"flex-end"}>
                    <TextField variant = {"outlined"} label = {"Search"} value = {searchText} onChange = {onChangeSearchText}/>
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
                            {
                            courseListOpts.length > 0?
                                courseListOpts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_course ) => (
                                     
                                    <DesigmItemContainer 
                                        key ={_course.id} 
                                        courseData = {_course}
                                        usergroup = {usergroup}
                                        enableDuplicate = {_course.permission > 1}
                                        enableShare = {_course.permission > 99}
                                        enableDelete = {_course.permission > 3}
                                    />
                                ))
                            :
                                <TableRow hover>
                                    <TableCell component="th" scope="row" >
                                        No available design
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={courseListOpts.length}
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
export default PublicDesignContainer;

if (document.getElementById('publicdesign')) {
    ReactDOM.render(<PublicDesignContainer/>, document.getElementById('publicdesign'));
}
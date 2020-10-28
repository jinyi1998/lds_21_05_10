import React from 'react';

import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import PatternTemplateBuilderContainer from './patternTemplateBuilderContainer';

import {apiLearningPattTempList, apiLearningCompTempAddPattern, apiPatternbinAddPattern} from '../../../api';

const PatternTemplateSelectContainer = (props) => {
    const [ dialogOpen, setDialogOpen ] = React.useState(false)
    const [ patterns, setPatterns ] = React.useState([]);
    const [ avaPatterns, setAvaPatterns ] = React.useState([]);
    const [ searchText, setSearchText ] = React.useState("");
    const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
    const [ page, setPage ] = React.useState(0);

    React.useEffect(()=>{
        fetchPatterns()
    }, [props.component_id, props.patternid_id])

    React.useEffect(()=>{
        var temp = patterns;
        if(searchText.length > 0)
        {
            temp = temp.filter((_pattern) => 
                _pattern.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1
            )
        }

        setAvaPatterns(JSON.parse(JSON.stringify(temp)));
    }, [searchText])

    //#region api function related
    const fetchPatterns = () => {
        apiLearningPattTempList().then((response) => {
            if(typeof props.component_id != "undefined"){
                response.data = response.data.filter((_pattern)=>
                _pattern.componentsid.filter( _component => _component.component_id == props.component_id ).length == 0
            )
            }else if(typeof props.patternid_id != "undefined"){
                    response.data = response.data.filter((_pattern)=>
                    _pattern.componentsid.filter( _component => _component.component_id == props.component_id ).length == 0
                )
            }
            setPatterns(response.data)
            setAvaPatterns(response.data)
        })
    }

    const addPatternToComponent = (pattern) => {
        var request = {
            'pattern_id': -1,
            'component_id': -1
        }
        request['pattern_id'] = pattern.id;
        request['component_id'] = props.component_id;

        apiLearningCompTempAddPattern(request).then(
            () =>{
                if(typeof props.onFinish == 'undefined'){
                    location.reload()
                }else{
                    props.onFinish();
                }
            }
        );
    }

    const addPatternToPatternBin = (pattern) => {
        var request = {
            'pattern_id': -1,
            'patternbin_id': -1
        }
        request['pattern_id'] = pattern.id;
        request['patternbin_id'] = props.patternbin_id;

        apiPatternbinAddPattern(request).then(
            () =>{
                if(typeof props.onFinish == 'undefined'){
                    location.reload()
                }else{
                    props.onFinish();
                }
            }
        );
    } 
    //#endregion

    //#region local action
    const onChangeSearchText = (event) => {
        setSearchText(event.target.value)
    } 

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    const onClickAdd = (pattern) => {
        if(typeof props.component_id != 'undefined'){
            addPatternToComponent(pattern);
        }else if(typeof props.patternbin_id != 'undefined'){
            addPatternToPatternBin(pattern)
        }
      
    }
    //#endregion

    return (
        <React.Fragment>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title" maxWidth = "md">
                <DialogContent>
                    <Grid container>
                        <Grid item xs = {12}>
                            <TextField label="Search Text" value = {searchText} onChange = {onChangeSearchText} fullWidth/>
                        </Grid>
                        
                           <Table
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            aria-label="enhanced table"
                            >
                            <TableHead/>

                            <TableBody>
                                {avaPatterns
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((_pattern) => (
                                        <TableRow key={_pattern.name} key ={_pattern.id}>
                                            <TableCell component="th" scope="row">
                                                <PatternTemplateBuilderContainer mode = 'list' pattern_id = {_pattern.id} />
                                                {/* {_pattern.title} */}
                                            </TableCell>
                                            <TableCell component="th" onClick = {() => onClickAdd(_pattern) }>
                                                <IconButton color="primary" aria-label="add to shopping cart" >
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                          </Table>
                           <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={avaPatterns.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                    </Grid>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setDialogOpen(false)} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant = "contained" color = "primary" onClick = {() => { setDialogOpen(true) }}> Add Related Pattern</Button>
        </React.Fragment>
    )
}

export default PatternTemplateSelectContainer;
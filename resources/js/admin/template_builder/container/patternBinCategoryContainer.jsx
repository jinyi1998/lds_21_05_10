import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';

import FolderIcon from '@material-ui/icons/Folder';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import PatternBinContainer from './patternBinContainer';


import {apiPatternbinCategoryGet, apiPatternbinCategoryPut, apiPatternbinPost, apiPatternbinDelete} from '../../../api';
import {AppContextStore} from '../../../container/app';

const PatternBinCategoryContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ patternBinCategory, setPatternBinCategory ] = React.useState({
        name: "",
        patternbin: []
    });

    const [ editName, setEditName ] = React.useState("");
    const [ isEditName, setIsEditName ] = React.useState(false);
    const [ patternbinID, setPatternbinID] = React.useState(-1);
    const [ isOpenPatternbin, setIsOpenPatternBin ] = React.useState(false);
  
    const reloadPatternBinCategory = () => {
        setLoadingOpen(true)
        apiPatternbinCategoryGet(props.patternbin_category_id).then(
            response => {
                setPatternBinCategory(response.data)
                setLoadingOpen(false)
            }
        )
    }


    //#region local action
    const onChangeName = (event) => {
        setEditName(event.target.value);
    }

    const onClickEditName = () => {
        setIsEditName(true);
    }

    const onConfirmEditName = () => {
      
        var request = {
            ...patternBinCategory,
            name: editName
        }
        apiPatternbinCategoryPut(request).then((response)=>{
            setIsEditName(false);
        })
    }

    const onCancelEditName = () => {
        setEditName(patternBinCategory.name);
        setIsEditName(false);
    }

    const onAddPatternBin = () => {
        var request = {
            name: "New Pattern Bin",
            patternbin_category_id: patternBinCategory.id
        }

        apiPatternbinPost(request).then((response)=>{
            reloadPatternBinCategory();
            onClickPatternBin(response.data.id);
        })

    }

    const onClickPatternBin = (patternbin_id) => {
        setPatternbinID(patternbin_id);
        setIsOpenPatternBin(true);
    }

    const onClosePatternBin = () => {
        setPatternbinID(-1);
        reloadPatternBinCategory();
        setIsOpenPatternBin(false);
    }

    const onDeletePatternBin = (patternbin) => {
        apiPatternbinDelete(patternbin).then(()=>{
            reloadPatternBinCategory();
        })
    }

    const onFinish = () => {
        window.location.href = "../patternbin_category";
    }
    //#endregion

    React.useEffect(()=>{
        setLoadingOpen(true);
        reloadPatternBinCategory();
    }
    ,[props.patternbin_category_id])

    React.useEffect(()=>{
        setEditName(patternBinCategory.name);
    }, [patternBinCategory.name])


    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {3}>
                <Grid item xs = {12}>
                    <Typography component="h1" variant="h5" color="inherit" noWrap>
                        Pattern Bin Category
                    </Typography>
                </Grid>

                <Grid container item xs= {12}>
                    <Paper style = {{width: '100%', padding: 16}}>
                        {/* name */}
                        <Grid container item xs ={12}>
                            <Grid item xs = {10}>
                                {
                                    isEditName?
                                    <TextField 
                                        label="Pattern Bin Category Name" 
                                        variant="outlined" 
                                        value = {editName} 
                                        onChange = {onChangeName}
                                        fullWidth/>
                                    :
                                    <Typography variant = "h6"> {editName} </Typography>
                                }
                            
                            </Grid>
                            <Grid item xs ={2}>
                                {
                                    isEditName?
                                    <React.Fragment>
                                        <IconButton color = "primary" onClick = {()=>{onConfirmEditName()}}>
                                            <DoneIcon />
                                        </IconButton>
                                        <IconButton color = "secondary" onClick = {()=>{onCancelEditName()}}>
                                            <CancelIcon/>
                                        </IconButton>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <IconButton color = "primary" onClick = {()=> {onClickEditName()}}>
                                            <LockOpenIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            </Grid>  
                        </Grid>
                        
                        {/* pattern bin */}
                        <Grid container item xs = {12}>
                            <Paper style = {{width: '100%', padding: 16}}>
                                <Grid container item xs = {12}>
                                    <Grid item xs = {10}>
                                        <Typography variant = "subtitle2">Pattern Bin</Typography>
                                    </Grid>
                                 
                                    <Grid item xs = {2}>
                                        <Button onClick = {onAddPatternBin} variant = "outlined" color = "primary">
                                            Add New Pattern Bin
                                        </Button>
                                    </Grid>
                                </Grid>
                               

                                <Grid item xs = {12}>
                                    {
                                        patternBinCategory.patternbin.length == 0?
                                        <Grid container justify = {"center"} alignItems = {"center"}>
                                            <Typography variant = "h6">No Pattern Bin in this category</Typography>
                                        </Grid>
                                        :
                                        <List style = {{width: "100%"}}>
                                        {   
                                            patternBinCategory.patternbin.map((_patternbin) => {
                                                return(
                                                    <ListItem key = {_patternbin.id} onClick = {()=>onClickPatternBin(_patternbin.id)} button>
                                                        <ListItemIcon>
                                                            <FolderIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary = {_patternbin.name}/>
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" aria-label="delete" onClick = {()=>onDeletePatternBin(_patternbin)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>

                                                    </ListItem>
                                                );
                                            })
                                        }
                                        </List>
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs = {12}>
                            <Button variant = {"contained"} color = {"primary"} onClick = {onFinish} fullWidth> Finish </Button>
                        </Grid>
                    </Paper>
                </Grid>  

              
                {/* dialog */}
                <Dialog
                    open={isOpenPatternbin}
                    onClose={onClosePatternBin}
                    fullWidth={true}
                    maxWidth={"lg"}
            
                >
                    <PatternBinContainer patternbin_id = {patternbinID} />
                    <Button variant = {"contained"} color = {"primary"} onClick = {onClosePatternBin}> Finish </Button>
                </Dialog>
            </Grid>
        </React.Fragment>
    );
}

export default PatternBinCategoryContainer;
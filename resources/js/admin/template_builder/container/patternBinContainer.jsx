import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import LockOpenIcon from '@material-ui/icons/LockOpen';
import DoneIcon from '@material-ui/icons/Done';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import PatternTemplateSelectContainer from './patternTemplateSelectContainer';
import PatternTemplateBuilderContainer from './patternTemplateBuilderContainer';

import { AppContextStore } from '../../../container/app';
import { apiPatternbinGet, apiPatternbinPut, apiPatternbinDeletePattern } from '../../../api';

const PatternBinContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [patternBin, setPatternBin] = React.useState({
        id: -1,
        name: '',
        patterns: []
    })
    const [isEditName, setIsEditName] = React.useState(false);
    const [editName, setEditName] = React.useState("");

    React.useEffect(()=>{
        reloadPatternBin();
    }, [props.patternbin_id])

    const reloadPatternBin = () => {
        setLoadingOpen(true);
        apiPatternbinGet(props.patternbin_id).then((response)=>{
            setPatternBin(response.data)
            setEditName(response.data.name);
            setLoadingOpen(false)
        })
    }

    const onConfirmEditName = () => {
        var request = {
            ...patternBin,
            name: editName
        };

        apiPatternbinPut(request).then(()=>{
            reloadPatternBin();
            setIsEditName(false);
        });
      
    }

    const onChangeEditName = (event) => {
        setEditName(event.target.value)
    }

    const onCancelEditName = () =>{
        setEditName(patternBin.name);
        setIsEditName(false);
    }

    const onClickEditName = () => {
        setIsEditName(true);
    }

    const onDeletePattern = (pattern_id) =>{
        var request = {
            pattern_id: pattern_id,
            patternbin_id: patternBin.id
        };

        apiPatternbinDeletePattern(request).then(()=>{
            reloadPatternBin();
        })
    }

    return (
    <React.Fragment>
        <Grid container style = {{padding: 16}}>
            {/* name */}
            <Grid container item xs = {12} style = {{margin: 16}}>
                {
                    isEditName?
                    <React.Fragment>
                        <Grid item xs = {10}>
                            <TextField label = "Pattern Bin Name" value = {editName} onChange = {onChangeEditName} fullWidth/>
                        </Grid>
                        <Grid item xs = {2}>
                            <IconButton color = "primary" onClick = {()=>{onConfirmEditName()}}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton color = "secondary" onClick = {()=>{onCancelEditName()}}>
                                <CancelIcon/>
                            </IconButton>
                        </Grid>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Grid item xs = {10}>
                            <Typography variant = "subtitle1">{patternBin.name}</Typography>
                        </Grid>
                        <Grid item xs = {2}>
                            <IconButton color = "secondary" onClick = {()=>{onClickEditName()}}>
                                <LockOpenIcon/>
                            </IconButton>
                        </Grid>
                    </React.Fragment>
                }
            </Grid>

            {/* related patterns */}
            <Grid container item xs = {12}  style = {{margin: 16}}>
                <Grid item xs = {8}>
                    <Typography component = "h6"> Patterns in this bin</Typography>
                </Grid>
                <Grid item xs = {4}>
                    {/* <Button variant = {"outlined"} color = {"primary"}> Add patterns to this bin </Button> */}
                    <PatternTemplateSelectContainer patternbin_id = {patternBin.id} onFinish = {reloadPatternBin}/>
                </Grid>

                <Grid item xs ={12}>
                    <Paper style = {{width: "100%", padding: 16}}>
                       {
                           patternBin.patterns.length == 0?
                           <React.Fragment>
                               <Grid container justify = {"center"} alignItems = {"center"}>
                                    <Typography variant = "subtitle1"> No pattern in this bin</Typography>
                               </Grid>
                           </React.Fragment>
                           :
                           <React.Fragment>
                               {patternBin.patterns.map((_pattern)=> 
                               <Grid container alignItems="center" justify="center" direction="row" key = {_pattern.id}>
                                    <Grid item xs ={11}  style={{padding: 16}}>
                                        <PatternTemplateBuilderContainer 
                                            mode = 'list' 
                                            pattern_id = {_pattern.id}
                                            onFinish = {reloadPatternBin}
                                        />
                                    </Grid>

                                    <Grid item xs ={1}>
                                        <IconButton color="primary" onClick = {()=>{onDeletePattern(_pattern.id)}}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                               )}
                           </React.Fragment>
                       }
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </React.Fragment>
    );
}

export default PatternBinContainer;
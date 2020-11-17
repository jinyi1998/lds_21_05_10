import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import clsx from 'clsx';

import {AppContextStore} from '../../../container/app';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: 400, margin: "5%"
    },
    media: {
        height: 200,
        width: '100%',
        backgroundSize: 'contain'
    },
    action: {
        // backgroundColor: "#ffffff",
        padding: "0px 30px 0px 30px", 
        transition: "opacity 0.3s ease, height 0.5s ease",
    },
    
    action_before: {
        opacity: 0,
        zIndex: 1,
        height: "0px",
    },

    action_after: {
        position: "relative",
        opacity: 1,
        width: "100%",
        zIndex: 1,
        height: "50px",
    },    
  }));


const ComponentPatternSelectBox = (props) => {
    const {index, _patternOpt, selectPattern} = props;
    const [ isMouseOver, setIsMouseOver ] = React.useState(false);
    const classes = useStyles(); 

    const { options, returnImgSrc } = React.useContext(AppContextStore);

    const handleOnClick = (e, index) => {
        if(typeof props.handleOnClick != "undefined"){
            props.handleOnClick(e, index);
        }
    }

    const handleOnSelect = (e, index) => {
        if(typeof handleOnSelect != 'undefined'){
            props.handleOnSelect(e, index)
        }
    } 

    const handleMouseOver = () => {
        setIsMouseOver(true);
    }

    const handleMouseOut = () => {
        setIsMouseOver(false)
    }

    React.useEffect(()=> {
        console.log(props.selectPattern);
    }, [props.selectPattern]) 

    return (
        <Grid item xs = {4} key ={index}>
            <ToggleButton 
                variant="outlined" 
                key ={index} 
                selected = {selectPattern == index} 
                className = {classes.button} 
                onMouseOver = {handleMouseOver}
                onMouseOut = {handleMouseOut}
            >
                <Grid container>
                    <Grid container item xs ={12} justify = "center">
                        <img src =  {returnImgSrc(_patternOpt.media)}  style = {{height: 150}}/>
                    </Grid>

                    <Grid item xs ={12}>
                        {_patternOpt.title}
                    </Grid>

                    {/* <Grid item xs = {12}>
                        <Checkbox
                            checked={selectPattern == index}
                            onClick={(event) => handleOnSelect(event, index)}
                        />
                    </Grid> */}

                    <Grid 
                        container
                        item xs = {12}
                        className={clsx(classes.action, isMouseOver && classes.action_after, !isMouseOver && classes.action_before)}
                    >
                        <Grid container item xs = {6} 
                            alignItems="center"
                            justify="center">
                            <Button 
                                    variant="contained" color="primary"
                                    onClick={(event) => handleOnClick(event, index)}
                                    aria-label="show more"  
                                >
                                    Know More
                            </Button>
                            </Grid>
                            
                            <Grid container item xs = {6} 
                            alignItems="center"
                            justify="center">
                            <Button 
                                    variant="outlined" color="primary"
                                    onClick={(event) => handleOnSelect(event, index)}  
                                    aria-label="add"  
                                >
                                    Select
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ToggleButton>
        </Grid>
    );
}

export default ComponentPatternSelectBox;
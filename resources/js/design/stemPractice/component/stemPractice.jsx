import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {AppContextStore} from '../../../container/app';

const useStyles = makeStyles(theme => ({

  media: {
      height: 250,
      width: '100%',
      backgroundSize: 'contain'
  },

  hover_after: {
    transition: "opacity 0.5s ease,  height 0.5s ease",
    content: ' ',
    opacity: 0.6,
    width: "100%",
    height: "0px",
    top: 0,
    backgroundColor: "#000838",
    zIndex: 0,
  },

  action: {
    backgroundColor: "#ffffff",
    padding: "0px 30px 0px 30px",
    transition: "opacity 0.5s ease, height 0.5s ease",
   
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
    height: "50px",
    zIndex: 1,
  },

  info: {
    padding: "5%",
    transition: "opacity 0.5s ease, background-color 0.5s ease, height 0.5s ease",
  },

  info_before: {
    // transition: "opacity 0.1s linear, background-color 0.1s linear",
    backgroundColor: "#fff",
    opacity: 1,
    zIndex: 1,
  },

  info_after:{
    height: 'calc(100% - 100px)',
    backgroundColor: "#050038",
    opacity: 0.6,
    zIndex: 1,
    top: 0
  }
}));

const StemPractice = (props) => {

    const classes = useStyles();
    const { designBoxData } = props;
    const { returnImgSrc } = React.useContext(AppContextStore);

    const [ isMouseOver, setIsMouseOver ] = React.useState(false);
    
    const handleExpandClick = (event) => {
      event.stopPropagation();
      if(typeof props.onClickMore != 'undefined'){
        props.onClickMore(designBoxData.id);
      }
    };

    const handleMouseOver = () => {
      if(!isMouseOver){
        setIsMouseOver(true)
      }
    }

    const onSelectSTEMPractice = () => {
      if(typeof props.onSelectSTEMPractice != 'undefined'){
          props.onSelectSTEMPractice(designBoxData.id);
      }
    }

    return (
      <Grid container 
        justify = {"center"} 
        style= {{
          width: "30%",
          padding: "5% 0 5% 0"
      }}>
        <Grid container item xs ={12} justify = {"center"} 
            onMouseOver = {handleMouseOver}
            onMouseLeave = {() => {setIsMouseOver(false)}} 
            style = {{maxWidth: 400}}
        >
          <Paper>
            {/* media */}
            <Grid
            container
            className={clsx(isMouseOver && classes.hover_after, !isMouseOver && classes.media)}
            variant="outlined" 
      
            data-tour = {"designtype_action_" +  designBoxData.id}
          >
            <Grid item xs ={12}>
                <img src = {returnImgSrc(designBoxData.media)} className ={classes.media} />
            </Grid>
          </Grid>
            {/* info */}
            <Grid container 
              className={clsx(classes.info, isMouseOver && classes.info_after, !isMouseOver && classes.info_before)} 
            >
                <Grid item xs = {12}>
                    <Typography 
                      variant={clsx(isMouseOver && "h6", !isMouseOver && "subtitle2")} 
                      color={clsx(!isMouseOver && "primary")} 
                      data-tour = {"designtype_title_" + designBoxData.id} 
                      style = {{color: clsx(isMouseOver && "#fff")}}
                    >
                        {designBoxData.name}
                    </Typography>
                </Grid>
                <Grid  item xs = {12}>
                    <Typography 
                    variant={clsx(isMouseOver && "subtitle2", !isMouseOver && "caption")} 
                      display="block" 
                      color={clsx( !isMouseOver && "textSecondary")} 
                      style = {{color: clsx(isMouseOver && "#fff")}} 
                    >
                      {designBoxData.description}
                    </Typography>
                </Grid>
            </Grid>
            
            {/* action */}
            <Grid container item xs ={12} justify = {"center"}
              className={clsx(classes.action, isMouseOver && classes.action_after, !isMouseOver && classes.action_before)} 
            >
              
              <Grid container item xs = {6} 
              alignItems="center"
              justify="center">
              <Button 
                    variant="contained" color="primary"
                    onClick={(event) => handleExpandClick(event)}
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
                    onClick={onSelectSTEMPractice}  
                    aria-label="add"  
                  >
                      Add
              </Button>
              </Grid>
            </Grid>  
            
          </Paper>
        </Grid>
      </Grid>
  
      );
}
export default StemPractice;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {AppContextStore} from '../container/app';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gridList: {
      minHeight: 450,
      margin: 10,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
  },
  media: {
      height: 250,
      width: '100%',
      backgroundSize: 'contain'
  },
  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
}));

const DesignTypeBox = (props) => {

    const classes = useStyles();
    const {designBoxData, onClick, onClickMore} = props;
    const { returnImgSrc } = React.useContext(AppContextStore);
    
    const handleExpandClick = (event) => {
      event.stopPropagation();
      onClickMore(designBoxData.id);
    };


    return (
      <Grid item xs = {4}>

        <Button 
          variant="outlined" 
          style= {{maxWidth: 400, margin: "5%"}}  
          onClick={ (event)=>onClick(event, designBoxData.id)}  
          data-tour = {"designtype_action_" +  designBoxData.id}
        >
          <Grid container>
              <Grid item xs ={12}>
                  <img src = {returnImgSrc(designBoxData.media)} className ={classes.media} />
              </Grid>
              <Grid item xs = {12}>
                  <Typography variant="subtitle2" color="primary"  data-tour = {"designtype_title_" + designBoxData.id} style = {{textTransform: "initial"}}>
                      {designBoxData.name}
                  </Typography>
              </Grid>
              <Grid  item xs = {12}>
                  <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                    {designBoxData.description}
                  </Typography>
              </Grid>

              <Grid item xs = {12}>
                <Button 
                  variant="contained" color="primary"
                  onClick={(event) => handleExpandClick(event)}
                  aria-label="show more"
                >
                    Know More
                </Button>
              </Grid>
          </Grid>
        </Button>
       
      </Grid>
  
      );
}
export default DesignTypeBox;
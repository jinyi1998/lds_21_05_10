import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BookmarksIcon from '@material-ui/icons/Bookmarks';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import KitchenIcon from '@material-ui/icons/Kitchen';
// import DesigmItem from './designItem';


const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: 400, margin: "5%"
    },
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

const TemplateBuilderContainer = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container justify="space-between" spacing = {1}>
               <Grid item xs = {4}>
                    <Button 
                        variant="outlined" 
                        className ={classes.button}
                        onClick={ (event)=>{window.location.href = "design_type"}}  
                    >
                        <Grid container>
                            <Grid item xs ={12}>
                                <LibraryBooksIcon  className ={classes.media} />
                            </Grid>
                            <Grid item xs = {12}>
                                <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                    Design Type
                                </Typography>
                            </Grid>
                            <Grid  item xs = {12}>
                                <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                                    Edit the default design Type Here
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>

                <Grid item xs = {4}>
                    <Button 
                        variant="outlined" 
                        className ={classes.button}
                        onClick={ (event)=>{window.location.href = "component_template"}}  
                    >
                        <Grid container>
                            <Grid item xs ={12}>
                                <BookmarksIcon  className ={classes.media} />
                            </Grid>
                            <Grid item xs = {12}>
                                <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                    Component Template
                                </Typography>
                            </Grid>
                            <Grid  item xs = {12}>
                                <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                                    You can edit the component template here.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>

                <Grid item xs = {4}>
                    <Button 
                        variant="outlined" 
                        className ={classes.button}
                        onClick={ (event)=>{window.location.href = "pattern_template"}}  
                    >
                        <Grid container>
                            <Grid item xs ={12}>
                                <FormatListNumberedRtlIcon  className ={classes.media} />
                            </Grid>
                            <Grid item xs = {12}>
                                <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                    Pattern Template
                                </Typography>
                            </Grid>
                            <Grid  item xs = {12}>
                                <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                                    You can edit the pattern template here.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>

                <Grid item xs = {4}>
                    <Button 
                        variant="outlined" 
                        className ={classes.button}
                        onClick={ (event)=>{window.location.href = "patternbin_category"}}  
                    >
                        <Grid container>
                            <Grid item xs ={12}>
                                <KitchenIcon  className ={classes.media} />
                            </Grid>
                            <Grid item xs = {12}>
                                <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                    Pattern Bin Management
                                </Typography>
                            </Grid>
                            <Grid  item xs = {12}>
                                <Typography variant="caption" display="block" color="textSecondary" style = {{textTransform: "initial"}}>
                                    You can edit the pattern bin/ category here.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default TemplateBuilderContainer;
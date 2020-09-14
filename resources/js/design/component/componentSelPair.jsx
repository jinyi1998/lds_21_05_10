import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GridOnIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';

import {
    apiDesignTypeList,
    apiLearningCompGetLearningCompByDesignType
} from '../../api.js';

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
        maxHeight: 250,
        width: '100%',
        backgroundSize: 'contain'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
  }));

const DesignComponentSelPair = (props) => {
    const classes = useStyles();
    const {handleAddShoppingCart} = props;
    
    const [designTypeOtps, setDesignTypeOtps] = React.useState([
    ])
    
    const [view, setView] = React.useState('list');
    const [step, setStep] = React.useState(0);
    const [selectType, setType] = React.useState(0); 
    const [componentOpts, setComponentOpts] =  React.useState([]); 


    React.useEffect(()=>{
        apiDesignTypeList()
        .then(response => {
            setDesignTypeOtps(response.data)
        }) 
    }, [])

    async function fetcComponentOptsData() {
        await apiLearningCompGetLearningCompByDesignType(selectType)
        .then( response=>{
            setComponentOpts(response.data);
        })
        .catch(error => console.log(error));
    }

    React.useEffect(()=>{
        if(selectType > 0){
            fetcComponentOptsData()
        }
    },[selectType])

    const onSelectDesignType = (id) => {
        setType(id);
        setStep(1);
    }

    const onClickComponent = (component) => {
        handleAddShoppingCart(component)
    }

    const handleAlignment = (event, newAlignment) => {
        setView(newAlignment);
      };


    const displayStep1 = () =>{
        switch(view){
            default:
            case 'list':
                return (
                    <React.Fragment>             
                        <List>
                            {designTypeOtps.map((_data, index)=>{
                                return(
                                    <ListItem button key={_data.id} onClick = {() => onSelectDesignType(_data.id)} divider = {true}>
                                        {_data.name}
                                        <ListItemSecondaryAction> <ArrowForwardIosIcon /> </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </React.Fragment>
                )              
            case 'grid':
                return (
                    <React.Fragment>
                        <GridList className={classes.gridList}>
                                {designTypeOtps.map((_data, index)=>( 
                                    <Grid index xs = {4} key = {index}>
                                        <Button style= {{width: 400, margin: "5%"}}  onClick={(event) => onSelectDesignType(_data.id)} variant="outlined">
                                            <Grid container>
                                                <Grid item xs ={12}>
                                                    <img src = {_data.media} className ={classes.media} />
                                                </Grid>
                                                <Grid item xs = {12}>
                                                    <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                                        {_data.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid  item xs = {12}>
                                                    <Typography variant="caption" display="block" gutterBottom color="textSecondary" style = {{textTransform: "initial"}}>
                                                        {_data.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Button>
                                    </Grid>
                                ))}
                        </GridList>   
                    </React.Fragment>
                )
        }
    }

    const displayStep2 = () => {
        switch(view){
            default:
            case 'list':
                return(
                    <React.Fragment>
                        <List>
                            {componentOpts.map((_data, index)=>{
                                return(
                                    <ListItem button key={_data.id} onClick = {() => onClickComponent(_data)} divider = {true}>
                                        {_data.title}
                                        <ListItemSecondaryAction> <AddShoppingCartIcon /> </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Button onClick = {()=>{setStep(0)}} variant="contained" color="primary">Back to Design Type</Button>
                    </React.Fragment>
                )
            case 'grid':
                return(
                    <React.Fragment>
                        <GridList className={classes.gridList}>
                                 {componentOpts.map((_data, index)=>( 
                                    <Grid index xs = {4} key = {index}>
                                        <Button style= {{width: 300, margin: "5%"}} onClick = {() => onClickComponent(_data)} variant="outlined">
                                            <Grid container>
                                                <Grid item xs ={12}>
                                                    <img src = {_data.instructions?.length > 0? 
                                                        _data.instructions[0].media : "https://elearning.cite.hku.hk/wp-content/uploads/2020/03/shutterstock_454259326-1024x754.jpg"
                                                    } className ={classes.media} />
                                                </Grid>
                                                <Grid item xs = {12}>
                                                    <Typography variant="subtitle2" color="primary" style = {{textTransform: "initial"}}>
                                                        {_data.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid  item xs = {12}>
                                                    <Typography variant="caption" display="block" gutterBottom color="textSecondary" style = {{textTransform: "initial"}}>
                                                      {
                                                          _data.instructions?.length > 0?
                                                          _data.instructions[0].description
                                                          :
                                                          null
                                                      }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Button>
                                    </Grid>
                                ))}
                        </GridList>  
                        <Button onClick = {()=>{setStep(0)}} variant="contained" color="primary">Back to Design Type</Button> 
                    </React.Fragment>
                )
        }
    }

    const displayStepContent = () => {
        switch(step){
            case 0:
                return(
                    displayStep1()
                )
            case 1:
                return(
                    displayStep2()
                )
        }
    }

    return(
      <Paper>
            <Stepper activeStep={step} style = {{padding: '2% 25%'}}>
                    <Step key={1}>
                        <StepLabel >Select Your Template Design Type</StepLabel>
                    </Step>

                    <Step key={2}>
                        <StepLabel >Select Your Component</StepLabel>
                    </Step>
            </Stepper>
            
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                >
                <ToggleButton value="list" aria-label="left aligned">
                    <ListIcon />
                </ToggleButton>
                <ToggleButton value="grid" aria-label="centered">
                    <GridOnIcon />
                </ToggleButton>
            </ToggleButtonGroup>
                
            {displayStepContent()}
      </Paper>
    );
}

export default DesignComponentSelPair;

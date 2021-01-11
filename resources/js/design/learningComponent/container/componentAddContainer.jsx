import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import LocalMallIcon from '@material-ui/icons/LocalMall';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import ComponentAddView from '../component/componentAddView';

import { makeStyles } from '@material-ui/core/styles';
  
const ComponentAddContainer = (props) => {
    const {handleClose, open, addItems} = props;
    const [componentShoppingCart, setComponentShoppingCart] = React.useState([]);

    const handleAdd = () => {
        if(props.addItems != 'undefined'){
            addItems(componentShoppingCart);
        }
        handleClose();
    }

    const handleAddShoppingCart = (component) => {
        setComponentShoppingCart([...componentShoppingCart, component])
    }

    const RemoveShoppingCart = (index) =>{
        var new_shoppingcart = componentShoppingCart;
        new_shoppingcart.splice(index, 1);
        setComponentShoppingCart([...new_shoppingcart])
    }

    React.useEffect(()=>{
        setComponentShoppingCart([]);
    }, [open])
    
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true} onEntered = {props.onEnteredDialog}>
            <DialogTitle id="form-dialog-title"> Add Curruculum Component</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid container item xs = {12}>
                        <Grid item xs ={12}>
                            <Typography variant = "h6">Shopping Cart</Typography>
                      
                        </Grid>

                        <Paper style = {{width: '100%'}}>
                            <List>
                                {
                                    componentShoppingCart.length > 0?
                                    <React.Fragment>
                                        { 
                                            componentShoppingCart.map((_component, index)=>
                                            <ListItem key = {index}>
                                                <ListItemIcon><LocalMallIcon/></ListItemIcon>
                                                <ListItemText> 
                                                    {_component.title} {_component.pattern_title? _component.pattern_title : null}
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <Tooltip title="Remove From Shopping Cart" placement="top-end">
                                                        <IconButton onClick ={(e)=>RemoveShoppingCart(index)} data-tour = "component_step_duplicate">
                                                            <RemoveShoppingCartIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            )
                                        }
                                    </React.Fragment>
                                    :
                                    <ListItem>
                                       There is no components in this shopping cart
                                    </ListItem>
                                }
                            </List>
                        </Paper>
                      
                      
                    </Grid>
                    <Grid item xs = {12}>
                        <ComponentAddView 
                            handleAddShoppingCart = {handleAddShoppingCart}
                            module = {props.module}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick ={()=>handleAdd()} color="secondary">
                    Add Curruculum Component
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ComponentAddContainer;
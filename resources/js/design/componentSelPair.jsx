import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const data = [
    {
        id: 1,
        type: "Engineering Design + Self Directed Learning",
        dataSet: ["ED+SDL 1", "ED+SDL 2", "ED+SDL 3"]
    },
    {
        id: 2,
        type: "Scientific Investigation + Self Directed Learning",
        dataSet: ["SI+SDL 1", "SI+SDL 2", "SI+SDL 3"]
    },
    {
        id: 3,
        type: "Engineering Design + Teacher Guided Learning",
        dataSet: ["ED+TGL 1", "ED+TGL 2", "ED+TGL 3"]
    },
    {
        id: 4,
        type: "Scientific Investigation + Teacher Guided Learning",
        dataSet: ["SI+TGL 1", "SI+TGL 2", "SI+TGL 3"]
    },
];

const DesignComponentSelPair = (props) => {
    const dataSet = data; 
    const [selectType, setType] = React.useState("1"); 
    const classes = useStyles();
    const {component, setComponent} = props;

    const onTypeChange = (event) => {
        setType(event.target.value);
        
    }
    const onSelectComp = (event) =>{
        setComponent(event.target.value);
    }

    return(
      <Paper>
        <FormControl className={classes.formControl} fullWidrg>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange = {(event)=>onTypeChange(event)}
            >
                {dataSet.map((_data)=>( 
                    <MenuItem value={_data.id}>{_data.type}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidrg>
            <InputLabel id="demo-simple-select-label">Component</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange = {(event)=>onSelectComp(event)}
            >
                {dataSet.map((_data)=>(
                    (_data.id == selectType ? _data.dataSet.map((__data)=>(<MenuItem value={__data}>{__data}</MenuItem>)): null)
                ))}
            </Select> 
        </FormControl>
      </Paper>
    );
}

export default DesignComponentSelPair;

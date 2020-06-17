import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import config from 'react-global-configuration';

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
    },
    {
        id: 2,
        type: "Scientific Investigation + Self Directed Learning",
    },

];

const DesignComponentSelPair = (props) => {
    const dataSet = data; 
    const [selectType, setType] = React.useState("1"); 

    const [componentOpts, setComponentOpts] =  React.useState([]); 
    const [selectComponent_id, setSelectComponent_id] = React.useState(""); 


    async function fetcComponentOptsData() {
        const res = await fetch(
            'http://'+config.get('url')+'/api/learningComponent/getLearningComponentByDesignType/' + selectType,
            {
            method: "GET",
            }
        )
            .then(res => res.json())
            .then(response => {
                setComponentOpts(response);
        })
        .catch(error => console.log(error));
    }

    const classes = useStyles();
    const {setComponentID} = props;

    const onTypeChange = (event) => {
        setType(event.target.value);
    }

    React.useEffect(()=>{
        fetcComponentOptsData()
        setSelectComponent_id("")
    },[selectType])

    const onSelectComp = (event) =>{
        setSelectComponent_id(event.target.value);
        //sync the data to upper layer
        setComponentID(event.target.value);
    }



    return(
      <Paper>
        <FormControl className={classes.formControl} >
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                onChange = {(event)=>onTypeChange(event)}
                value = {selectType}
                data-tour = "designtype_select"
            >
                {dataSet.map((_data, index)=>( 
                    <MenuItem value={_data.id} key={index}>{_data.type}</MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel id="component-select-label">Component</InputLabel>
            <Select
                labelId="component-select-label"
                id="component-select"
                onChange = {(event)=>onSelectComp(event)}
                value = {selectComponent_id}
                data-tour = "component_select"
            >
                <MenuItem value = "" disabled>N/A </MenuItem>
                {componentOpts.map((opts, index)=>
                    <MenuItem value={opts.id} key= {index}>{opts.title}</MenuItem>
                )}
            </Select> 
        </FormControl>
      </Paper>
    );
}

export default DesignComponentSelPair;

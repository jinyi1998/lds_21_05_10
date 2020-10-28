import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

import { AppContextStore } from '../../../container/app';

import { apiPatternbinCategoryList, apiPatternbinCategoryGet, apiPatternbinGet } from '../../../api';

const ComponentPatternBinFilterContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ patternBinCategories, setPatternBinCategories ] = React.useState([]);
    const [ patternBins, setPatternBins ] = React.useState({});
    const [ selectedPatternBinID, setSelectedPatternBinID] = React.useState(-1);
    const [ selectedPatternBinCatID, setSelectedPatternBinCatID] = React.useState(-1);
    const [ searchText, setSearchText ] = React.useState("");

    React.useEffect(()=>{
        apiPatternbinCategoryList().then((response) => {
            setPatternBinCategories(response.data)
        })
    }, []);

    React.useEffect(()=>{
        setLoadingOpen(true);
        var updates_request = [];
        var _patternBins = {};
        var _patternBins_id = {};

        patternBinCategories.map((_cat)=>{
            updates_request.push(
                apiPatternbinCategoryGet(_cat.id).then((response)=>{
                    _patternBins[_cat.id] = response.data.patternbin;
                    _patternBins_id[_cat.id] = -1;
                })
            );
        });

        Promise.all(updates_request).then(()=>{
            setPatternBins(_patternBins);
            setSelectedPatternBinID(_patternBins_id);
            setLoadingOpen(false);
        })

    }, [patternBinCategories])


    React.useEffect(()=>{
     
        if(selectedPatternBinID > 0){
            onFilterByBin();
        }else{
            setLoadingOpen(true);
            if(typeof props.originalPatterns != 'undefined' && typeof props.patternOpts != 'undefined' && typeof props.setPatternOpts != 'undefined'){
                props.setPatternOpts(props.originalPatterns);
            }
            setLoadingOpen(false);
        }
    }, [selectedPatternBinID])

    React.useEffect(()=>{
        setLoadingOpen(true);

        if(searchText.length){
            onFilterBySearchText();
        }else{
            if(typeof props.originalPatterns != 'undefined' && typeof props.patternOpts != 'undefined' && typeof props.setPatternOpts != 'undefined'){
                if(selectedPatternBinID > 0){
                    onFilterByBin();
                }else{
                    props.setPatternOpts(props.originalPatterns);
                }
            }
            setLoadingOpen(false);
        }
    }, [searchText])

    //#region local action
    const onChangePatternBin = (event, cat_id) => {
        setSelectedPatternBinID(event.target.value);
        setSelectedPatternBinCatID(cat_id)
    }

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const onFilterByBin = () => {
        setLoadingOpen(true);
        apiPatternbinGet(selectedPatternBinID).then((response)=>{
            //apply filter
            if(typeof props.originalPatterns != 'undefined' && typeof props.patternOpts != 'undefined' && typeof props.setPatternOpts != 'undefined'){
                var pattern_filter_arr = response.data.patterns.map((_pattern) => _pattern.id);

                var temp = JSON.parse(JSON.stringify(props.originalPatterns));
                temp = temp.filter(_pattern => pattern_filter_arr.indexOf(_pattern.id) > -1);

                props.setPatternOpts(temp);
            }
            setLoadingOpen(false);
        })
    }

    const onFilterBySearchText = () => {
        setLoadingOpen(true);
        if(typeof props.originalPatterns != 'undefined' && typeof props.patternOpts != 'undefined' && typeof props.setPatternOpts != 'undefined'){
            var temp = JSON.parse(JSON.stringify(props.patternOpts));
            temp = temp.filter(_pattern => {
                if(typeof _pattern.title == "undefined"){
                    return false;
                }
                if(_pattern.title.toUpperCase().indexOf(searchText.toUpperCase()) > -1){
                    return true;
                }
                return false;
            });

            props.setPatternOpts(temp);
        }
        setLoadingOpen(false);
    }
    //#endregion

    return (
        <React.Fragment>
            <Grid container spacing = {2}>
                <Grid item xs = {2}>
                    <TextField
                        label={"Search Text"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange = {onChangeSearchText}
                    />
                </Grid>

                {patternBinCategories.map((_cat) => 
                   <Grid item xs = {2}>
                    <FormControl style = {{ 
                            minWidth: 150,
                            // margin: 16
                        }}
                        key = {_cat.id}
                    >
                        <InputLabel id={"pattern_bin_cate"+ _cat.id}>{"By "+ _cat.name}</InputLabel>
                        <Select
                            labelId={"pattern_bin_cate"+ _cat.id}
                            value = {selectedPatternBinCatID == _cat.id? selectedPatternBinID :  -1}
                            onChange = {(event)=> onChangePatternBin(event,  _cat.id)}
                        >   
                            {
                                    typeof patternBins[_cat.id] == 'undefined'? 
                                    null
                                    :   
                                    <MenuItem value = {-1} key = {-1}>
                                    All
                                </MenuItem>
                            }
                            {
                                typeof patternBins[_cat.id] == 'undefined'? 
                                <MenuItem disabled key = {-1}>
                                    no patterns bin in this category
                                </MenuItem>
                                :   
                                patternBins[_cat.id].map((_patternbin)=>{
                                    return(
                                        <MenuItem value = {_patternbin.id} key = {_patternbin.id}>
                                            {_patternbin.name}
                                        </MenuItem>
                                    );           
                                })
                            }
                        </Select>
                    </FormControl>
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default ComponentPatternBinFilterContainer;
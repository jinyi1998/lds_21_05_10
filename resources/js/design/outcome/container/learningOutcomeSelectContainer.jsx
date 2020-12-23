import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app'
import {
    apiLearningCompPut, apiLearningOutcomePut
} from '../../../api.js';
import zIndex from '@material-ui/core/styles/zIndex';

const LearningOutcomeSelectContainer = (props) => {
    const { course, refreshCourse } = React.useContext(ContextStore);
    const { tourSetMode, tourSetRun, tourNextStep, tourStepIndex } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg, options } = React.useContext(AppContextStore);

    const [ LOcheck, setLOcheck ] = React.useState(initCheck());


    function initCheck () {
        var temp = {};
        course.outcomes.map(
           (_lo, index) =>
            {
                temp[_lo.id] = {}
                temp[_lo.id]['outcome_id'] = _lo.id;
                temp[_lo.id]['ulo_id'] = _lo.id;
                temp[_lo.id]['component_id'] = props.component_id ;
                if(_lo.componentid.filter(x  => x.component_id == props.component_id).length > 0){
                    temp[_lo.id]['check'] = true;
                }else{
                    temp[_lo.id]['check'] = false;
                }

                //slo
                _lo.slo_outcome.map((_slo, index) => {
                    temp[_slo.id] = {}
                    temp[_slo.id]['outcome_id'] = _slo.id;
                    temp[_slo.id]['ulo_id'] = _lo.id;
                    temp[_slo.id]['component_id'] = props.component_id ;
                    if(_slo.componentid.filter(x  => x.component_id == props.component_id).length > 0){
                        temp[_slo.id]['check'] = true;
                        temp[_lo.id]['check'] = true; //check parent lo if 
                    }else{
                        temp[_slo.id]['check'] = false;
                    }
                })
            }
        )

        return temp;
    }

    const handleOnCheck = (event) => {
        var lo = JSON.parse(JSON.stringify(LOcheck));
        // lo[event.target.name]["check"] = event.target.checked;
        if( lo[event.target.name]["outcome_id"]  ==  lo[event.target.name]["ulo_id"]){
            //ulo handling
            lo[event.target.name]["check"] = event.target.checked;
            if(event.target.checked){
                //do nothing
            }else{
                //check if sup lo is true?
                course.outcomes.find(x => x.id == event.target.name).slo_outcome.map((_slo) => 
                    {
                        if(lo[_slo.id]["check"] == true){
                            lo[event.target.name]["check"] = true;
                            // break;  
                        }
                    }
                );
            }
        }else{
            //slo handling
            if( event.target.checked){
                lo[ lo[event.target.name]["ulo_id"] ] ["check"] = true;
            }else{
                // do nothing
            }
            lo[event.target.name]["check"] = event.target.checked;
         
        }
        setLOcheck(lo)
    }

    const handleOnSave = () => {
        var lo = [];
        Object.keys(LOcheck).map(_lo_id => {
            if(LOcheck[_lo_id].check){
                lo.push(LOcheck[_lo_id])
            }
        })
        
        var request = {};
        request['id'] = props.component_id;
        request['outcomes_id'] = lo;
        apiLearningCompPut(request).then( () => {
            setLoadingOpen(false)
            displayMsg("success", "Component Outcome Updates");
            refreshCourse();
            props.onClose();
        })
        .catch(error => {
            setLoadingOpen(false);
            displayMsg("error", "Error Occured");
            console.log(error)
        });
    }

    const displayOutcomes = (_lo_type) => {
        return (
            course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).sort((a,b)=> a.sequence - b.sequence).map(
                (_outcome, index )=>
                <Grid container justify = {"center"} key = {index}>
                     <Grid container item xs = {12}>
                        <Grid container item xs ustify = {"center"}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={LOcheck[_outcome.id]? LOcheck[_outcome.id]['check'] : false}
                                        name = {_outcome.id}
                                        onChange={handleOnCheck}
                                        color="primary"
                                    />
                                }
                                    label={_outcome.description}
                            />
                        </Grid>
                    </Grid>
                    {
                        _outcome.slo_outcome.map((_slo, index) => 
                            <Grid container item xs = {12} key = {index}>
                                <Grid item xs = {1}>
                                </Grid>

                                <Grid container item xs ustify = {"center"}>
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={LOcheck[_slo.id]? LOcheck[_slo.id]['check'] : false}
                                            name = {_slo.id}
                                            onChange = {handleOnCheck}
                                            color="primary"
                                        />
                                    }
                                        label={_slo.description}
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            )
        );
    }

    return (
        <Grid container style ={{padding: 16}}>
            { options.outcomeTypeOpts.map( (_lo_type, index) => 
                <Grid container item xs = {12} key = {index}>
                    <Grid item xs = {12}>
                        <Typography variant = {"subtitle1"}> 
                            {_lo_type.name}
                        </Typography>
                    </Grid>

                    {
                       course.outcomes.filter(lo => lo.outcomeType == _lo_type.id).filter(lo => lo.isCourseLevel == true).length > 0?
                        displayOutcomes(_lo_type)
                       :
                       <Typography variant = {"caption"}> 
                        {"No Learning Outcome Under This Category"}
                        </Typography>
                    }

                    
                </Grid>
              )
            }
            <Grid container item xs = {12} justify = {"flex-end"}>
                <Grid item xs = {3}>
                    <Button variant = {"outlined"} color = {"primary"} onClick = {handleOnSave} fullWidth>Save</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LearningOutcomeSelectContainer;
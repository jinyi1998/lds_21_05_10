import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LearningPatternEditView from '../component/learningPatternEditView';
import LearningPatternContainer from './learningPatternContainer';
import ComponentPatternSelectBox from '../../learningComponent/component/componentPatternSelectBox';
import LearningTaskView from '../../task/component/learningTaskView';

import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningCompGetPatternOpts,
    apiLearningPatternPost
} from '../../../api.js';

const LearningTaskMainContainer = (props) => {
    const {course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const [ patterns, setPatterns] = React.useState([]);
    const [ editPatternOpen, setEditPatternOpen] = React.useState(false);
    const [ isDisplayPatternOpen, setIsDisplayPatternOpen ] = React.useState(false);
    const [ patternTempOpts, setPatternTempOpts] = React.useState([]);
    const [ patternTempID, setPatternTempID] = React.useState(-1);
    const [ selectDisplayPattern, setSelectDisplayPattern ] = React.useState(-1);

    React.useEffect(()=>{
        setPatterns(props.patternsData);
    }, [props.patternsData])

    React.useEffect(()=> {
        reloadPatternTemplate(props.component_id);
    }, [props.component_id]) 

    //#region local action
    async function reloadPatternTemplate(id) {
        return await apiLearningCompGetPatternOpts(id)
        .then(response => {
            //load the default learning outcomes by api request
            setPatternTempOpts(response.data);
            return response;
        })
        .catch(error => console.log(error));
    }
  
    async function saveLearningPattern() {
        if(patternTempOpts.filter(x => x.id == patternTempID).length > 0){
            var json = patternTempOpts.find(x => x.id == patternTempID);
            json["component_id"] = props.component_id;
    
            return await apiLearningPatternPost(json)
            .then(response => {
                  //load the default learning outcomes by api request
                  setLoadingOpen(false);
                  setEditPatternOpen(false);
                  displayMsg("success", "Pattern Added");
                  refreshCourse();
            })
            .catch(error => {
                setLoadingOpen(false);
                setEditPatternOpen(false);
                console.log(error);
                displayMsg("error", "Error Occured");
            });
        }else{
            displayMsg("error", "Error Occured");
        }
    }
    
    const onClickLoadPattern = () => {
        setEditPatternOpen(true);
    }   
    const onCloseLoadPattern = () => {
        setEditPatternOpen(false);
        setPatternTempID(-1);

    }

    const handleOnClick = (e, index) => {
        e.preventDefault();
        setSelectDisplayPattern(index);
        setIsDisplayPatternOpen(true);
    }

    const handleOnSelect = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        if(patternTempOpts[index].id != patternTempID){
            setPatternTempID(patternTempOpts[index].id);
        }
    }

    const displayPatternDetail = () => {
        if(!(selectDisplayPattern == -1 || patternTempOpts.length == 0 || typeof patternTempOpts[selectDisplayPattern] == 'undefined')){
            return (
                <React.Fragment>
                    <DialogContent>
                        <Grid container alignItems="flex-start">
                            <Grid container item xs = {12}>
                                <Typography variant="h6" gutterBottom>Pattern: {patternTempOpts[selectDisplayPattern].title}</Typography>
                            </Grid>

                            <Grid container item xs = {8}>
                                <Grid item xs ={12}> <Typography variant="h6" gutterBottom> Tasks</Typography></Grid>
                                {patternTempOpts[selectDisplayPattern].tasks.map((_task, index)=>{
                                    return(
                                        <Grid item xs ={12} key = {index}>
                                            <LearningTaskView 
                                                taskID = {_task.id} 
                                                taskData = {_task} 
                                                key = {index}
                                                editBtn = {false}
                                                duplicateBtn = {false}
                                                deleteBtn = {false}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                            <Button variant = {"outlined"} color = {"secondary"} onClick = {()=>setIsDisplayPatternOpen(false)}>Cancel</Button>
                            <Button  
                                variant = {"outlined"} 
                                color = {"primary"} 
                                onClick = {(e)=> {handleOnSelect(e, selectDisplayPattern); setIsDisplayPatternOpen(false);}}>Select</Button>
                    </DialogActions>
                </React.Fragment>
            );
        }else{
            return (
                null
            );
        }
    }
    //#endregion

    return (
        <React.Fragment>
            <Accordion  defaultExpanded = {true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant = {"subtitle1"}>Component Patterns</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing = {2}>
                    {
                        patterns.length > 0? 
                            patterns.map( (_pattern, index) =>   
                                <LearningPatternContainer 
                                    componentID = {props.component_id} 
                                    patternData = {_pattern}
                                    key = {index}
                                />
                            )
                        :
                        <Grid container item xs = {12} justify = {"center"}>
                            <Typography variant="caption" display="block" gutterBottom>
                                No Component Pattern in this container
                            </Typography>
                        </Grid>
                    }
                    {
                         course.permission > 2?
                        <Grid container item xs = {12} justify = {"flex-start"}>
                            <Button variant = {"outlined"} color = {"secondary"} onClick = {onClickLoadPattern}>Load New Pattern</Button>
                        </Grid>
                         :
                         null
                    }
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Dialog open={editPatternOpen} onClose={onCloseLoadPattern} maxWidth = "lg" style = {{minHeight: 400}}>
                <DialogContent>
                    <Grid container>
                    {
                         patternTempOpts.map((_patternOpt, index)=>{
                            return(
                                <Grid item xs = {6}>
                                     <ComponentPatternSelectBox 
                                            index = {index}
                                            _patternOpt = {_patternOpt}
                                            selectPattern = {patternTempOpts.findIndex( x => x.id == patternTempID)}
                                            handleOnClick = {handleOnClick}
                                            handleOnSelect = {handleOnSelect}
                                        />
                                </Grid>
                             
                            );
                        })
                    }
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onCloseLoadPattern} >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => saveLearningPattern()} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDisplayPatternOpen} onClose={()=>setIsDisplayPatternOpen(false)} maxWidth="lg">
                {displayPatternDetail()}
            </Dialog>

            
        </React.Fragment>
       
    )

}
export default LearningTaskMainContainer;
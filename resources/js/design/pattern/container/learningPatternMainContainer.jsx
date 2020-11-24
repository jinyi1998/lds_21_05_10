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


import {ContextStore} from '../../../container/designContainer'
import {AppContextStore} from '../../../container/app';

import {
    apiLearningCompGetPatternOpts,
    apiLearningPatternPost
} from '../../../api.js';

const LearningTaskMainContainer = (props) => {
    const {course, refreshCourse } = React.useContext(ContextStore);
    const { setLoadingOpen, displayMsg } = React.useContext(AppContextStore);

    const [patterns, setPatterns] = React.useState([]);
    const [editPatternOpen, setEditPatternOpen] = React.useState(false);
    const [patternTempOpts, setPatternTempOpts] = React.useState([]);
    const [patternTempID, setPatternTempID] = React.useState(-1);

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

            <Dialog open={editPatternOpen} onClose={onCloseLoadPattern} maxWidth = "md" style = {{minHeight: 400}}>
                <DialogTitle id="form-dialog-title">Edit Learning Pattern</DialogTitle>
                <DialogContent>
                    <LearningPatternEditView 
                        patternTempOpts = {patternTempOpts}
                        setPatternTempID = {setPatternTempID}
                    />
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
        </React.Fragment>
       
    )

}
export default LearningTaskMainContainer;
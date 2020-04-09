import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import config from 'react-global-configuration';
import {ContextStore} from '../../container/designContainer'

const LearningOutcomeUnit = (props)=>{
    const {options, setLoadingOpen } = React.useContext(ContextStore);
    const {learningOutcomeID} = props;
    const { onOpenDelDialog, index } = props;

    const learningTypeTemp = options.learningOutcomeType;

    const [outcome, setOutcome] = React.useState(props.learningOutcome);
    async function fetchLearningOutcome() {
        setLoadingOpen(true)
        fetch(
            'http://'+config.get('url')+'/api/learningOutcome/'+learningOutcomeID,
            {
            method: "GET",
            }
        )
        .then(res => res.json())
        .then(response => {
            //load the default learning outcomes by api request
            setOutcome(response);
            setLoadingOpen(false)
        })
        .catch(error => console.log(error));   
      }
    


    React.useEffect(()=>{
        setOutcome(props.learningOutcome);
    }, [props.learningOutcome]);
    
    return (
        <ListItem>
            <ListItemText
                primary={learningTypeTemp.find(x => x.id == outcome.outcomeType)?.description + " - " + outcome.description}
                secondary={ 
                    // ( outcome.STEMType.length > 0?  ("STEM: (" +outcome.STEMType.map((_STEM) => _STEM) + ") | " )
                    // : "")  
                    "   STEMP TYPE: (" + outcome.STEMType + " ) "
                    + 
                    "   Level:( " +outcome.level + " )  "
                } 
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick = {()=> onOpenDelDialog(outcome.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
export default LearningOutcomeUnit;
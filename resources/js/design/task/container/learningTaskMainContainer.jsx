import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LearningTaskContainer from './learningTaskContainer';

const LearningTaskMainContainer = (props) => {
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            >
                <Typography variant = {"subtitle1"}>Component Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <LearningTaskContainer component_id = {props.component_id} tasksData = {props.tasksData}/>
            </AccordionDetails>
        </Accordion>
    )

}
export default LearningTaskMainContainer;
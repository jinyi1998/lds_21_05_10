import React from 'react';

import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import DesignTypeBuilderBasicInfoView from '../component/designTypeBuilderBasicInfoView';
import DesignTypeBuilderOutcome from '../component/designTypeBuilderOutcomeView';
import DesignTypeBuilderComponentView from '../component/designTypeBuilderComponentView';

import {apiDesignTypeGet} from '../../../api';

export const DesignTypeBuilderContextStore = React.createContext({
    designType: {
        id: -1
    },
    refreshDesignType: ()=>{}
});

const DesignTypeBuilderContainer = (props) => {
    const [ designType, setDesignType ] = React.useState({
        id: -1,
    });
    const [stepIndex, setStepIndex] = React.useState(1);
    const steps = ["Basic Information", "Unit Level Learning Outcomes", "Cirriculum Components"];

    React.useEffect(()=>{
        refreshDesignType();
    }, [props.designtype_id]);
    
    const refreshDesignType = () => {
        apiDesignTypeGet(props.designtype_id).then((response)=>{
            setDesignType(response.data)
            console.log(response.data);
        })
    }

    const displayContent = () => {
        switch (stepIndex){
            default: 
            case 1:
                return (
                    <Grid container spacing = {2}>
                        <DesignTypeBuilderBasicInfoView />
                        {displayButton()}
                    </Grid> 
                );
            case 2:
                return (
                    <Grid container spacing = {2}>
                        <DesignTypeBuilderOutcome />
                        {displayButton()}
                    </Grid> 
                );
            case 3:
                return(
                    <Grid container spacing = {2}>
                        <DesignTypeBuilderComponentView />
                        {displayButton()}
                    </Grid> 
                )
        }
    }

    const displayButton = () => {
        return (
            <Grid item xs = {12}  container justify="flex-end">
            {
                stepIndex == 1?
                null
                :
                <Button  variant="contained" color="secondary" onClick = {handleBack}>
                    Back
                </Button>

            }
            {
                stepIndex == steps.length ?
                <Button  variant="contained" color="primary" onClick = {handleFinish}>
                    Finish
                </Button>
                :
                <Button  variant="contained" color="primary" onClick = {handleNext}>
                    Next
                </Button>
            }
        
            </Grid>
        );
    }

    const handleNext = () => {
        setStepIndex((preStep)=> preStep+1);
    }

    const handleBack = () => {
        setStepIndex((preStep)=> preStep-1);
    }

    const handleFinish = () => {
        window.location.href = "../design_type";
    }

    return(
        <DesignTypeBuilderContextStore.Provider
            value = {{
                designType: designType,
                refreshDesignType: refreshDesignType
            }}
        >
            <Paper style = {{padding: 32}}>
                <Grid container >
                    <Grid item xs = {12}>
                        <Stepper activeStep={stepIndex - 1} alternativeLabel>
                            {steps.map((_step) => (
                                <Step key={_step}>
                                    <StepLabel>{_step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>

                    <Grid item xs = {12}>
                        {displayContent()}
                    </Grid>
                </Grid>      
            </Paper>
             
        </DesignTypeBuilderContextStore.Provider>
    )
}
export default DesignTypeBuilderContainer;
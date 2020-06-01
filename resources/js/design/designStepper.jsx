import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const DesignStepper = (props) => {
    const {setActiveStep ,activeStep, steps} = props;

    const onClickStepIcon = (index) => {
        if(activeStep > 1){
            setActiveStep(index)
        }else{

        }
    }

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map( (label, index) => (
                <Step key={label} onClick={() => onClickStepIcon(index)}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default DesignStepper;
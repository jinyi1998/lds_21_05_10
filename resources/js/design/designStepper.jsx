import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';

const DesignStepper = (props) => {
    const {setActiveStep ,activeStep, steps} = props;

    const handleOnClick = (step) => {
        if(isClickable(step)){
            setActiveStep(step)
        }
    }

    const isClickable = (step) =>{
        if(activeStep == 0 || step >3){
            return false;
        }else{
            return true;
        }
    }
    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map( (label, index) => (
                // console.log(clsx( index < 4  && {"pointer": "cursor"}))
                <Step key={label} onClick = {()=>handleOnClick(index)} >
                    <StepLabel style = {{cursor: clsx( isClickable(index) && "Pointer", !isClickable(index) && "not-allowed")}}>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default DesignStepper;
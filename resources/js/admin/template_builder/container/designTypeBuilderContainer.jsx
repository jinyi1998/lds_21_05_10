import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import DesignTypeBuilderBasicInfoView from '../component/designTypeBuilderBasicInfoView';
import DesignTypeBuilderOutcome from '../component/designTypeBuilderOutcomeView';
import DesignTypeBuilderComponentView from '../component/designTypeBuilderComponentView';
import DesignTypeInstructionContainer from './designTypeInstructionContainer';

import {apiDesignTypeGet} from '../../../api';

export const DesignTypeBuilderContextStore = React.createContext({
    designType: {
        id: -1,
        is_activate: false,
        name: "",
        description: "",
        hint: "",
        media: "",
    },
    refreshDesignType: ()=>{}
});

const useStyles = makeStyles(theme => ({
    paper : {
        padding: 16,
        margin: 16
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
  }));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style = {{width: '100%'}}
        {...other}
      >
        {value === index && (
            <Grid item container xs = {12}>
                {children}
            </Grid>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}


const DesignTypeBuilderContainer = (props) => {
    const [ designType, setDesignType ] = React.useState({
        id: -1,
        is_activate: false,
        name: "",
        description: "",
        hint: "",
        media: "",
    });
    const [stepIndex, setStepIndex] = React.useState(1);
    const steps = ["Basic Information", "Learning Outcomes", "Cirriculum Components"];
    const [ tab, setTab ] = React.useState(0);

    React.useEffect(()=>{
        refreshDesignType();
    }, [props.designtype_id]);
    
    const refreshDesignType = () => {
        apiDesignTypeGet(props.designtype_id).then((response)=>{
            setDesignType(response.data)
        })
    }

    const displayContent = () => {
        switch (stepIndex){
            default: 
            case 1:
                return (
                    <Grid container spacing = {2}>
                        <DesignTypeBuilderBasicInfoView handleNext = {handleNext}/>
                        {/* {displayButton()} */}
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
        window.location.href = "/admin/design_type";
    }

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }

    const displayBuilder = () => {
        return (
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

        );
    }

    return(
        <DesignTypeBuilderContextStore.Provider
            value = {{
                designType: designType,
                refreshDesignType: refreshDesignType
            }}
        >
            <Grid container item xs ={12}>
                <Grid container item xs = {12}>
                    <Tabs value={tab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                        <Tab label="Builder" {...a11yProps(0)} value = {0}/>
                        <Tab label="Instruction" {...a11yProps(1)} value = {1}/>
                    </Tabs>
                </Grid>

                <Grid container item xs = {12}>
                    <Paper style = {{padding: 32, width: '100%'}}>
                        <TabPanel value={tab} index={0}>
                            {displayBuilder()}
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <DesignTypeInstructionContainer designtype_id = {designType.id} />
                        </TabPanel>
                    </Paper> 
                </Grid>
            </Grid>
             
        </DesignTypeBuilderContextStore.Provider>
    )
}
export default DesignTypeBuilderContainer;
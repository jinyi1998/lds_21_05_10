import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ComponentInstructionView  from '../component/componentInstructionView';

import {AppContextStore} from '../../../container/app';

import { apiLearningCompTempGetInstructions } from '../../../api';

const ComponentTemplateInstructionContainer = (props) => {
    const { setLoadingOpen } = React.useContext(AppContextStore);

    const [ instructions, setInstructions ] = React.useState([]);

    React.useEffect(()=>{
        reloadInstructions();
    }, [props.component_id]);

    const reloadInstructions = () =>{
        setLoadingOpen(true)
        apiLearningCompTempGetInstructions(props.component_id).then((response)=>{
            setInstructions(response.data);
            setLoadingOpen(false)
        })
    }

    const onAddInstruction = () =>{
        var new_instruction = {
            id: -1,
            media: "",
            description: "",
            title: "",
        };
        setInstructions((_prev)=> [..._prev, new_instruction]);
    }
    
    return (
        <React.Fragment>
            <Grid container>
                {instructions.map((_instruction) => {
                    return (
                        <Grid item xs = {12} style ={{margin: 16}}>
                            <ComponentInstructionView instruction = {_instruction} component_id = {props.component_id} reloadInstructions = {reloadInstructions}/>
                        </Grid>
                    );
                })}
                <Grid container item xs ={12} justify = "flex-end">
                    <Button variant = "outlined" color = "primary" onClick = {onAddInstruction}>Add Instruction</Button>
                </Grid>
            </Grid>
            

        </React.Fragment>
    );
}

export default ComponentTemplateInstructionContainer;
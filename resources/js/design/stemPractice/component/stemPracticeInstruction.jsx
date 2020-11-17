import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {
    apiGetDesignTypeInstruction,
    apiLearningCompGetLearningCompByDesignType} from '../../../api';
import { Carousel } from 'react-responsive-carousel';
import { AppContextStore } from '../../../container/app';

const StemPracticeInstruction = (props) => {
    const {setLoadingOpen, returnImgSrc} = React.useContext(AppContextStore);
    const [instructions, setInstruction] = React.useState([]);
    const [compInstructions, setCompInstruction] = React.useState([]);

    React.useEffect(()=> {
        // setLoadingOpen(true);
        if(props.design_type_id > 0){
            setLoadingOpen(true);
            var updates = [];
            updates.push(getDesignTypeInstruction());
            updates.push(getComponentsInstruction());
    
            Promise.all(updates).then(()=>{
                setLoadingOpen(false);
            })
        }
    }, [props.design_type_id]);

    const getDesignTypeInstruction = () => {
        apiGetDesignTypeInstruction(props.design_type_id).then((response)=>{
            setInstruction(response.data);
        });
    }

    const getComponentsInstruction = () => {
        apiLearningCompGetLearningCompByDesignType(props.design_type_id)
        .then( response =>{
            var result = [];
            result = response.data.flatMap((_component) => {
                return _component.instructions.flatMap((_instruction) => 
                     _instruction
                )
            })
            setCompInstruction(result);
        })
        .catch(error => console.log(error));
    }

    const onSelectSTEMPractice = () => {
        if(typeof props.onSelectSTEMPractice != "undefined"){
            props.onSelectSTEMPractice(props.design_type_id);
        }
    }

    const displayInstruction = () => {
        if(   !(compInstructions.length == 0 && instructions.length == 0)){
            return (
                instructions.concat(compInstructions).map((_instruction, index) => {
                    return (
                        <div key = {index} style = {{backgroundColor: "#FFFFFF"}}>
                            <img alt="" src={returnImgSrc(_instruction.media)} />
                            <div className="legend">
                                <h5>{_instruction.title}</h5>
                                <p style = {{textTransform: "initial"}}>
                                    {_instruction.description}
                                </p>

                                {
                                    index == instructions.concat(compInstructions).length - 1?
                                    <Button 
                                        variant={"contained"} color="primary"
                                        aria-label="add"  
                                        onClick = {onSelectSTEMPractice}
                                    >
                                        Add
                                    </Button>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    )
                })
            )
        } else{
            return (
                <div style = {{backgroundColor: "#FFFFFF"}}>
                    <img alt="" src={returnImgSrc("no")} />
                    <div className="legend">
                    <h5>{"No instruction"}</h5>
                    <p style = {{textTransform: "initial"}}>
                        {'No instruction'}
                    </p>
                    </div>
                </div>
            );
        }
    }

    return(
        <Carousel showThumbs={false} width="700px" style = {{backgroundColor: "#FFFFFF"}} useKeyboardArrows = {true}>
            {
               displayInstruction()
            }
      </Carousel>
    )
}

export default StemPracticeInstruction;
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {apiLearningCompGetLearningCompByDesignType} from '../api';
import { Carousel } from 'react-responsive-carousel';
import { AppContextStore } from '../container/app';

const DesignTypeInstruction = (props) => {
    const {returnImgSrc} = React.useContext(AppContextStore);
    const [instructions, setInstruction] = React.useState([]);
    React.useEffect(()=> {
        fetcComponentOptsData();
    }, [props]);

    async function fetcComponentOptsData() {
        await apiLearningCompGetLearningCompByDesignType(props.design_type_id)
        .then( response =>{
            var result = [];
            result = response.data.flatMap((_component) => {
                return _component.instructions.flatMap((_instruction) => 
                     _instruction
                )
            })
            if(result.length == 0){
                result = [{
                    title: "No instruction",
                    description: "No instruction",
                    media: ""
                }]
            }
            setInstruction(result);
        })
        .catch(error => console.log(error));
    }

    return(
        <Carousel showThumbs={false} width="700px" style = {{backgroundColor: "#FFFFFF"}}>
            {
                instructions.length > 0?
                instructions.map((_instruction, index) => {
                return (
                    <div key = {index} style = {{backgroundColor: "#FFFFFF"}}>
                        <img alt="" src={returnImgSrc(_instruction.media)} />
                        <div className="legend">
                        <h5>{_instruction.title}</h5>
                        <p style = {{textTransform: "initial"}}>
                            {_instruction.description}
                        </p>
                        </div>
                    </div>
                )})
                :
                null
            }
      </Carousel>
    )
}

export default DesignTypeInstruction;
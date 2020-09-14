import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {apiLearningCompGetLearningCompByDesignType} from '../api';
import { Carousel } from 'react-responsive-carousel';

const DesignTypeInstruction = (props) => {
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
                    media: "https://instem.cite.hku.hk/wp-content/uploads/elementor/thumbs/bus_SDL_STEM_en_1024-og6c3wyfn5owkbkmm8ktoy80tq6h8hn3yrh97zlg2o.png"
                }]
            }
            setInstruction(result);
        })
        .catch(error => console.log(error));
    }

    return(
        <Carousel showThumbs={false} width="700px">
            {
                instructions.length > 0?
                instructions.map((_instruction, index) => {
                return (
                    <div key = {index}>
                        <img alt="" src={_instruction.media} />
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
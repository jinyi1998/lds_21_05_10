import React from 'react';
import {DesignTypeBuilderContextStore} from '../container/designTypeBuilderContainer';
import OutcomeBuilderContainer from '../container/outcomeBuilderContainer';


const DisplayTypeBuilderOutcomeView = () => {
    const { designType,  refreshDesignType} = React.useContext(DesignTypeBuilderContextStore);

    const onOutcomeFinish = () =>{
        refreshDesignType();
    }

    return (
        <React.Fragment>
            <OutcomeBuilderContainer 
                outcomes = {designType.outcomes} 
                designtype_id = {designType.id}
                onFinish = {onOutcomeFinish}
            />
        </React.Fragment>
    );
}

export default DisplayTypeBuilderOutcomeView;
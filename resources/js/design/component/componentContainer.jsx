import React from 'react';
import Component from './component';


import config from 'react-global-configuration';


export const ComponentContext = React.createContext({});

const ComponentContainer = (props)=>{

  const { componentID, index} = props;
    
    //edit learning task props

   
    // const [component, setComponent] = React.useState({
    //   "id": -1,
    //   "component_template_id": -1,
    //   "title": "Identify problem through goal-setting",
    //   "tasks": [],
    //   "patterns": [],
    //   "outcomeid": [],
    //   "outcomes": []
    // });

    const [component, setComponent] = React.useState(props.component);

    React.useEffect(()=>{
      setComponent(props.component);
    }, [props.component])


    //#region init data 

    //#endregion

    return (
        <ComponentContext.Provider value = {{
            component: component,
            componentID: componentID,
            index: index
        }}>
             <Component />
        </ComponentContext.Provider>
    );
  }
export default ComponentContainer;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const AppContainer = () => {
    return (
        <App 
            course_id = {document.getElementById('appcontainer').dataset.courseid} 
            step = {document.getElementById('appcontainer').dataset.design_step} 
            user = {document.getElementById('appcontainer').dataset.user}
            module =  {document.getElementById('appcontainer').dataset.module}
            usergroupid = {document.getElementById('appcontainer').dataset.usergroupid? document.getElementById('appcontainer').dataset.usergroupid : -1}
            pattern_id =  {document.getElementById('appcontainer').dataset.patternid}
            component_id = {document.getElementById('appcontainer').dataset.componentid}
        />
    );
}

export default AppContainer;


if (document.getElementById('appcontainer')) {
    ReactDOM.render(<AppContainer/>, document.getElementById('appcontainer'));
}


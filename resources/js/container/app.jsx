
import React from 'react';
import ReactDOM from 'react-dom';
import DesignContainer from './designContainer';




 const App = (props) => {
  return (
    <div>
      <DesignContainer courseID= {props.value} user = {props.user} step = {props.step}/>
    </div>
  );
}
export default App;

if (document.getElementById('designcontainer')) {
    ReactDOM.render(<App 
      value = {document.getElementById('designcontainer').dataset.test} 
      step = {document.getElementById('designcontainer').dataset.step} 
      user = {document.getElementById('topmenu').dataset.user}
    />, document.getElementById('designcontainer'));
}

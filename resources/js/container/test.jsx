
import React from 'react';
import ReactDOM from 'react-dom';
import DesignContainer from './designContainer';




 const Test = (props) => {
  // console.log(props)
  return (
    <div>
      <DesignContainer courseID= {props.value}/>
    </div>
  );
}
export default Test;

if (document.getElementById('designcontainer')) {
    ReactDOM.render(<Test value={document.getElementById('designcontainer').dataset.test}/>, document.getElementById('designcontainer'));
}

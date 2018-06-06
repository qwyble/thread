import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import UserContainer from './userContainer.js'
import './semantic-ui-css/semantic.min.css';
import './index.css';

class Index extends React.Component{
  render(){
    return(
      <UserContainer />
    )
  }
}


ReactDOM.render((
  <Index />
  ), document.getElementById('root'));
registerServiceWorker();

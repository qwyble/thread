import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import UserContainer from './userContainer.js';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './semantic-ui-css/semantic.min.css';
import './index.css';

class Index extends React.Component{
  render(){
    return(
      <div>
        <UserContainer />
      </div>
    )
  }
}

const WrappedApp = () => (
  <Provider store={store}>
    <Index />
  </Provider>
)


ReactDOM.render((
  <WrappedApp />
  ), document.getElementById('root'));
registerServiceWorker();

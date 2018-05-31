import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './semantic-ui-css/semantic.min.css';
import App from './App';
import LoginContainer from './container-components/loginContainer'
import {BrowserRouter, Switch, Route} from 'react-router-dom';



ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/auth'>
        <LoginContainer />
      </Route>
      <Route path='/'>
        <App />
      </Route>
    </Switch>
  </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
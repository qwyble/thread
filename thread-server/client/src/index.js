import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './semantic-ui-css/semantic.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Protected from './container-components/authentication/protected.js';
import LoginContainer from './container-components/authentication/loginContainer.js';
import App from './App.js';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';
import Logout from './container-components/authentication/logout.js';


class Index extends React.Component{
  state={
    user: {},
    isLoggedIn: false,
    isLoading: false
  }

  //check with server to see if user is logged in
  componentDidMount(){
    this.setState({isLoading: true});
    axios({
      method: 'get',
      url: 'http://localhost:8080/auth',
      withCredentials: true
    }).then((result) => {
      console.log(result.data);
      if(result.data.idUsers){
        this.setState({user: result.data, isLoggedIn: true, isLoading: false})
      }else{
        this.setState({ isLoading: false })
      }
    });
  }

  handleLogin = (user, isLoggedIn) => {
    this.setState({user: user, isLoggedIn: isLoggedIn})
  }

  handleLogout = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/logout',
      withCredentials: true
    }).then((result) => {
      console.log(result.data);
      this.setState({ user: {}, isLoggedIn: false });
    });
  }


  render(){
    if(this.state.isLoading){
      return(
        <div>
          <Loader style={{marginTop: '30vh'}} active inline='centered'/>
        </div>
      )
    }
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              path='/auth'
              render={(props) =>
                <LoginContainer {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  onLogin={this.handleLogin}
                />
              }
            />

            <Route
              path='/'
              render={(props) =>
                <Protected {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  onLogout={this.handleLogout}
                />
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


ReactDOM.render((
  <Index />
  ), document.getElementById('root'));
registerServiceWorker();

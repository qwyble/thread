import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Protected from '../container-components/authentication/protected.js';
import LoginContainer from '../container-components/authentication/loginContainer.js';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';

class UserContainer extends React.Component{
  state={
    user: {},
    isLoggedIn: false,
    isLoading: true
  }

  //check with server to see if user is logged in
  componentDidMount(){
    this.setState({isLoading: true});
    axios({
      method: 'get',
      url: 'https://8080-dot-4114867-dot-devshell.appspot.com/auth',
      withCredentials: true
    }).then((result) => {
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
      url: 'https://8080-dot-4114867-dot-devshell.appspot.com/logout',
      withCredentials: true
    }).then((result) => {
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
                      user={this.state.user}
                    />
                  }
                />
              </Switch>
            </div>
        </BrowserRouter>
    )
  }
}


export default UserContainer;

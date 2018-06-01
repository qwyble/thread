import React from 'react';
import Signup from '../../presentational-components/authentication/signup.js';
import Login from '../../presentational-components/authentication/login.js';
import Logout from './logout';
import axios from 'axios';
import {Switch, Route, Redirect} from 'react-router-dom';



class LoginContainer extends React.Component{

  state= {
    email: '',
    password: '',
    userName: '',
    error: '',
  }

  reset = () => {
    this.setState({email: '', password: '', userName: '', error: ''});
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSignupSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/signup',
      data: this.state,
      withCredentials: true
    }).then((result) => {
      //signup was successful
      this.reset();
      this.props.onLogin(result.data, true);
    }).catch((error) => {
      //signup failed
      if(error){
        this.setState({error: error.response.data})
      }
    });
  }

  handleLoginSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/login',
      data: this.state,
      withCredentials: true
    }).then((result) => {
      //login was successful
      this.reset();
      this.props.onLogin(result.data, true);
    }).catch((error) => {
      //login failed
      if(error){
        this.setState({error: error.response.data})
      }
    });
  }


  render(){
    if(this.props.isLoggedIn){
      return <Redirect to='/' />
    }
    return(
      <div>
        <Switch>
          <Route path='/auth/signup'>
            <Signup
              onInputChange={this.handleInputChange}
              email={this.state.email}
              password={this.state.password}
              username={this.state.username}
              onSubmit={this.handleSignupSubmit}
              error={this.state.error}
            />
          </Route>
          <Route path='/auth/login'>
            <Login
              onInputChange={this.handleInputChange}
              password={this.state.password}
              email={this.state.email}
              onSubmit={this.handleLoginSubmit}
              error={this.state.error}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default LoginContainer;

import React from 'react';
import Signup from '../presentational-components/authentication/signup.js';
import Login from '../presentational-components/authentication/login.js';
import axios from 'axios';
import {Switch, Route} from 'react-router-dom';



class LoginContainer extends React.Component{

  state= {
    email: '',
    password: '',
    userName: '',
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state);
  }

  handleSignupSubmit = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/signup',
      data: this.state
    }).then((result) => {
      //access results....
      console.log(result);
    });
  }

  handleLoginSubmit = () => {
    var form_data = new FormData();
    for (var key in this.state){
      form_data.append(key, this.state[key]);
    }
    console.log(form_data);
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth/login',
      data: form_data
    }).then((result) => {
      //access results....
      console.log(result);
    });
  }


  render(){
    return(
      <div>
        <Switch>
          <Route exact path='/auth/signup'>
            <Signup
              onInputChange={this.handleInputChange}
              email={this.state.email}
              password={this.state.password}
              username={this.state.username}
              onSubmit={this.handleSignupSubmit}
            />
          </Route>
          <Route exact path='/auth/login'>
            <Login
              onInputChange={this.handleInputChange}
              password={this.state.password}
              username={this.state.username}
              onSubmit={this.handleLoginSubmit}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default LoginContainer;

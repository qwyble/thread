import App from '../../App.js';
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Logout from './logout';

//component protects the route to the main app
//if user isn't logged in, they can only access the login screen
class Protected extends React.Component{

  render(){

    if(!this.props.isLoggedIn){
      return(
        <Redirect to={{
          pathname: '/auth/login',
          state: {from: this.props.location.pathname}
        }}/>
      )
    }else{
      return(
        <Switch>
          <Route
            path="/logout"
            render={(props) =>
              <Logout {...props} onLogout={this.props.onLogout}/>
            }
          />
          <Route path='/' render={props => <App {...props} user={this.props.user}/>} />
        </Switch>
      )
    }
  }
}


export default Protected;

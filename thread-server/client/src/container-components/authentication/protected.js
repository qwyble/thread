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
        <Redirect to='/auth/login'/>
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
          <Route path="/" component={App} />
        </Switch>
      )
    }
  }
}


export default Protected;

import App from '../../App.js';
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Logout from './logout';
import {AppProvider} from '../../appUtilities/context.js';
import {AppOwnerProvider} from '../../appUtilities/ownerContext.js';

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
          <Route path='/' render={props =>
            <AppOwnerProvider user={this.props.user}>
              <AppProvider>
                <App user={this.props.user} />
              </AppProvider>
            </AppOwnerProvider>
          }/>
        </Switch>
      )
    }
  }
}


export default Protected;

import React from 'react';
import {AppContext} from './context.js';
import CategoryUtils from './container-components/sideBar/categoryUtils.js';


class RoutedContext extends React.Component{

  render(){
    console.log(this.props.match.params.profile);
    return(
      <AppContext.Consumer>{context => (

        <CategoryUtils
          url={this.props.match.url}
          visitingProfile={this.props.match.params.profile}
          user={context.user}
        />)}

      </AppContext.Consumer>

    )
  }
}
export default RoutedContext;

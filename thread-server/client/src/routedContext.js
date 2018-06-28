import React from 'react';
import {AppContext} from './context.js';
import FetchCategories from './container-components/sideBar/fetchCategories.js';


class RoutedContext extends React.Component{

  render(){
    return(
      <AppContext.Consumer>{context => (

        <FetchCategories
          url={this.props.match.url}
          visitingProfile={this.props.match.params.profile}
          user={context.user}
          isOwner={context.isOwner}
          setOwner={context.onSetOwner}
        />)}

      </AppContext.Consumer>

    )
  }
}
export default RoutedContext;

import React from 'react';
import {AppContext} from './context.js';
import FetchCategories from '../container-components/sideBar/fetchCategories.js';

//when the component mounts or updates,
//if the profile being viewed has changed,
//tell fetchCategories. FetchCategoies will
//then use profile to render categories and set
//owner based on categories rendered
class RoutedContext extends React.Component{

  state={
    profile: ''
  }

  componentDidMount(){
    this.getProfile();
  }

  componentDidUpdate(){
    this.getProfile();
  }


  getProfile = () => {
    if(this.props.match.path.includes('/profile')){
      if(this.props.match.params.profile !== this.state.profile){
        var profile = this.props.match.params.profile;
        this.setState({profile: profile})
      }
    } else if (this.props.match.path === '/stream' || this.props.match.path === '/edit'){
      if(this.state.profile !== ''){
        var profile = ''
        this.setState({profile: profile})
      }
    }
  }





  render(){
    return(
      <AppContext.Consumer>{context => (

        <FetchCategories
          user={context.user}
          owner={context.owner}
          profile={this.state.profile}
          isOwner={context.isOwner}
          setOwner={context.onSetOwner}
        />)}

      </AppContext.Consumer>

    )
  }
}
export default RoutedContext;

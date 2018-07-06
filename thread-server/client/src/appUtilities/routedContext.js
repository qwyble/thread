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
    this.getProfile()
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.match.path.includes('/profile')){
      if(this.props.match.params.profile !== this.state.profile){
        this.getProfile()
      }
    } else if (this.props.match.path === '/stream'){
      if(this.state.profile !== ''){
        this.setState({profile: ''})
      }
    }
  }

  getProfile = () => {
    if(this.props.match.path.includes('/profile')){
      this.setState({profile: this.props.match.params.profile})
    } else if (this.props.match.path === '/stream'){
      this.setState({profile: ''})
    }
  }

  render(){
    console.log(this.state.profile);
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

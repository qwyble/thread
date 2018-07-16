import React from 'react';

const AppContext = React.createContext();


//context controls audio playback and
//isOwner for modifying views based on whether
//the user owns the view.

class AppOwnerProvider extends React.Component{
  state = {
    user: this.props.user,
    isOwner: true,
    owner: '',
  }



  componentDidUpdate(){
    if (this.state.user.idUsers !== this.props.user.idUsers){
      this.setState({user: this.props.user});
    }
    if (!this.state.owner){
      this.setState({owner: this.props.user})
    }
  }


  handleSetOwner = (owner) => {
    if (owner.idUsers !== this.state.owner.idUsers){
      var isOwner = (owner.idUsers === this.state.user.idUsers);
      this.setState({owner, isOwner});
    }
  }


  render() {
    
    const handlers = {
      onSetOwner: this.handleSetOwner
    }

    return (
      <AppContext.Provider value={{...this.state, ...handlers}}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export {
  AppOwnerProvider,
  AppContext
};

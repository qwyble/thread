import React from 'react';

const AppContext = React.createContext();

class AppProvider extends React.Component{
  state = {
    user: this.props.user,
  }

  render() {
    console.log(this.state.user);
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider;

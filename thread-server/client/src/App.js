import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarLeftOverlay from './container-components/sideBar/sideBar.js';
import ForumSidebarLeftOverlay from './container-components/forum/forumSideBar.js'
import SidebarTopOverlay from './container-components/topBar/topBar.js';
import { Switch, Route } from 'react-router-dom';



/* App controls state for individual songs
and for the list of songs to be rendered.
it also renders the two main components: topBar and sideBar. */

class App extends Component {
  state = {
      songs: [],
  }


  handleUpload = (songData) => {
    var songs = [...this.state.songs, songData];
    this.setState({songs});
  }


  render() {
    return (
      <div>
        <div className="">
          <SidebarTopOverlay
            onUpload={this.handleUpload}
            logo={logo}/>
            <Switch>
              <Route path='/forum'>
                <ForumSidebarLeftOverlay songs={this.state.songs}/>
              </Route>
              <Route path='/'>
                <SidebarLeftOverlay songs={this.state.songs}/>
              </Route>
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;

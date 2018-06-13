import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarLeftOverlay from './container-components/sideBar/sideBar.js';
import ForumSidebarLeftOverlay from './container-components/forum/forumSideBar.js'
import SidebarTopOverlay from './container-components/topBar/topBar.js';
import { Switch, Route } from 'react-router-dom';
import Explorer from './container-components/search/explorer.js';



/* App controls state for individual songs
and for the list of songs to be rendered.
it also renders the two main components: topBar and sideBar. */

class App extends Component {


  render() {
    return (
      <div>
        <div>
          <SidebarTopOverlay logo={logo}/>
          <Switch>
            <Route path='/forum' component={ForumSidebarLeftOverlay} />
            <Route path='/explore' component={Explorer} />
            <Route path='/stream' component={SidebarLeftOverlay}/>
            <Route path='/playlist/:playlist' component={SidebarLeftOverlay}/>
            <Route path='/' component={SidebarLeftOverlay}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

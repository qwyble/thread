import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ForumSidebarLeftOverlay from './container-components/forum/forumSideBar.js'
import SidebarTopOverlay from './container-components/topBar/topBar.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Explorer from './container-components/search/explorer.js';
import RoutedContext from './routedContext.js';
import ProfileSidebar from './container-components/profiles/profileSidebar.js';
import SongDetails from './container-components/songRenderers/songDetails.js';
import AudioPlayback from './container-components/audioPlayback/audioPlayback.js';
import {AppContext} from './context.js';


/* App controls state for individual songs
and for the list of songs to be rendered.
it also renders the two main components: topBar and sideBar. */

class App extends Component {


  render() {
    return (
      <div>
        <div>
          <SidebarTopOverlay logo={logo}/>
          <div>
            <Switch>
              <Route path='/forum' component={ForumSidebarLeftOverlay} />
              <Route path='/explore' component={Explorer} />
              <Route path='/stream' component={RoutedContext }/>
              <Route path='/playlist/:playlist' component={RoutedContext }/>
              <Route path='/profile/:profile' component={RoutedContext } />
              <Route path='/song/:song' component={SongDetails } />
              <Redirect from='/' to={'/stream'} />
            </Switch>
          </div>
          <AppContext.Consumer>
            {context =>
              <AudioPlayback
                onEnd={context.onEnd}
                nowPlaying={context.nowPlaying}
                paused={context.paused}
                onPausing={context.onPausing}
              />
            }
          </AppContext.Consumer>

          }
        </div>
      </div>
    );
  }
}

export default App;

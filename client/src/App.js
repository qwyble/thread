import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css.css'
import ForumSidebarLeftOverlay from './container-components/forum/forumSideBar.js'
import SidebarTopOverlay from './container-components/topBar/topBar.js';
import { Switch, Route, Redirect } from 'react-router-dom';
import Explorer from './container-components/search/explorer.js';
import RoutedContext from './appUtilities/routedContext.js';
import SongDetails from './container-components/songRenderers/songDetails.js';
import AudioPlayback from './container-components/audioPlayback/audioPlayback.js';
import ProfileContainer from './container-components/profiles/profileContainer.js';
import Following from './container-components/follower/following.js';
import Followers from './container-components/follower/followers.js';
import MessagesContainer from './container-components/messages/messagesContainer.js';
import ChatToggle from './presentational-components/chat/chatToggle.js';



/* App controls state for individual songs
and for the list of songs to be rendered.
it also renders the two main components: topBar and sideBar. */

class App extends Component {


  render() {
    return (
      <div>
        <div>

          <div>
            <SidebarTopOverlay logo={logo}/>
          </div>

          <div>
            <Switch>
              <Route path='/messages' component={MessagesContainer} />
              <Route path='/followers' component={Followers} />
              <Route path='/following' component={Following} />
              <Route path='/forum' component={ForumSidebarLeftOverlay} />
              <Route path='/explore' component={Explorer} />
              <Route path='/stream' component={RoutedContext }/>
              <Route path='/playlist/:playlist' component={RoutedContext }/>
              <Route exact path='/edit' component={ProfileContainer} />
              <Route path='/profile/:profile' component={RoutedContext } />
              <Route path='/song/:song' component={SongDetails } />
              <Redirect from='/' to={'/stream'} />
            </Switch>
          </div>


            <ChatToggle />

          <div>
            <AudioPlayback />
          </div>

        </div>
      </div>
    );
  }
}

export default App;

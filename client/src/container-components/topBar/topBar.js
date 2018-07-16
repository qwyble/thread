import React, { Component } from 'react';
import UploadHandlers from '../uploadHandler/uploadHandlers.js';
import SearchBar from '../search/searchBar.js';
import { Menu, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


/* Top bar renders components for uploading songs,
sending messages, and navigating the app.*/

class SidebarTopOverlay extends Component {


  render() {
    return (
      <div>
          <Menu inverted className='topBar'>
            <Menu.Item link name='home'>
              <Link to='/'>
                <img src={this.props.logo} className="App-logo" alt="logo" />
                Home
              </Link>
            </Menu.Item>

            <Menu.Item link name='stream'>
              <Link to='/stream'>
                <Icon name='sound' />
                Stream
              </Link>
            </Menu.Item>

            <Menu.Item link name='profile'>
              <Link to='/edit'>
                <Icon name='user circle outline' />
                Profile
              </Link>
            </Menu.Item>


            <Menu.Item link name='upload' >
              <UploadHandlers />
            </Menu.Item>

            <Menu.Item link name='explore'>
              <Link to='/explore'>
                <Icon name='search' />
                Explore
              </Link>
            </Menu.Item>

            <Menu.Item link name='users'>
              <Link to='/followers'>
                <Icon name='users' />
                Followers
              </Link>
            </Menu.Item>

            <Menu.Item link name='following'>
              <Link to='/following'>
                <Icon name='flag' />
                Following
              </Link>
            </Menu.Item>

            <Menu.Item link name='forums'>
              <Link to='/forum'>
                <Icon name='browser' />
                Forums
              </Link>
            </Menu.Item>

            <Menu.Item link name='messages'>
              <Link to='/messages'>
                <Icon name='mail' />
                Messages
              </Link>
            </Menu.Item>

            <Menu.Item link name='chat'>
              <Link to ='/logout'>
                Logout
              </Link>
            </Menu.Item>

            <Menu.Item link name='search' position='right'>
              <SearchBar />
            </Menu.Item>


          </Menu>
      </div>
    )
  }
}

export default SidebarTopOverlay;

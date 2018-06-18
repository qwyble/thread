import React, { Component } from 'react';
import UploadHandlers from '../uploadHandler/uploadHandlers.js';
import SearchBar from '../search/searchBar.js';
import { Sidebar, Segment, Menu, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


/* Top bar renders components for uploading songs,
sending messages, and navigating the app.*/

class SidebarTopOverlay extends Component {


  render() {
    return (
      <div>
          <Menu inverted>
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
              <Link to='/profile'>
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
              <Icon name='users' />
              Followers
            </Menu.Item>

            <Menu.Item link name='following'>
              <Icon name='flag' />
              Following
            </Menu.Item>

            <Menu.Item link name='forums'>
              <Link to='/forum'>
                <Icon name='browser' />
                Forums
              </Link>
            </Menu.Item>

            <Menu.Item link name='messages'>
              <Icon name='mail' />
              Messages
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

import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon} from 'semantic-ui-react';
import UploadHandlers from '../uploadHandler/uploadHandlers.js';
import {Link} from 'react-router-dom';


/* Top bar renders components for uploading songs,
sending messages, and navigating the app.*/

class SidebarTopOverlay extends Component {


  render() {
    return (
      <div>
        <Sidebar.Pushable color='blue' as={Segment} className='topBar'>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={true} inverted style={{position: 'fixed'}}>
            <Menu.Item name='home'>
              <Link to='/'>
                <img src={this.props.logo} className="App-logo" alt="logo" />
                Home
              </Link>
            </Menu.Item>

            <Menu.Item name='friends'>
              <Icon name='user circle outline' />
              Profile
            </Menu.Item>

            <Menu.Item link name='upload' >
              <UploadHandlers />
            </Menu.Item>

            <Menu.Item name='friends'>
              <Icon name='user circle outline' />
              Friends
            </Menu.Item>

            <Menu.Item name='users'>
              <Icon name='users' />
              Followers
            </Menu.Item>

            <Menu.Item name='following'>
              <Icon name='flag' />
              Following
            </Menu.Item>

            <Menu.Item name='stream'>
              <Link to='/stream'>
                <Icon name='sound' />
                Stream
              </Link>
            </Menu.Item>

            <Menu.Item name='forums'>
              <Link to='/forum'>
                <Icon name='browser' />
                Forums
              </Link>
            </Menu.Item>

            <Menu.Item name='messages'>
              <Icon name='mail' />
              Messages
            </Menu.Item>

            <Menu.Item name='chat'>
              <Icon name='comments' />
              Chat
            </Menu.Item>

            <Menu.Item name='chat'>
              <Link to ='/logout'>
                Logout
              </Link>
            </Menu.Item>

          </Sidebar>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarTopOverlay;

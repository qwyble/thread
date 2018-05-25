import React, { Component } from 'react';
import { Sidebar, Segment, Menu, Icon, Grid } from 'semantic-ui-react';
import UploadHandlers from '../uploadHandler/uploadHandlers.js';


/* Top bar renders components for uploading songs,
sending messages, and navigating the app.*/

class SidebarTopOverlay extends Component {


  render() {
    return (
      <div>
        <Sidebar.Pushable color='blue' as={Segment} className='topBar'>
          <Sidebar as={Menu} animation='overlay' direction='top' visible={true} inverted style={{position: 'fixed'}}>
            <Menu.Item name='home'>
              <img src={this.props.logo} className="App-logo" alt="logo" />
              Profile
            </Menu.Item>
            <Menu.Item link name='upload' >
              <UploadHandlers onUpload={this.props.onUpload}/>
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
              <Icon name='sound' />
              Stream
            </Menu.Item>

            <Menu.Item name='forums'>
              <Icon name='browser' />
              Forums
            </Menu.Item>

            <Menu.Item name='messages'>
              <Icon name='mail' />
              Messages
            </Menu.Item>

            <Menu.Item name='chat'>
              <Icon name='comments' />
              Chat
            </Menu.Item>

          </Sidebar>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarTopOverlay;

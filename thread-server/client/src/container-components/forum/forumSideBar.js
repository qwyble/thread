import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import CategoryMenuItem from '../../presentational-components/sidebarUtilities/categoryMenuItem.js';
import AddCategory from '../../presentational-components/sidebarUtilities/addCategory.js';
import ForumContainer from '../forum/forumContainer';
import ForumCategories from './forumCategories';


//SidebarLeftOverlay is the primary component
//for controlling playlists and categories.
//Child components are responsible for rendering
//based on playlist, people you follow, or time uploaded.

class ForumSidebarLeftOverlay extends Component {
  constructor(){
    super()

    this.state = {
      visible: true,
      categoryToAdd: '',
      categories: [],
     }
  }


  toggleVisibility = () => {this.setState({ visible: !this.state.visible })}



  render() {
    return (
      <div className='primaryContainer'>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar inverted vertical icon='labeled' animation='push' width='thin' as={Menu} visible={this.state.visible}>

            <ForumCategories categories={this.state.categories}/>

          </Sidebar>

          <Sidebar.Pusher className='primaryContainer'>

            <Button inverted icon className='sidebarButton' attached='right' color='blue' onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>

            <div>
              <ForumContainer />
            </div>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default ForumSidebarLeftOverlay;

import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import ForumGrid from '../forum/forumGrid.js';
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
      selectedCategory: ''
     }
  };


  toggleVisibility = () => {this.setState({ visible: !this.state.visible })};

  handleSelectCategory = (e) => {this.setState({selectedCategory: e.target.value})};



  render() {
    return (
      <div className='primaryContainer'>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar inverted vertical icon='labeled' animation='push' width='thin' as={Menu} visible={this.state.visible}>

            <ForumCategories onSelectCategory={this.handleSelectCategory} categories={this.state.categories}/>

          </Sidebar>

          <Sidebar.Pusher className='primaryContainer'>

            <Button inverted icon className='sidebarButton' attached='right' color='blue' onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>

            <div>
              <ForumGrid selectedCategory={this.state.selectedCategory}/>
            </div>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default ForumSidebarLeftOverlay;

import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import CategoryMenuItem from '../../presentational-components/sidebarUtilities/categoryMenuItem.js';
import AddCategory from '../../presentational-components/sidebarUtilities/addCategory.js';
import ForumContainer from '../forum/forumContainer';


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
      categories: [
        {'max/msp': []},
        {'MIDI': []},
        {'artists': []},
      ],
     }
  }


  toggleVisibility = () => {this.setState({ visible: !this.state.visible })}



  handleAddCategory = () => {
    var categoryToAdd = {};
    categoryToAdd[this.state.categoryToAdd] = [];
    this.setState({...this.state, categories: this.state.categories.concat(categoryToAdd)});
  }


  handleInputChange = (e) => {
    this.setState({categoryToAdd: e.target.value});
  }


  handleCategoryDelete = (id) => {
    this.setState({categories: this.state.categories.filter((c, i) => i !== id)});
  }


  handleCategoryEditSubmit = (id, name, newName) => {
    var newCat = {};
    var categories = [...this.state.categories];
    var category = categories[id];
    newCat[newName] = category[name];
    categories[id] = newCat;
    this.setState({categories})

  }



  render() {
    return (
      <div className='primaryContainer'>
        <Sidebar.Pushable
          as={Segment}
          className='primaryContainer'>
          <Sidebar
            inverted
            vertical
            icon='labeled'
            animation='push'
            width='thin'
            as={Menu}
            visible={this.state.visible}
          >

            {/*this.state.categories.map((category, key) =>
              {
                return(
                  <MenuItem
                    name={Object.keys(category)[0]}
                    key={key}
                    id={key}
                    onSelectPlaylist={this.handleSelectPlaylist}
                    onCategoryDelete={this.handleCategoryDelete}
                    onCategoryEditSubmit={this.handleCategoryEditSubmit}
                  />
                )
              })
            */}
            <AddCategory
              categoryToAdd={this.state.categoryToAdd}
              onAddCategory={this.handleAddCategory}
              onInputChange={this.handleInputChange}/>
          </Sidebar>
          <Sidebar.Pusher className='primaryContainer'>
            <Button
              inverted
              icon
              className='sidebarButton'
              attached='right'
              color='blue'
              onClick={this.toggleVisibility}>
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

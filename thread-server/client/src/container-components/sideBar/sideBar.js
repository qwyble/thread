import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon, Loader } from 'semantic-ui-react';
import MenuItem from '../../presentational-components/sidebarUtilities/menuItem.js';
import AddCategory from '../../presentational-components/sidebarUtilities/addCategory.js';
import PlaylistController from '../songRenderers/playlistController.js'
import axios from 'axios';

//SidebarLeftOverlay is the primary component
//for controlling playlists and categories.
//Child components are responsible for rendering
//based on playlist, people you follow, or time uploaded.

class SidebarLeftOverlay extends Component {
  constructor(){
    super()

    this.state = {
      categories: [],
      selectedPlaylist: '',
      visible: true,
      loading: true
     }
  }

  componentDidMount(){
    var categories: {};
    axios({
      method: 'get',
      url: 'http://localhost:8080/getPlaylists',
      withCredentials: true
    }).then((categories) => {
      var obj = categories.data;
      var result = Object.keys(obj).map((key) => {
        return {[key]: obj[key]}
      });
      this.setState({categories: result, loading: false});
    });

  }

  toggleVisibility = () => {this.setState({ visible: !this.state.visible })}

  handleAddCategory = (cat) => {
    var categoryToAdd = {};
    categoryToAdd[cat] = [];
    this.setState({...this.state, categories: this.state.categories.concat(categoryToAdd)});
  }


  handleCategoryDelete = (id) => {
    this.setState({categories: this.state.categories.filter((c, i) => i !== id)});
  }

  handleSelectPlaylist = (e) => {
    this.setState({selectedPlaylist: e.target.textContent})
  }


  handleCategoryEditSubmit = (id, name, newName) => {
    var newCat = {};
    var categories = [...this.state.categories];
    var category = categories[id];
    newCat[newName] = category[name];
    categories[id] = newCat;
    this.setState({categories})
    let cats = {};
    for (var i = 0; i < categories.length; ++i){
      cats = {...cats, ...categories[i]};
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/editCat',
      data: cats,
      withCredentials: true
    })

  }


  render() {
    return (
      <div className='primaryContainer'>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar inverted vertical icon='labeled' animation='push' width='thin' as={Menu} visible={this.state.visible} >
            {this.state.loading ?
              <Menu.Item className="sideBarLoader"> <Loader active /> </Menu.Item>
              :
              <div>
                {this.state.categories.map((category, key) =>
                  {
                    return(
                      <MenuItem name={Object.keys(category)[0]}
                        playLists={category[Object.keys(category)[0]]}
                        key={key} id={key} onSelectPlaylist={this.handleSelectPlaylist}
                        onCategoryDelete={this.handleCategoryDelete}
                        onCategoryEditSubmit={this.handleCategoryEditSubmit}
                      />
                    )
                  })
                }
              </div>
            }
            <AddCategory onAddCategory={this.handleAddCategory} />
          </Sidebar>
          <Sidebar.Pusher className='primaryContainer'>
            <Button inverted icon className='sidebarButton' attached='right' color='blue' onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>
            <div>
              <PlaylistController selectedPlaylist={this.state.selectedPlaylist}/>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay;

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
    axios({
      method: 'get',
      url: 'http://localhost:8080/getPlaylists',
      withCredentials: true
    }).then((categories) => {
      var catpls = categories.data;
      var cats = Object.values(
        catpls.reduce( (cats, {catname, catid, plname, plid}) => {
          if (! (catid in cats) )
              cats[catid] = {catname, catid, pls: []};
          cats[catid].pls.push({plname, plid});
          return cats;
        }, {})
      )
      this.setState({categories: cats, loading: false});
    });

  }


  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleAddCategory = (cat) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/addCategory',
      data: {
        category: cat
      },
      withCredentials: true
    })
    var categoryToAdd = {};
    categoryToAdd[cat] = [];
    this.setState({...this.state, categories: this.state.categories.concat(categoryToAdd)});
  }


  handleCategoryDelete = (catName, id) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteCategory',
      data: {
        catName: catName
      },
      withCredentials: true
    })
    this.setState({
      categories: this.state.categories.filter(function(c, i){return i != id})
    });
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
    axios({
      method: 'post',
      url: 'http://localhost:8080/renameCat',
      data: {
        catName: name,
        name: newName
      },
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
                      <MenuItem name={category.catname}
                        playLists={category.pls}
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
              <PlaylistController selectedPlaylist={this.state.selectedPlaylist} categories={this.state.categories}/>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay;

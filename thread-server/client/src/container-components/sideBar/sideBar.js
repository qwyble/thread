import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon, Loader, Popup } from 'semantic-ui-react';
import MenuItem from '../../presentational-components/sidebarUtilities/menuItem.js';
import AddCategory from '../../presentational-components/sidebarUtilities/addCategory.js';
import AudioRenderer from '../../presentational-components/audio/audioRenderer.js'
import PlaylistController from '../songRenderers/playlistController.js';
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
      loading: true,
      nowPlaying: {},
      ended: false,
      paused: false,
      isPublic: '',
      err: ''
    }
  }

  getCats = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/getPlaylists',
      withCredentials: true
    }).then((categories) => {
      var catpls = categories.data;
      var cats = Object.values(
        catpls.reduce( (cats, {catname, catid, plname, plid, isPublic}) => {
          if (! (catid in cats) )
              cats[catid] = {catname, catid, pls: []};
          cats[catid].pls.push({plname, plid, isPublic});
          return cats;
        }, {})
      )
      this.setState({categories: cats, loading: false});
    });
  }

  componentDidMount(){
    this.setState({loading: true});
    this.getCats();
  }

  handlePlaying = (song) => {
    this.setState({nowPlaying: song, ended: false, paused: false});
  }


  handlePausing = () => {
    if(this.state.paused){
      this.handlePlaying(this.state.nowPlaying);
    }else{
      this.setState({paused: true})
    }
  }

  handleEnd = () => {
    this.setState({ended: true});
  }


  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleAddCategory = (cat) => {
    this.setState({loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/addCategory',
      data: {
        category: cat
      },
      withCredentials: true
    }).then((result) =>{
      this.getCats();
    }).catch((err) => this.setState({err: err.response.data.err}))
  }


  handleCategoryDelete = (id) => {
    this.setState({loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteCategory',
      data: {
        catid: id
      },
      withCredentials: true
    }).then(result => {this.getCats();});
  }

  handleSelectPlaylist = (e, data) => {
    this.setState({selectedPlaylist: e.target.value, isPublic: data.ispublic})
  }


  handleCategoryEditSubmit = (catName, catid, newName) => {
    if(newName.length < 1){
      this.setState({err: 'category name must be at least 1 character'})
      return;
    }
    var categories = [...this.state.categories];
    for(var i = 0; i < categories.length; i++){
      if(categories[i].catname === newName){
        this.setState({err: 'category name must be unique'});
        return;
      }
    }
    categories = [];
    this.state.categories.forEach(function(cat){
      if(cat.catid === catid){
        cat.catname = newName;
      }
      categories.push(cat);
    });
    this.setState({categories});

    axios({
      method: 'post',
      url: 'http://localhost:8080/renameCat',
      data: {
        catid: catid,
        name: newName
      },
      withCredentials: true
    })
    .then((result) => {this.getCats()})
    .catch((err) => {this.setState({err: err.response.data.err})});

  }


  render() {
    return (
      <div>
      <div className='primaryContainer'>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar inverted vertical icon='labeled' animation='push' width='thin' as={Menu} visible={this.state.visible} >
            {
              this.state.loading ?
               <Loader active />
              : <div></div>
            }
              {this.state.categories.map((category, key) =>
                {
                  return(
                    <MenuItem name={category.catname}
                      playLists={category.pls}
                      key={key} id={category.catid}
                      onSelectPlaylist={this.handleSelectPlaylist}
                      onCategoryDelete={this.handleCategoryDelete}
                      onCategoryEditSubmit={this.handleCategoryEditSubmit}
                      getCats={this.getCats}
                    />
                  )
                })
              }


            <div>{this.state.err ?
              <Menu.Item>
                <Button inverted className='button2' style={{float: 'right', padding: '0'}} floated='right' icon size='mini' onClick={() => this.setState({err: ''})}>
                  <Icon name='delete' size='tiny'/>
                </Button>
                  {this.state.err}
              </Menu.Item>
              : <div></div>}
            </div>
            <AddCategory onAddCategory={this.handleAddCategory} />
          </Sidebar>
          <Sidebar.Pusher className='primaryContainer'>
            <Button inverted icon className='sidebarButton'
              attached='right' color='blue' onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>
            <div>
              <PlaylistController onPlaying={this.handlePlaying}
                onPausing={this.handlePausing}
                nowPlaying={this.state.nowPlaying}
                selectedPlaylist={this.state.selectedPlaylist}
                isPublic={this.state.isPublic}
                categories={this.state.categories} ended={this.state.ended}
                paused={this.state.paused}
                url={this.props.match.url}
              />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
      {Object.keys(this.state.nowPlaying).length > 0 ?
        <AudioRenderer onEnd={this.handleEnd} song={this.state.nowPlaying}
          paused={this.state.paused} onAudioButton={this.handlePausing}
        />
      : <div className='audioContainer' style={{minHeight: '8.2vh'}}></div>}
      </div>
    )
  }
}

export default SidebarLeftOverlay;

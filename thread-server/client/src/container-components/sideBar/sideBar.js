import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon, Loader, Popup, Grid } from 'semantic-ui-react';
import MenuItem from '../../presentational-components/sidebarUtilities/menuItem.js';
import RenderAddCategory from '../../presentational-components/sidebarUtilities/renderAddCategory.js';
import AudioRenderer from '../../presentational-components/audio/audioRenderer.js'
import PlaylistController from '../songRenderers/playlistController.js';
import axios from 'axios';
import {AppContext} from '../../context.js';

/*
SidebarLeftOverlay is the primary component for rendering
child components which are responsible for rendering categories,
playlists, songs, and methods for sorting
based on playlist, people you follow, or time uploaded.
*/

class SidebarLeftOverlay extends Component {
  constructor(){
    super()

    this.state = {
      selectedPlaylist: '',
      visible: true,
      isPublic: '',
      nowPlaying: {},
      ended: false,
      paused: false
    }
  }

  static getDerivedStateFromProps(props, state){
    if(window.location.pathname === '/stream'){
      return { selectedPlaylist: '' }
    }else{
      return {}
    }
  }


  toggleVisibility = () => { this.setState({ visible: !this.state.visible }) }

  handleSelectPlaylist = (e, data) => {
    this.setState({
      selectedPlaylist: e.target.value,
      isPublic: data.ispublic
    });
  }


  render() {
    return (
      <div>
        <div>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar inverted vertical icon='labeled' animation='push' width='thin' as={Menu}
            visible={this.state.visible} >
            {
              this.props._loading ?
               <Loader active />
              : <div></div>
            }
            <Menu.Item style={{color: '#54c8ff'}}>
              {this.props.owner ? <div>{this.props.owner}'s playlists:</div> : <div>Your playlists:</div>}
            </Menu.Item>
              {this.props.categories.map((category, key) =>
                {
                  return(
                    <MenuItem
                      name={category.catname}
                      playLists={category.pls}
                      key={key} id={category.catid}
                      onSelectPlaylist={this.handleSelectPlaylist}
                      onCategoryDelete={this.props.onCategoryDelete}
                      onCategoryEditSubmit={this.props.onCategoryEditSubmit}
                      getCats={this.props.getCats}
                      user={this.props.user.idUsers}
                    />
                  )
                })
              }

            {window.location.pathname === '/stream' ?
              <RenderAddCategory
                err={this.props.err}
                onAddCategory={this.props.onAddCategory}
                removeErr={() => this.setState({err: ''})}
              />  : <div></div>
            }

          </Sidebar>
          <Sidebar.Pusher className='pusherContainer'>
            <Button inverted icon className='sidebarButton'
              attached='right' color='blue' onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>

            <div>
              <AppContext.Consumer>{context => (
                <PlaylistController
                  onPlaying={context.onPlaying}
                  onPausing={context.onPausing}
                  nowPlaying={context.nowPlaying}
                  onSetSongs={context.onSetSongs}
                  selectedPlaylist={this.state.selectedPlaylist}
                  isPublic={this.state.isPublic}
                  categories={this.props.categories}
                  ended={context.ended}
                  paused={context.paused}
                  url={this.props.url}
                />)}
              </AppContext.Consumer>
            </div>

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>

      </div>
    )
  }
}

export default SidebarLeftOverlay;

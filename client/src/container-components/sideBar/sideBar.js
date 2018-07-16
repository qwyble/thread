import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon, Loader } from 'semantic-ui-react';
import CategoryMenuItem from '../../presentational-components/sidebarUtilities/categoryMenuItem.js';
import AddCategory from './addCategory.js';
import WrappedPlaylistController from '../../presentational-components/sidebarUtilities/wrappedPlaylistController.js';

/*
SidebarLeftOverlay handles selecting playlists and renders
child components which render categories,
playlists, songs, and methods for sorting.
*/

class SidebarLeftOverlay extends Component {
  constructor(){
    super()

    this.state = {
      selectedPlaylist: '',
      isPublic: false,
      visible: true,
    }
  }


  static getDerivedStateFromProps(props, state){
    var path = window.location.pathname;
    if(path === '/stream' || path.includes('/profile')) return { selectedPlaylist: '' }
    else if(path.includes('/playlist')) return {selectedPlaylist: path.slice(10)}
    else return {}
  }


  toggleVisibility = () => { this.setState({ visible: !this.state.visible }) }


  handleSelectPlaylist = (e, data) => {
    this.setState({ selectedPlaylist: e.target.value, isPublic: data.ispublic });
  }

  render() {

    return (
      <div>
        <div>
        <Sidebar.Pushable as={Segment} className='primaryContainer'>
          <Sidebar
            inverted vertical
            width='thin' as={Menu}
            icon='labeled' animation='push'
            visible={this.state.visible}>

            {this.props.owner ?
              <Menu.Item style={{color: '#54c8ff'}}>
                {
                  !this.props.isOwner ?
                  <div>{this.props.owner.userName}'s playlists:</div>
                  : <div>Your playlists:</div>
                }
              </Menu.Item>
              :
              <div></div>
            }


              <div>
                <CategoryMenuItem
                  getCats={this.props.getCats}
                  isOwner={this.props.isOwner}
                  categories={this.props.categories}
                  onSelectPlaylist={this.handleSelectPlaylist}
                />
              <div>
                {this.props._loading ?
                  <Loader active />:
                    <div>
                      {this.props.isOwner ?
                        <AddCategory getCats={this.props.getCats}/>
                        : <div></div>}
                    </div>
                }
              </div>
            </div>


          </Sidebar>
          <Sidebar.Pusher className='pusherContainer'>

            <Button inverted icon
              className='sidebarButton'
              attached='right' color='blue'
              onClick={this.toggleVisibility}>
              <Icon name={this.state.visible ? 'left arrow' : 'right arrow'}/>
            </Button>

            <WrappedPlaylistController
              isOwner={this.props.isOwner}
              isPublic={this.state.isPublic}
              selectedPlaylist={this.state.selectedPlaylist}
              categories={this.props.categories}
              refreshCategories={this.props.getCats}
            />

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>

      </div>
    )
  }
}

export default SidebarLeftOverlay;

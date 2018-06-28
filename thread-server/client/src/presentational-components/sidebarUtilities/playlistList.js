import React from 'react';
import {Menu, Loader} from 'semantic-ui-react';
import PlaylistTab from './playlistTab';


class PlaylistList extends React.Component{
  render(){
    return(
      <div>
        {this.props.displayLists ?
          <div>
            <Menu.Menu>
              {this.props.playlists.map((playlist, key) =>
                <Menu.Item key={key} className='listSidebar'>
                    <PlaylistTab
                      playlist={playlist.plname} key={key}
                      id={playlist.plid} onDeleteList={this.props.onDeleteList}
                      onSelectPlaylist={this.props.onSelectPlaylist}
                      isPublic={playlist.isPublic}
                    />
                </Menu.Item>)
              }
                {this.props._loading ?
                  <Menu.Item style={{padding: '1em 1em'}}>
                    <Loader active inverted size='mini'/>
                  </Menu.Item>
                    : <div></div>}
            </Menu.Menu>
          </div>
          : <span></span>
        }
      </div>
    )
  }
}


export default PlaylistList;

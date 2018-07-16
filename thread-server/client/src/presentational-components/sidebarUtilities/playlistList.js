import React from 'react';
import {Menu, Loader} from 'semantic-ui-react';
import PlaylistTab from './playlistTab';
import {Transition} from 'react-transition-group';


class PlaylistList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      renderLists: '',
    };
  }


  handleExited = () => {
    this.setState({renderLists: false})
  }

  handleEnter = () => {
    this.setState({renderLists: true});

  }




render(){

  const className = {
    entering: 'listSidebar displayed',
    entered: 'listSidebar displayed',
    exiting: 'listSidebar',
    exited: 'listSidebar'
  }

    return(
      <Transition
        onExited={this.handleExited}
        onEnter={this.handleEnter}
        in={this.props.displayLists}
        timeout={250}
      >
        {
          (state) => (
            <div className={className[state]}>
              {this.state.renderLists ?
                <Menu.Menu>
                  {this.props.playlists.map((playlist, key) =>
                    <Menu.Item key={key} className={'playlistTab'}>
                      <PlaylistTab
                        key={key}
                        id={playlist.plid}
                        playlist={playlist.plname}
                        isOwner={this.props.isOwner}
                        isPublic={playlist.isPublic}
                        onDeleteList={this.props.onDeleteList}
                        onSelectPlaylist={this.props.onSelectPlaylist}
                      />
                    </Menu.Item>
                  )}
                  {this.props._loading ?
                    <Menu.Item style={{padding: '1em 1em'}}>
                      <Loader active inverted size='mini'/>
                    </Menu.Item>
                    : <div></div>}
                  </Menu.Menu>
                : <div></div>
              }
              </div>
          )
        }
      </Transition>
    )
  }
}


export default PlaylistList;

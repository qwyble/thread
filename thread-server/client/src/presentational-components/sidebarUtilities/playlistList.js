import React from 'react';
import ReactDOM from 'react-dom'
import {Menu, Loader} from 'semantic-ui-react';
import PlaylistTab from './playlistTab';
import {TransitionGroup, Transition} from 'react-transition-group';


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
                        playlist={playlist.plname} key={key}
                        id={playlist.plid} onDeleteList={this.props.onDeleteList}
                        onSelectPlaylist={this.props.onSelectPlaylist}
                        isPublic={playlist.isPublic}
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

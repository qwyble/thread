import React from 'react';
import {Modal, Portal,Table, Sticky, Button, Icon, Header, Menu, Checkbox, Rating, Loader} from 'semantic-ui-react';
import SongRow from './songRow.js';
import axios from 'axios';

//renders the lst of songs, controls adding and deleting songs to/from playlists
//
class SongSorter extends React.Component{
  state ={
    _loading: false,
    songs: [],
    songsToPlaylist: [],
    _disabled: true,
    playlistToAddTo: '',
    nowPlaying: ''
  }

  static getDerivedStateFromProps(props, state){
    return {songs: props.songs, _loading: props._loading, nowPlaying: props.nowPlaying};
  }

  handlePlaying = (id) =>{
    var song = this.state.songs.filter((song, i) => song.idSongs === id)[0];
    this.props.onPlaying(song)
  }

  handleSongSelect = (e) => {
    if(e.target.checked){
      this.setState({
        songsToPlaylist: this.state.songsToPlaylist.concat(parseInt(e.target.id))
      }, () => this.handlePlaylistButtonToggle());
    }else{
      this.setState({
        songsToPlaylist: this.state.songsToPlaylist.filter((id) => {return (id !== parseInt(e.target.id))})
      }, () => this.handlePlaylistButtonToggle());
    }
  }

  handlePlaylistButtonToggle = () => {
    if(this.state.songsToPlaylist.length < 1){
      this.setState({_disabled: true});
    }else{
      this.setState({_disabled: false});
    }
  }

  handleAddToPlaylist = (e, data) => {

    this.setState({playlistToAddTo: data.value}, () => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/addSongsToPlaylist',
        data: {
          songs: this.state.songsToPlaylist,
          playlist: this.state.playlistToAddTo
        },
        withCredentials: true
      }).then((result) => {
        console.log(result.data.message);
      })

    })
  }


  render(){
    console.log(this.state.isPublic)
    return(
      <div>
      <Table className='t1' size='small' celled striped compact unstackable inverted selectable>
          <Table.Header fullWidth className='stickyTop'>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Uploader</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Genre</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

        <Table.Body>
          {this.state.songs.map((song, key) => {
            return(
              <SongRow key={key} song={song}
                playing={song.idSongs === this.state.nowPlaying.idSongs}
                onPlaying={this.handlePlaying} onSongSelect={this.handleSongSelect}
                onPausing={this.props.onPausing}
                paused={this.props.paused}
              />
            )
          })}
        </Table.Body>
        <Table.Footer className='stickyBottom' fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              {this.props.isPublic ?
                <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.props.onMakePrivate}>
                    <div><Icon name='privacy' /> Make Private </div>
                  </Button>
              : <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.props.onMakePublic}>
                  <div><Icon name='user' /> Make Public </div>
                </Button>
              }
              <Button size='mini'>Bookmark</Button>

              <Portal closeOnTriggerClick openOnTriggerClick trigger={
                <Button
                  disabled={this.state._disabled}
                  size='mini' >Add to Playlist
                </Button>} closeIcon>
                <Menu inverted size='mini' style={{ maxHeight: '30vh', overflow: 'auto', left: '22%', position: 'fixed', top: '50%', zIndex: 1000 }} >
                  {this.props.categories.map((cat, key) => {
                    return(
                      <Menu.Item key={key}>
                        {cat.catname}
                        <Menu.Menu>
                          {cat.pls.map((pl, k) => {
                            return(
                              <Menu.Item link key={k} value={pl.plid} onClick={this.handleAddToPlaylist}>
                                {pl.plname}
                              </Menu.Item>
                            )
                          })}
                        </Menu.Menu>
                      </Menu.Item>
                    )
                  })}
                </Menu>
              </Portal>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {this.state._loading ? <Loader active size='massive'/> :<div></div>}
    </div>

    )
  }
}


export default SongSorter;

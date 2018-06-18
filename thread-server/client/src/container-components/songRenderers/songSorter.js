import React from 'react';
import {Modal, Portal,Table, Sticky, Button, Icon, Header, Menu, Checkbox, Rating, Loader} from 'semantic-ui-react';
import PlaylistPortal from './playlistPortal.js';
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
    nowPlaying: '',
    err: ''
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
        this.setState({songsToPlaylist: [], _disabled: true})
      })

    })
  }

  handleRemoveFromPlaylist = (e, data) => {
    if(this.state.songsToPlaylist && this.props.selectedPlaylist){
      axios({
        method: 'post',
        url: 'http://localhost:8080/deleteFromPlaylist',
        data:{
          songs: this.state.songsToPlaylist,
          playlist: this.props.selectedPlaylist
        },
        withCredentials: true
      }).then((result) => {
        this.setState({
          songs: this.state.songs.filter((song, i) => {return !this.state.songsToPlaylist.includes(song.idSongs)}),
          songsToPlaylist: []
        })
        this.props.onRemoval(this.state.songs);
      })
      .catch((err) => {this.setState({err: 'you do not have permission to modify that playlist'})});
    }else{
      this.setState({err: 'you must select songs and a playlist'});
    }
  }


  render(){
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
              <Table.HeaderCell>Date Uploaded</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

        <Table.Body>
          {this.state.songs.map((song, key) => {
            return(
              <SongRow key={key} song={song}
                selected={this.state.songsToPlaylist.includes(song.idSongs)}
                playing={song.idSongs === this.state.nowPlaying.idSongs}
                onPlaying={this.handlePlaying} onSongSelect={this.handleSongSelect}
                onPausing={this.props.onPausing}
                paused={this.props.paused}
                onRefresh={this.props.onRefresh}
              />
            )
          })}
        </Table.Body>
        <Table.Footer className='stickyBottom' fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell width={3}>
              <Button size='mini' onClick={this.props.onClonePlaylist}>Clone Playlist</Button>
              <PlaylistPortal
                err={this.state.err}
                _disabled={this.state._disabled}
                onAddToPlaylist={this.handleAddToPlaylist}
              />
            </Table.HeaderCell>
            <Table.HeaderCell >

              {window.location.pathname.includes('/profile') ?
              <div></div>
              : <div>
                  {this.props.selectedPlaylist ?
                    <Button size='mini' onClick={this.handleRemoveFromPlaylist} disabled={this.state._disabled}>
                      Delete From Playlist
                    </Button> :
                    <Button size='mini' onClick={this.handleDeleteSong} disabled={this.state._disabled}>
                      Delete Song
                    </Button>
                  }
                </div>
              }
            </Table.HeaderCell>
            <Table.HeaderCell colSpan='5'>
              {this.props.isPublic ?
                <Button floated='right' icon labelPosition='left'
                primary size='mini' onClick={this.props.onMakePrivate}>
                    <div><Icon name='privacy' /> Make Private </div>
                  </Button>
              : <Button floated='right' icon labelPosition='left'
                primary size='mini' onClick={this.props.onMakePublic}>
                  <div><Icon name='user' /> Make Public </div>
                </Button>
              }

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

import React from 'react';
import {Modal, Portal,Table, Sticky, Button, Icon, Header, Menu, Checkbox, Rating, Loader} from 'semantic-ui-react';
import SongRow from './songRow.js';
import axios from 'axios';


class SongSorter extends React.Component{
  state ={
    _loading: false,
    songs: [],
    songsToPlaylist: [],
    _disabled: true,
    playlistToAddTo: ''
  }

  static getDerivedStateFromProps(props, state){
    return {songs: props.songs, _loading: props._loading};
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
    console.log(this.state.songsToPlaylist);
    if(this.state.songsToPlaylist.length < 1){
      this.setState({_disabled: true});
    }else{
      this.setState({_disabled: false});
    }
  }

  handleAddToPlaylist = (e) => {
    console.log(e.target.text);
    this.setState({playlistToAddTo: e.target.text}, () => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/addSongsToPlaylist',
        data: {
          songs: this.state.songsToPlaylist,
          playlist: this.state.playlistToAddTo
        },
        withCredentials: true
      })

    })
  }


  render(){
    return(
      <div>
      <Table className='t1' size='small' celled striped compact unstackable inverted selectable>
          <Table.Header fullWidth className='stickyTop'>
            <Table.Row>
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
              <SongRow key={key} song={song} onSongSelect={this.handleSongSelect}/>
            )
          })}
        </Table.Body>
        <Table.Footer className='stickyBottom' fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button floated='right' icon labelPosition='left' primary size='mini'>
                <Icon name='user' /> Go Public
              </Button>
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
                        {Object.keys(cat)}
                        <Menu.Menu>
                          {Object.values(cat)[0].map((v, k) => {
                            return(
                              <Menu.Item link key={k} value={v} onClick={this.handleAddToPlaylist}>
                                {v}
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

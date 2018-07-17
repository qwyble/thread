import React from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';




class RemoveSongFromPlaylist extends React.Component{


  handleRemoveFromPlaylist = (e, data) => {

    var songs = this.props.songs.filter((s) => (
      !this.props.selectedSongs.includes(s.idSongs)
    ));

    this.props.onRemoval(songs);

    if(this.props.selectedSongs && this.props.selectedPlaylist){
      axios({
        method: 'post',
        url: 'https://thread-204819.appspot.com/deleteFromPlaylist',
        data:{
          songs: this.props.selectedSongs,
          playlist: this.props.selectedPlaylist
        },
        withCredentials: true
      })
    }
  }



  render(){
    return(
      <div style={{float: 'left'}}>
        {(window.location.pathname.includes('/playlist') && this.props.isOwner) ?
          <Button size='mini' onClick={this.handleRemoveFromPlaylist} disabled={this.props._disabled}>Delete From Playlist</Button> :
          <div></div>
        }
      </div>
    )
  }
}

export default RemoveSongFromPlaylist;

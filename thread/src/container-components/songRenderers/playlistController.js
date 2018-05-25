import React from 'react';
import SongSorter from './songSorter.js'


//PlaylistController is responsible for passing
//a subset of songs to be rendered based on
//the selected playlist.
class PlaylistController extends React.Component{
  state={
    selectedPlayList: [],
    songsToRender: [],
  }

  selectRenderedSongs = () => {
    var allSongs = this.props.songs;
    var songsToRender = [];
    for (var i = 0; i < allSongs.length; i++) {
      if(allSongs[i].playlists.includes(this.state.selectedPlaylist)){
        songsToRender.push(allSongs[i]);
      }
    }
    this.setState({songsToRender});
  }

  handleSelectPlaylist = (e) => {
    this.setState({selectedPlaylist: [e.target.value]});
    this.selectRenderedSongs();
  }



  render(){
    return(
      <div><SongSorter /></div>
    )
  }
}

export default PlaylistController;

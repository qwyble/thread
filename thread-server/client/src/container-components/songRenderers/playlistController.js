import React from 'react';
import SongSorter from './songSorter.js';
import axios from 'axios';


//PlaylistController is responsible for passing
//a subset of songs to be rendered based on
//the selected playlist.
class PlaylistController extends React.Component{
  state={
    selectedPlayList: '',
    songsToRender: [],
  }

  getSongs = () => {
    axios.get(`http://localhost:8080/stream/${this.state.selectedPlaylist}`,{
      withCredentials: true
    })
    .then((result) => {
      this.setState(this.state.songsToRender: result)
    });
  }


  render(){
    return(
      <div><SongSorter /></div>
    )
  }
}

export default PlaylistController;

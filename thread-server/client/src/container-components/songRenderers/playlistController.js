import React from 'react';
import SongSorter from './songSorter.js';
import axios from 'axios';


//PlaylistController is responsible for passing
//a subset of songs to be rendered based on
//the selected playlist.
class PlaylistController extends React.Component{
  state={
    selectedPlaylist: '',
    songs: [],
    _loading: false,
    nowPlaying: {}
  }

  handlePlaying = (song) => {
    this.props.onPlaying(song);
  }

  handleEnd = () => {
    var id = this.state.nowPlaying.idSongs + 1;
    var nextSong = this.state.songs.filter((song, i) => song.idSongs === id)[0];
    this.handlePlaying(nextSong);
  }

  static getDerivedStateFromProps(props, state){
    return {selectedPlaylist: props.selectedPlaylist, ended: props.ended, nowPlaying: props.nowPlaying};
  }

  componentDidUpdate(){
    if(this.state.ended){
      this.handleEnd();
    }
    return true;
  }

  componentDidMount(){
    this.setState({_loading: true});
    var url = '';
    if(!this.state.selectedPlaylist){
      url = 'http://localhost:8080/stream';
    }else{
      url = `http://localhost:8080/stream/${this.state.selectedPlaylist}`
    }
    axios.get(url,{
      withCredentials: true
    })
    .then((result) => {
      this.setState({songs: result.data})
      this.setState({_loading: false});
    });
  }





  render(){
    return(
      <div>
        <SongSorter
          _loading={this.state._loading}
          songs={this.state.songs}
          categories={this.props.categories}
          onPlaying={this.handlePlaying}
        />
      </div>
    )
  }
}




export default PlaylistController;

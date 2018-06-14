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
    nowPlaying: {},
    isPublic: ''
  }

  static getDerivedStateFromProps(props, state){
    return {selectedPlaylist: props.selectedPlaylist, ended: props.ended, nowPlaying: props.nowPlaying, isPublic: props.isPublic};
  }

  getUrl = () => {
    if (this.props.url.length < 2){ return 'http://localhost:8080'+'/stream'; }
    else{ return 'http://localhost:8080'+this.props.url; }
  }

  getSongs = () => {
    this.setState({_loading: true});
    var url = this.getUrl();
    axios.get(url, {withCredentials: true}).then((result) => {
      this.setState({songs: result.data, _loading: false});
    });
  }

  componentDidUpdate(prevProps){
    if(this.state.ended){ this.handleEnd(); }
    if(this.props.url != prevProps.url){
      this.getSongs();
    }
  }

  componentDidMount(){
    this.getSongs()
  }


  handleMakePublic = () => {
    axios.post('http://localhost:8080/makePublic', {
      plid: this.state.selectedPlaylist,
      withCredentials: true
    }).then((result) => {
      this.setState({isPublic: 1});
    });
  }

  handleMakePrivate = () => {
    axios.post('http://localhost:8080/makePrivate', {
      plid: this.state.selectedPlaylist,
      withCredentials: true
    }).then((result) => {
      this.setState({isPublic: 0});
    });
  }

  handlePlaying = (song) => {
    this.props.onPlaying(song);
  }

  handleEnd = () => {
    var currentId = this.state.nowPlaying.idSongs;
    var index = this.state.songs.findIndex(function(song){ return song.idSongs === currentId; });
    var nextSong = this.state.songs[index+1];

    if(nextSong){ this.handlePlaying(nextSong); }
    else{ return }
  }

  handleRemoval = (songs) => {
    this.setState({songs: songs})
  }



  render(){
    return(
      <div>
        <SongSorter
          _loading={this.state._loading}
          songs={this.state.songs}
          categories={this.props.categories}
          onPlaying={this.handlePlaying}
          onPausing={this.props.onPausing}
          paused={this.props.paused}
          nowPlaying={this.props.nowPlaying}
          onMakePublic={this.handleMakePublic}
          onMakePrivate={this.handleMakePrivate}
          selectedPlaylist={this.state.selectedPlaylist}
          isPublic={this.state.isPublic}
          onRemoval={this.handleRemoval}
          onRefresh={this.getSongs}
        />
      </div>
    )
  }
}




export default PlaylistController;

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

  componentDidUpdate(prevProps){
    if(this.state.ended){
      this.handleEnd();
    }
    if(this.props.selectedPlaylist != prevProps.selectedPlaylist){
      this.setState({_loading: true});
      var url =  `http://localhost:8080/stream/${this.props.selectedPlaylist}`;
      axios.get(url, {withCredentials: true}).then((result) => {
        this.setState({songs: result.data, _loading: false});
      });
    }
  }

  componentDidMount(){
    this.setState({_loading: true});
    var url = '';
    if(!this.state.selectedPlaylist){url = 'http://localhost:8080/stream';}
    else{url = `http://localhost:8080/stream/${this.state.selectedPlaylist}`}
    axios.get(url,{withCredentials: true})
    .then((result) => {
      this.setState({songs: result.data, _loading: false})
    });
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
    var id = this.state.nowPlaying.idSongs + 1;
    var nextSong = this.state.songs.filter((song, i) => song.idSongs === id)[0];
    this.handlePlaying(nextSong);
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
        />
      </div>
    )
  }
}




export default PlaylistController;

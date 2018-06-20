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
    return {
      selectedPlaylist: props.selectedPlaylist,
      ended: props.ended,
      nowPlaying: props.nowPlaying,
      isPublic: props.isPublic
    };
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
      this.props.onSetSongs(result.data);
    });
  }


  componentDidUpdate(prevProps){
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
          onPlaying={this.props.onPlaying}
          onPausing={this.props.onPausing}
          paused={this.props.paused}
          nowPlaying={this.props.nowPlaying}
          onMakePublic={this.handleMakePublic}
          onMakePrivate={this.handleMakePrivate}
          selectedPlaylist={this.state.selectedPlaylist}
          isPublic={this.state.isPublic}
          onRemoval={this.handleRemoval}
          onRefresh={this.getSongs}
          refreshCategories={this.props.refreshCategories}
        />
      </div>
    )
  }
}




export default PlaylistController;

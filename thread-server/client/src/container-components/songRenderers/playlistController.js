import React from 'react';
import SongSorter from './songSorter.js';
import axios from 'axios';


//PlaylistController is responsible for passing
//a subset of songs to be rendered based on
//the selected playlist.
class PlaylistController extends React.Component{
  state={
    songs: [],
    isPublic: '',
    _loading: false
  }

  static getDerivedStateFromProps(props, state){
    return {
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

    songsGet(url).then((result) => {
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
    makePublicPost(this.props.selectedPlaylist).then((result) => { this.setState({isPublic: 1}); });
  }

  handleMakePrivate = () => {
    makePrivatePost(this.props.selectedPlaylist).then((result) => { this.setState({isPublic: 0}); });
  }


  handleRemoval = (songs) => {
    this.setState({songs: songs})
  }



  render(){
    return(
      <div>
        <SongSorter
          {...this.props}
          _loading={this.state._loading}
          songs={this.state.songs}
          onMakePublic={this.handleMakePublic}
          onMakePrivate={this.handleMakePrivate}
          isPublic={this.state.isPublic}
          onRemoval={this.handleRemoval}
          onRefresh={this.getSongs}
        />
      </div>
    )
  }
}


export default PlaylistController;



const makePrivatePost = (selectedPlaylist) => {
  return(
    axios.post('http://localhost:8080/makePrivate', {
      plid: selectedPlaylist,
      withCredentials: true
    })
  )
}


const makePublicPost = (selectedPlaylist) => {
  return(
    axios.post('http://localhost:8080/makePublic', {
      plid: selectedPlaylist,
      withCredentials: true
    })
  )
}


const songsGet = (url) => {
  return(
    axios.get(url, {withCredentials: true})
  )
}

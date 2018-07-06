import React from 'react';
import SongSorter from './songSorter.js';
import axios from 'axios';


//PlaylistController is responsible for passing
//a subset of songs to be rendered based on
//the selected playlist.
class PlaylistController extends React.Component{
  state={
    songs: [],
    _loading: false,
    sortBy: 'date',
    ascDesc: 'desc'
  }


  getUrl = () => {

    if (window.location.pathname.length < 2){ return 'http://localhost:8080'+'/stream'; }
    else{ return 'http://localhost:8080'+window.location.pathname; }
  }

  getSongs = () => {
    this.setState({_loading: true});

    var url = this.getUrl(this.state.sortBy);

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


  handleRemoval = (songs) => {
    this.setState({songs: songs})
  }

  handleSortBy = (sortBy) => {
    this.setState({sortBy});
  }



  render(){
    return(
      <div>
        <SongSorter
          isPublic={this.props.isPublic}
          isOwner={this.props.isOwner}
          refreshCategories={this.props.refreshCategories}
          selectedPlaylist={this.props.selectedPlaylist}
          categories={this.props.categories}
          songs={this.state.songs}
          _loading={this.state._loading}
          onRemoval={this.handleRemoval}
          onRefresh={this.getSongs}
          onSortBy={this.handleSortBy}
        />
      </div>
    )
  }
}


export default PlaylistController;


const songsGet = (url) => {
  return(
    axios.get(url, {withCredentials: true})
  )
}

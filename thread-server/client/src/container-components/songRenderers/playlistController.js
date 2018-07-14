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
  }

  componentDidMount(){
    this.getSongs()
  }


  componentDidUpdate(prevProps){
    if(this.props.url != prevProps.url){
      this.getSongs();
    }
  }


  getUrl = () => {
    if (window.location.pathname.length < 2)
      return 'http://localhost:8080'+'/stream';
    else
      return 'http://localhost:8080'+window.location.pathname;
  }

  getSongs = (sortBy, descending) => {
    this.setState({_loading: true});

    var url = this.getUrl();
    var _sortBy = sortBy ? sortBy : 'dateUploaded';
    var _descending = descending ? 'ASC' : 'DESC';

    songsGet(url, _sortBy, _descending).then((result) => {
      this.setState({songs: result.data, _loading: false});
      this.props.onSetSongs(result.data);
    });
  }


  handleRemoval = (songs) => {
    this.setState({songs: songs})
  }

  handleSortBy = (sortBy, descending) => {
    this.getSongs(sortBy, descending);
  }



  render(){
    return(
      <div className="SongSorter">
        <SongSorter
          {...this.state}
          {...this.props}
          onRemoval={this.handleRemoval}
          onRefresh={this.getSongs}
          onSortBy={this.handleSortBy}
        />
      </div>
    )
  }
}


export default PlaylistController;


const songsGet = (url, sortBy, descending) => {
  return(
    axios.get(url, {
      params: {
        sortBy: sortBy,
        descending: descending
      },
      withCredentials: true
    })
  )
}

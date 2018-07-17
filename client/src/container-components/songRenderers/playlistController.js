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
    currentItem: 0,
    totalPages: 1
  }

  componentDidMount(){
    this.getSongs()
  }


  componentDidUpdate(prevProps){
    if(this.props.url !== prevProps.url){
      this.getSongs();
    }
  }


  getUrl = () => {
    if (window.location.pathname.length < 2)
      return 'https://thread-204819.appspot.com/stream';
    else
      return 'https://thread-204819.appspot.com'+window.location.pathname;
  }

  getSongs = (sortBy, descending) => {
    this.setState({_loading: true});

    var url = this.getUrl();
    var _currentItem = this.state.currentItem;
    var _sortBy = sortBy ? sortBy : 'dateUploaded';
    var _descending = descending ? 'ASC' : 'DESC';

    songsGet(url, _sortBy, _descending, _currentItem).then((result) => {
    
      this.setState({
        songs: result.data[0],
        _loading: false,
        totalPages: result.data[1][0] ? Math.ceil(result.data[1][0].count / 20) : 1});
      this.props.onSetSongs(result.data[0]);
    });
  }


  handleRemoval = (songs) => {
    this.setState({songs: songs})
  }

  handleSortBy = (sortBy, descending) => {
    this.getSongs(sortBy, descending);
  }

  handleSetCurrentItem = (currentItem) => {
    this.setState({currentItem}, () => this.getSongs());
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
          onSetCurrentItem={this.handleSetCurrentItem}

        />
      </div>
    )
  }
}


export default PlaylistController;


const songsGet = (url, sortBy, descending, currentItem) => {
  return(
    axios.get(url, {
      params: {
        sortBy: sortBy,
        descending: descending,
        currentItem: currentItem
      },
      withCredentials: true
    })
  )
}

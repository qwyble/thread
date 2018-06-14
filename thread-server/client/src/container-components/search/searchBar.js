import React from 'react';
import {Search, Label} from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class SearchBar extends React.Component{

  state={
    searchString: '',
    searchResults: {},
    _loading: false
  }



  handleSearchChange = (e) => {
    this.setState({_loading: true, searchString: e.target.value}, () => {
      axios({
        method: 'get',
        url: 'http://localhost:8080/getAllSearch/'+escape((this.state.searchString || '%'))
      }).then((result) => {
        var users = result.data.users.slice(0, 4);
        var playlists = result.data.playlists.slice(0, 4);
        var songs = result.data.songs.slice(0, 4);

        var results = {
          "users": {
            "name": "users",
            "results": users.map((user) => {
              return {
                "title": user.userName,
                key: user.idUsers,
                url: '/profile/'+user.idUsers
              }
            })
          },
          "playlists": {
            "name": "playlists",
            "results": playlists.map((playlist) => {
              return {
                "title": playlist.name || '',
                key: playlist.idplaylists,
                url: '/playlist/'+playlist.idplaylists

              }
            })
          },
          "songs": {
            "name": "songs",
            "results": songs.map((song) => {
              return {
                "title": song.title,
                "description": song.userName,
                key: song.idSongs,
                url: '/song/'+song.idSongs
              }
            })
          }
        }
        console.log(results);

        this.setState({searchResults: results, _loading: false});
      });

    });
  }


  render(){
    return(
      <Search
        fluid
        className='searchBar'
        category
        onSearchChange={this.handleSearchChange}
        value={this.state.searchString}
        loading={this.state._loading}
        results={this.state.searchResults}
        resultRenderer={resultRenderer}
        onSelectionChange={console.log('asdfasfd')}
      />
    )
  }
}


const resultRenderer = ({ title, url }) => <Label><Link to={url}>{title}</Link></Label>


export default SearchBar;

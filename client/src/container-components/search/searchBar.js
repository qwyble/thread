import React from 'react';
import {Search, Image} from 'semantic-ui-react';
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
        url: 'https://thread-204819.appspot.com/getAllSearch/'+escape((this.state.searchString || '%'))
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
                url: '/profile/'+user.idUsers,
                image: user.imageUrl
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
      />
    )
  }
}


const resultRenderer = ({ title, url, image }) =>
  <div>
    <Link to={url}>
      <Image className='searchImage' floated='left' circular size='mini' src={image} />
          {title}
    </Link>
  </div>


export default SearchBar;

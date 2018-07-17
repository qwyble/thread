import React from 'react';
import Users from '../../presentational-components/explorer/users.js'
import Songs from '../../presentational-components/explorer/songs.js'
import Playlists from '../../presentational-components/explorer/playlists.js'
import {Container, Grid, Header, Input} from 'semantic-ui-react';
import axios from 'axios';


class Explorer extends React.Component{
  state={
    users: [],
    songs: [],
    genres: [],
    playlists: [],
    _loading: false,
    searchString: '%'
  }

  componentDidMount(){
    this.setState({_loading: true});
    this.getSearch();
  }


  handleInputChange = (e) => {

    var searchString = (e.target.value.length < 1) ? '%' : e.target.value;
    this.setState({searchString: searchString, _loading: true}, () => {
      this.getSearch();
    })
  }


  getSearch = () => {
    axios({
      method: 'get',
      url: `https://thread-204819.appspot.com/getAllSearch/`+escape(this.state.searchString)
    }).then((result) => {
      this.setState({
        users: result.data.users,
        playlists: result.data.playlists,
        genres: result.data.genres,
        songs: result.data.songs,
        _loading: false
      })
    })
  }


  render(){
    return(
      <div>
        <Container>
          <Grid container columns={4}>
            <Grid.Row>
              <Input style={{width: '100%'}} onChange={this.handleInputChange} icon='search' placeholder='Search...' loading={this.state._loading}/>
            </Grid.Row>
            <Header>Users</Header>
            <Users users={this.state.users}/>
            <Header>Playlists</Header>
            <Playlists playlists={this.state.playlists}/>
            <Header>Songs</Header>
            <Songs songs={this.state.songs} />
            <Header>Genres</Header>


          </Grid>
        </Container>
      </div>

    )
  }
}
export default Explorer;

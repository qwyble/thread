import React from 'react';
import {Header, Container, Grid} from 'semantic-ui-react';
import axios from 'axios';


class SongDetails extends React.Component{

  state={
    song: {}
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:8080/getSong',
      params: {
        songId: this.props.match.params.song
      }
    }).then(result => this.setState({song: result.data[0]}))
  }

  render(){
    var song = this.state.song;
    return(
      <div>
        <Container
          className='songInfoContainer'>
          <Grid
            verticalAlign='middle'
            stretched
            textAlign='center'
            colums={4}>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header>Title</Header>
                {song.title}
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>Uploader</Header>
                {song.owner}
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>Included in _ Playlists</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>Description</Header>
                {song.description}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default SongDetails;

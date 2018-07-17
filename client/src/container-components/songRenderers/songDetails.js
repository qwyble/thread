import React from 'react';
import {Header, Container, Grid, Icon} from 'semantic-ui-react';
import axios from 'axios';
import {AppContext} from '../../appUtilities/context.js';
import PlaylistPortal from './playlistPortal.js';


class SongDetails extends React.Component{

  state={
    song: {},
    playing: false
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getSong',
      params: {
        songId: this.props.match.params.song
      }
    }).then(result => this.setState({song: result.data[0]}))
  }

  handleToggle = () => {
    if(this.state.playing) this.setState({playing: false});
    else this.setState({playing: true});
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
              <Grid.Column width={2}>

                <AppContext.Consumer>{(context) => (
                  <Icon size='huge' name={this.state.playing ? 'pause' : 'play'} onClick={() => {context.onPlaying(song); this.handleToggle()}} />
                )}
              </AppContext.Consumer>


            </Grid.Column>
              <Grid.Column width={4}>
                <Header>Title</Header>
                {song.title}
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>Uploader</Header>
                {song.userName}
              </Grid.Column>
              <Grid.Column width={4}>
                <Header>Included in {song.playlists} Playlist(s)</Header>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column stretched>
                <Header>Description</Header>
                {song.description}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <PlaylistPortal selectedSongs={[song.idSongs]}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default SongDetails;

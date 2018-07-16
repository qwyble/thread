import React from 'react';
import {Button, Icon, Grid, Popup, Menu} from 'semantic-ui-react'



class AudioPlayer extends React.Component{

  render(){
    return(
      <div className="audioContainer">

        <audio
          className="audioContainer" id='audio' ref={this.props.myRef}
          controls="" src={this.props.URL} autoPlay onEnded={this.props.onEnd}
        >
        </audio>


          <Grid className='playerGrid'>
            <Grid.Row>
              <Grid.Column width={1}>
                <div style={{}}>
                  <Popup
                    trigger={<Icon name='list'/>}
                    inverted hoverable style={{
                      backgroundColor: 'rgba(255,255,255, .05)',

                    }}>
                    <Menu vertical size='mini' compact inverted style={{
                      backgroundColor: 'rgba(0,0,0, .6)',
                      overflowY: 'scroll',
                      height: '200px'}}>
                      {this.props.songs.map((song, i) => (
                        <Button key={i} size='mini' fluid
                          inverted color='blue'
                          active={(song.idSongs === this.props.nowPlaying.idSongs)}
                          onClick={() => this.props.onPlaying(song)}
                          >
                            {song.title}
                          </Button>
                        ))}
                      </Menu>
                    </Popup>
                    {this.props.nowPlaying.title}
                </div>

              </Grid.Column>
                  <Grid.Column width={2}>

                    <Button inverted color='blue' icon='angle double left' onClick={this.props.skipBack}/>

                    <Button size='mini' inverted color='blue'
                      icon={this.props._icon}
                      onClick={this.props.onClick}>
                    </Button>

                    <Button inverted color='blue' icon='angle double right' onClick={this.props.onEnd}/>

                  </Grid.Column>


                  <Grid.Column>
                    {this.props.currentTime} / {this.props.duration}
                  </Grid.Column>


                  <Grid.Column className='playerCol' width={9}>
                    <input type='range' min='1' max='100' value={this.props.percentPlayed} className='songslider' onChange={this.props.onSongPosition}/>
                  </Grid.Column>



              <Grid.Column width={2}>

                <Popup trigger={<Icon name='volume up' />} hoverable style={{backgroundColor: 'rgba(0,0,0, .2)', borderStyle: 'none'}}>

                    <input
                      orient='vertical' type="range"
                      min="0" max="100"
                      value={this.props.volume * 100}
                      onChange={this.props.onVolume}
                      className="slider" id="myRange"
                    />

                </Popup>

              </Grid.Column>
            </Grid.Row>
          </Grid>

      </div>
    )
  }
}

export default AudioPlayer;

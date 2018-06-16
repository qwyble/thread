import React from 'react';
import {Button, Icon, Progress, Grid, Container} from 'semantic-ui-react'



class AudioPlayer extends React.Component{

  render(){
    return(
      <div className="audioContainer">
        <audio
          className="audioContainer" id='audio' ref={this.props.myRef}
          controls="" src={this.props.URL} autoPlay onEnded={this.props.onEnd}
          volume={this.props.volume}
        >
        </audio>
        <Container >
          <Grid className='playerGrid'>
            <Grid.Row className='playRow'>
              <Grid.Column width={1}>
                <Button size='mini' inverted color='blue'
                  id='pButton' icon={this.props._icon}
                  onClick={this.props.onClick}></Button>
              </Grid.Column>
              <Grid.Column className='playerCol' width={13}>
                <Progress percent={String(this.props.percentPlayed)} className='progress'
                  style={{marginTop: '10px', maxHeight: '10%'}} inverted color='blue'
                />
                {this.props.currentTime} / {this.props.duration}
              </Grid.Column>
              <Grid.Column>
                <div className="slidecontainer">
                  <input type="range" min="0" max="100" value={this.props.volume * 100} onChange={this.props.onVolume} className="slider" id="myRange" />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default AudioPlayer;

import React from 'react';
import {Button, Icon, Progress, Grid, Container} from 'semantic-ui-react'



class AudioPlayer extends React.Component{

  render(){
    console.log(this.props.volume);
    return(
      <div className="audioContainer">

        <audio
          className="audioContainer" id='audio' ref={this.props.myRef}
          controls="" src={this.props.URL} autoPlay onEnded={this.props.onEnd}
          volume={this.props.volume}
        >
        </audio>


          <Grid className='playerGrid'>
            <Grid.Row>
              <Grid.Column width={3}>

                <Button inverted color='blue' icon='angle double left' onClick={this.props.skipBack}/>

                <Button size='mini' inverted color='blue'
                   icon={this.props._icon}
                  onClick={this.props.onClick}>
                </Button>

                <Button inverted color='blue' icon='angle double right' onClick={this.props.onEnd}/>

              </Grid.Column>
              <Grid.Column className='playerCol' width={11}>
                <Progress percent={String(this.props.percentPlayed)} className='progress'
                  style={{marginTop: '10px', maxHeight: '10%'}} inverted color='blue'
                />
                {this.props.currentTime} / {this.props.duration}
              </Grid.Column>
              <Grid.Column width={2}>

                <div className="slidecontainer">
                  <input type="range" min="0" max="100" value={this.props.volume * 100} onChange={this.props.onVolume} className="slider" id="myRange" />
                </div>

              </Grid.Column>
            </Grid.Row>
          </Grid>
    
      </div>
    )
  }
}

export default AudioPlayer;

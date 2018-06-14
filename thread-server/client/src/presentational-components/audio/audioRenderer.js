import React from 'react';
import {Button, Icon, Progress, Grid, Container} from 'semantic-ui-react'



class AudioRenderer extends React.Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();

    this.state={
      percentPlayed: '0',
      currentTime: '',
      _icon: '',
      volume: .5
    }
  }


  static getDerivedStateFromProps(props, state){
    if(props.paused){
      return{
        _icon: "play",
        paused: true
      }
    }else{
      return{
        _icon: "pause",
        paused: false
      }
    }
  }


  componentDidMount() {
    this.interval = setInterval(() => this.getCurrentTime(), 300);
  }


  componentDidUpdate(prevProps) {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.getCurrentTime(), 300);
    if(prevProps.paused !== this.props.paused){
      if(this.state.paused){
        this.handlePause()
      }else{
        this.handlePlay();
      }
    }
  }


  componentWillUnmount(){
    clearInterval(this.interval);
  }


  handlePlay = () => {
    this.myRef.current.play();
  }

  handlePause = () => {
    this.myRef.current.pause();
    clearInterval(this.interval);
  }

  handleClick = () => {
    this.props.onAudioButton();
  }

  handleVolume = (e) => {
    var volume = e.target.value / 100;
    this.setState({volume})
  }

  getMinSec= (time) =>{
    var currentTime = Math.round(time);
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime % 60;
    currentTime = minutes+':'+seconds;
    return currentTime;
  }

  getCurrentTime = () => {
    var currentTime = this.getMinSec(this.myRef.current.currentTime);
    var duration = this.getMinSec(this.myRef.current.duration);
    var percentPlayed = String((((this.myRef.current.currentTime + 1) / (this.myRef.current.duration+1)) * 100));
    this.setState({percentPlayed, currentTime, duration});
  }

  render(){
    return(
      <div className="audioContainer">
        <audio
          className="audioContainer" id='audio' ref={this.myRef}
          controls="" src={this.props.song.URL} autoPlay onEnded={this.props.onEnd}
          volume={this.state.volume}
        >
        </audio>
        <Container >
          <Grid className='playerGrid'>
            <Grid.Row className='playRow'>
              <Grid.Column width={1}>
                <Button size='mini' inverted color='blue'
                  id='pButton' icon={this.state._icon}
                  onClick={this.handleClick}></Button>
              </Grid.Column>
              <Grid.Column className='playerCol' width={13}>
                <Progress percent={String(this.state.percentPlayed)} className='progress'
                  style={{marginTop: '10px', maxHeight: '10%'}} inverted color='blue'
                />
                {this.state.currentTime} / {this.state.duration}
              </Grid.Column>
              <Grid.Column>
                <div className="slidecontainer">
                  <input type="range" min="0" max="100" value={this.state.volume * 100} onChange={this.handleVolume} className="slider" id="myRange" />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default AudioRenderer;

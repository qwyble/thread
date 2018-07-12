import React from 'react';
import {Button, Icon, Progress, Grid, Container} from 'semantic-ui-react'
import AudioPlayer from './audioPlayer.js';



class AudioRenderer extends React.Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();

    this.state={
      percentPlayed: '0',
      duration: '0',
      currentTime: '0',
      volume: .5
    }
  }



  componentDidUpdate(prevProps) {
    if(prevProps.paused !== this.props.paused){
      if(this.interval) clearInterval(this.interval);
      if(this.props.paused){
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
    this.interval = setInterval(() => this.getCurrentTime(), 300);
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
    if(duration === 'NaN:NaN'){
      percentPlayed = '0';
      duration = '0';
      currentTime= '0';
    }

    this.setState({percentPlayed, currentTime, duration});
  }

  render(){
    return(
      <AudioPlayer
        myRef={this.myRef}
        URL={this.props.song.URL}
        onEnd={this.props.onEnd}
        skipBack={this.props.skipBack}
        volume={this.state.volume}
        _icon={this.props.paused ? 'play' : 'pause'}
        onClick={this.handleClick}
        percentPlayed={this.state.percentPlayed}
        currentTime={this.state.currentTime}
        duration={this.state.duration}
        onVolume={this.handleVolume}
      />
    )
  }
}

export default AudioRenderer;

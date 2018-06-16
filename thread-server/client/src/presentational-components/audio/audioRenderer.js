import React from 'react';
import {Button, Icon, Progress, Grid, Container} from 'semantic-ui-react'
import AudioPlayer from './audioPlayer.js';



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
      <AudioPlayer
        myRef={this.myRef}
        URL={this.props.song.URL}
        onEnd={this.props.onEnd}
        volume={this.state.volume}
        _icon={this.state._icon}
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

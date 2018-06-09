import React from 'react';


class AudioRenderer extends React.Component{
  render(){
    return(
      <div className="audioContainer">
        <audio
          className="audioContainer" id='nowPlaying'
          controls src={this.props.song.URL} autoPlay onEnded={this.props.onEnd}>
        </audio>
      </div>
    )
  }
}

export default AudioRenderer;

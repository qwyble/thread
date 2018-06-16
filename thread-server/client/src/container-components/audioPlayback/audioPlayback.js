import React from 'react';
import AudioRenderer from '../../presentational-components/audio/audioRenderer'
import AppProvider from '../../context.js';

class AudioPlayback extends React.Component{


  render(){
    return(
      <AudioRenderer
        onEnd={this.props.onEnd}
        song={this.props.nowPlaying}
        paused={this.props.paused}
        onAudioButton={this.props.onPausing}
      />
    )
  }
}
export default AudioPlayback;

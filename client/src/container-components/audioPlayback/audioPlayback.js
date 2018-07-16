import React from 'react';
import AudioRenderer from '../../presentational-components/audio/audioRenderer'
import {AppContext} from '../../appUtilities/context.js';

class AudioPlayback extends React.Component{


  render(){
    return(
      <AppContext.Consumer>
        {context =>
          <AudioRenderer
            onEnd={context.onEnd}
            song={context.nowPlaying}
            paused={context.paused}
            onAudioButton={context.onPausing}
            skipBack={context.skipBack}
            songs={context.songs}
            nowPlaying={context.nowPlaying}
            onPlaying={context.onPlaying}
          />
        }
      </AppContext.Consumer>
    )
  }
}
export default AudioPlayback;

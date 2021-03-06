import React from 'react';

const AppContext = React.createContext();


//context controls audio playback and
//isOwner for modifying views based on whether
//the user owns the view.

class AppProvider extends React.Component{
  state = {
    songs: [],
    nowPlaying: {},
    paused: true,
  }



  handleSetSongs = (songs) => {
    this.setState({songs});
  }

  handlePlaying = (song) => {
    this.setState({
      nowPlaying: song,
      paused: false});
  }

  handlePausing = () => {
    if(this.state.paused){ this.handlePlaying(this.state.nowPlaying); }
    else{ this.setState({paused: true}) }
  }


  handleEnd = () => {
    var currentId = this.state.nowPlaying.idSongs;
    var index = this.state.songs.findIndex(function(song){ return song.idSongs === currentId; });
    var nextSong = this.state.songs[index+1];

    if(nextSong){ this.handlePlaying(nextSong); }
    else{ return }
  }

  handleSkipBack = () => {
    var currentId = this.state.nowPlaying.idSongs;
    var index = this.state.songs.findIndex(function(song){ return song.idSongs === currentId; });

    var prevSong = this.state.songs[index-1];

    if(prevSong){ this.handlePlaying(prevSong); }
    else{ this.handlePlaying(this.state.nowPlaying)}
  }


  render() {
    const handlers = {
      onPlaying: this.handlePlaying,
      onEnd: this.handleEnd,
      onPausing: this.handlePausing,
      onSetSongs: this.handleSetSongs,
      skipBack: this.handleSkipBack
    }

    return (
      <AppContext.Provider value={{...this.state, ...handlers}}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export {
  AppProvider,
  AppContext
};

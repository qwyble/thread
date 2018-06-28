import React from 'react';

const AppContext = React.createContext();



class AppProvider extends React.Component{
  state = {
    user: this.props.user,
    songs: [],
    nowPlaying: {},
    ended: false,
    paused: true,
    isOwner: false,
    owner: ''
  }


  static getDerivedStateFromProps(props, state){
    return {user: props.user}
  }

  handleSetOwner = (owner) => {
    var isOwner = (owner.idUsers === this.state.user.idUsers);
    if (owner !== this.state.owner){
      this.setState({owner, isOwner});
    }
  }

  handleSetSongs = (songs) => {
    this.setState({songs});
  }

  handlePlaying = (song) => {
    this.setState({
      nowPlaying: song,
      ended: false,
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


  render() {
    const handlers = {
      onPlaying: this.handlePlaying,
      onEnd: this.handleEnd,
      onPausing: this.handlePausing,
      onSetSongs: this.handleSetSongs,
      onSetOwner: this.handleSetOwner
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

import React from 'react';

const AppContext = React.createContext();



class AppProvider extends React.Component{
  state = {
    user: this.props.user,
    songs: [],
    nowPlaying: {},
    ended: false,
    paused: true,
  }
  componentDidMount(){
    this.setState({
      user: this.props.user,
    });
  }

  static getDerivedStateFromProps(props, state){
    return {user: props.user}
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
      onSetSongs: this.handleSetSongs
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

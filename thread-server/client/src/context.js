import React from 'react';

const AppContext = React.createContext();



class AppProvider extends React.Component{
  state = {
    user: this.props.user,
    songs: [],
    nowPlaying: {},
    ended: false,
    paused: false,
    onPlaying: '',
    onEnd: '',
    onPausing: '',
    onSetSongs: ''
  }
  componentDidMount(){
    this.setState({
      user: this.props.user,
      onPlaying: this.handlePlaying,
      onEnd: this.handleEnd,
      onPausing: this.handlePausing,
      onSetSongs: this.handleSetSongs
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

  //handleEnd = () => { this.setState({ended: true}); }

  handleEnd = () => {
    var currentId = this.state.nowPlaying.idSongs;
    var index = this.state.songs.findIndex(function(song){ return song.idSongs === currentId; });
    var nextSong = this.state.songs[index+1];

    if(nextSong){ this.handlePlaying(nextSong); }
    else{ return }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export {
  AppProvider,
  AppContext
};

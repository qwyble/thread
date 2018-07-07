import React from 'react';

const AppContext = React.createContext();


//context controls audio playback and
//isOwner for modifying views based on whether
//the user owns the view.

class AppProvider extends React.Component{
  state = {
    user: '',
    songs: [],
    nowPlaying: {},
    ended: false,
    paused: true,
    isOwner: true,
    owner: '',
  }


  componentDidUpdate(){
    if (!this.state.user){
      this.setState({user: this.props.user});
    }
    if (!this.state.owner){
      this.setState({owner: this.props.user})
    }
  }


  handleSetOwner = (owner) => {
    if (owner !== this.state.owner){
      var isOwner = (owner.idUsers === this.state.user.idUsers);
      console.log(owner, this.state.user.idUsers);
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

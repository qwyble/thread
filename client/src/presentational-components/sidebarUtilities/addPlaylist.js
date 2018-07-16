import React from 'react';
import {Button, Icon } from 'semantic-ui-react';
import RenderAddPlaylist from './renderAddPlaylist.js';

/* renders either 'add playlist' button
or form to add playlist */
class AddPlaylist extends React.Component{

  state = {
    openForm: false,
    toggleSubmit: true,
    playlistToAdd: ''
  }

  handleOpenForm = () => {
    if(this.state.openForm){ this.setState({openForm: false}) }
    else{ this.setState({openForm: true}); }
  }

  handleInputChange = (e) => {
    if(e.target.value.length > 2){
      this.setState({
        ...this.state,
        playlistToAdd: e.target.value,
        toggleSubmit: false
      });
    }
    else{
      this.setState({
        ...this.state,
        playlistToAdd: e.target.value,
        toggleSubmit: true
      });
    }
  }

  render(){
    return(
      <div>
        <Button
          className='button2'
          inverted fluid color='blue'
          size='mini'
          onClick={this.handleOpenForm}
        >
          <Icon name={this.state.openForm ? 'minus' : 'plus'}/>
          Playlist
        </Button>

          <div>
            <RenderAddPlaylist
              openForm={this.state.openForm}
              toggleSubmit={this.state.toggleSubmit}
              onOpenForm={this.handleOpenForm}
              onInputChange={this.handleInputChange}
              onFormSubmit={this.props.onFormSubmit}
              playlistToAdd={this.state.playlistToAdd}
            />
          </div>

      </div>

    )
  }
}

export default AddPlaylist;

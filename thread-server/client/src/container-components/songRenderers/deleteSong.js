import React from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';


class DeleteSongs extends React.Component{

  handleDeleteSongs = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteSongs',
      data: {
        songIds: this.props.selectedSongs
      },
      withCredentials: true
    }).then(() => this.props.onRefresh());
  }


  render(){
    return(
      <Button size='mini' onClick={this.handleDeleteSongs} disabled={(this.props.selectedSongs.length < 1)}>
        Delete Song(s)
      </Button>
    )
  }
}


export default DeleteSongs;

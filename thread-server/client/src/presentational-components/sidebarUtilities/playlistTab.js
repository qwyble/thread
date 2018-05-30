import React from 'react';
import {Button, Icon, List} from 'semantic-ui-react';


class PlaylistTab extends React.Component{
  render(){
    return(
      <div>
        <Button value={this.props.playlist} onClick={this.props.onSelectPlaylist}>
        {this.props.playlist}
        </Button>
        <Button size='mini' floated='right' className='trashcan' inverted icon
          id={this.props.id}
          onClick={this.props.onDeleteList}>
          <Icon size='small' name='trash'/>
        </Button>
      </div>
    )
  }
}


export default PlaylistTab;

import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class PlaylistTab extends React.Component{
  render(){
    return(
      <div>
        <Link to={`/playlist/${this.props.id}`} >
          <Button
            size='mini' inverted color='blue'
            className='playlistButton'
            value={this.props.id}
            ispublic={this.props.isPublic}
            onClick={this.props.onSelectPlaylist}
          >
            {this.props.playlist}
          </Button>
        </Link>

        {
          this.props.isOwner ? 
          <Button
            size='mini' floated='right'
            className='trashcan' inverted icon
            id={this.props.id}
            name={this.props.playlist}
            onClick={this.props.onDeleteList}>
            <Icon size='small' name='trash'/>
          </Button>
          :<div></div>
        }

      </div>
    )
  }
}


export default PlaylistTab;

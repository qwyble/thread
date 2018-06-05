import React from 'react';
import {Button, Icon} from 'semantic-ui-react';


class PlaylistTab extends React.Component{
  render(){
    return(
      <div>
        
        {this.props.playlist}

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

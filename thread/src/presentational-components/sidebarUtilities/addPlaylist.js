import React from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';

/* renders either 'add playlist' button
or form to add playlist */
class AddPlaylist extends React.Component{

  render(){
    return(
      <div>
        <Button
          className='button2'
          inverted fluid color='blue'
          size='mini'
          icon
          onClick={this.props.onOpenForm}>
          <Icon name={this.props.openForm ? 'minus' : 'plus'}/>
        </Button>
            {this.props.openForm ?
              <div>
                <Form onSubmit={this.props.onFormSubmit}>
                  <Input
                    size='mini'
                    placeholder='watcha feelin?'
                    value={this.props.playlistToAdd}
                    onChange={this.props.onInputChange}>
                  </Input>
                  <Button size='mini' disabled={this.props.toggleSubmit}>
                    Add Playlist
                  </Button>
                </Form>
              </div>
              :
              <div></div>
            }
        </div>

    )
  }
}

export default AddPlaylist;

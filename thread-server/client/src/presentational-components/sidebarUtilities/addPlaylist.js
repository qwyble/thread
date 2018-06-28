import React from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';

/* renders either 'add playlist' button
or form to add playlist */
class AddPlaylist extends React.Component{

  state = {
    openForm: false,
    toggleSubmit: true,
    playListToAdd: ''
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
          icon
          onClick={this.handleOpenForm}
        >
          <Icon name={this.state.openForm ? 'minus' : 'plus'}/>
        </Button>
        {this.state.openForm ?
          <div>
            <Form onSubmit={() => {
              this.props.onFormSubmit(this.state.playlistToAdd);
              this.handleOpenForm();
            }}>
              <Input
                size='mini'
                placeholder='watcha feelin?'
                value={this.props.playlistToAdd}
                onChange={this.handleInputChange}>
              </Input>
              <Button size='mini' disabled={this.state.toggleSubmit}>
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

import React from 'react';
import {TransitionablePortal, Segment, Input, Form, Button} from 'semantic-ui-react';


/* renders options to delete, share, and rename the category or playlist */
class ListOptions extends React.Component{
  state = {
    openPortal: false,
    selectValue: '',
    renamePrompt: false,
    newName: '',
  }


  handleOpen = () => {
    this.setState({openPortal: true, selectValue: ''});
  }


  handleClose = () => {
    this.setState({openPortal: false});
  }


  handleCategoryDelete = (e) => {
    if(window.confirm("Are you sure you want to delete the "+this.props.catName+" playlist category? \nThese playlists will be lost.")){
      this.props.onCategoryDelete(this.props.id);
    }
    this.setState({selectValue: ''});
  }


  handleRenameChange = (e) => {
    this.setState({newName: e.target.value})
  }


  handleRenameSubmit = () => {
    this.props.onCategoryEditSubmit(this.props.id, this.props.catName, this.state.newName);
  }


  render(){
    return(
      <div>
        <select className='dropOverlay' value={this.state.selectValue}>
          <option value=''></option>
          <option value='rename' onClick={this.handleOpen}>rename</option>
          <option value='share'>share</option>
          <option value='delete' onClick={this.handleCategoryDelete}>delete</option>
        </select>
        <TransitionablePortal  onClose={this.handleClose} open={this.state.openPortal}>
          <Segment style={{ left: '15%', width: '14%', position: 'fixed', top: '10%', zIndex: 1000 }}>
            <p>Enter a new name:</p>
            <Form onSubmit={this.handleRenameSubmit}>
              <Input style={{width: '100%'}}type='text' value={this.state.newName} onChange={this.handleRenameChange}/>
              <Button type='submit' onClick={this.handleClose}>Ok</Button>
            </Form>
          </Segment>
        </TransitionablePortal>
      </div>
    )
  }
}

export default ListOptions;

import React from 'react';
import {TransitionablePortal, Segment, Input, Form, Button, Dropdown} from 'semantic-ui-react';


/* renders options to delete, share, and rename the category or playlist */
class ListOptions extends React.Component{
  state = {
    openPortal: false,
    selectValue: '',
    renamePrompt: false,
    newName: '',
  }

  static getDerivedStateFromProps(props, state){
    if (props.err){
      return {openPortal: true}
    } else {
      return {openPortal: false}
    }
  }


  handleOpen = () => {
    this.setState({openPortal: true, selectValue: ''});
  }


  handleClose = () => {
    this.setState({openPortal: false});
  }


  handleCategoryDelete = () => {
    if(window.confirm("Are you sure you want to delete the "+this.props.catName+" playlist category? \nThese playlists will be lost.")){
      this.props.onCategoryDelete(this.props.id);
    }
    this.setState({selectValue: ''});
  }


  handleRenameChange = (e) => {
    this.setState({newName: e.target.value})
  }

  handleRenameSubmit = () => {
    this.props.onCategoryRename(this.props.catName, this.props.id, this.state.newName);
  }

  handleDropdownChange = (e, d) => {
    var val = d.value;
    if(val === 'delete'){
      this.handleCategoryDelete();
    }else if(val === 'rename'){
      this.handleOpen()
    }
  }


  render(){
    const options = [
      {key: 0, text: '', value: ''},
      {key: 1, text: 'rename', value: 'rename'},
      {key: 2, text: 'share', value: 'share'},
      {key: 3, text: 'delete', value: 'delete'}
    ]

    return(
      <div>
        <Dropdown
          className='dropOverlay icon'
          text=' '
          icon='ellipsis vertical'
          value={this.state.selectValue}
          options={options}
          onChange={this.handleDropdownChange} />
        <TransitionablePortal  onClose={this.handleClose} open={this.state.openPortal}>
          <Segment style={{ left: '15%', width: '14%', position: 'fixed', top: '10%', zIndex: 1000 }}>
            <p>Enter a new name:</p>
            <Form onSubmit={this.handleRenameSubmit}>
              <Input style={{width: '100%'}}type='text' value={this.state.newName} onChange={this.handleRenameChange}/>
              {this.props.err}
              <Button type='submit' >Ok</Button>
            </Form>
          </Segment>
        </TransitionablePortal>
      </div>
    )
  }
}

export default ListOptions;

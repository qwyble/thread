import React from 'react';
import axios from 'axios';
import {Dropdown, Portal, Button, Loader, Segment, Input} from 'semantic-ui-react';



class ClonePortal extends React.Component{

  state={
    plToClone: '',
    selectedCatId: '',
    selectedCatName: '',
    plname: '',
    _loading: false,
    err: '',
    _disabled: true,
    success: false
  }


  static getDerivedStateFromProps(props, state){
    return { plToClone: props.selectedPlaylist }
  }


  handleInputChange = (e) => {
    var plname = e.target.value;
    this.setState({plname: plname}, () => {
      this.validateInput();
    });
  }

  validateInput = () => {
    if(this.state.plname.length < 2){
      this.setState({
        err: 'playlist name must be at least two characters',
        _disabled: true
      });
    }else if(!this.state.selectedCatId){
      this.setState({err: 'you must selected a category', _disabled: true});
    }else{
      this.setState({err: '', _disabled: false});
    }
  }

  handleCatSelect = (e, d) => {
    this.setState({selectedCatId: d.value, selectedCatName: d.text}, () => {this.validateInput()})
  }

  handleClonePlaylist = () => {
    this.setState({_loading: true});
    axios.post('http://localhost:8080/clonePlaylist',{
      selectedCat: this.state.selectedCatId,
      plToClone: this.state.plToClone,
      plname: this.state.plname},
      {withCredentials: true}
    ).then((result) => {
      this.setState({_loading: false, success: true});
      this.props.refreshCategories();
    });
  }

  handlePortalClose = () => {
    this.setState({success: false});
  }


  render(){
    return(
      <Portal onClose={this.handlePortalClose} trigger={<Button onClick={this.getUserCats} size='mini' content="Clone Playlist"/>} >
          <Segment style={{ width: '200px', position: 'fixed', left: '15%', bottom:'10%'}}>
            {this.state._loading ? <Loader active={true} /> : <div></div>}
            {this.state.plToClone ?

              <div>
                {this.state.success ? <div>Playlist successfully cloned.</div> :
                  <div>
                    <Segment>
                      <Dropdown text={this.state.selectedCatName || 'Select Category: '}>
                        <Dropdown.Menu>
                          {this.props.categories.map((cat, i) =>
                            <Dropdown.Item
                              key={i}
                              onClick={this.handleCatSelect}
                              value={cat.catid}
                              text={cat.catname}
                            />
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Segment>
                    <div>
                      Enter a new playlist name:
                    </div>
                    <Segment>
                      <Input size='mini' onChange={this.handleInputChange} />
                    </Segment>
                      <Button
                        disabled={this.state._disabled}
                        onClick={this.handleClonePlaylist}>
                        Submit
                      </Button>
                  </div>
                }
              </div>:
              <div>You must selected a playlist, you cannot clone a stream.</div>
            }
            {this.state.err ?
              <div> {this.state.err} </div>
              : <div></div>}
            </Segment>
      </Portal>
    )
  }
}

export default ClonePortal;

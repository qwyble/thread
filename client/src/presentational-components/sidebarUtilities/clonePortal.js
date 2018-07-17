import React from 'react';
import axios from 'axios';
import {Dropdown, Button, Loader, Segment, Input} from 'semantic-ui-react';



class ClonePortal extends React.Component{

  state={
    plToClone: '',
    categories: [],
    selectedCatId: '',
    selectedCatName: '',
    plname: '',
    _loading: false,
    err: '',
    _disabled: true,
    success: false
  }


  static getDerivedStateFromProps(props, state){
    if(props.selectedPlaylist !== state.selectedPlaylist){
      return { plToClone: props.selectedPlaylist }
    } else return {}
  }

  componentDidMount(){
    this.getUserCats();
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
    axios.post('https://thread-204819.appspot.com/clonePlaylist',{
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

  getUserCats = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getCatsOnly',
      withCredentials: true
    }).then(result => this.setState({categories: result.data, _loading:false}));
  }


  render(){

    return(

          <Segment inverted style={{ width: '200px', position: 'fixed', left: '15%', bottom:'10%'}}>
            {this.state._loading ? <Loader active={true} /> : <div></div>}
            {this.state.plToClone ?

              <div>
                {this.state.success ? <div>Playlist successfully cloned.</div> :
                  <div>
                    <Segment>
                      <Dropdown text={this.state.selectedCatName || 'Select Category: '}>
                        <Dropdown.Menu>
                          {this.state.categories.map((cat, i) =>
                            <Dropdown.Item
                              key={i}
                              onClick={this.handleCatSelect}
                              value={cat.idcategories}
                              text={cat.name}
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
              <div>You must select a playlist, you can't clone a stream.</div>
            }
            {this.state.err ?
              <div> {this.state.err} </div>
              : <div></div>}
            </Segment>

    )
  }
}

export default ClonePortal;

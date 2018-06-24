import React from 'react';
import AddPlaylist from '../../presentational-components/sidebarUtilities/addPlaylist.js';
import PlaylistTab from '../../presentational-components/sidebarUtilities/playlistTab.js';
import ListOptions from './listOptions.js';
import {Button, Icon, Menu, Loader} from 'semantic-ui-react';
import axios from 'axios';

/* renders the playlists in a single category,
  holds the playlists in state. (change this?)
*/

class Playlists extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playlists: [],
      playlistToAdd: '',
      renderAlert: false,
      displayLists: false,
      openForm: false,
      toggleSubmit: true,
      _loading: false
    }
  }

  componentDidMount(){
    var playlists = this.props.playLists;
    this.setState({playlists: playlists})
  }

  static getDerivedStateFromProps(props, state){
    return { playlists: props.playLists, _loading: false}
  }


  handleInputChange = (e) => {
    if(e.target.value.length > 1){ this.setState({ ...this.state, playlistToAdd: e.target.value, toggleSubmit: false}); }
    else{ this.setState({ ...this.state, playlistToAdd: e.target.value, toggleSubmit: true}); }
  }

  getPlaylists = () => {
    this.props.getCats();
    this.setState({openForm: false});
  }

  handleAddList = () => {
    if(this.state.playlistToAdd.length > 1){
      this.setState({_loading: true});

      var data = {};
      data['catid'] = this.props.id;
      data['playlist'] = this.state.playlistToAdd;

      axios({
        method: 'post',
        url: 'http://localhost:8080/addPlaylist',
        data: data,
        withCredentials: true
      }).then((result) => this.getPlaylists());
    }
  }

  handleOpenForm = () => {
    if(this.state.openForm){ this.setState({openForm: false}) }
    else{ this.setState({openForm: true}); }
  }


  handleDisplayLists = () => {
    if(!this.state.displayLists){ this.setState({...this.state, displayLists: true}); }
    else{ this.setState({...this.state, displayLists: false}); }
  }


  handleDeleteList = (e) => {
    var id = parseInt(e.target.id, 10);
    this.setState((prevState) => ({
      playlists: prevState.playlists.filter((v, i) => v.plid !== id)
    }));

    var data = {};
    data['catid'] = this.props.id;
    data['plid'] = e.target.id;

    axios({
      method: 'post',
      url: 'http://localhost:8080/deletePlaylist',
      data: data,
      withCredentials: true
    }).then((result) => this.getPlaylists());
  }


  render(){
    return(
      <div>
        <div>
          <div>

            <Menu.Item className='sideBarItem'>
              <ListOptions
                id={this.props.id} catName={this.props.catName}
                onCategoryDelete={this.props.onCategoryDelete}
                onCategoryEditSubmit={this.props.onCategoryEditSubmit}
              />
              <Button className='button2' floated='right' icon inverted color='blue' size='mini' labelPosition='right'
                onClick={this.handleDisplayLists}>
                <Icon name={this.state.displayLists ?'down arrow' : 'right arrow'} />
                {this.props.catName}
              </Button>
            </Menu.Item>

            {this.state.renderAlert ? <div>Already exists</div> : <div></div>}

          </div>

          {this.state.displayLists ?
            <div>
              <Menu.Menu>
                {this.state.playlists.map((playlist, key) =>
                  <Menu.Item key={key} className='listSidebar'>
                      <PlaylistTab
                        playlist={playlist.plname} key={key}
                        id={playlist.plid} onDeleteList={this.handleDeleteList}
                        onSelectPlaylist={this.props.onSelectPlaylist}
                        isPublic={playlist.isPublic}
                      />
                  </Menu.Item>)
                }
                  {this.state._loading ?
                    <Menu.Item style={{padding: '1em 1em'}}>
                      <Loader active inverted size='mini'/>
                    </Menu.Item>
                      : <div></div>}
              </Menu.Menu>
            </div>
            : <span></span>
          }
        </div>

          {this.state.displayLists ?
            <div>
            <AddPlaylist
              openForm={this.state.openForm}
              toggleSubmit={this.state.toggleSubmit} onFormSubmit={this.handleAddList}
              onOpenForm={this.handleOpenForm} onInputChange={this.handleInputChange}
            />
            </div>
        : <div></div>}

      </div>
    )
  }
}


export default Playlists;

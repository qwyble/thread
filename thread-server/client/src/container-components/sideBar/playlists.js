import React from 'react';
import AddPlaylist from '../../presentational-components/sidebarUtilities/addPlaylist.js';
import PlaylistList from '../../presentational-components/sidebarUtilities/playlistList.js';
import EditCategories from './editCategories.js';
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
      renderAlert: false,
      displayLists: false,
      _loading: false
    }
  }


  static getDerivedStateFromProps(props, state){
    return { playlists: props.playLists, _loading: false}
  }


  getPlaylists = () => {
    this.props.getCats();
  }


  handleDisplayLists = () => {
    if(!this.state.displayLists){ this.setState({...this.state, displayLists: true}); }
    else{ this.setState({...this.state, displayLists: false}); }
  }


  handleAddList = (plToAdd) => {
    if(plToAdd.length > 1){
      this.setState({_loading: true});

      var data = {};
      data['catid'] = this.props.id;
      data['playlist'] = plToAdd;

      axios({
        method: 'post',
        url: 'http://localhost:8080/addPlaylist',
        data: data,
        withCredentials: true
      }).then((result) => this.getPlaylists());
    }
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

              <EditCategories
                getCats={this.props.getCats}
                id={this.props.id}
                catName={this.props.catName}
                categories={this.props.categories}
              />

              <Button
                className='button2'
                floated='right'
                icon inverted
                color='blue'
                size='mini'
                labelPosition='right'
                onClick={this.handleDisplayLists}
              >
                <Icon name={this.state.displayLists ?'down arrow' : 'right arrow'} />
                {this.props.catName}
              </Button>

            </Menu.Item>

            {this.state.renderAlert ? <div>Already exists</div> : <div></div>}

          </div>

          <PlaylistList
            displayLists={this.state.displayLists}
            playlists={this.state.playlists}
            _loading={this.state._loading}
            onSelectPlaylist={this.props.onSelectPlaylist}
            onDeleteList={this.handleDeleteList}
          />

        </div>

          {this.state.displayLists ?
            <div>
            <AddPlaylist onFormSubmit={this.handleAddList} />
            </div>
        : <div></div>}

      </div>
    )
  }
}


export default Playlists;

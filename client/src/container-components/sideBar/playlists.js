import React from 'react';
import AddPlaylist from '../../presentational-components/sidebarUtilities/addPlaylist.js';
import PlaylistList from '../../presentational-components/sidebarUtilities/playlistList.js';
import EditCategories from './editCategories.js';
import {Button, Icon, Menu } from 'semantic-ui-react';
import axios from 'axios';

/* renders the playlists in a single category,
  holds the playlists in state. (change this?)
*/

class Playlists extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      renderAlert: false,
      displayLists: false,
      _loading: false
    }
  }

  componentDidMount(){
    this.setState({displayLists: false});
  }


  getPlaylists = () => {
    this.props.getCats();
  }


  handleDisplayLists = () => {
    if(!this.state.displayLists){ this.setState({ displayLists: true}); }
    else{ this.setState({ displayLists: false}); }
  }


  handleAddList = (plToAdd) => {
    if(plToAdd.length > 1){
      this.setState({_loading: true});

      var data = {};
      data['catid'] = this.props.id;
      data['playlist'] = plToAdd;

      axios({
        method: 'post',
        url: 'https://thread-204819.appspot.com//addPlaylist',
        data: data,
        withCredentials: true
      }).then((result) => {
        this.getPlaylists()
        this.setState({_loading: false})
      });
    }
  }



  handleDeleteList = (e) => {
    this.setState({_loading: true});

    var data = {};
    data['catid'] = this.props.id;
    data['plid'] = e.target.id;

    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com//deletePlaylist',
      data: data,
      withCredentials: true
    }).then((result) => {
      this.getPlaylists();
      this.setState({_loading: false})
    });
  }


  render(){

    return(
      <div>
        <div>
          <div>

            <Menu.Item className='sideBarItem'>

              {
                this.props.isOwner ?
                <EditCategories
                  getCats={this.props.getCats}
                  id={this.props.id}
                  catName={this.props.catName}
                  categories={this.props.categories}
                />
                :<div></div>
              }

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
            isOwner={this.props.isOwner}
            displayLists={this.state.displayLists}
            playlists={this.props.playLists}
            _loading={this.state._loading}
            onSelectPlaylist={this.props.onSelectPlaylist}
            onDeleteList={this.handleDeleteList}
          />

        </div>

          {this.state.displayLists ?
            <div>
              {
                this.props.isOwner ?
                <AddPlaylist onFormSubmit={this.handleAddList} />
                : <div></div>
              }
            </div>
        : <div></div>}

      </div>
    )
  }
}


export default Playlists;

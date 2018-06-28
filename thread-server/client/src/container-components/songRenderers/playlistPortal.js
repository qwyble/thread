import React from 'react';
import {Portal, Button, Menu, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class PlaylistPortal extends React.Component{

  state={
    categories: [],
    _portalOpen: false,
    _loading: false,
  }

  getCats = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'http://localhost:8080/getPlaylists',
      withCredentials: true
    }).then((categories) => {
      var catpls = categories.data.cats;
      var cats = Object.values(
        catpls.reduce( (cats, {catname, catid, plname, plid, isPublic}) => {
          if (! (catid in cats) )
              cats[catid] = {catname, catid, pls: []};
          if (plid)
            cats[catid].pls.push({plname, plid, isPublic});
          return cats;
        }, {})
      )
      this.setState({categories: cats, _loading: false});
    });
  }

  handleAddToPlaylist = (e, data) => {
    this.setState({_portalOpen: false});
    axios({
      method: 'post',
      url: 'http://localhost:8080/addSongsToPlaylist',
      data: {
        songs: this.props.selectedSongs,
        playlist: data.value
      },
      withCredentials: true
    }).then((result) => this.props.resetSelectedSongs())

  }

  portalOpen = () => {
    if(!this.state._portalOpen) {
      this.setState({_portalOpen: true});
      this.getCats()
    }
    else this.setState({_portalOpen: false})
  }


  render(){
    return(
      <Portal open={this.state._portalOpen} trigger={
        <Button
          disabled={this.props._disabled}
          onClick={this.portalOpen}
          size='mini' >Add to Playlist
        </Button>
      } closeIcon>
        <Menu inverted size='mini'
          style={{ maxHeight: '30vh', overflow: 'auto',
          left: '22%', position: 'fixed', top: '50%', zIndex: 1000 }} >
          {this.state.categories.map((cat, key) => {
            return(
              <Menu.Item key={key}>
                {cat.catname}
                <Menu.Menu>
                  {cat.pls ?
                    cat.pls.map((pl, k) => {
                      return(
                          <Menu.Item
                            key={k}
                            link
                            value={pl.plid}
                            onClick={this.handleAddToPlaylist}>
                            {pl.plname}
                          </Menu.Item>
                      )
                    })
                    : <div></div>
                  }
                  </Menu.Menu>
                </Menu.Item>
              )
            })}
          </Menu>
      </Portal>
    )
  }
}

export default PlaylistPortal;

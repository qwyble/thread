import React from 'react';
import {Portal, Button, Menu, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class PlaylistPortal extends React.Component{

  state={
    categories: [],
    _loading: false,
  }

  getCats = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'http://localhost:8080/getPlaylists',
      withCredentials: true
    }).then((categories) => {
      var catpls = categories.data;
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




  render(){
    return(
      <Portal closeOnTriggerClick openOnTriggerClick trigger={
        <Button
          disabled={this.props._disabled}
          onClick={this.getCats}
          size='mini' >Add to Playlist
        </Button>
      } closeIcon>
      {this.props.err ? <div>{this.props.err}</div>:
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
                            onClick={this.props.onAddToPlaylist}>
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
        }
      </Portal>
    )
  }
}

export default PlaylistPortal;

import React from 'react';
import {Portal, Button, Menu, Icon} from 'semantic-ui-react';


class PlaylistPortal extends React.Component{
  render(){
    return(
      <Portal closeOnTriggerClick openOnTriggerClick trigger={
        <Button
          disabled={this.props._disabled}
          size='mini' >Add to Playlist
        </Button>
      } closeIcon>
      {this.props.err ? <div>{this.props.err}</div>:
        <Menu inverted size='mini'
          style={{ maxHeight: '30vh', overflow: 'auto',
          left: '22%', position: 'fixed', top: '50%', zIndex: 1000 }} >
          {this.props.categories.map((cat, key) => {
            return(
              <Menu.Item key={key}>
                {cat.catname}
                <Menu.Menu>
                  {cat.pls.map((pl, k) => {
                    return(
                      <Menu.Item
                        link key={k}
                        value={pl.plid}
                        onClick={this.props.onAddToPlaylist}>
                          {pl.plname}
                      </Menu.Item>
                      )
                    })}
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

import React from 'react';
import ClonePortal from './clonePortal.js';
import {Button} from 'semantic-ui-react';



class RenderClonePortal extends React.Component{

  state={
    openPortal: false,
  }

  openPortal = () => {
    if(this.state.openPortal) this.setState({openPortal: false});
    else this.setState({ openPortal: true });
  }


  render(){
      return(
        <span style={{display: 'inline-block'}}>
          <Button size='mini' inverted color='blue' onClick={this.openPortal}> Clone Playlist </Button>
          {this.state.openPortal ?
            <ClonePortal
              selectedPlaylist={this.props.selectedPlaylist}
              refreshCategories={this.props.refreshCategories}
            />
            : <div></div>
          }
        </span>
      )

  }
}


export default RenderClonePortal;

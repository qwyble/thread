import React from 'react';
import {Button, Icon, Table,} from 'semantic-ui-react';
import axios from 'axios';


class MakePublic extends React.Component{

  state = {
    isPublic: false
  }

  static getDerivedStateFromProps(props, state){
    if (props.isPublic !== state.isPublic){
      return {isPublic: props.isPublic}
    } else return {}
  }


  handleMakePublic = () => {
    changePublicity(this.props.selectedPlaylist, this.getUrl('makePublic'));
    this.setState({isPublic: true});
  }

  handleMakePrivate = () => {
    changePublicity(this.props.selectedPlaylist, this.getUrl('makePrivate'));
    this.setState({isPublic: false});
  }


  getUrl = (pub) => {
    return 'https://thread-204819.appspot.com/'+pub;
  }


  render(){

    var path = window.location.pathname;
    var publicity = (path !== '/stream' && this.props.isOwner)

    return(
      <Table.HeaderCell colSpan='1'>
        {publicity ?
          <div>
            {this.state.isPublic ?
              <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.handleMakePrivate}>
                <div><Icon name='privacy' /> Make Private </div>
              </Button>
              : <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.handleMakePublic}>
                <div><Icon name='user' /> Make Public </div>
              </Button>
            }
          </div>
          : <div></div>}
      </Table.HeaderCell>
    )
  }
}

export default MakePublic;




const changePublicity = (selectedPlaylist, url) => {
  return(
    axios.post(url, {
      plid: selectedPlaylist,
      withCredentials: true
    })
  )
}

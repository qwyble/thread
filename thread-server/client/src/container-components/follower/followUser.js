import React from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';


/*
renders if user is viewing a profile or playlist,
gets the user based on window location
*/
class FollowUser extends React.Component{
  state = {
    isOwner: false,
    isFollowing: false
  }

  static getDerivedStateFromProps(props, state){
    return { isOwner: props.isOwner }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.owner !== this.props.owner){
      this.getIsFollowing(this.props.user, this.props.owner);
    }
  }

  getIsFollowing = (user, owner) => {
    axios.get('http://localhost:8080/getIsFollowing', {
      params: {
        user: user,
        owner: owner
      }
    }).then((result) => {
      if(result.data.length === 0){
        this.setState({isFollowing: false});
      }else{
        this.setState({isFollowing: true});
      }
    })
  }


  handleFollow = () => {
    if(!this.state.isFollowing){
      this.setState({isFollowing: true});
      axios({
        method: 'post',
        url: 'http://localhost:8080/follow',
        data: {
          owner: this.props.owner
        },
        withCredentials: true
      }).then(() => this.getIsFollowing(this.props.user, this.props.owner))
    }else{
      this.setState({isFollowing: false});
      axios({
        method: 'post',
        url: 'http://localhost:8080/unfollow',
        data: {
          owner: this.props.owner
        },
        withCredentials: true
      })
    }
  }



  render(){
    return(
      <div style={{float: 'left'}}>
        {this.state.isOwner ? <div></div> :
          <Button size='mini' onClick={this.handleFollow}>
            {this.state.isFollowing ? <div>Unfollow</div> : <div>Follow</div>
            }
          </Button>}
      </div>
    )
  }
}

export default FollowUser;

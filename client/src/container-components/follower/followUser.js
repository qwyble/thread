import React from 'react';
import axios from 'axios';
import {Button, Loader} from 'semantic-ui-react';


/*
renders if user is viewing a profile or playlist,
gets the user based on window location
*/
class FollowUser extends React.Component{
  state = {
    isOwner: false,
    isFollowing: true,
    _loading: false
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.owner !== this.props.owner){
      this.getIsFollowing(this.props.user, this.props.owner);
    }
  }

  getIsFollowing = (user, owner) => {
    this.setState({_loading: true});
    axios.get('https://thread-204819.appspot.com/getIsFollowing', {
      params: {
        user: user,
        owner: owner
      }
    }).then((result) => {
      if(result.data.length === 0){
        this.setState({isFollowing: false, _loading: false});
      }else{
        this.setState({isFollowing: true, _loading: false});
      }
    })
  }


  handleFollow = () => {
    if(!this.state.isFollowing){
      this.setState({isFollowing: true});
      axios({
        method: 'post',
        url: 'https://thread-204819.appspot.com/follow',
        data: {
          owner: this.props.owner
        },
        withCredentials: true
      }).then(() => this.getIsFollowing(this.props.user, this.props.owner))
    }else{
      this.setState({isFollowing: false});
      axios({
        method: 'post',
        url: 'https://thread-204819.appspot.com/unfollow',
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
        {this.state._loading ? <Loader active /> :
          <div>
            {this.props.isOwner ? <div></div> :
              <Button size='mini' onClick={this.handleFollow}>
                {this.state.isFollowing ? <div>Unfollow</div> : <div>Follow</div>
                }
              </Button>
            }
          </div>
        }
      </div>
    )
  }
}

export default FollowUser;

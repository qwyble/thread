import React from 'react';
import axios from 'axios';
import ProfileEditor from './profileEditor';
import ProfileViewer from '../../presentational-components/profile/profileViewer';
import {Container, Segment} from 'semantic-ui-react';


class ProfileContainer extends React.Component{

  state = {
    user: {},
  }

  componentDidMount(){
    this.getUserInfo();
  }


  getUserInfo = () => {
    axios({
      method: 'get',
      url: 'https://8080-dot-4114867-dot-devshell.appspot.com/getUserInfo',
      withCredentials: true
    }).then(result =>  this.setState({user: result.data[0]}));
  }



  handleSubmit = (email, username, cb) => {
    axios({
      method: 'post',
      url: 'https://8080-dot-4114867-dot-devshell.appspot.com/editUserInfo',
      data: {
        email: email,
        username: username
      },
      withCredentials: true
    }).then(() => {cb('profile successfully updated')})
    .catch(() => {cb('there was an error, your profile wasn\'t updated.')});
  }


  render(){

    return(
      <div>
        <Container className='songInfoContainer'>
          <Segment>
            <ProfileViewer user={this.state.user}/>
          </Segment>
            <ProfileEditor
              onGetUserInfo={this.getUserInfo}
              onSubmit={this.handleSubmit}
              user={this.state.user}/>

        </Container>
      </div>
    )
  }

}
export default ProfileContainer;

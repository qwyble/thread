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
      url: 'http://localhost:8080/getUserInfo',
      withCredentials: true
    }).then(result =>  this.setState({user: result.data[0]}));
  }



  handleSubmit = (email, username, cb) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/editUserInfo',
      data: {
        email: email,
        username: username
      },
      withCredentials: true
    }).then(() => {cb('profile successfully updated')})
    .catch(() => {cb('there was an error, your profile wasn\'t updated.')});
  }


  render(){
    console.log(this.state.user);
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
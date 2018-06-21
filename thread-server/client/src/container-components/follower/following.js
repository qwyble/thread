import React from 'react';
import axios from 'axios';
import Users from '../../presentational-components/explorer/users.js';
import {Grid, Segment, Container} from 'semantic-ui-react';


class Following extends React.Component{

  state = {
    users: []
  }

  componentDidMount(){
    this.getFollowing();
  }

  getFollowing = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/getFollowing',
      withCredentials: true
    }).then(result => {
      console.log(result.data);
      this.setState({users: result.data});
    })
  }

  render(){
    return(
        <div  style={{top: '30vh'}}>
          <Grid container columns={4}>
            <Users users={this.state.users} />
          </Grid>

        </div>


    )
  }
}


export default Following;
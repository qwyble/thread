import React from 'react';
import axios from 'axios';
import Users from '../../presentational-components/explorer/users.js';
import {Grid, Header} from 'semantic-ui-react';


class Followers extends React.Component{

  state = {
    users: []
  }

  componentDidMount(){
    this.getFollowers();
  }

  getFollowers = () => {
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com//getFollowers',
      withCredentials: true
    }).then(result => {
      this.setState({users: result.data});
    })
  }

  render(){
    return(
        <div >
          <Grid container columns={4}>
            {this.state.users.length !== 0 ?
              <Users users={this.state.users} />
              : <div style={{marginTop: '20vh'}}>
                  <Header>
                    Looks like you don't have any followers yet... :(
                  </Header>
                </div>}
          </Grid>

        </div>


    )
  }
}


export default Followers;

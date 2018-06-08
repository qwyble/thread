import React from 'react';
import {Container, Grid, Segment, Loader, Search} from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Explorer extends React.Component{
  state={
    users: [],
    _loading: false,
    searchString: ''
  }

  componentDidMount(){
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: `http://localhost:8080/getAllUsers`
    }).then((result) => {
      this.setState({users: result.data, _loading: false})
    })
  }

  handleInputChange = (e) => {

    this.setState({searchString: e.target.value, _loading: true}, () => {
      axios({
        method: 'get',
        url: `http://localhost:8080/getAllUsers/${this.state.searchString}`
      }).then((result) => {this.setState({users: result.data, _loading:false})})
    })
  }

  render(){
    return(
      <div>
        <Container>
          <Search onSearchChange={this.handleInputChange} loading={this.state._loading}/>
          <Grid container columns={4}>

              {this.state.users.map((user, key) => {
                return(
                  <Grid.Column key={key}>
                    <Link to={`/profile/${user.idUsers}`}>
                    {user.userName}
                  </Link>
                  </Grid.Column>
                )
              })}
          
          </Grid>
        </Container>
      </div>

    )
  }
}
export default Explorer;

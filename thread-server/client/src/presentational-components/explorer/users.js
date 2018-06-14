import React from 'react';
import {Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Users extends React.Component{
  render(){
    return(
      <Grid.Row>
        {this.props.users.map((user, key) => {
          return(
            <Grid.Column key={key}>
              <Link to={`/profile/${user.idUsers}`}>
              {user.userName}
            </Link>
            </Grid.Column>
          )
        })}
      </Grid.Row>

    )
  }
}

export default Users;

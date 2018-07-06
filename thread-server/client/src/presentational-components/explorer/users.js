import React from 'react';
import {Grid, Image, Icon, Popup, List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Users extends React.Component{
  render(){
    return(
      <Grid.Row>
        {this.props.users.map((user, key) => {
          return(
            <Grid.Column key={key}>
              <Grid.Row>
                <Image size='small' src={user.imageUrl} />
              </Grid.Row>
              <Grid.Row>
                <Link to={{
                  pathname: `/profile/${user.idUsers}`
                }}>
                {user.userName}
              </Link>
              </Grid.Row>
              <Grid.Row columns={2}>
                <List horizontal>
                  <List.Item>
                    <Popup trigger={<Icon name='list' />} content={user.playlistsCount+' playlist(s).'} />
                    {user.playlistsCount}
                  </List.Item>
                  <List.Item>
                    <Popup trigger={<Icon name='music' />} content={(user.songsCount || '0')+' song(s).'} />
                    {user.songsCount || 0}
                  </List.Item>
                </List>
              </Grid.Row>
            </Grid.Column>
          )
        })}
      </Grid.Row>

    )
  }
}

export default Users;

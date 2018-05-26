import React from 'react';
import ForumFeed from './forumFeed';
import ThreadList from './threadList';
import {Grid} from 'semantic-ui-react';




class ForumContainer extends React.Component{
  state={
    subscribed: [],
    owned: [],
    posts: [],
  }
  render(){
    return(
      <Grid style={{height: '100%'}} divided stretched columns={2}>
        <Grid.Row>
          <Grid.Column width={13}>
            <ThreadList />
          </Grid.Column>
          <Grid.Column width={3}>
            <ForumFeed />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

export default ForumContainer;

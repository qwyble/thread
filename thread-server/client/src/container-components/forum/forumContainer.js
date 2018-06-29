import React from 'react';
import ForumFeed from './forumFeed';
import ThreadList from './threadList';
import ThreadComposer from './threadComposer.js'
import {Route} from 'react-router-dom'
import {Grid} from 'semantic-ui-react';




class ForumContainer extends React.Component{
  state={
    subscribed: [],
    owned: [],
    posts: [],
  }
  render(){
    return(
      <Grid style={{margin: 'auto'}} divided stretched columns={2}>
        <Grid.Row>
          <Grid.Column width={13}>
            <Route path="/forum/post" component={ThreadComposer} />
            <Route exact path="/forum" component={ThreadList} />
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

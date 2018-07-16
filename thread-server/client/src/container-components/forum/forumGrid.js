import React from 'react';
import ForumFeed from './forumFeed';
import ThreadContainer from './threadContainer.js';
import ThreadComposer from './threadComposer.js'
import ThreadViewContainer from './threadViewContainer.js'
import {Route} from 'react-router-dom'
import {Grid} from 'semantic-ui-react';




const ForumGrid = ({selectedCategory}) => (

  <Grid style={{margin: 'auto'}} divided stretched columns={2}>
    <Grid.Row>
      <Grid.Column width={13}>
        <Route path="/forum/post" component={ThreadComposer} />
        <Route path="/forum/thread/:id" component={ThreadViewContainer} />
        <Route exact path="/forum" render={ (props) =>
          <ThreadContainer selectedCategory={selectedCategory} />
        }/>
      </Grid.Column>
      <Grid.Column width={3}>
        <ForumFeed />
      </Grid.Column>
    </Grid.Row>

  </Grid>
)





export default ForumGrid;

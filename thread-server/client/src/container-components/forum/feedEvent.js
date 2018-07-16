import React from 'react';
import {Feed, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class FeedEvent extends React.Component{

  render(){
    return(
      <div style={{fontSize: 'small'}}>
        <Feed.Event>
          <Feed.Content>
              <Feed.User>{this.props.user}</Feed.User> commented in
              <div>
                <Link to={`/forum/thread/${this.props.threadId}`}>
                  {this.props.subject}
                </Link>:
              </div>
              <Feed.Extra text>
                "{this.props.body.slice(0, 40)}"
              </Feed.Extra>
          </Feed.Content>
        </Feed.Event>
        <Divider />
      </div>
    )
  }
}

export default FeedEvent;

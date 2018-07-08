import React from 'react';
import {Feed, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class FeedEvent extends React.Component{

  render(){
    return(
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.props.user}</Feed.User> commented in
            <div>
              <Link to={`/forum/thread/${this.props.threadId}`}>
                {this.props.subject}
              </Link>:              
            </div>
            <div>
              "{this.props.body.slice(0, 40)}"
            </div>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default FeedEvent;

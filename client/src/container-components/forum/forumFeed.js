import React from 'react'
import { Feed, Loader } from 'semantic-ui-react'
import FeedEvent from './feedEvent';
import axios from 'axios';

class ForumFeed extends React.Component{

  state = {
    feedEvents: [],
    _loading: false,
  }

  componentDidMount(){
    this.getFeedItems();
  }

  getFeedItems = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getForumFeed',
      withCredentials: true
    }).then(result => {
      this.setState({feedEvents: result.data, _loading: false});
    });
  }


  render(){
    return(
      <Feed>
        {this.state._loading ? <Loader active /> : <div></div>}
        {this.state.feedEvents.map((evt, i) =>
          <FeedEvent
            key={i}
            body={evt.body}
            user={evt.userName}
            subject={evt.subject}
            threadId={evt.idThreadPost}
          />
        )}
      </Feed>
    )
  }
}

export default ForumFeed;

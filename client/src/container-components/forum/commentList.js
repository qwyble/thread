import React from 'react';
import axios from 'axios';
import {Segment, Header, Loader} from 'semantic-ui-react';
import CommentView from '../../presentational-components/forum/commentView.js';


class CommentList extends React.Component{
  state = {
    comments: []
  }

  componentDidUpdate(prevProps){
    if(this.props.threadId !== prevProps.threadId){
      this.getComments()
    }
    if(this.props.commentSuccess){
      this.getComments()
    }
  }

  getComments = () => {
    this.setState({_loading: true})
    axios.get('https://thread-204819.appspot.com/getComments/'+this.props.threadId)
    .then((result) => this.setState({ comments: result.data, _loading: false }));

  }


  render(){
    return(
      <div>
        <Segment>
          {this.state._loading ? <Loader active /> : <div></div>}
          <Header>
            Comments:
          </Header>
            {this.state.comments.map((comment, i) => (
              <CommentView comment={comment} key={i} />
            ))}
        </Segment>
      </div>
    )
  }
}

export default CommentList;

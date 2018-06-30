import React from 'react';
import axios from 'axios';
import {Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import {AppContext} from '../../context.js';
import ThreadView from '../../presentational-components/forum/threadView.js';
import NewComment from './newComment.js';



class ThreadViewContainer extends React.Component{
  state = {
    thread: {},
    success: false,
    openComment: false,
    commentSuccess: false,
  }

  componentDidMount(){
    var path = window.location.pathname;
    var id = path.slice(14, path.length);

    this.getThread(id);
  }


  getThread = (id) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/getThread',
      params: {
        id: id,
      }
    }).then(result => this.setState({thread: result.data[0]}));
  }

  handleDeleteThread = (id) => {
    console.log(id);
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteThread',
      data: {
        id: id
      },
      withCredentials: true,
    }).then(() => this.setState({success: true}))
  }

  handleOpenComment = () => {
    if(this.state.openComment){
      this.setState({openComment: false});
    } else {
      this.setState({openComment: true});
    }
  }

  handleCommentSubmit = () => {
    this.setState({commentSuccess: true}, () => {
      this.setState({commentSuccess: false});
    });
  }



  render(){
    return(
      <div>
        {this.state.success ? <Redirect to='/forum' /> : <div></div>}
        <AppContext.Consumer>{context => (
          <ThreadView
            isOwner={context.user.idUsers === this.state.thread.UserId}
            thread={this.state.thread}
            onOpenComment={this.handleOpenComment}
            onDeleteThread={this.handleDeleteThread}
          />)}
        </AppContext.Consumer>

        {
          this.state.openComment ?
          <NewComment
            onCancelComment={this.handleOpenComment}
            onCommentSubmit={this.handleCommentSubmit}
            threadId={this.state.thread.idThreadPost}
          /> : <div></div>
        }


      </div>
    )
  }
}

export default ThreadViewContainer;

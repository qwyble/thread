import React from 'react';
import TextComponent from '../utilities/textComponent.js';
import {Segment, Form, Button, Loader} from 'semantic-ui-react';
import axios from 'axios';

class NewComment extends React.Component{

  state = {
    comment: '',
    err: false,
    _loading: false,
  }


  handleInputChange = ({name, value, error}) => {
    this.setState({comment: value, err: error})
  }

  validate = () => {
    if(!this.state.comment) return true;
    if(this.state.err) return true;
    return false;
  }


  handleCommentSubmit = () => {
    if(this.state.err) return;
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com/postComment',
      data: {
        comment: this.state.comment,
        threadId: this.props.threadId,
        date: (new Date()).toISOString().substring(0, 19).replace('T', ' '),
      },
      withCredentials: true,
    }).then(() => {
      this.setState({_loading: false});
      this.props.onCommentSubmit();
    });
  }



  render(){
    return(
      <Segment>
        {this.state._loading ? <Loader active /> : <div></div>}
        <Form onSubmit={this.handleCommentSubmit}>
          <Form.Field error={!!this.state.err}>
            <TextComponent
              name='comment'
              value={this.state.comment}
              onChange={this.handleInputChange}
              validate={(val) => val ? false : 'comment cannot be empty'}
            />
            {this.state.err}
          </Form.Field>
          <Button disabled={this.validate()} type='submit'>Submit</Button>
          <Button onClick={this.props.onCancelComment}>Cancel</Button>
        </Form>

      </Segment>
    )
  }
}

export default NewComment;

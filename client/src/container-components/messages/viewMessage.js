import React from 'react';
import {Loader, Button, Container, Divider} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Composer from './composer.js';



class ViewMessage extends React.Component{
  state={
    message: {},
    messageId: '',
    redirect: false,
    reply: false
  }

  static getDerivedStateFromProps(props, state){
    if(props.location.state){
      return { messageId: props.location.state.id };
    }else{
      return { redirect: true}
    }
  }

  componentDidMount(){
    if(!this.state.redirect){
      this.getMessage()
    }
  }

  getMessage = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getMessage',
      params: {
        id: this.state.messageId
      },
      withCredentials: true
    }).then((result) => {
      this.setState({message: result.data[0], _loading: false});
    })
  }

  handleReply = () => {
    if(this.state.reply){
      this.setState({reply: false});
    }else{
      this.setState({reply: true});
    }
  }


  render(){

    if(this.state.redirect){
      return(
        <Redirect to='/messages' />
      )
    }

    return(
      <Container>
        {this.state.loading ? <Loader active /> : <div></div>}
        {this.state.message ?
          <div>
            <div style={{float: 'right'}}>
              {this.state.message.date}
            </div>
            From: {this.state.message.senderName}
            <Divider />
            Subject: {this.state.message.subject}
            <Divider />
            {this.state.message.text}
            <Divider />
            <Button icon='reply' onClick={this.handleReply}/>
            {this.state.reply ? <Composer recipient={this.state.message.sender}/> : <div></div>}
          </div>
          : <div></div>

        }

      </Container>

    )
  }
}

export default ViewMessage;

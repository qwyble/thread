import React from 'react';
import MessagesUtil from './messagesUtil.js';
import MessagesList from './messagesList.js';
import SentMessagesList from './sentMessagesList.js';
import ViewMessage from './viewMessage.js';
import Composer from './composer.js'
import {Segment, Loader} from 'semantic-ui-react';
import axios from 'axios';
import {Route} from 'react-router-dom';



class MessagesContainer extends React.Component{

  state = {
    selectedMessages: [],
    messages: [],
    _loading: false
  }


  componentDidMount = () => {
    this.getMessages();
  }


  getMessages = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'http://localhost:8080/getMessages',
      withCredentials: true
    }).then((result) => {this.setState({messages: result.data, _loading: false})})
  }


  getSentMessages = () => {
    this.setState({ _loading: true });
    axios({
      method: 'get',
      url: 'http://localhost:8080/getSentMessages',
      withCredentials: true
    }).then((result) => this.setState({ _loading: false, messages: result.data }));
  }


  handleMessageCheck = (e) => {
    var id = parseInt(e.target.id);
    if(this.state.selectedMessages.includes(id)){
      this.setState({selectedMessages: this.state.selectedMessages.filter((m) => {m !== id})})
    }else{
      this.setState({selectedMessages: this.state.selectedMessages.concat(id)})
    }
  }


  handleDelete = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteMessages',
      data: {
        messages: this.state.selectedMessages
      },
      withCredentials: true
    }).then(() => {this.getMessages()})
  }


  render(){
    return(
      <div>
        <MessagesUtil
          onGetMessages={this.getMessages}
          onGetSentMessages={this.getSentMessages}
          onDelete={this.handleDelete}
        />

        <Segment style={{width: '50%', margin: 'auto'}} className='messagesTable'>

          {this.state._loading ? <Loader active /> : <div></div>}

          <Route path='/messages/view' component={ViewMessage} />
          <Route path='/messages/compose' component={Composer} />


          <Route path='/messages/sent' render={(props) =>
            <SentMessagesList
              {...props}
              messages={this.state.messages}
            />
          }/>

          <Route exact path='/messages' render={(props) =>
            <MessagesList
              {...props}
              messages={this.state.messages}
              selectedMessages={this.state.selectedMessages}
              onMessageCheck={this.handleMessageCheck}
            />
          }/>

        </Segment>
      </div>
    )
  }
}

export default MessagesContainer;

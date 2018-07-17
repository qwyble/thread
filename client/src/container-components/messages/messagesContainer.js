import React from 'react';
import MessagesUtil from './messagesUtil.js';
import MessagesList from './messagesList.js';
import SentMessagesList from './sentMessagesList.js';
import ViewMessage from './viewMessage.js';
import Composer from './composer.js'
import {Segment, Loader, Container} from 'semantic-ui-react';
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
    messagesGet().then((result) => {this.setState({messages: result.data, _loading: false})})
  }


  getSentMessages = () => {
    this.setState({ _loading: true });
    sentMessagesGet().then((result) => this.setState({ _loading: false, messages: result.data }));
  }


  handleMessageSelect = (e) => {
    var id = parseInt(e.target.id, 10);
    var selected = this.state.selectedMessages

    if(selected.includes(id)){ this.setState({selectedMessages: selected.filter((m) => (m !== id))}) }
    else{ this.setState({selectedMessages: selected.concat(id)}) }
  }


  handleDelete = () => {
    deletePost(this.state.selectedMessages).then(() => {this.getMessages()})
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
          <Container style={{height: '70vh', overflowY: 'scroll'}}>

            {this.state._loading ? <Loader active /> : <div></div>}

            <Route path='/messages/view' component={ViewMessage} />

            <Route path='/messages/compose' render={(props) =>
              <Composer {...props} onGetMessages={this.getMessages}/>
            }/>

            <Route path='/messages/sent' render={(props) =>
              <SentMessagesList {...props} messages={this.state.messages} />
            }/>

            <Route exact path='/messages' render={(props) =>
              <MessagesList {...props}
                messages={this.state.messages}
                selectedMessages={this.state.selectedMessages}
                onMessageSelect={this.handleMessageSelect}
              />
            }/>

          </Container>


        </Segment>
      </div>
    )
  }
}

export default MessagesContainer;




const messagesGet = () => {
  return(
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getMessages',
      withCredentials: true
    })
  )
}


const sentMessagesGet = () => {
  return(
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getSentMessages',
      withCredentials: true
    })
  )
}

const deletePost = (selectedMessages) => {
  return(
    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com/deleteMessages',
      data: {
        messages: selectedMessages
      },
      withCredentials: true
    })
  )
}

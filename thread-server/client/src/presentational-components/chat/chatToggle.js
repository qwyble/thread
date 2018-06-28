import React from 'react';
import ChatContainer from '../../container-components/chat/chatContainer.js';
import {Button} from 'semantic-ui-react';



class ChatToggle extends React.Component{
  state={
    _displayChat: false
  }

  handleDisplayChat = () => {
    if(this.state._displayChat) this.setState({_displayChat: false});
    else this.setState({_displayChat: true})
  }

  render(){
    return(
      <div>
        {this.state._displayChat ? <ChatContainer /> : <div></div>}
        <Button
          size='mini'
          onClick={this.handleDisplayChat}
          style={{position: 'fixed', bottom:'0px', zIndex: '10000', right:'0px'}}
        >
           Chat
        </Button>
      </div>
    )
  }
}

export default ChatToggle;

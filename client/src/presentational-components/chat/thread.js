import React from 'react';
import MessageList from './messageList';
import TextFieldSubmit from './textFieldSubmit';



const Thread = (props) => (
  <div>
    <MessageList messages={props.thread.messages} onClick={props.onMessageClick}/>
    <TextFieldSubmit onSubmit={props.onMessageSubmit} />
  </div>
)


export default Thread;

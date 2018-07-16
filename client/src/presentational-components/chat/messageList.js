import React from 'react';



const MessageList = (props) => {
  return(
    <div>
      {props.messages.map((message, index) => (
        <div key={index} onClick={() => props.onClick(message.id)}>
          {message.text}
          <span style={{float: 'right'}}> {message.timestamp}</span>
        </div>
      ))}
    </div>
  )
}


export default MessageList;

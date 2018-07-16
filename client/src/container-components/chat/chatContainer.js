import React from 'react';
import ThreadTabs from './threadTabs';
import ThreadDisplay from './threadDisplay';
import {Container, Segment} from 'semantic-ui-react';



class ChatContainer extends React.Component{
  render(){

    return(
      <Container style={{zIndex: '10000', position: 'fixed', bottom: '10px', right: '10px', width: '20vw'}}>
        <ThreadTabs />
        <Segment>
          <ThreadDisplay />
        </Segment>
      </Container>
    )
  }
}


export default ChatContainer;

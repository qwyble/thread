import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class SuccessPrompt extends React.Component{
  render(){
    return(
      <Modal open={true} basic size='mini' className='messagePortal' width={2}>
        <Modal.Header>
          Message sent.
        </Modal.Header>
        <Modal.Content>
          <Link to='/messages'><Button onClick={this.props.onGetMessages}>Back to messages</Button></Link>
        </Modal.Content>
      </Modal>
      )
    }
  }
  export default SuccessPrompt;

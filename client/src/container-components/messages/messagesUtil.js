import React from 'react';
import {Sidebar, Menu, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class MessagesUtil extends React.Component{

  render(){
    return(
      <div>
        <Sidebar
          className='messagesSidebar'
           as={Menu}
           width='thin'
           direction='left'
           visible={true}
           icon='labeled'
           vertical

         >
           <Link to='/messages/compose'>
             <Menu.Item name='compose'>
               <Icon name='keyboard' />
               Compose
             </Menu.Item>
           </Link>
           <Link to='/messages' onClick={this.props.onGetMessages}>
             <Menu.Item name='inbox'>
               <Icon name='mail' />
               Inbox
             </Menu.Item>
           </Link>
           <Link to='/messages/sent' onClick={this.props.onGetSentMessages}>
           <Menu.Item name='sent'>
             <Icon name='send' />
             Sent
           </Menu.Item>
           </Link>
           <Menu.Item name='delete' onClick={this.props.onDelete}>
             <Icon name='trash' />
             Delete
           </Menu.Item>
         </Sidebar>
      </div>
    )
  }
}

export default MessagesUtil;

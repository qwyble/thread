import React from 'react';
import {Table, Button, Icon, Menu} from 'semantic-ui-react';
import ThreadList from '../../container-components/forum/threadList.js';
import {Link} from 'react-router-dom';


const ThreadTable = ({threads}) => (
  <Table celled>
   <Table.Header>
     <Table.Row>
       <Table.HeaderCell>Subject</Table.HeaderCell>
       <Table.HeaderCell>Poster</Table.HeaderCell>
       <Table.HeaderCell>Category</Table.HeaderCell>
       <Table.HeaderCell>Replies</Table.HeaderCell>
       <Table.HeaderCell>Subs</Table.HeaderCell>
       <Table.HeaderCell>Date</Table.HeaderCell>
     </Table.Row>
   </Table.Header>

   <ThreadList threads={threads}/>

   <Table.Footer>
     <Table.Row>
       <Table.HeaderCell colSpan='6'>
         <Link to='/forum/post' >
         <Button>
           Post Thread
         </Button>
         </Link>
         <Menu floated='right' pagination>
           <Menu.Item as='a' icon>
             <Icon name='chevron left' />
           </Menu.Item>
           <Menu.Item as='a' icon>
             <Icon name='chevron right' />
           </Menu.Item>
         </Menu>
       </Table.HeaderCell>
     </Table.Row>
   </Table.Footer>
 </Table>
)


export default ThreadTable;

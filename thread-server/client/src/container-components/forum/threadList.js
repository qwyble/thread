import React from 'react';
import { Table, Icon,Label,Menu, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class ThreadList extends React.Component{
  render(){
    return(
      <Table celled>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Subject</Table.HeaderCell>
           <Table.HeaderCell>Category</Table.HeaderCell>
           <Table.HeaderCell>Replies</Table.HeaderCell>
           <Table.HeaderCell>Subs</Table.HeaderCell>
         </Table.Row>
       </Table.Header>

       <Table.Body>
         <Table.Row>
           <Table.Cell>
             <Label ribbon>First</Label>
           </Table.Cell>
           <Table.Cell>Cell</Table.Cell>
           <Table.Cell>Cell</Table.Cell>
         </Table.Row>
         <Table.Row>
           <Table.Cell>Cell</Table.Cell>
           <Table.Cell>Cell</Table.Cell>
           <Table.Cell>Cell</Table.Cell>
         </Table.Row>
         <Table.Row>
           <Table.Cell>Cell</Table.Cell>
           <Table.Cell>Cell</Table.Cell>
           <Table.Cell>Cell</Table.Cell>
         </Table.Row>
       </Table.Body>

       <Table.Footer>
         <Table.Row>
           <Table.HeaderCell colSpan='4'>
             <Link to='/forum/post' >
             <Button>
               Post Thread
             </Button>
             </Link>
             <Menu floated='right' pagination>
               <Menu.Item as='a' icon>
                 <Icon name='chevron left' />
               </Menu.Item>
               <Menu.Item as='a'>1</Menu.Item>
               <Menu.Item as='a'>2</Menu.Item>
               <Menu.Item as='a'>3</Menu.Item>
               <Menu.Item as='a'>4</Menu.Item>
               <Menu.Item as='a' icon>
                 <Icon name='chevron right' />
               </Menu.Item>
             </Menu>
           </Table.HeaderCell>
         </Table.Row>
       </Table.Footer>
     </Table>
    )
  }
}

export default ThreadList;

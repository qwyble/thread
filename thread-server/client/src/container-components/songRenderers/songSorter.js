import React from 'react';
import {Table, Button, Icon} from 'semantic-ui-react';
import SongsList from './songsList.js'


class SongSorter extends React.Component{
  state ={
    _loading: false,
  }

  render(){
    return(
      <Table celled striped compact unstackable inverted selectable>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Length</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
      
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>
              <Button floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='user' /> Go Public
              </Button>
              <Button size='small'>Bookmark</Button>
              <Button disabled size='small'>Add to Playlist</Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

    )
  }
}


export default SongSorter;

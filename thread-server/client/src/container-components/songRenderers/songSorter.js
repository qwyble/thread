import React from 'react';
import {Table, Button, Icon, Checkbox, Rating, Loader} from 'semantic-ui-react';
import SongRow from './songRow.js'


class SongSorter extends React.Component{
  state ={
    _loading: false,
    songs: []
  }

  static getDerivedStateFromProps(props, state){
    return {songs: props.songs, _loading: props._loading};
  }


  render(){
    return(
      <div>
      <Table size='small' celled striped compact unstackable inverted selectable>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Uploader</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Genre</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.songs.map((song, key) => {
            return(
              <SongRow key={key} song={song}/>
            )
          })}
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
      {this.state._loading ? <Loader active size='massive'/> :<div></div>}
    </div>

    )
  }
}


export default SongSorter;

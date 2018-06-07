import React from 'react';
import {Table, Button, Icon, Checkbox, Rating} from 'semantic-ui-react';



class SongRow extends React.Component{
  render(){
    return(
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox />
        </Table.Cell>
        <Table.Cell>
          {this.props.song.title}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.userName}
        </Table.Cell>
        <Table.Cell>
          <Rating rating={this.props.song.rating} maxRating={5} />
        </Table.Cell>
        <Table.Cell>
          {this.props.song.genres}
        </Table.Cell>
      </Table.Row>
    )


  }
}

export default SongRow;

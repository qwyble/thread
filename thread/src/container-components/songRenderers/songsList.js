import React from 'react';
import {Table, Checkbox} from 'semantic-ui-react';


class SongsList extends React.Component{
  render(){
    return(
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox toggle />
        </Table.Cell>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
    )
  }
}

export default SongsList;

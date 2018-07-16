import React from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import { Redirect} from 'react-router-dom';


class SentMessagesList extends React.Component{

  state={
    messages: [],
    messageToView: '',
    redirect: false
  }


  static getDerivedStateFromProps(props, state){
    return {messages: props.messages}
  }

  handleViewMessage = (m) => {
      this.setState({redirect: true, messageToView: m.idmessages});
  }


  render(){

    if(this.state.redirect){
      return(
        <Redirect to={{
          pathname: `/messages/view`,
          state: {
            id: this.state.messageToView
          }
        }}/>
      )
    }

    return(
      <div>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.messages.map((m, i) => {
              return(
                  <Table.Row key={i}>
                    <Table.Cell onClick={this.handleViewMessage.bind(this, m)}>
                      {m.recipientName}
                    </Table.Cell>
                    <Table.Cell onClick={this.handleViewMessage.bind(this, m)}>
                      {m.subject}
                    </Table.Cell>
                    <Table.Cell onClick={this.handleViewMessage.bind(this, m)}>
                      {m.date.slice(0, 10)}
                    </Table.Cell>
                  </Table.Row>
              )
            })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
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
      </div>
    )
  }
}


export default SentMessagesList;

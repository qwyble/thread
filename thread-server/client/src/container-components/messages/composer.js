import React from 'react';
import axios from 'axios';
import SuccessPrompt from './successPrompt';
import {Container, Input, Dimmer, Form, Loader, Button, Dropdown, Icon} from 'semantic-ui-react';


class Composer extends React.Component{

  state = {
    users: [],
    searchValue: '',
    subject: '',
    body: '',
    err: {
      subject: '',
      body: '',
      recipient: ''
    },
    _loading: false,
    _displayErr: '',
    success: false
  }

  static getDerivedStateFromProps(props, state){
    return{searchValue: props.recipient}
  }

  componentDidMount(){
    this.getUsers(this.state.searchValue);
  }

  handleSearchChange = (e, d) => {
    this.setState({searchValue: e.target.value}, () => {
      this.getUsers(this.state.searchValue);
      this.validate();
    });
  }

  handleDropdownChange = (e, d) => {
    this.setState({
      searchValue: d.value,
    }, () => {
      this.validate()
    });

  }

  handleInputChange = (e) => {
    var name = e.target.name;
    var val = e.target.value;
    this.setState({ [name]: val}, () => {
      this.validate(name, val);
    });
  }


  validate = () => {
    var err = {...this.state.err};
    if (!this.state.subject){
      err['subject'] = 'subject is required'
      this.setState({err});
    }else{
      err['subject'] = ''
      this.setState({err});
    }

    if(!this.state.body){
      err['body'] = 'body is required'
      this.setState({err});
    }else{
      err['body'] = '';
      this.setState({err});
    }

    if(!(typeof this.state.searchValue ==='number')){
      err['recipient'] = 'recipient is required';
      this.setState({err});
    }else{
      err['recipient'] = '';
      this.setState({err})
    }
  }


  getUsers = (searchString) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/emailSearch',
      params: {
        searchString: searchString
      }
    }).then(result => {
      var users = [];
      users = result.data.map((user, i) => {
        return {
          text: user.userName,
          image: user.imageUrl,
          key: user.idUsers,
          value: user.idUsers
        }
      })
      this.setState({users});
    })
  }


  handleFormSubmit = () => {
    if(typeof this.state.searchValue !== 'number'){
      this.setState({_displayErr: 'user not found'});
      return;
    }
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/sendMessage',
      data: {
        subject: this.state.subject,
        body: this.state.body,
        recipient: this.state.searchValue,
        date: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
      },
      withCredentials: true
    }).then(() => {this.setState({_loading: false, success: true})})
  }



  render(){
    var _disabled = Object.values(this.state.err).some(err => err.length);
    return(
      <Container>
        {this.state._loading ? <Dimmer inverted active><Loader active /></Dimmer> : <div></div>}
        {this.state.success ? <SuccessPrompt /> : <div></div>}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <Dropdown
              error={this.state.err.recipient ? true : false}
              placeholder='Select user'
              fluid search selection
              onChange={this.handleDropdownChange}
              options={this.state.users}
              value={this.state.searchValue}
              onSearchChange={this.handleSearchChange}
            />
          </Form.Field>
          <Form.Field error={this.state.err.subject ? true : false} required>
            <Input type='text' name='subject' value={this.state.subject} onChange={this.handleInputChange} placeholder='Subject'/>
          </Form.Field>
          <Form.Field required error={this.state.err.body ? true : false}>
            <Form.TextArea name='body' value={this.state.body} onChange={this.handleInputChange} placeholder='Body' />
          </Form.Field>
          <Button disabled={_disabled} type='submit'><Icon name='send' /></Button>
        </Form>
        {this.state._displayErr}
      </Container>
    )
  }
}
export default Composer;

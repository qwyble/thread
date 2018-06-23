import React from 'react';
import axios from 'axios';
import SuccessPrompt from './successPrompt';
import FieldComponent from '../utilities/fieldComponent.js';
import TextComponent from '../utilities/textComponent.js';
import DropdownComponent from '../utilities/dropdownComponent';
import {Container, Input, Dimmer, Form, Loader, Button, Dropdown, Icon} from 'semantic-ui-react';


class Composer extends React.Component{

  state = {
    message: {
      recipient: null,
      subject: '',
      body: ''
    },
    fieldErrors: {
      recipient: '',
      subject: '',
      body: ''
    },
    _loading: false,
    success: false
  }


  static getDerivedStateFromProps(props, state){
    var message = {...state.message}
    message['recipient'] = props.recipient
    return{ message: message }
  }


  handleDropdownChange = (e, d) => {
    this.setState({searchValue: d.value});
  }


  handleInputChange = ({name, value, error}) => {
    const message = {...this.state.message};
    const fieldErrors = {...this.state.fieldErrors};

    message[name] = value;
    fieldErrors[name] = error;

    this.setState({message, fieldErrors});
  }


  validate = () => {
    const message = {...this.state.message};
    const fieldErrors = {...this.state.fieldErrors};
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if(!message.recipient) return true;
    if(!message.subject) return true;
    if(!message.body) return true;
    if(errMessages.length) return true;

    return false;
  }


  handleFormSubmit = (e) => {
    const message = this.state.message;
    e.preventDefault();

    if(this.validate()) return;

    this.sendMessageToDb();
  }


  sendMessageToDb = () => {
    this.setState({_loading: true});

    axios({
      method: 'post',
      url: 'http://localhost:8080/sendMessage',
      data: {
        subject: this.state.message.subject,
        body: this.state.message.body,
        recipient: this.state.message.recipient,
        date: (new Date()).toISOString().substring(0, 19).replace('T', ' ')
      },
      withCredentials: true
    }).then(() => {
      this.setState({
        _loading: false,
        success: true,
        message: {
          recipient: null,
          subject: '',
          body: ''
        }
      })
    });

  }


  render(){
    console.log(this.state.message.recipient);
    return(
      <Container>

        {this.state._loading ? <Dimmer inverted active><Loader active /></Dimmer> : <div></div>}
        {this.state.success ? <SuccessPrompt /> : <div></div>}

        <Form onSubmit={this.handleFormSubmit}>

          <Form.Field required error={this.state.fieldErrors.recipient ? true : false}>
            <DropdownComponent
              name='recipient'
              placeholder='Choose recipient'
              value={this.state.message.recipient}
              onChange={this.handleInputChange}
              validate={(val) => val ? false : 'recipient is required'}
            />
            {this.state.fieldErrors.recipient}
          </Form.Field>

          <Form.Field required error={this.state.fieldErrors.subject ? true : false} >
            <FieldComponent
              name='subject'
              placeholder='Subject'
              value={this.state.message.subject}
              onChange={this.handleInputChange}
              validate={(val) => val ? false : 'Subject is required'}
            />
            {this.state.fieldErrors.subject}
          </Form.Field>

          <Form.Field required error={this.state.fieldErrors.body ? true : false}>
            <TextComponent
              name='body'
              placeholder='Body'
              value={this.state.message.body}
              onChange={this.handleInputChange}
              validate={(val) => val ? false : 'body is required'}
            />
            {this.state.fieldErrors.body}
          </Form.Field>

          <Button
            type='submit'
            disabled={this.validate()}>
            <Icon name='send' />
          </Button>

        </Form>
      </Container>
    )
  }
}
export default Composer;

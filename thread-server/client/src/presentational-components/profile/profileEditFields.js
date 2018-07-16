import React from 'react';
import {Segment, Container, Input, Form, Modal, Label, Button } from 'semantic-ui-react';



class ProfileEditFields extends React.Component{

  render(){
    return(
      <div>
        <Modal.Content>
          <Container>
            <Segment>
              <Form>
                <Form.Field>
                  <Label>New Email</Label>
                  <Input name='newEmail' value={this.props.newEmail} onChange={this.props.onInputChange}/>
                  <div>{this.props.emailErr}</div>
                </Form.Field>
                <Form.Field>
                  <Label>New Username</Label>
                  <Input name='newUsername' value={this.props.newUsername} onChange={this.props.onInputChange} />
                  <div>{this.props.usernameErr}</div>
                </Form.Field>
                <Button type='submit' disabled={this.props._disabled} onClick={this.props.onSubmit}>Submit</Button>
              </Form>

            </Segment>
          </Container>
        </Modal.Content>
      </div>
    )
  }
}

export default ProfileEditFields;

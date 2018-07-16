import React from 'react';
import ProfileEditFields from '../../presentational-components/profile/profileEditFields';
import {Button, Modal, Icon, Loader, Portal, Segment, Image, Form} from 'semantic-ui-react';
import axios from 'axios';
var validator = require('validator');



class ProfileEditor extends React.Component{

  state = {
    newUsername: '',
    newEmail: '',
    imageUrl: '',
    imageFile: '',
    _imageLoading: false,
    formErrors: {email: '', username: ''},
    message: '',
    emailValid: true,
    usernameValid: true,
    _disabled: true,
    _isOpen: false,
    _isLoading: false,
    _portalOpen: false
  }



  static getDerivedStateFromProps(props, state){
    return { newUsername: props.user.userName, newEmail: props.user.email, imageUrl: props.user.imageUrl }
  }


  validate = (name, value) => {
    let fieldValidationErrors = {...this.state.formErrors};
    var emailValid = this.state.emailValid;
    var usernameValid = this.state.usernameValid;

    switch(name){
      case 'newUsername':
        usernameValid = value.length > 2;
        fieldValidationErrors.username = usernameValid ? '' : 'username must be at least 3 characters';
        break;
      case 'newEmail':
        emailValid = validator.isEmail(value);
        fieldValidationErrors.email = emailValid ? '' : 'not a valid email';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      usernameValid: usernameValid
    }, () => {
      this.setState({_disabled: !this.state.emailValid || !this.state.usernameValid});
    });
  }


  handleInputChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({[name]: value});
    this.validate(name, value);


  }

  submitCallback = (message) => {
    this.setState({_isLoading: false, message: message});
  }

  handleSubmit = () => {
    this.setState({_isLoading: true});
    this.props.onSubmit(this.state.newEmail, this.state.newUsername, this.submitCallback);
  }

  handleOpen = () => {
    if(this.state._isOpen){
      this.setState({_isOpen: false});
    }else{
      this.setState({_isOpen: true});
    }
  }

  handlePortalOpen = () => {
    if(this.state._portalOpen){
      this.setState({_portalOpen: false});
    }else{
      this.setState({_portalOpen: true});
    }
  }

  handleImageChange = (e) => {
    var url = window.URL.createObjectURL(e.target.files[0])
    this.setState({imageUrl: url, imageFile: e.target.files[0]});
  }

  handleImageSubmit = () => {
    this.setState({_imageLoading: true});
    var data = new FormData();
    data.append('file', this.state.imageFile)
    axios({
      method: 'post',
      url: 'http://localhost:8080/uploadImage',
      data: data,
      withCredentials: true
    }).then(() => {
      this.handlePortalOpen();
      this.props.onGetUserInfo();
      this.setState({_imageLoading: false});
    });
  }

  render(){
    return(
      <div>
          <Button onClick={this.handlePortalOpen}>Edit Image</Button>
          <Portal open={this.state._portalOpen}>
            <Segment compact padded raised secondary textAlign='center' style={{margin: 'auto', top: '-300px'}}>
              {this.state._imageLoading ? <Loader active={true}/> : <div></div>}
              <Image src={this.state.imageUrl} style={{margin: 'auto'}} />
              <Form onSubmit={this.handleImageSubmit}>
                <input name='image' type="file" onChange={this.handleImageChange}/>
                <Button type='submit' disabled={!this.state.imageFile}> Submit </Button>
              </Form>
            </Segment>
          </Portal>

        <Button onClick={this.handleOpen}>Edit Profile</Button>
        <Modal
          centered='true'
          dimmer={false}
          className='profileModal'
          closeIcon={<Button icon onClick={this.handleOpen}><Icon name='close'/></Button>}
          open={this.state._isOpen}
          style={{width: '30vw'}}>
          <Loader active={this.state._isLoading}/>
          {this.state.message}
          <ProfileEditFields
            user={this.props.user}
            newUsername={this.state.newUsername}
            newEmail={this.state.newEmail}
            onInputChange={this.handleInputChange}
            onSubmit={this.handleSubmit}
            onOpen={this.handleOpen}
            _disabled={this.state._disabled}
            emailErr={this.state.formErrors.email}
            usernameErr={this.state.formErrors.username}
          />
        </Modal>
      </div>
    )
  }
}


export default ProfileEditor;

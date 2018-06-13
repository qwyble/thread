import React from 'react';
import {Form, Button, Input} from 'semantic-ui-react';

/*Uploader is the form for uploading songs */
class Uploader extends React.Component{

  render(){
    return(
      <div>
        <Form onSubmit={this.props.onUpload}>
          <Form.Field>
            <Input
              name='songFile'
              type="file"
              multiple
              onChange={this.props.onInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <Input
              type='text'
              name='title'
              placeholder='Title'
              value={this.props.data.songUploadFields.title}
              onChange={this.props.onInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              type='text'
              name='description'
              placeholder='Description'
              value={this.props.data.songUploadFields.description}
              onChange={this.props.onInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Genre</label>
            <Input
              name='genre'
              type='text'
              value={this.props.data.songUploadFields.genre}
              onChange={this.props.onInputChange}>
            </Input>
          </Form.Field>
          <Button type='submit' disabled={this.props.data.uploadButtonToggle}>Upload</Button>
        </Form>
      </div>
    )
  }
}

export default Uploader;

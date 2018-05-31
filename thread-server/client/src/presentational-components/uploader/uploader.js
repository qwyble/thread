import React from 'react';
import {Form, Button, Input} from 'semantic-ui-react';

/*Uploader is the form for uploading songs */
class Uploader extends React.Component{

  render(){
    const genres = [
      {
        key: 0,
        text: 'world',
        value: 'world',
      },
      {
        key: 1,
        text: 'folk',
        value: 'folk',
      },
      {
        key: 2,
        text: 'psychedelic',
        value: 'psychedelic',
      },
      {
        key: 3,
        text: 'funk',
        value: 'funk',
      },
    ];


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
            <label>Genres</label>
            <select
              name='genres'
              multiple
              value={this.props.data.songUploadFields.genres}
              onChange={this.props.onInputChange}>
              {genres.map((g, i) => <option key={i} value={g.value}>{g.text}</option>)}
            </select>
          </Form.Field>
          <Button type='submit' disabled={this.props.data.uploadButtonToggle}>Upload</Button>
        </Form>
      </div>
    )
  }
}

export default Uploader;

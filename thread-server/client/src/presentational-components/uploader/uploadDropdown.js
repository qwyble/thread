import React from 'react';
import Uploader from './uploader.js';
import {Icon, Modal, } from 'semantic-ui-react'

/* UploadDropdown renders the modal which
contains the upload form */
class UploadDropdown extends React.Component{
  render(){
    return(
      <div>
        <Modal className='uploadModal' trigger={<div><Icon name='angle double up' />Upload</div>}>
          <Modal.Header>Song Uploader</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h4>Select an audio file</h4>
              <p>Only wav and mp3 files are accepted</p>
            </Modal.Description>
            <Uploader
              onUpload={this.props.onUpload}
              onInputChange={this.props.onInputChange}
              data={this.props.data}
            />
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}


export default UploadDropdown;

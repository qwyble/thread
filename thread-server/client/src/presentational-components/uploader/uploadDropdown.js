import React from 'react';
import Uploader from './uploader.js';
import {Icon, Modal, Loader, Dimmer, Segment} from 'semantic-ui-react';

/* UploadDropdown renders the modal which
contains the upload form */
class UploadDropdown extends React.Component{
  render(){
    return(
      <div>
        <Modal className='uploadModal' trigger={<div><Icon name='angle double up' />Upload</div>}>
        <Dimmer.Dimmable as={Segment}>
          <Modal.Header>Song Uploader</Modal.Header>
          <Modal.Content>
              <Modal.Description>
                <h4>Select an audio file</h4>
                <p>Only wav and mp3 files are accepted</p>
              </Modal.Description>
              {this.props._loading ?
                <Dimmer active>
                  <Loader size='massive' />
                </Dimmer>:<div></div>
              }
              <div>
                <Uploader
                  onUpload={this.props.onUpload}
                  onInputChange={this.props.onInputChange}
                  data={this.props.data}
                />
              </div>
          </Modal.Content>
        </Dimmer.Dimmable>
        </Modal>
      </div>
    )
  }
}


export default UploadDropdown;

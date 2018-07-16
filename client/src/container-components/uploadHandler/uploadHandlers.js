import React from 'react';
import UploadDropdown from '../../presentational-components/uploader/uploadDropdown.js';
import axios from 'axios';

const initialState = {
  songUploadFields: {
    title: '',
    description: '',
    songFile: [],
    genre: '',
    songURL: ''
  },
  songURL: '',
  uploadButtonToggle: true,
  isLoading: false
}

class UploadHandlers extends React.Component{
  state = initialState;

  reset = () => {
    this.setState(initialState);
  }


  handleInputChange = (e) => {
    const name = e.target.name;
    var value = e.target.value;
    var songUploadFields = Object.assign({}, this.state.songUploadFields);
    /*Title and SongFile are required to enable the upload button */
    if(name === 'title' && value.length > 0){
      this.setState({uploadButtonToggle: false});
    }else if(name === 'title'){
      this.setState({uploadButtonToggle: true});
    }
    //in case of songFile, change 'value' to handle file upload
    if(name==='songFile'){value = e.target.files[0];}
    //update the state
    songUploadFields[name] = value;
    this.setState({songUploadFields});
  }



  handleUpload = () => {
    var data = new FormData();
    var songFile = this.state.songUploadFields.songFile;

    data.append('songFile', songFile);
    data.append('title', this.state.songUploadFields.title);
    data.append('description', this.state.songUploadFields.description);
    data.append('genres', this.state.songUploadFields.genre);
    data.append('URL', this.state.songUploadFields.songURL);
    this.setState({isLoading: true});
    axios({
      method: 'post',
      url: 'https://dotwave.herokuapp.com/uploadSong',
      data: data,
      withCredentials: true
    }).then((result) => {
      //access results....
      
      this.reset();
    });

  }


  render(){
    return(
      <UploadDropdown
        onUpload={this.handleUpload}
        onInputChange={this.handleInputChange}
        data={this.state}
        _loading={this.state.isLoading}
      />
    )
  }
}

export default UploadHandlers

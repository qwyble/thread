import React from 'react';
import UploadDropdown from '../../presentational-components/uploader/uploadDropdown.js';
import axios from 'axios';

const initialState = {
  songUploadFields: {
    title: '',
    description: '',
    songFile: [],
    genres: [],
    songURL: ''
  },
  songURL: '',
  uploadButtonToggle: true,
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
    /*don't allow two of the same genre,
    and allow user to subtract genres*/
    if(name === 'genres'){
      var genres = this.state.songUploadFields.genres.slice();
      if(!this.state.songUploadFields.genres.includes(value)){
        genres.push(value);
        value = genres;
      }else{
        var index = genres.indexOf(value)
        genres.splice(index, 1);
        value = genres;
      }
    //in case of songFile, change 'value' to handle file upload
    }else if(name==='songFile'){
      value = e.target.files[0];
    }
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
    data.append('genres', this.state.songUploadFields.genres);
    data.append('URL', this.state.songUploadFields.songURL);

    axios({
      method: 'post',
      url: 'http://localhost:8080/upload',
      data: data,
      withCredentials: true
    }).then((result) => {
      //access results....
      console.log(result);
    });
    this.reset();
  }


  render(){
    return(
      <UploadDropdown
        onUpload={this.handleUpload}
        onInputChange={this.handleInputChange}
        data={this.state}
      />
    )
  }
}

export default UploadHandlers

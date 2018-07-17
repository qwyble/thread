import React from 'react';
import ListOptions from './listOptions.js';
import axios from 'axios';

class EditCategories extends React.Component {

  state = {
    err: '',
  }

  handleCategoryDelete = (id) => {
    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com/deleteCategory',
      data: { catid: id },
      withCredentials: true
    }).then(result => this.props.getCats());
  }



  handleCategoryRename = (catName, catid, newName) => {
    if(newName.length < 3){
      this.setState({err: 'category name must be at least 3 characters'})
      return;
    }

    var categories = [...this.props.categories];

    for(var i = 0; i < categories.length; i++){
      if(categories[i].catname === newName){
        this.setState({err: 'category name must be unique'});
        return;
      }
    }

    var catIndex = categories.findIndex((cat, i) => cat.catid === catid)
    categories[catIndex].catname = newName;

    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com/renameCat',
      data: {
        catid: catid,
        name: newName
      },
      withCredentials: true
    })
    .then((result) => {
      this.props.getCats();
      this.setState({err: ''})
    })
    .catch((err) => {this.setState({err: err.response.data.err})});
  }



  render(){
    return(
      <ListOptions
        onCategoryDelete={this.handleCategoryDelete}
        onCategoryRename={this.handleCategoryRename}
        id={this.props.id}
        catname={this.props.catname}
        err={this.state.err}
      />
    )
  }
}

export default EditCategories;

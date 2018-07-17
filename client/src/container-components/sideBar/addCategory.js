import React from 'react';
import RenderAddCategory from '../../presentational-components/sidebarUtilities/renderAddCategory';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';



class AddCategory extends React.Component{

  state = {
    _loading: false,
    err: ''
  }

  handleAddCategory = (cat) => {
    if(!cat) return;
    this.setState({_loading: true, err: ''});
    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com//addCategory',
      data: { category: cat },
      withCredentials: true
    }).then((result) =>{
      this.setState({_loading:false, displayForm: false}, () => {
        this.props.getCats();
      })
    }).catch((err) => this.setState({_loading: false, err: 'category name must be unique'}));
  }


  render(){

    return(
      <div>
        <div>
          <RenderAddCategory
            onToggle={this.handleToggle}
            onAddCategory={this.handleAddCategory}
            err={this.state.err}
          />
        </div>
        {this.state._loading ?
          <Loader active={true} /> :
          <div></div>
        }

      </div>
    )
  }
}

export default AddCategory;

import React from 'react';
import RenderAddCategory from '../../presentational-components/sidebarUtilities/renderAddCategory';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';



class AddCategory extends React.Component{

  state = {
    _loading: false,
    err: '',
  }

  handleAddCategory = (cat) => {
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/addCategory',
      data: { category: cat },
      withCredentials: true
    }).then((result) =>{
      this.props.getCats();
      this.setState({_loading:false})
    }).catch((err) => this.setState({err: err.response.data.err, _loading:false}))
  }


  render(){
    return(
      <div>
        {this.state._loading ?
          <Loader active={true} /> :
          <RenderAddCategory
            err={this.err}
            onAddCategory={this.handleAddCategory}
            removeErr={() => this.setState({err: ''})}
          />
        }

      </div>
    )
  }
}

export default AddCategory;

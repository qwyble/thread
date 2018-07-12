import React from 'react';
import RenderAddCategory from '../../presentational-components/sidebarUtilities/renderAddCategory';
import axios from 'axios';
import {Loader, Button, Icon} from 'semantic-ui-react';



class AddCategory extends React.Component{

  state = {
    _loading: false,
  }

  handleAddCategory = (cat) => {
    if(!cat) return;
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/addCategory',
      data: { category: cat },
      withCredentials: true
    }).then((result) =>{
      this.props.getCats();
      this.setState({_loading:false, displayForm: false})
    })
  }


  render(){

    return(
      <div>
        {this.state._loading ?
          <Loader active={true} /> :
          <div>
            <RenderAddCategory
              onToggle={this.handleToggle}
              onAddCategory={this.handleAddCategory}
            />
          </div>
        }

      </div>
    )
  }
}

export default AddCategory;

import React from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';

/* renders either 'add category' button or
form to add category.*/
class AddCategory extends React.Component{

  state = {
    displayForm: false,
    categoryToAdd: '',
    err: '',
  }

  handleInputChange = (e) => {
    var value = e.target.value;
    var err = '';

    if (value.length < 3){
      err = 'category name must be at least 3 characters';
    } else { err = ''; }

    this.setState({categoryToAdd: value, err});
  }


  handleToggle = () => {
    this.setState({displayForm: !this.state.displayForm});
  }


  handleAddClick = () => {
    this.handleToggle();
    this.props.onAddCategory(this.state.categoryToAdd);
  }

  validate = () => {
    if(!this.state.categoryToAdd) return true;
    if(this.state.err) return true;
    else return false;
  }

  render(){
    return(
      <div>
        {this.state.displayForm ?
          <Form inverted={true} type='text'>
            <Input inverted={true} size='mini' placeholder='new category' onChange={this.handleInputChange} value={this.state.categoryToAdd} />
            <Button
              fluid icon inverted
              size='mini' type='submit' color='blue'
              onClick={this.handleAddClick}
              disabled={this.validate()}
            >
              {
                this.state.err ? this.state.err : 
                <Icon floated='right' name='plus'/>
              }
            </Button>
          </Form>
          :
          <Button fluid icon inverted size='mini' color='blue' onClick={this.handleToggle}>
            <Icon floated='right' name='plus'/> Category
          </Button>
        }
      </div>
    )
  }
}

export default AddCategory;

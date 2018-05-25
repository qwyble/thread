import React from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';

/* renders either 'add category' button or
form to add category.*/
class AddCategory extends React.Component{

  state = {
    displayForm: false,
  }


  handleToggle = () => {
    this.setState({displayForm: !this.state.displayForm});
  }

  handleAddClick = () => {
    this.handleToggle();
    this.props.onAddCategory();
  }

  render(){
    return(
      <div>
        {this.state.displayForm ?
          <Form inverted={true} type='text'>
            <Input inverted={true} size='mini' placeholder='new category' onChange={this.props.onInputChange} value={this.props.categoryToAdd} />
            <Button fluid icon inverted size='mini' type='submit' color='blue' onClick={this.handleAddClick}>
              <Icon floated='right' name='plus'/>
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

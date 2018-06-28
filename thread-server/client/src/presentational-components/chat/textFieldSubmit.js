import React from 'react';
import {Form, Input, Button} from 'semantic-ui-react';






class TextFieldSubmit extends React.Component{
  state = {
    value: ''
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render(){
    return(
      <div>
        <Form>
          <Form.Field >
            <Input onChange={this.onChange} value={this.state.value} type='text'/>
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default TextFieldSubmit;

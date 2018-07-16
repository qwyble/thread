import React from 'react';
import {Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';


class FieldComponent extends React.Component{

  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value,
    error: false
  };

  static getDerivedStateFromProps(props, state){
    return { value: props.value }
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({value, error});

    this.props.onChange({name, value, error});
  }



  render(){
    return(
      <div>
        <Input
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default FieldComponent;

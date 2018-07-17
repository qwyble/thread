import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Dropdown} from 'semantic-ui-react';



class CategoryDropdownComponent extends React.Component{
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.number,
    name: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    value: this.props.value,
    searchValue: '',
    cats: [],
    error: ''
  }

  componentDidMount(){
    this.getCategories('%');
  }


  getCategories = (searchString) => {
    axios({
      method: 'get',
      url: 'https://thread-204819.appspot.com/getForumCategories',
      params: {
        searchString: searchString
      }
    }).then(result => {
      var cats = [];
      cats = result.data.map((cat, i) => {
        return {
          text: cat.category,
          key: cat.idthreadcategories,
          value: cat.idthreadcategories
        }
      })
      this.setState({cats});
    })
  }


  onSearchChange = (e, d) => {
    const searchValue = e.target.value || '%';
    const error = this.props.validate ? this.props.validate(searchValue) : false;

    this.setState({ error, searchValue }, () => {
      this.getCategories(this.state.searchValue);
    });

  }


  onDropdownChange = (e, d) => {

    const name = d.name;
    const value = d.value;
    const error = this.props.validate(value);

    this.setState({error, value})

    this.props.onChange({name, value, error});
  }



  render(){
    return(
      <Dropdown
        fluid search selection
        name={this.props.name}
        placeholder={this.props.placeholder}
        options={this.state.cats}
        value={this.state.value}
        onChange={this.onDropdownChange}
        onSearchChange={this.onSearchChange}
      />
    )
  }
}

export default CategoryDropdownComponent;

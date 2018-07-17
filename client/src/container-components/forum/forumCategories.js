import React from 'react';
import axios from 'axios';
import ForumCategoriesList from '../../presentational-components/forum/forumCategoriesList';



class ForumCategories extends React.Component{

  state = {
    categories: []
  };

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
      this.setState({categories: cats});
    })
  }

  render(){
    return(
      <ForumCategoriesList
        onSelectCategory={this.props.onSelectCategory}
        categories={this.state.categories}
      />
    )
  }
}

export default ForumCategories;

import React from 'react';
import SidebarLeftOverlay from './sideBar.js';
import axios from 'axios';


/*
The purpose of this class is to take a load off of SidebarLeftOverlay
by lifting the 'categories' state and all functions which modify the categories.
*/

class CategoryUtils extends React.Component{

  state = {
    err: '',
    _loading: true,
    visitingProfile: '',
    categories: [],
    owner: ''
  }

  static getDerivedStateFromProps(props, state){
    if(window.location.pathname === '/stream'){
      return { owner: props.user.userName, visitingProfile: props.visitingProfile }
    }else{
      return { visitingProfile: props.visitingProfile }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      this.getCats();
    }
  }


  componentDidMount(){
    this.setState({_loading: true }, () => {
      this.getCats();
    });
  }


  getUrl = () => {
    if(this.state.visitingProfile){
      return 'http://localhost:8080/getPlaylists/'+this.state.visitingProfile;
    }else{
      return 'http://localhost:8080/getPlaylists';
    }
  }


  getCats = () => {
    axios({
      method: 'get',
      url: this.getUrl(),
      withCredentials: true
    }).then((categories) => {
      var catpls = categories.data.cats;
      var cats = Object.values(
        catpls.reduce( (cats, {catname, catid, plname, plid, isPublic}) => {
          if (! (catid in cats) ) { cats[catid] = {catname, catid, pls: []}; }
          if (plid) { cats[catid].pls.push({plname, plid, isPublic}); }
          return cats;
        }, {})
      )
      if (categories.data.owner){
        var owner = categories.data.owner[0].userName;
      }else{
        var owner = '';
      }
      this.setState({categories: cats, owner: owner, _loading: false});
    });
  }


  handleAddCategory = (cat) => {
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/addCategory',
      data: { category: cat },
      withCredentials: true
    }).then((result) =>{
      this.getCats();
    }).catch((err) => this.setState({err: err.response.data.err, _loading:false}))
  }


  handleCategoryDelete = (id) => {
    this.setState({_loading: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/deleteCategory',
      data: { catid: id },
      withCredentials: true
    }).then(result => {this.getCats();});
  }


  handleCategoryEditSubmit = (catName, catid, newName) => {
    if(newName.length < 1){
      this.setState({err: 'category name must be at least 1 character'})
      return;
    }
    var categories = [...this.state.categories];
    for(var i = 0; i < categories.length; i++){
      if(categories[i].catname === newName){
        this.setState({err: 'category name must be unique'});
        return;
      }
    }
    categories = [];
    this.state.categories.forEach(function(cat){
      if(cat.catid === catid){ cat.catname = newName; }
      categories.push(cat);
    });
    this.setState({categories});
    axios({
      method: 'post',
      url: 'http://localhost:8080/renameCat',
      data: {
        catid: catid,
        name: newName
      },
      withCredentials: true
    })
    .then((result) => {this.getCats()})
    .catch((err) => {this.setState({err: err.response.data.err})});
  }


  render(){
    return(
      <SidebarLeftOverlay
        onCategoryEditSubmit={this.handleCategoryEditSubmit}
        onCategoryDelete={this.handleCategoryDelete}
        onAddCategory={this.handleAddCategory}
        getCats={this.getCats}
        url={this.props.url}
        visitingProfile={this.props.visitingProfile}
        user={this.props.user}
        owner={this.state.owner}
        categories={this.state.categories}
        err={this.state.err}
        _loading={this.state._loading}
        refreshCategories={this.getCats}
      />
    )
  }
}


export default CategoryUtils;

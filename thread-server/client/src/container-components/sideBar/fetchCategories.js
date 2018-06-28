import React from 'react';
import SidebarLeftOverlay from './sideBar.js';
import axios from 'axios';


/*
'categories' state and all functions which modify the categories.
*/

class FetchCategories extends React.Component{

  state = {
    err: '',
    _loading: true,
    visitingProfile: '',
    categories: [],
    owner: ''
  }

  static getDerivedStateFromProps(props, state){
    if(window.location.pathname === '/stream'){ return { owner: props.user.userName } }
    else{ return { visitingProfile: props.visitingProfile } }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.url !== this.props.url){ this.getCats(); }
  }


  componentDidMount(){
    this.getCats();
  }


  getUrl = () => {
    if(this.state.visitingProfile){ return 'http://localhost:8080/getPlaylists/'+this.state.visitingProfile; }
    else{ return 'http://localhost:8080/getPlaylists'; }
  }


  getCats = () => {
    this.setState({ _loading: true })
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

        var owner = categories.data.owner[0]

      this.props.setOwner(owner);
      console.log(owner);

      this.setState({categories: cats, owner: owner, _loading: false});
    });
  }



  render(){
    console.log(this.state.categories);
    return(
      <SidebarLeftOverlay
        onCategoryEditSubmit={this.handleCategoryEditSubmit}
        onCategoryDelete={this.handleCategoryDelete}
        getCats={this.getCats}
        url={this.props.url}
        owner={this.state.owner}
        isOwner={this.props.isOwner}
        categories={this.state.categories}
        _loading={this.state._loading}
      />
    )
  }
}


export default FetchCategories;

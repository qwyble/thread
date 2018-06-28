import React from 'react';
import SidebarLeftOverlay from './sideBar.js';
import axios from 'axios';



class FetchCategories extends React.Component{

  state = {
    err: '',
    _loading: true,
    categories: [],
    owner: ''
  }



  componentDidUpdate(prevProps, prevState){
    if(prevProps.visitingProfile !== this.props.visitingProfile){ this.getCats(); }
  }


  componentDidMount(){
    this.getCats();
  }


  // if the user is visiting a profile other than their own, set the query url to get another's playlists
  getUrl = () => {
    if(this.props.visitingProfile){ return 'http://localhost:8080/getPlaylists/'+this.props.visitingProfile; }
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

      this.setState({categories: cats, owner: owner, _loading: false});
    });
  }



  render(){
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

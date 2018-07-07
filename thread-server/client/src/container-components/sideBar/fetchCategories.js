import React from 'react';
import SidebarLeftOverlay from './sideBar.js';
import axios from 'axios';



class FetchCategories extends React.Component{

  state = {
    categories: [],
  }



  componentDidUpdate(prevProps, prevState){
    if(prevProps.profile !== this.props.profile){
      this.getCats();
    }
  }


  componentDidMount(){
    this.getCats();
  }


  // if the user is visiting a profile other than their own, set the query url to get another's playlists
  getUrl = () => {
    if(this.props.profile){ return 'http://localhost:8080/getPlaylists/'+this.props.profile; }
    else{ return 'http://localhost:8080/getPlaylists'; }
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

        var owner = categories.data.owner[0]

      this.props.setOwner(owner);

      this.setState({categories: cats});
    });
  }



  render(){
    return(
      <SidebarLeftOverlay
        getCats={this.getCats}
        owner={this.props.owner}
        isOwner={this.props.isOwner}
        categories={this.state.categories}
      />
    )
  }
}


export default FetchCategories;

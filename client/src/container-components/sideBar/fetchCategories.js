import React from 'react';
import SidebarLeftOverlay from './sideBar.js';
import axios from 'axios';
import {Loader} from 'semantic-ui-react';



class FetchCategories extends React.Component{

  state = {
    categories: [],
    owner: '',
    _loading: true,
    initialRender: true
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
    if(this.props.profile){ return 'https://thread-204819.appspot.com/getPlaylists/'+this.props.profile; }
    else{ return 'https://thread-204819.appspot.com/getPlaylists'; }
  }



  getCats = () => {
    this.setState({_loading: true}, () => {
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

        this.setState({categories: cats, owner: owner, _loading: false, initialRender: false});
      });

    })
  }



  render(){
    if(this.state._initialRender)
      return <Loader active />
    else
      return(
        <SidebarLeftOverlay
          _loading={this.state._loading}
          getCats={this.getCats}
          owner={this.state.owner}
          isOwner={this.props.isOwner}
          categories={this.state.categories}
        />
      )
  }
}


export default FetchCategories;

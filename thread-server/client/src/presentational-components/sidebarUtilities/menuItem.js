import React from 'react';
import {Menu} from 'semantic-ui-react';
import Category from '../../container-components/sideBar/categories.js';


/* renders each category in the sidebar */
class MenuItem extends React.Component{
  render(){
    return(
      <Menu.Item className='sideItems'>
        <Category
          catName={this.props.name}
          playLists={this.props.playLists}
          id={this.props.id}
          onSelectPlaylist={this.props.onSelectPlaylist}
          onCategoryEditSubmit={this.props.onCategoryEditSubmit}
          onCategoryDelete={this.props.onCategoryDelete}
          getCats={this.props.getCats}
        />
      </Menu.Item>
    )
  }
}


export default MenuItem;

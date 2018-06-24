import React from 'react';
import {Menu} from 'semantic-ui-react';
import Playlists from '../../container-components/sideBar/playlists.js';


/* renders each category in the sidebar */
class MenuItem extends React.Component{
  render(){
    return(
      <Menu.Item className='sideItems'>
        <Playlists
          {...this.props}
        />
      </Menu.Item>
    )
  }
}


export default MenuItem;

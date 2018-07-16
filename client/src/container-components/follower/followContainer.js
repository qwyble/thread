import {AppContext} from '../../appUtilities/ownerContext.js'
import React from 'react';
import FollowUser from './followUser';


const FollowContainer = ({path}) => (
  <div style={{float: 'left'}}>
    {(path.includes('/profile') || path.includes('/playlist')) ?
    <AppContext.Consumer>{context =>
      <FollowUser isOwner={context.isOwner} user={context.user.idUsers} owner={context.owner.idUsers}/>}
    </AppContext.Consumer>
    : <div></div>
  }
  </div>
)


export default FollowContainer;

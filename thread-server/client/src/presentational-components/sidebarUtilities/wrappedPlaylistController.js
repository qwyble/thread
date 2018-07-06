import React from 'react';
import {AppContext} from '../../appUtilities/context.js';
import PlaylistController from '../../container-components/songRenderers/playlistController.js';


const WrappedPlaylistController = (props) => (
  <div>
    <AppContext.Consumer>{context => (
      <PlaylistController
        {...props}
        onSetSongs={context.onSetSongs}
        isOwner={context.isOwner}
      />)}
    </AppContext.Consumer>
  </div>
)

export default WrappedPlaylistController;

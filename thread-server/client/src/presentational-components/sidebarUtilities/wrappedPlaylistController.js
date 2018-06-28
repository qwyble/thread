import React from 'react';
import {AppContext} from '../../context.js';
import PlaylistController from '../../container-components/songRenderers/playlistController.js';


const WrappedPlaylistController = (props) => (
  <div>
    <AppContext.Consumer>{context => (
      <PlaylistController
        {...props}
        onPlaying={context.onPlaying}
        onPausing={context.onPausing}
        nowPlaying={context.nowPlaying}
        onSetSongs={context.onSetSongs}
        paused={context.paused}
        isOwner={context.isOwner}
      />)}
    </AppContext.Consumer>
  </div>
)

export default WrappedPlaylistController;

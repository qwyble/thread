import React from 'react';
import {AppContext} from '../../appUtilities/context.js';
import {Table} from 'semantic-ui-react';
import SongRow from '../../container-components/songRenderers/songRow.js';



class WrappedSongRows extends React.Component{


  render(){

    return(
      <AppContext.Consumer>{context => (
        <Table.Body>
          {this.props.songs.map((song, key) => {
            return(
                <SongRow
                  key={key} song={song}
                  onPlaying={() => context.onPlaying(song)}
                  onSongSelect={this.props.onSongSelect}
                  playing={song.idSongs === context.nowPlaying.idSongs}
                  selected={this.props.selectedSongs.includes(song.idSongs)}
                  paused={context.paused}
                  onPausing={context.onPausing}
                  onRefresh={this.props.onRefresh}
                  _loading={this.props._loading}
                />
            )
          })}
        </Table.Body>
      )}
      </AppContext.Consumer>
    )
  }
}

export default WrappedSongRows;

import React from 'react';
import {Table, Loader} from 'semantic-ui-react';
import PlaylistPortal from './playlistPortal.js';
import {AppContext} from '../../context.js';
import ClonePortal from '../../presentational-components/sidebarUtilities/clonePortal.js';
import WrappedSongRows from '../../presentational-components/sidebarUtilities/wrappedSongRows.js';
import RemoveSongFromPlaylist from '../../presentational-components/sidebarUtilities/removeSongFromPlaylist.js';
import MakePublic from '../../presentational-components/sidebarUtilities/makePublic.js';
import FollowContainer from '../follower/followContainer.js';
import DeleteSongs from './deleteSong.js';

//renders the lst of songs, controls adding and deleting songs to/from playlists
//
class SongSorter extends React.Component{
  state ={
    selectedSongs: [],
    _disabled: true,
  }


  handleSongSelect = (e) => {
    if(e.target.checked){
      this.setState({
        selectedSongs: this.state.selectedSongs.concat(parseInt(e.target.id))
      }, () => this.handlePlaylistButtonToggle());

    }else{
      this.setState({
        selectedSongs: this.state.selectedSongs.filter((id) => {return (id !== parseInt(e.target.id))})
      }, () => this.handlePlaylistButtonToggle());
    }
  }

  handlePlaylistButtonToggle = () => {
    if(this.state.selectedSongs.length < 1){ this.setState({_disabled: true}); }
    else{ this.setState({_disabled: false}); }
  }

  resetSelectedSongs = () => {
    this.setState({selectedSongs: []});
  }



  render(){
    var path = window.location.pathname;
    return(
      <div>
      <Table className='t1' size='small' celled striped compact unstackable inverted selectable>
          <Table.Header fullWidth className='stickyTop'>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Uploader</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Genre</Table.HeaderCell>
              <Table.HeaderCell>Date Uploaded</Table.HeaderCell>
            </Table.Row>
          </Table.Header>


          <WrappedSongRows
            _loading={this.props._loading}
            songs={this.props.songs}
            onSongSelect={this.handleSongSelect}
            selectedSongs={this.state.selectedSongs}
            onRefresh={this.props.onRefresh}
          />


        <Table.Footer className='stickyBottom' fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='4'>


              <ClonePortal
                categories={this.props.categories}
                selectedPlaylist={this.props.selectedPlaylist}
                refreshCategories={this.props.refreshCategories}
              />

              <PlaylistPortal
                _disabled={this.state._disabled}
                selectedSongs={this.state.selectedSongs}
                resetSelectedSongs={this.resetSelectedSongs}
              />


              <FollowContainer path={window.location.pathname} />


              <RemoveSongFromPlaylist
                selectedPlaylist={this.props.selectedPlaylist}
                selectedSongs={this.state.selectedSongs}
                _disabled={this.state._disabled}
                onRemoval={this.props.onRemoval}
                songs={this.props.songs}
                isOwner={this.props.isOwner}
              />

              {(this.props.isOwner && window.location.pathname === '/stream') ?
                <DeleteSongs
                  onRefresh={this.props.onRefresh}
                  selectedSongs={this.state.selectedSongs}
                />
                : <div></div>
              }


            </Table.HeaderCell>


            <MakePublic
              isPublic={this.props.isPublic}
              onMakePrivate={this.props.onMakePrivate}
              onMakePublic={this.props.onMakePublic}
              isOwner={this.props.isOwner}
            />


          </Table.Row>
        </Table.Footer>
      </Table>
      {this.props._loading ? <Loader active size='massive'/> : <div></div>}
    </div>

    )
  }
}


export default SongSorter;

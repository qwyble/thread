import React from 'react';
import {Table, Loader, Icon} from 'semantic-ui-react';
import PlaylistPortal from './playlistPortal.js';
import {AppContext} from '../../appUtilities/context.js';
import RenderClonePortal from '../../presentational-components/sidebarUtilities/renderClonePortal.js';
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
    descending: true
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

  handleSort = (sortBy) => {
    var descending;

    if(this.state.descending) descending = false;
    else descending = true;

    this.props.onSortBy(sortBy, descending);

    this.setState({descending});
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
              <Table.HeaderCell>
                Title
                <Icon name='sort' onClick={() => this.handleSort('songs.title')} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Uploader
                <Icon name='sort' onClick={() => this.handleSort('songs.owner')} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Rating
                <Icon name='sort' onClick={() => this.handleSort('songratings.rating')} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Genre
                <Icon name='sort' onClick={() => this.handleSort('songs.genres')} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Date Uploaded
                <Icon name='sort' onClick={() => this.handleSort('songs.dateUploaded')} />
              </Table.HeaderCell>
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

              {path.includes('/playlist') ?
                <RenderClonePortal
                  selectedPlaylist={this.props.selectedPlaylist}
                  refreshCategories={this.props.refreshCategories}
                />
                :<div></div>
              }


              <PlaylistPortal
                _disabled={this.state._disabled}
                selectedSongs={this.state.selectedSongs}
                resetSelectedSongs={this.resetSelectedSongs}
              />


              <FollowContainer path={path} />


              <RemoveSongFromPlaylist
                selectedPlaylist={this.props.selectedPlaylist}
                selectedSongs={this.state.selectedSongs}
                _disabled={this.state._disabled}
                onRemoval={this.props.onRemoval}
                songs={this.props.songs}
                isOwner={this.props.isOwner}
              />

              {(this.props.isOwner && path === '/stream') ?
                <DeleteSongs
                  onRefresh={this.props.onRefresh}
                  selectedSongs={this.state.selectedSongs}
                />
                : <div></div>
              }


            </Table.HeaderCell>


            <MakePublic
              selectedPlaylist={this.props.selectedPlaylist}
              isOwner={this.props.isOwner}
              isPublic={this.props.isPublic}
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

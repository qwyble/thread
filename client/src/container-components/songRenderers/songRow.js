import React from 'react';
import {Table, Icon, Checkbox, Rating} from 'semantic-ui-react';
import axios from 'axios';


class SongRow extends React.Component{
  constructor(props){
    super(props);
    this.state={
      rating: 0,
      _playToggle: false
    }
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    return{
      rating: props.song.rating,
      _playToggle: props.playing && !props.paused
    }
  }


  handlePlayToggle() {
    if(!this.state._playToggle){
      this.props.onPlaying(this.props.song.idSongs);
    }else{
      this.props.onPausing()
    }

  }

  handleRatingChange(e, d) {
    this.setState({rating: d.rating}, () => {
      axios({
        method: 'post',
        url: 'https://thread-204819.appspot.com/rateSong',
        data:{
          songId: this.props.song.idSongs,
          rating: this.state.rating
        },
        withCredentials: true
      }).then(() => {this.props.onRefresh()})
    });
  }

  render(){
      var className = this.props._loading ? 'rows loading' : 'rows';
    return(
      <Table.Row className={className}>
        <Table.Cell collapsing>
          <Checkbox size = 'mini' id={this.props.song.idSongs} checked={this.props.selected} onChange={this.props.onSongSelect} />
          <span className='checkboxSpan' ></span>
        </Table.Cell>
        <Table.Cell collapsing onClick={this.handlePlayToggle}>
          {this.state._playToggle ?
            <Icon name="pause circle outline"/> :
            <Icon name="play circle outline"/>
          }
        </Table.Cell>
        <Table.Cell>
          {this.props.song.title}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.userName}
        </Table.Cell>
        <Table.Cell>
          <Rating
            rating={this.state.rating}
            maxRating={5}
            onRate={this.handleRatingChange}/>
        </Table.Cell>
        <Table.Cell>
          {this.props.song.genres}
        </Table.Cell>
        <Table.Cell>
          {this.props.song.dateUploaded.substr(0, 10)}
        </Table.Cell>
      </Table.Row>
    )


  }
}

export default SongRow;

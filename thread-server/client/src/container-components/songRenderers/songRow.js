import React from 'react';
import {Table, Button, Icon, Checkbox, Rating} from 'semantic-ui-react';
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
      _playToggle: props.playing
    }
  }
  

  handlePlayToggle() {
    this.props.onPlaying(this.props.song.idSongs);
  }

  handleRatingChange(e, d) {
    this.setState({rating: d.rating}, () => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/rateSong',
        data:{
          songId: this.props.song.idSongs,
          rating: this.state.rating
        },
        withCredentials: true
      })
    });
  }

  render(){
    return(
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox size = 'mini' id={this.props.song.idSongs} onChange={this.props.onSongSelect} />
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
      </Table.Row>
    )


  }
}

export default SongRow;

import React from 'react';
import {Table, Button, Icon, Checkbox, Rating} from 'semantic-ui-react';
import axios from 'axios';


class SongRow extends React.Component{
  state={
    rating: 0
  }
  static getDerivedStateFromProps(props, state){
    return{
      rating: props.song.rating
    }
  }

  handleRatingChange = (e, d) =>{
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
          <Checkbox />
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

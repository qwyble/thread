import React from 'react';
import {Button} from 'semantic-ui-react';
import axios from 'axios';


class SubscribeToThread extends React.Component{

  state = {
    subscribed: false,
  }


  componentDidUpdate(prevProps){
    if(prevProps.threadId !== this.props.threadId) this.getSubscribed();
  }


  getSubscribed = () => {
    axios.get('https://thread-204819.appspot.com/getSubscribed/'+this.props.threadId,{
      withCredentials: true,
    }).then(result => this.setState({subscribed: result.data.length}))
  }


  handleSubscribe = () => {
    var subbed = 'sub';
    if(this.state.subscribed){
      this.setState({subscribed: false});
      subbed = 'unsub';
    } else {
      this.setState({subscribed: true});
      subbed = 'sub'
    }
    axios({
      method: 'post',
      url: 'https://thread-204819.appspot.com/subscribe/'+subbed,
      data: {
        threadId: this.props.threadId
      },
      withCredentials: true
    });
  }


  render(){
    return(
      <Button onClick={this.handleSubscribe} floated='right'>
        {this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>
    )
  }
}

export default SubscribeToThread;

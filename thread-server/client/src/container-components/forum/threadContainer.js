import React from 'react';
import { Table, Icon,Label,Menu, Button, Loader, Dimmer} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ThreadTable from '../../presentational-components/forum/threadTable.js';


class ThreadContainer extends React.Component{

  state = {
    threads: [],
    _loading: false
  };

  componentDidMount(){
    this.getThreads();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.selectedCategory !== this.props.selectedCategory){
      this.getThreads();
    }
  }


  getThreads = () => {
    this.setState({_loading: true});
    axios({
      method: 'get',
      url: 'http://localhost:8080/getThreads/'+(this.props.selectedCategory || 'all'),
    }).then(result => this.setState({threads: result.data, _loading: false}));
  }



  render(){
        console.log(this.state.threads);
    return(
      <div>
        {this.state._loading ? <Dimmer active inverted><Loader active/></Dimmer> : <div></div>}
        <ThreadTable threads={this.state.threads} />
      </div>
    )
  }
}

export default ThreadContainer;

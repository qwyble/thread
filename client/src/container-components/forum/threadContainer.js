import React from 'react';
import { Loader, Dimmer} from 'semantic-ui-react';
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
      url: 'https://thread-204819.appspot.com/getThreads/'+(this.props.selectedCategory || 'all'),
    }).then(result => this.setState({threads: result.data, _loading: false}));
  }



  render(){
    return(
      <div>
        {this.state._loading ? <Dimmer active inverted><Loader active/></Dimmer> : <div></div>}
        <ThreadTable threads={this.state.threads} />
      </div>
    )
  }
}

export default ThreadContainer;

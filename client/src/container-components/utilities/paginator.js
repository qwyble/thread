import React from 'react';
import {Pagination} from 'semantic-ui-react';



class Paginator extends React.Component{


  handlePageChange = (e, d) => {
    var currentItem = (d.activePage - 1) * 20;
    console.log(currentItem);
    this.props.onSetCurrentItem(currentItem);
  }


  render(){
    return(
      <Pagination
        inverted
        defaultActivePage={1}
        pointing
        secondary
        totalPages={this.props.totalPages}
        onPageChange={this.handlePageChange}
      />
    )
  }
}


export default Paginator;

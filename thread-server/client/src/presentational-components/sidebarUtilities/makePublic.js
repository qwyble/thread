import React from 'react';
import {Button, Icon, Table,} from 'semantic-ui-react';


class MakePublic extends React.Component{
  render(){

    var path = window.location.pathname;
    var publicity = (path !== '/stream' && this.props.isOwner)

    return(
      <Table.HeaderCell colSpan='1'>
        {publicity ?
          <div>
            {this.props.isPublic ?
              <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.props.onMakePrivate}>
                <div><Icon name='privacy' /> Make Private </div>
              </Button>
              : <Button floated='right' icon labelPosition='left' primary size='mini' onClick={this.props.onMakePublic}>
                <div><Icon name='user' /> Make Public </div>
              </Button>
            }
          </div>
          : <div></div>}
      </Table.HeaderCell>
    )
  }
}

export default MakePublic;

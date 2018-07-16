import React from 'react';
import {Container, Grid, Segment, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Logout extends React.Component{
  render(){
    return(
      <div>
        <Container style={{marginTop: '30vh'}}text textAlign="center">
          <Grid verticalAlign='middle' centered columns={3}>
          <Segment >
            Are you sure you want to logout?
            <Button onClick={this.props.onLogout}>yes</Button>
            <Link to='/'><Button>no</Button></Link>
          </Segment>
        </Grid>
        </Container>
      </div>
    )
  }
}
export default Logout;

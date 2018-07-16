import React from 'react';
import {Container, Grid, Image} from 'semantic-ui-react';



class ProfileViewer extends React.Component{
  render(){
    return(
      <div>
        <Container>
          <Grid padded relaxed columns={2}>
            <Grid.Row centered={true}>
              <Grid.Column textAlign='center' width={5}>
                <Image src={this.props.user.imageUrl} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                {this.props.user.userName}
              </Grid.Column>
              <Grid.Column width={8}>
                {this.props.user.email}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default ProfileViewer;

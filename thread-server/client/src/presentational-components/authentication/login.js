import React from 'react';
import {Grid, Container, Button, Input, Form, Segment} from 'semantic-ui-react';

class Login extends React.Component{
  render(){
    return(
      <div>
        <Container style={{marginTop: '30vh'}}text textAlign="center">
          <Grid verticalAlign='middle' centered columns={3}>
          <Segment >
            <Form size='tiny' id="signup" name="signup" onSubmit={this.props.onSubmit}>
              <Form.Field>
                <label>Username</label>
                <Input name="username" type="text" value={this.props.username} onChange={this.props.onInputChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input name="password" type="password" value={this.props.password} onChange={this.props.onInputChange}/>
              </Form.Field>
              <Button type="submit">Login </Button>
            </Form>
          </Segment>
        </Grid>
        </Container>
      </div>
    )
  }
}

export default Login;

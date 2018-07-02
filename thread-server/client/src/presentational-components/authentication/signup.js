import React from 'react';
import {Grid, Container, Button, Input, Form, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Signup extends React.Component{
  render(){
    return(
      <div>
        <Container style={{marginTop: '30vh'}}text textAlign="center">
          <Grid verticalAlign='middle' centered columns={3}>
          <Segment >
            <Form size='tiny' id="signup" name="signup" onSubmit={this.props.onSubmit}>
              <Form.Field>
                <label>Email Address</label>
                <Input name="email" type="email" value={this.props.email} onChange={this.props.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Username</label>
                <Input name="userName" type="text" value={this.props.username} onChange={this.props.onInputChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input name="password" type="password" value={this.props.password} onChange={this.props.onInputChange}/>
              </Form.Field>
              <Button type="submit">Sign Up </Button>
            </Form>
            {this.props.error ? <div>{this.props.error}</div> : <div></div>}
            <br />
            <Link to='/auth/login'>Login</Link>
          </Segment>
        </Grid>
        </Container>
      </div>
    )
  }
}

export default Signup;

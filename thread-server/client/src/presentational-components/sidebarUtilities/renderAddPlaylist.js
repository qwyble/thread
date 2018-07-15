import React from 'react';
import {Transition} from 'react-transition-group';
import {Form, Input, Button } from 'semantic-ui-react';



class RenderAddPlaylist extends React.Component{
  state = {
    _renderAdd: false,
  }

  handleEnter = () => {

    this.setState({_renderAdd: true});
  }

  handleExited = () => {

    this.setState({_renderAdd: false});
  }


  render(){

    const className = {
      entering: 'listSidebar displayed',
      entered: 'listSidebar displayed',
      exiting: 'listSidebar',
      exited: 'listSidebar'
    }

    return(

      <Transition
        onExited={this.handleExited}
        onEnter={this.handleEnter}
        in={this.props.openForm}
        timeout={250}
      >
        {
          (state) => (
            <div className={className[state]}>
              {this.state._renderAdd ?
                <Form onSubmit={() => {
                  this.props.onFormSubmit(this.props.playlistToAdd);
                  this.props.onOpenForm();
                }}>
                <Input
                  size='mini'
                  placeholder='new playlist'
                  value={this.props.playlistToAdd}
                  onChange={this.props.onInputChange}>
                </Input>
                <Button
                  className='button2'
                  inverted fluid color='blue'
                  size='mini'
                  icon='plus'
                  disabled={this.props.toggleSubmit}
                />
              </Form>
                :
                <div></div>
              }
            </div>
          )
        }
      </Transition>

    )
  }
}

export default RenderAddPlaylist;

import React from 'react';
import {Button, Icon, Input, Form} from 'semantic-ui-react';
import {Transition} from 'react-transition-group'

/* renders either 'add category' button or
form to add category.*/
class RenderAddCategory extends React.Component{

  state = {
    categoryToAdd: '',
    err: this.props.err,
    displayForm: false,
    renderForm: false
  }

  handleInputChange = (e) => {
    var value = e.target.value;

    this.setState({categoryToAdd: value, err: ''});
  }


  handleAddClick = () => {
    this.props.onAddCategory(this.state.categoryToAdd);
  }

  validate = () => {
    if(!this.state.categoryToAdd) return true;
    if(this.state.err) return true;
    else return false;
  }

  handleToggle = () => {
    if(this.state.renderForm) this.setState({renderForm: false});
    else this.setState({renderForm: true});
  }

  handleEnter = () => {
    this.setState({displayForm: true});
  }

  handleExited = () => {
    this.setState({displayForm: false});
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
        onEnter={this.handleEnter}
        onExited={this.handleExited}
        in={this.state.renderForm}
        timeout={250}
      >{(state) => (

        <div>
          <div className={className[state]}>
            <div>
              {this.state.displayForm ?
                <div>
                  <Button fluid icon inverted size='mini' color='blue' onClick={this.handleToggle}>
                    <Icon floated='right' name='minus'/>
                  </Button>
                  <Form inverted={true} type='text'>
                    <Input inverted={true} size='mini' placeholder='new category' onChange={this.handleInputChange} value={this.state.categoryToAdd} />
                    <div title={'asdcasdc'}>
                      <Button
                        fluid icon inverted
                        size='mini' type='submit' color='blue'
                        onClick={this.handleAddClick}
                        disabled={this.validate()}
                        >
                          <Icon floated='right' name='plus'/>
                        </Button>
                      </div>
                    </Form>
                  </div>
                :
                <div></div>
              }
              {this.props.err ?
                <Button fluid icon inverted size='mini' color='blue'>
                  {this.props.err}
                </Button> :
                <div></div>
              }
              </div>
            </div>
            {this.state.displayForm ? <div></div> :
              <Button fluid icon inverted size='mini' color='blue' onClick={this.handleToggle}>
                <Icon floated='right' name='plus'/> Category
              </Button>
            }
        </div>

      )}

      </Transition>
    )
  }
}

export default RenderAddCategory;

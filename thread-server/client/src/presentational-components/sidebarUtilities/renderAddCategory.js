import React from 'react';
import AddCategory from './addCategory.js';
import { Menu, Button, Icon } from 'semantic-ui-react';

const RenderAddCategory = ({err, onAddCategory, removeErr}) =>
  <div>
    <div>{err ?
      <Menu.Item>
        <Button inverted className='button2'
          style={{float: 'right', padding: '0'}}
          floated='right' icon size='mini'
          onClick={removeErr}>
          <Icon name='delete' size='tiny'/>
        </Button>
        {err}
      </Menu.Item>
      : <div></div>}
    </div>
    <AddCategory onAddCategory={onAddCategory} />
  </div>

export default RenderAddCategory;

import React from 'react';
import {Menu, Button} from 'semantic-ui-react';

const ForumCategoriesList = ({categories, onSelectCategory}) => (

  <div>
    {categories.map((cat, i) => (
      <Menu.Item className='sideBarItem' key={i}>
        <Button
          inverted color='blue'
          fluid size='mini'
          className='button2'
          onClick={onSelectCategory}
          value={cat.value}
        >
          {cat.text}
        </Button>
      </Menu.Item>
    ))}

  </div>


)

export default ForumCategoriesList

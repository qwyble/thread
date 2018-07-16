import {Menu} from 'semantic-ui-react';
import React from 'react';


const Tabs = (props) => (
  <Menu>
    {props.tabs.map((tab, i) =>
      <Menu.Item
        key={i}
        active={tab.active}
        onClick={() => props.onClick(tab.id)}
      >
        {tab.title}
      </Menu.Item>
    )}
  </Menu>
)


export default Tabs;

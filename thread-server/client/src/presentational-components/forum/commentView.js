import React from 'react';
import {Segment, Item} from 'semantic-ui-react';



const CommentView = ({comment}) => (
  <Segment>
    <Item.Group>
      <Item>
        <Item.Image size='tiny' src={comment.imageUrl} />
        <Item.Content>
          <Item.Header>
            {comment.userName}
          </Item.Header>
          <Item.Meta>{comment.date}</Item.Meta>
          <Item.Description>
            {comment.body}
          </Item.Description>
        </Item.Content>
      </Item>

    </Item.Group>
  </Segment>

)

export default CommentView;

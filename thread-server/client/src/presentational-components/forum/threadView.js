import React from 'react';
import {Segment, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom'


const ThreadView = (props) => (

  <div>
    <Segment>
      {props.thread.Subject}
      <div>
        <Link to={`/profile/${props.thread.UserId}`} >
          {props.thread.userName}
        </Link>
      </div>
    </Segment>
    <Segment>
      <pre>
        {props.thread.Body}
      </pre>
    </Segment>
    <Button onClick={props.onOpenComment}>Comment</Button>
    {props.isOwner ? <Button onClick={() => props.onDeleteThread(props.thread.idThreadPost)}>Delete Thread</Button> : <div></div>}
  </div>

)

export default ThreadView;

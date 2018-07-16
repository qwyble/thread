import {connect} from 'react-redux';
import {deleteMessage, addMessage} from '../../redux/actions/chat/chatActions.js';
import Thread from '../../presentational-components/chat/thread.js'




const mapStateToThreadProps = (state) => {
  const thread = state.threads.find((t) => t.id === state.activeThreadId);

  return{
    thread,
  }
}

const mapDispatchToThreadProps = (dispatch) => (
  {
    onMessageClick: (id) => (
      dispatch(deleteMessage(id))
    ),
    dispatch: dispatch,
  }
)


const mergeThreadProps = (stateProps, dispatchProps) => (
  {
    ...stateProps,
    ...dispatchProps,
    onMessageSubmit: (text) => (
      dispatchProps.dispatch(addMessage(text, stateProps.thread.id))
    ),
  }
)



const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread)



export default ThreadDisplay;

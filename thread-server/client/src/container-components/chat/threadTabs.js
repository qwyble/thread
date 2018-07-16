import {connect} from 'react-redux';
import {openThread} from '../../redux/actions/chat/chatActions';
import Tabs from '../../presentational-components/chat/tabs.js';



const mapStateToTabsProps = (state) => {
  const tabs = state.threads.map(t => (
    {
      title: t.title,
      active: t.id === state.activeThreadId,
      id: t.id,
    }
  ));

  return {
    tabs,
  }
}


const mapDispatchToTabsProps = (dispatch) => (
  {
    onClick: (id) => (
      dispatch(openThread(id))
    )
  }
)


const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs);



export default ThreadTabs;

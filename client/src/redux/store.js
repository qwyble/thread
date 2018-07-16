import {createStore, combineReducers} from 'redux';
import {activeThreadIdReducer, threadsReducer} from './reducers/chatReducers.js'



const reducer = combineReducers({
  activeThreadId: activeThreadIdReducer,
  threads: threadsReducer,
});




 const store = createStore(reducer);


export {store};

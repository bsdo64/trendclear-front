import {combineReducers} from 'redux-immutable';

import List from './List.js';
import Auth from './Auth.js';

// UI reducer
export default combineReducers({
  List,
  Auth
});

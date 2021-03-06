/**
 * Created by dobyeongsu on 2016. 11. 9..
 */
import { combineReducers } from 'redux-immutable';
import Domains from './Domains/index.js';
import UI from './UI/index.js';
const Stores = combineReducers({
  UI,
  Domains,
});

function selectReducer(state, action) {

  switch (action.type) {
    case '@@router/LOCATION_CHANGE' : {
      return state
        .mergeIn(['UI'], action.serverInitData.UI)
        .mergeIn(['Domains'], action.serverInitData.Domains);
    }
    default :
      return state;
  }
}

// Root Reducer
function Root(state, action) {
  const intermediateState = Stores(state, action);
  return selectReducer(intermediateState, action);
}

export default Root;

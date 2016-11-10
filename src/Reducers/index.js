/**
 * Created by dobyeongsu on 2016. 11. 9..
 */
import { combineReducers } from 'redux-immutable';
import {fromJS, Map} from 'immutable';

import Domains from './Domains';
import UI from './UI';
const StoresReducer = combineReducers({
  UI,
  Domains
});

function InitReducer(state, action, StoreName) {
  return state.mergeDeep(fromJS(action.serverInitData[StoreName]));
}

function selectReducer(state, action) {

  switch(action.type) {
    case "@@router/LOCATION_CHANGE" : {
      return Map({
        UI : InitReducer(state.get('UI'), action, 'UI'),
        Domains : InitReducer(state.get('Domains'), action, 'Domains')
      })
    }
    default :
      return state;
  }
}

// Root Reducer
export default function Stores(state, action) {
  const intermediateState = StoresReducer(state, action);
  return selectReducer(intermediateState, action);
}

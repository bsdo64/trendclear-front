/**
 * Created by dobyeongsu on 2016. 11. 9..
 */
import { combineReducers } from 'redux-immutable';
import {fromJS} from 'immutable';
import Domains from './Domains';
import UI from './UI';
const Stores = combineReducers({
  UI,
  Domains
});

function selectReducer(state, action) {

  switch(action.type) {
    case "@@router/LOCATION_CHANGE" : {
      const InitialData = fromJS(action.serverInitData);
      return state.mergeDeep({
        UI: InitialData.get('UI'),
        Domains: InitialData.get('Domains')
      })
    }
    default :
      return state;
  }
}

// Root Reducer
export default function (state, action) {
  const intermediateState = Stores(state, action);
  return selectReducer(intermediateState, action);
}

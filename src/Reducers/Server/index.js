import {Map, fromJS} from 'immutable';

const initList = Map({});

const InitReducer = (state = initList, action) => {

  if (action.type === '@@router/LOCATION_CHANGE') {
    return state.mergeDeep(fromJS(action.serverInitData));
  }

  return state;
};

// Domain reducer
export default InitReducer;

import Immutable from 'immutable';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null,
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
};

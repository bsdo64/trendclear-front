import {Map} from 'immutable';

// ListStore
const initListState = Map({
  scrollHeight: 0
});

const List = (state = initListState, action) => {
  switch(action.type) {
    case 'SET_SCROLL':
      return state.set('scrollHeight', action.scrollHeight);
    default:
      return state;
  }
};

export default List;

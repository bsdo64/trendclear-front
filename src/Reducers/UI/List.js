import { Map, List } from 'immutable';

// ListStore
const initListState = Map({
  scrollHeight: 0,
  CategoryList: List([])
});

const ListReducer = (state = initListState, action) => {
  switch (action.type) {
    case 'SET_SCROLL':
      return state.set('scrollHeight', action.scrollHeight);
    default:
      return state;
  }
};

export default ListReducer;

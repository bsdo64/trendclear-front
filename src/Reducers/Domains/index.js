import {List} from 'immutable';
import {combineReducers} from 'redux-immutable';

const initList = List([]);

const Users = (state = initList, action) => {

  return state;

};
const Posts = (state = initList, action) => {

  return state;

};
const Comments = (state = initList, action) => {

  return state;

};

// Domain reducer
export default combineReducers({
  Users,
  Posts,
  Comments
});

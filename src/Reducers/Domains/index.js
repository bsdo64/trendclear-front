import {List, Map} from 'immutable';
import {combineReducers} from 'redux-immutable';

const initList = Map({});

const Users = (state = initList, action) => {

  return state;

};
const Posts = (state = initList, action) => {

  return state;

};
const Comments = (state = initList, action) => {

  return state;

};

const Forums = (state = initList, action) => {

  return state;

};

const Categories = (state = initList, action) => {

  return state;

};

const Prefixes = (state = initList, action) => {

  return state;

};

const SubComments = (state = initList, action) => {

  return state;

};

// Domain reducer
export default combineReducers({
  Users,
  Posts,
  Comments,
  Forums,
  Categories,
  Prefixes,
  SubComments,
});

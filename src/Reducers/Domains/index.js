import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_LIST
} from '../../Actions/Post';

const initList = Map({});

const Users = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.author)
    }

    case SUCCESS_GET_MORE_LIST: {
      return state.mergeDeep(action.data.entities.author);
    }

    default: return state;
  }
};

const Posts = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.posts)
    }

    case SUCCESS_GET_MORE_LIST: {
      return state.mergeDeep(action.data.entities.posts);
    }

    default: return state;
  }
};

const Comments = (state = initList, action) => {

  return state;
};

const Collections = (state = initList, action) => {

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

const Notis = (state = initList, action) => {

  return state;
};

// Domain reducer
export default combineReducers({
  Users,
  Posts,
  Comments,
  Collections,
  Forums,
  Categories,
  Prefixes,
  SubComments,
  Notis,
});

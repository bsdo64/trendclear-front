import { UI } from '../InitialStates';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_LIST
} from '../../Actions/Post';

const ListReducer = (state = UI.List, action) => {
  switch (action.type) {
    case 'SET_SCROLL': {
      return state.set('scrollHeight', action.scrollHeight);
    }

    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({ bestPostList: action.data.result });
    }

    case SUCCESS_GET_MORE_LIST: {
      const listName = action.listName;
      const normalizedPosts = action.data;

      return state.update(listName, list => list ? list.concat(normalizedPosts.result) : [].concat(normalizedPosts.result));
    }

    default:
      return state;
  }
};

export default ListReducer;

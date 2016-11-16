import { UI } from '../InitialStates';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_LIST
} from '../../Actions/Post';

const Pagination = (state = UI.Pagination, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({ bestPostList: action.collection })
    }

    case SUCCESS_GET_MORE_LIST: {
      const { listName, collection } = action;

      return state.merge({ [listName]: collection });
    }

    default: return state;
  }
};

export default Pagination;

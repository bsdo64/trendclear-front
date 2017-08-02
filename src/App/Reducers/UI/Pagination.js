import { UI } from '../InitialStates';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_POST_LIST,
  SUCCESS_GET_INIT_POST_LIST,
} from '../../Actions/Post';
import {
  SUCCESS_GET_MORE_FORUM_LIST,
} from '../../Actions/Forum';
import {
  SUCCESS_GET_MORE_LIST
} from '../../Actions/List'

const Pagination = (state = UI.Pagination, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({bestPostList: action.collection});
    }

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST:
    case SUCCESS_GET_MORE_FORUM_LIST: {
      const {listName, collection} = action;

      return state.merge({[listName]: collection});
    }

    case SUCCESS_GET_MORE_LIST: {
      return state
        .merge({exploreClubs: action.result.PaginationStore.exploreClubs});
    }

    default:
      return state;
  }
};

export default Pagination;

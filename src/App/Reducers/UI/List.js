import { List } from 'immutable';
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
  SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS,
} from '../../Actions/Collection';
import {
  SUCCESS_DELETE_ITEM,
} from '../../Actions/DeleteItem';
import {
  SUCCESS_GET_MORE_LIST
} from '../../Actions/List';
import { SUCCESS_GET_MORE_ACTIVE_VENALINK_LIST, SUCCESS_GET_MORE_SHARE_VENALINK_LIST } from '../../Actions/Venalink';

const ListReducer = (state = UI.List, action) => {
  switch (action.type) {
    case 'SET_SCROLL': {
      return state.set('scrollHeight', action.scrollHeight);
    }

    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({bestPostList: action.data.result});
    }

    case SUCCESS_GET_INIT_POST_LIST: {
      const listName = action.listName;
      const normalizedPosts = action.data;

      return state.merge({[listName]: normalizedPosts.result});
    }

    case SUCCESS_GET_MORE_POST_LIST: {
      const listName = action.listName;
      const normalizedPosts = action.data;

      return state
        .update(listName, list =>
          list
            ? list.concat(normalizedPosts.result)
            : [].concat(normalizedPosts.result)
        );
    }

    case SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS: {
      return state
        .merge({searchCollectionForumList: action.normalizedForums.result});
    }

    case SUCCESS_DELETE_ITEM: {
      const item = action.item;

      if (!item.comment_id && !item.post_id) {
        if (state.get('bestPostList')) {
          const itemIndex = state
            .get('bestPostList')
            .findIndex(postId => postId === item.id);
          const deletedList = state.get('bestPostList').splice(itemIndex, 1);
          return state.set('bestPostList', deletedList);
        }

        if (state.get('myWritePostList')) {
          const itemIndex = state
            .get('myWritePostList')
            .findIndex(postId => postId === item.id);
          const deletedList = state.get('myWritePostList').splice(itemIndex, 1);
          return state.set('myWritePostList', deletedList);
        }

        if (state.get('likePostList')) {
          const itemIndex = state
            .get('likePostList')
            .findIndex(postId => postId === item.id);
          const deletedList = state.get('likePostList').splice(itemIndex, 1);
          return state.set('likePostList', deletedList);
        }
      }

      return state;
    }

    case SUCCESS_GET_MORE_FORUM_LIST: {
      return state.set('searchForumList', new List(action.data.result));
    }

    case SUCCESS_GET_MORE_LIST: {
      return state
        .update('exploreClubs', list =>
          list
            ? list.concat(action.result.ListStore.exploreClubs)
            : [].concat(action.result.ListStore.exploreClubs)
        );
    }

    case SUCCESS_GET_MORE_ACTIVE_VENALINK_LIST: {
      const { result } = action;
      return state.set('userVenalinks', new List(result.normalized.result))
    }

    case SUCCESS_GET_MORE_SHARE_VENALINK_LIST: {
      const {result} = action;

      return state.set('userParticipatedVenalinks', new List(result.normalized.result));
    }

    default:
      return state;
  }
};

export default ListReducer;

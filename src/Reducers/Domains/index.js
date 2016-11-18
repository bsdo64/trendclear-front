import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

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
  SUCCESS_CREATE_COLLECTION,
  SUCCESS_ADD_FORUM_IN_COLLECTION,
  SUCCESS_REMOVE_FORUM_IN_COLLECTION,
  SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS,
} from '../../Actions/Collection';
import {
  SUCCESS_DELETE_ITEM
} from '../../Actions/DeleteItem';

const initList = Map({});

const Users = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.author)
    }

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST:
    case SUCCESS_GET_MORE_FORUM_LIST: {
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

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST: {
      return state.mergeDeep(action.data.entities.posts);
    }

    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && !item.comment_id && !item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    default: return state;
  }
};

const Comments = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && !item.comment_id && item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    default: return state;
  }
};

const Collections = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_CREATE_COLLECTION: {
      return state.merge({ [action.collection.id]: action.collection })
    }

    case SUCCESS_ADD_FORUM_IN_COLLECTION: {
      const { collectionId, normalizedForum } = action;
      const forumId = normalizedForum.result;
      return state.updateIn([collectionId.toString(), 'forums'], forumIds => {
        return forumIds.push(forumId);
      });
    }

    case SUCCESS_REMOVE_FORUM_IN_COLLECTION: {
      const { collectionId, forumId, removeSuccess } = action;
      if (removeSuccess) {
        return state.updateIn([collectionId.toString(), 'forums'], forumIds => forumIds.filter(id => id !== forumId))
      } else {
        return state;
      }
    }

    default: return state;
  }
};

const Forums = (state = initList, action) => {
  switch (action.type) {

    case SUCCESS_ADD_FORUM_IN_COLLECTION: {
      const { normalizedForum } = action;
      const forumId = normalizedForum.result;

      return state.update(forumId.toString(), forum => {
        return forum.update('subs_count', v => v + 1);
      });
    }

    case SUCCESS_REMOVE_FORUM_IN_COLLECTION: {
      const { forumId } = action;
      return state.update(forumId.toString(), forum => forum.update('subs_count', v => v - 1));
    }

    case SUCCESS_SEARCH_FORUM_TO_COLLECTION_SUBS: {
      return state.mergeDeep(action.normalizedForums.entities.forums);
    }

    case SUCCESS_GET_MORE_FORUM_LIST: {
      return state.mergeDeep(action.data.entities.forums);
    }

    default: return state;
  }
};

const Categories = (state = initList, action) => {

  return state;
};

const Prefixes = (state = initList, action) => {

  return state;
};

const SubComments = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      if (item && item.id && item.comment_id && !item.post_id) {
        return state.updateIn([item.id.toString(), 'deleted'], () => true);
      }

      return state;
    }

    default: return state;
  }
};

const Notis = (state = initList, action) => {
  switch (action.type) {
    case SUCCESS_DELETE_ITEM: {
      const item = action.item;
      // Post
      if (item && item.id && !item.comment_id && !item.post_id) {
        return state.filter(noti => noti.get('post_id') !== item.id);
      }

      return state;
    }

    default: return state;
  }
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

import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import {
  SUCCESS_USER_AVATAR_IMAGE_UPLOAD
} from '../../Actions/User';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';
import {
  SUCCESS_GET_MORE_POST_LIST,
  SUCCESS_GET_INIT_POST_LIST,
  SUCCESS_LIKE_POST,
  FAILURE_LIKE_POST,
} from '../../Actions/Post';
import {
  SUCCESS_LIKE_COMMENT,
  SUCCESS_LIKE_SUB_COMMENT,
  FAILURE_LIKE_COMMENT,
  FAILURE_LIKE_SUB_COMMENT,
  SUCCESS_SUBMIT_COMMENT,
  SUCCESS_SUBMIT_SUB_COMMENT,
  SUCCESS_UPDATE_COMMENT,
  SUCCESS_UPDATE_SUB_COMMENT,
} from '../../Actions/Comment';
import {
  SUCCESS_GET_MORE_FORUM_LIST,
  SUCCESS_FOLLOW_FORUM,
  SUCCESS_UN_FOLLOW_FORUM,
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
  const findUserById = (userId) => {
    if (userId) {
      return state.get(userId.toString())
    } else {
      return null;
    }
  };

  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.mergeDeep(action.data.entities.author)
    }

    case SUCCESS_GET_INIT_POST_LIST:
    case SUCCESS_GET_MORE_POST_LIST:
    case SUCCESS_GET_MORE_FORUM_LIST: {
      return state.mergeDeep(action.data.entities.author);
    }

    case SUCCESS_FOLLOW_FORUM: {
      const userId = action.result.userId;
      const loginUser = findUserById(userId);
      if (loginUser) {
        const updateUser = loginUser
          .update('follow_forums', list => list.push(action.result.forum_id));

        return state.update(userId.toString(), () => updateUser);
      }

      return state;
    }

    case SUCCESS_UN_FOLLOW_FORUM: {
      const userId = action.result.userId;
      const loginUser = findUserById(userId);
      if (loginUser) {
        const updateUser = loginUser
          .update('follow_forums', list => list.filterNot(v => v === action.result.forum_id));

        return state.update(userId.toString(), () => updateUser);
      }

      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.author);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.author);
    }

    case SUCCESS_USER_AVATAR_IMAGE_UPLOAD: {
      const { file, user } = action;
      const fileObj = file.files[0];

      return state.mergeDeep({ [user.user.id]: { profile: { avatar_img: fileObj.name } } });
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

    case SUCCESS_LIKE_POST: {
      const postId = action.postId;
      return state.update(postId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_POST: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.posts);
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

    case SUCCESS_LIKE_COMMENT: {
      const itemId = action.commentId;
      return state.update(itemId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_COMMENT: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.comments);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const { normalized, commentId } = action;
      const subCommentId = normalized.result;

      return state
        .updateIn([commentId.toString(), 'subComments'], list =>
          list.push(subCommentId)
        )
        .updateIn([commentId.toString(), 'sub_comment_count'], value =>
          value + 1
        );
    }

    case SUCCESS_UPDATE_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.comments);
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

    case SUCCESS_FOLLOW_FORUM: {
      const forumId = action.result.forum_id;
      return state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v + 1);
      });
    }

    case SUCCESS_UN_FOLLOW_FORUM: {
      const forumId = action.result.forum_id;
      return state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v - 1);
      });
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

    case SUCCESS_LIKE_SUB_COMMENT: {
      const itemId = action.subCommentId;
      return state.update(itemId.toString(), v => {
        return v.set('like_count', v.get('like_count') + 1).set('liked', true);
      });
    }

    case FAILURE_LIKE_SUB_COMMENT: {
      return state;
    }

    case SUCCESS_SUBMIT_COMMENT: {
      const normalized = action.normalized;
      return state.merge(normalized.entities.subComments);
    }

    case SUCCESS_SUBMIT_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.merge(normalized.entities.subComments);
    }

    case SUCCESS_UPDATE_SUB_COMMENT: {
      const normalized = action.normalized;
      return state.mergeDeep(normalized.entities.subComments);
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

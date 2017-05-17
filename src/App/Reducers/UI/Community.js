import { UI } from '../InitialStates';
import {
  OPEN_COMMENT_UPDATE_VIEW,
  CLOSE_COMMENT_UPDATE_VIEW,
} from '../../Actions/Comment';
import {
  SET_FOCUS_CURRENT_POST
} from '../../Actions/Post';

const Community = (state = UI.Community, action) => {
  const { target, payload } = action;

  switch (action.type) {

    case OPEN_COMMENT_UPDATE_VIEW: {
      return state.merge({
        updateId: target.targetId,
        updateType: target.type,
        updating: true,
      });
    }

    case CLOSE_COMMENT_UPDATE_VIEW: {
      return state.merge({
        updateId: null,
        updateType: null,
        updating: false,
      });
    }

    case SET_FOCUS_CURRENT_POST: {
      return state.merge({
        postId: payload.postId,
        authorId: payload.authorId
      })
    }

    default:
      return state;
  }
};

export default Community;

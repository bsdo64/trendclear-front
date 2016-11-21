import { UI } from '../InitialStates';
import {
  SUCCESS_VALIDATE_TITLE_FORUM_CREATE,
  FAILURE_VALIDATE_TITLE_FORUM_CREATE
} from '../../Actions/Forum';

const SubmitForum = (state = UI.SubmitForum, action) => {
  switch (action.type) {
    case SUCCESS_VALIDATE_TITLE_FORUM_CREATE: {
      return state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', true);
        })
        .setIn(['form', 'error'], null);
    }

    case FAILURE_VALIDATE_TITLE_FORUM_CREATE: {
      return state
        .updateIn(['form', 'didValidate'], item => {
          return item.set('title', true);
        })
        .updateIn(['form', 'validate'], item => {
          return item.set('title', false);
        })
        .setIn(['form', 'error'], action.result);
    }

    default:
      return state;
  }
};

export default SubmitForum;

import { UI } from '../InitialStates';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';

const ListReducer = (state = UI.List, action) => {
  switch (action.type) {
    case 'SET_SCROLL': {
      return state.set('scrollHeight', action.scrollHeight);
    }

    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({ bestPostList: action.data.result });
    }

    default:
      return state;
  }
};

export default ListReducer;

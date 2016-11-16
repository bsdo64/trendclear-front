import { UI } from '../InitialStates';
import {
  SUCCESS_SAVE_FOLLOWING_FILTER,
} from '../../Actions/Gnb';

const Pagination = (state = UI.Pagination, action) => {
  switch (action.type) {
    case SUCCESS_SAVE_FOLLOWING_FILTER: {
      return state.merge({ bestPostList: action.collection })
    }
    default: return state;
  }
};

export default Pagination;

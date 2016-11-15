import { Map } from 'immutable';
import { TOGGLE_GNB_PANEL, OPEN_SIDE_CATEGORY, OPEN_FORUM_META } from '../../Actions/Gnb';

const initState = Map({
  openGnb: false
});

const Gnb = (state = initState, action) => {
  switch (action.type) {

    case TOGGLE_GNB_PANEL: {
      return state.set('openGnb', !state.get('openGnb'))
    }

    case OPEN_SIDE_CATEGORY: {
      return state.setIn(['gnbMenu', 'openSideNow'], action.clubId);
    }

    case OPEN_FORUM_META: {
      return state.setIn(['gnbMenu', 'openForumMeta'], action.forumId);
    }

    default:
      return state;
  }
};

export default Gnb;

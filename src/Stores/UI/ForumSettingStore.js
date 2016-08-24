import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ForumActions from '../../Actions/ForumActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

import Users from '../Domain/Users';
import Forums from '../Domain/Forums';
import Posts from '../Domain/Posts';
import GnbStore from '../GnbStore';

import {normalize, arrayOf} from 'normalizr';
import {club, post, prefix, comment, noti} from '../../Model/normalizr/schema';

class ForumSettingStore {
  static displayName = 'ForumSettingStore';
  constructor() {
    this.displayName = 'ForumSettingStore';


    this.bindActions(ForumActions);
    this.bindActions(ForumSettingActions);

    this.state = Immutable.Map({
      forumInfo: {
        success: null
      }
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onPatchForum(forum) {
    if (forum) {
      const state = this.state.setIn(['forumInfo', 'success'], 'updated');
      this.setState(state);
    } else {
      const state = this.state.setIn(['forumInfo', 'success'], 'failed');
      this.setState(state);
    }
  }

  onResetButton() {
    const state = this.state.setIn(['forumInfo', 'success'], null);
    this.setState(state);
  }

  onChangeForumData(object) {
    const state = this.state.mergeIn(['forumInfo'], object);
    this.setState(state);
  }
}

export default alt.createStore(immutable(ForumSettingStore), ForumSettingStore.displayName);

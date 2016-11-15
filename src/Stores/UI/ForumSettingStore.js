import alt from '../../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import ForumActions from '../../Actions/ForumActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';
import { initListener, setMergeState } from '../Helper/func';

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

  onAddForumPrefix(prefixObj) {
    const state = this.state.updateIn(['forum', 'prefixes'], list => {
      return list.push(Map(prefixObj))
    });
    this.setState(state);
  }

  onUpdateForumPrefix(prefixObj) {
    const state = this.state.updateIn(['forum', 'prefixes'], list => {
      const entry = list.findEntry(i => i.get('id') === prefixObj.id);
      return list.update(entry[0], i => Map(prefixObj))
    });
    this.setState(state);
  }

  onDeleteForumPrefix({ id }) {
    const state = this.state.updateIn(['forum', 'prefixes'], list => {
      return list.filterNot(i => i.get('id') === id)
    });
    this.setState(state);

  }

  onRemoveAnnounce(params) {
    if (params) {
      const state = this.state.updateIn(['forum', 'announces'], list => {
        return list.filterNot(i => i.get('id') === params.postId)
      });

      this.setState(state);
    }
  }

  onAddBanUser(result) {
    if (result) {
      const state = this.state.updateIn(['forum', 'bans'], list => {
        return list.push(Map(result.user))
      });

      this.setState(state);
    }
  }

  onRemoveManager(params) {
    if (params) {
      const state = this.state.updateIn(['forum', 'managers'], list => {
        return list.filterNot(i => i.get('id') === params.userId)
      });

      this.setState(state);
    }
  }
}

export default alt.createStore(immutable(ForumSettingStore), ForumSettingStore.displayName);

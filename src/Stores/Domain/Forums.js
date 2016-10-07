import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState, setMergeDeep } from '../Helper/func';

import GnbActions from '../../Actions/GnbActions';
import CollectionActions from '../../Actions/CollectionActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';
import ForumActions from '../../Actions/ForumActions';
import UserActions from '../../Actions/UserActions';

class Forums {
  static displayName = 'Forums';
  constructor() {
    this.displayName = 'Forums';

    this.bindActions(GnbActions);
    this.bindActions(CollectionActions);
    this.bindActions(UserActions);
    this.bindActions(ForumSettingActions);
    this.bindActions(ForumActions);

    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
    this.setMergeDeep = setMergeDeep.bind(this);
  }

  onGetSearchForumList(result) {
    const normalized = result.data;
    const pagination = result.collection;

    if (normalized) {
      this.setMergeDeep(normalized.entities.forums);
    }
  }

  onAddForum(normalized) {
    if (normalized) {
      const forumId = normalized.result;

      const state = this.state.update(forumId.toString(), forum => {
        return forum.update('subs_count', v => v + 1);
      });

      this.setState(state);
    }
  }

  onRemoveForum(result) {
    if (result) {
      const {forumId} = result;

      const state = this.state.update(forumId.toString(), forum => {
        return forum.update('subs_count', v => v - 1);
      });

      this.setState(state);
    }
  }

  onFindForumByTitle(normalizedForums) {
    this.setMergeDeep(normalizedForums.entities.forums);
  }

  onAddManager(result) {
    const state = this.state.updateIn([result.manager.forum_id, 'managers'], managerList => {
      return managerList.push(result.manager.user_id);
    });

    this.setState(state);
  }

  onAddBanUser(result) {
    if (result) {
      const state = this.state.updateIn([result.bannedUser.forum_id, 'bans'], list => {
        return list.push(result.bannedUser.user_id);
      });

      this.setState(state);
    }
  }

  onFollowForum(result) {
    if (result) {
      const forumId = result.forum_id;
      const state = this.state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v + 1);
      });

      this.setState(state);
    }
  }
  onUnFollowForum(result) {
    if (result) {
      const forumId = result.forum_id;
      const state = this.state.update(forumId.toString(), forum => {
        return forum.update('follow_count', v => v - 1);
      });

      this.setState(state);
    }
  }

  onRemoveManager(params) {
    if (params) {
      const forumId = params.forumId;
      const userId = params.userId;

      const state = this.state.updateIn([forumId.toString(), 'managers'], list => {
        return list.filterNot(i => i === userId)
      });

      this.setState(state);
    }
  }

  onRemoveBanUser(params) {
    if (params) {
      const forumId = params.forumId;
      const userId = params.userId;

      const state = this.state.updateIn([forumId.toString(), 'bans'], list => {
        return list.filterNot(i => i === userId)
      });

      this.setState(state);
    }
  }
}

export default alt.createStore(immutable(Forums), Forums.displayName);

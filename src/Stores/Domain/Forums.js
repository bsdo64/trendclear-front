import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState, setMergeDeep } from '../Helper/func';

import GnbActions from '../../Actions/GnbActions';
import CollectionActions from '../../Actions/CollectionActions';
import ForumSettingActions from '../../Actions/ForumSettingActions';

class Forums {
  static displayName = 'Forums';
  constructor() {
    this.displayName = 'Forums';

    this.bindActions(GnbActions);
    this.bindActions(CollectionActions);
    this.bindActions(ForumSettingActions);

    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
    this.setMergeDeep = setMergeDeep.bind(this);
  }

  onAddForum(normalizedForums) {
    this.setMergeDeep(normalizedForums.entities.forums);
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
}

export default alt.createStore(immutable(Forums), Forums.displayName);

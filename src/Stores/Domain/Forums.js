import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../../Actions/GnbActions';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState, setMergeDeep } from '../Helper/func';

class Forums {
  static displayName = 'Forums';
  constructor() {
    this.displayName = 'Forums';

    this.bindActions(GnbActions);
    this.bindActions(CollectionActions);

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
}

export default alt.createStore(immutable(Forums), Forums.displayName);

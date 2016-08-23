import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../../Actions/GnbActions';
import CollectionActions from '../../Actions/CollectionActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

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
  }

  onAddForum(normalizedForums) {
    this.setMergeState(normalizedForums.entities.forums);
  }

  onFindForumByTitle(normalizedForums) {
    this.setMergeState(normalizedForums.entities.forums);
  }
}

export default alt.createStore(immutable(Forums), Forums.displayName);

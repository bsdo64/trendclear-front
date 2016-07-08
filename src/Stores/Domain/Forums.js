import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import GnbActions from '../../Actions/GnbActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Forums {
  static displayName = 'Forums';
  constructor() {
    this.displayName = 'Forums';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({

    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onAddForum(forums) {
    this.setMergeState(forums);
  }
}

export default alt.createStore(immutable(Forums), Forums.displayName);

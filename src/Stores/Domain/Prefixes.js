import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import CommunityActions from '../../Actions/CommunityActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

class Prefixes {
  static displayName = 'Prefixes';
  constructor() {
    this.displayName = 'Prefixes';

    this.bindActions(AppActions);
    this.bindActions(CommunityActions);
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

  onAddPrefixes(prefixes) {
    this.setMergeState(prefixes);
  }
}

export default alt.createStore(immutable(Prefixes), Prefixes.displayName);

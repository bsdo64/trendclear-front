import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import CommunityActions from '../../Actions/CommunityActions';
import { initListener, setMergeState } from '../Helper/func';

class Prefixes {
  static displayName = 'Prefixes';

  constructor() {
    this.displayName = 'Prefixes';

    this.bindActions(CommunityActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddPrefixes(prefixes) {
    this.setMergeState(prefixes);
  }
}

export default alt.createStore(immutable(Prefixes), Prefixes.displayName);

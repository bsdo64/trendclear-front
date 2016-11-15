import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import NotiActions from '../../Actions/NotiActions';
import { initListener, setMergeState } from '../Helper/func';

class Notis {
  static displayName = 'Notis';

  constructor() {
    this.displayName = 'Notis';

    this.bindActions(NotiActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAddList(notis) {
    this.setMergeState(notis);
  }
}

export default alt.createStore(immutable(Notis), Notis.displayName);

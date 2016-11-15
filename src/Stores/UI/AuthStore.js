import alt from '../../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState } from '../Helper/func';

class AuthStore {
  static get displayName() { return 'AuthStore' }

  constructor() {
    this.displayName = 'AuthStore';

    this.state = Immutable.Map({
      isLogin: false,
      userId: null
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
}

export default alt.createStore(immutable(AuthStore), AuthStore.displayName);

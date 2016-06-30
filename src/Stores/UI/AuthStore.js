import alt from '../../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../../Actions/AppActions';
import { initListener, setMergeState } from '../Helper/func';

class AuthStore {
  constructor() {
    this.displayName = 'AuthStore';

    this.bindActions(AppActions);
    this.state = Immutable.Map({
      isLogin: false,
      userId: null
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
}

export default alt.createStore(immutable(AuthStore), AuthStore.name);

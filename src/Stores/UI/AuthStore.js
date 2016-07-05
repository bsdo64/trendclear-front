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
    const StoreData = bootstrapData[this.displayName];
    if (StoreData && !(this.state.equals(Immutable.fromJS(StoreData))) ) {
      this.setMergeState(StoreData);
    }

  }
}

export default alt.createStore(immutable(AuthStore), AuthStore.name);

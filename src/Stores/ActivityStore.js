import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import SearchActions from '../Actions/SearchActions';
import { initListener, setMergeState } from './Helper/func';

class ActivityStore {
  constructor() {
    this.displayName = 'ActivityStore';

    this.bindActions(AppActions);
    this.bindActions(SearchActions);
    this.state = Immutable.Map({});

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

export default alt.createStore(immutable(ActivityStore), ActivityStore.name);

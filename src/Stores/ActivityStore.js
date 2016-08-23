import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import SearchActions from '../Actions/SearchActions';
import { initListener, setMergeState } from './Helper/func';

class ActivityStore {
  static displayName = 'ActivityStore';
  constructor() {
    this.displayName = 'ActivityStore';

    this.bindActions(SearchActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

}

export default alt.createStore(immutable(ActivityStore), ActivityStore.displayName);

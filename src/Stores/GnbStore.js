import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

class GnbStore{
  static displayName = 'GnbStore';
  constructor() {
    this.displayName = 'GnbStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({
      openGnb: false
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

  onToggleGnb() {
    let state = this.state.set('openGnb', !this.state.get('openGnb'));

    this.setMergeState(state);
  }

  onOpenSideCategory(clubId) {
    let state = this.state.setIn(['gnbMenu', 'openSideNow'], clubId);
    this.setMergeState(state);
  }

  onUpdateFilter(val) {
    this.setMergeState(val);
  }

  onGetForums(categoryId) {
    let state = this.state.set('categorySet', categoryId);
    this.setMergeState(state);
  }

  onSaveFilter() {
    this.setState(this.state);
  }
  onResetFilter() {
    let state = this.state.set('categoryValue', null);
    this.setState(state);
  }
}

export default alt.createStore(immutable(GnbStore), GnbStore.displayName);

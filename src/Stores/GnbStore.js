import alt from '../Utils/alt';
import Immutable from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

class GnbStore {
  static displayName = 'GnbStore';

  constructor() {
    this.displayName = 'GnbStore';

    this.bindActions(GnbActions);
    this.state = Immutable.Map({
      openGnb: false
    });

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
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

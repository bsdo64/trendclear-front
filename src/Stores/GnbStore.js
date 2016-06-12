import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

class GnbStore{
  constructor() {
    this.displayName = 'GnbStore';

    this.bindActions(AppActions);
    this.bindActions(GnbActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }

  onToggleGnb(oppend) {
    let state = this.state.set('openGnb', !oppend);
    this.setMergeState(state);
  }

  onOpenSideCategory(clubId) {
    console.log(clubId);
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
}

export default alt.createStore(immutable(GnbStore));

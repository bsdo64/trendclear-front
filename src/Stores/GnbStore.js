import alt from '../Utills/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import GnbActions from '../Actions/GnbActions';
import { initListener, setMergeState } from './Helper/func';

function GnbStore() {
  this.displayName = 'GnbStore';

  this.bindActions(GnbActions);
  this.state = Immutable.Map({});

  initListener(this);
  this.setMergeState = setMergeState.bind(this);
}

GnbStore.prototype.onToggleGnb = function(oppend) {
  let state = this.state.set('openGnb', !oppend);
  this.setMergeState(state);
};



module.exports = alt.createStore(immutable(GnbStore));

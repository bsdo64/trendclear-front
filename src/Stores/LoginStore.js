import alt from '../Utills/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

function LoginStore() {
  this.displayName = 'LoginStore';
  initListener(this);
  this.setMergeState = setMergeState.bind(this);

  this.bindActions(LoginActions);
  this.state = Immutable.Map({});
}

LoginStore.prototype.onToggleLoginModal = function(open) {
  let state = this.state.set('openLoginModal', !open);
  this.setMergeState(state);
};

LoginStore.prototype.onCloseLoginModal = function () {
  let state = this.state.set('openLoginModal', false);
  this.setMergeState(state);
};

export default alt.createStore(immutable(LoginStore));

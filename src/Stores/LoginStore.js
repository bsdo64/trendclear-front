import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class LoginStore{
  constructor() {
    this.displayName = 'LoginStore';

    this.bindActions(AppActions);
    this.bindActions(LoginActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setState(bootstrapData[this.displayName]);
    }
  }
  onToggleLoginModal(open) {
    let state = this.state.set('openLoginModal', !open);
    this.setMergeState(state);
  }

  onCloseLoginModal() {
    let state = this.state.set('openLoginModal', false);
    this.setMergeState(state);
  }
}

export default alt.createStore(immutable(LoginStore));

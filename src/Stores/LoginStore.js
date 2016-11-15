import alt from '../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState, locationHref } from './Helper/func';

class LoginStore {
  static get displayName() { return 'LoginStore' }

  constructor() {
    this.displayName = 'LoginStore';

    this.bindActions(LoginActions);
    this.state = Immutable.Map({});

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onToggleLoginModal(result) {
    let state = Map({
      openLoginModal: !result.opened,
      location: result.location
    });
    this.setMergeState(state);
  }

  onCloseLoginModal() {
    let state = this.state.set('openLoginModal', false);
    this.setMergeState(state);
  }

  onSendLogin(result) {
    if (result === 'ok') {
      let state = {
        isLogin: true,
        loginSuccess: true,
        loginFail: false,
        openLoginModal: false
      };
      let nextState = Map(state);
      this.setMergeState(nextState);

      const loc = this.state.get('location');
      loc ? locationHref(loc) : locationHref('/');
    } else {
      let state = this.state.set('loginFail', true);
      this.setMergeState(state);
    }
  }

}

export default alt.createStore(immutable(LoginStore), LoginStore.displayName);

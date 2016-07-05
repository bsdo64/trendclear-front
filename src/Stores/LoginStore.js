import alt from '../Utils/alt';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState, locationHref } from './Helper/func';
import {browserHistory} from 'react-router';

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
    const StoreData = bootstrapData[this.displayName];
    if (StoreData && !(this.state.equals(Immutable.fromJS(StoreData))) ) {
      this.setMergeState(StoreData);
    }

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

export default alt.createStore(immutable(LoginStore), LoginStore.name);

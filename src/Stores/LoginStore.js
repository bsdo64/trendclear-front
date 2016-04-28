import alt from '../Utils/alt';
import {browserHistory} from 'react-router';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import AppActions from '../Actions/AppActions';
import LoginActions from '../Actions/LoginActions';
import { initListener, setMergeState } from './Helper/func';

class LoginStore{
  constructor() {
    this.displayName = 'LoginStore';

    this.bindAction(AppActions.init, this.onInit);
    this.bindAction(LoginActions.closeLoginModal, this.onCloseLoginModal);
    this.bindAction(LoginActions.sendLogin, this.onSendLogin);
    this.bindAction(LoginActions.toggleLoginModal, this.onToggleLoginModal);
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

  onSendLogin(result) {
    console.log(' ok ::::::::::::::::::::: -> ', result);
    let state = {
      isLogin: true,
      loginSuccess: true,
      loginFail: false,
      openLoginModal: true
    };
    let nextState = Map(state);
    this.setMergeState(nextState);
  }
}

export default alt.createStore(immutable(LoginStore));

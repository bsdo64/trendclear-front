import alt from '../Utils/alt';
import AppActions from '../Actions/AppActions';
import SigninActions from '../Actions/SigninActions';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState, locationHref } from './Helper/func';

class SigninStore {
  constructor() {
    this.displayName = 'SigninStore';
    
    this.bindActions(AppActions);
    this.bindActions(SigninActions);

    this.state = Map({
      emailDup: null,
      nickDup: null,
      emailRequested: null,
      submitResult: false,
      emailVerifySuccess: false,
      emailVerifyFail: false
    });
    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }
  onInit(bootstrapData) {
    if (bootstrapData[this.displayName]) {
      this.setMergeState(bootstrapData[this.displayName]);
    }
  }
  onCheckEmailDup(result) {
    const dup = parseInt(result.dup, 10);

    if (dup) {
      this.setMergeState({
        emailDup: true
      });
    } else if (!dup) {
      this.setMergeState({
        emailDup: false
      });
    } else {
      this.setMergeState({
        emailDup: null
      });
    }
  }
  onCheckNickDup(result) {
    const dup = parseInt(result.dup, 10);

    if (dup) {
      this.setMergeState({
        nickDup: true
      });
    } else if (!dup) {
      this.setMergeState({
        nickDup: false
      });
    } else {
      this.setMergeState({
        nickDup: null
      });
    }
  }
  onRequestEmailVerify(result) {
    if (result.result === 'ok') {
      this.setMergeState({
        emailRequested: true
      });
    } else {
      this.setMergeState({
        emailRequested: false
      });
    }
  }
  onSubmit(result) {
    if (result.result === 'ok') {
      locationHref('/');
    }
  }
  checkVerifyCode(result) {
    if (result.result === 'ok') {
      this.setMergeState({
        emailVerifySuccess: true,
        emailVerifyFail: false
      });
    } else {
      this.setMergeState({
        emailVerifySuccess: false,
        emailVerifyFail: true
      });
    }
  }
}

export default alt.createStore(immutable(SigninStore));

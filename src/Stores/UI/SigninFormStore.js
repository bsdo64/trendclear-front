import alt from '../../Utils/alt';
import Immutable, { Map } from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import SigninActions from '../../Actions/SigninActions';
import { initListener, setMergeState, locationHref } from '../Helper/func';

const defaultProps = {

  // agree ui
  agreeTerm: false,
  agreePrivacy: false,
  confirmAgree: false,

  // form ui
  emailDup: null,
  nickDup: null,
  emailRequested: null,
  submitResult: false,
  emailVerifySuccess: false,
  emailVerifyFail: false,
  emailVerifyFormOpen: false,

  // form Value
  email: null,
  password: null,
  nick: null,
  sex: null,
  year: null,
  month: null,
  day: null,
  birth: null
};

class SigninFormStore {
  static get displayName() { return 'SigninFormStore' }

  constructor() {

    this.bindActions(SigninActions);
    this.state = Immutable.Map(defaultProps);

    initListener(this);
    this.setMergeState = setMergeState.bind(this);
  }

  onAgreeTerm() {
    const newState = this.state.update('agreeTerm', v => !v);

    this.setState(newState);
  }

  onAgreePrivacy() {
    const newState = this.state.update('agreePrivacy', v => !v);

    this.setState(newState);
  }

  onConfirmAgree() {
    const newState = this.state.update('confirmAgree', () => true);
    this.setState(newState);
  }

  onCheckEmailDup(result) {
    const dup = parseInt(result.dup, 10);
    const newState = this.state.update('emailDup', () => !!dup);
    this.setState(newState);
  }

  onCheckNickDup(result) {
    const dup = parseInt(result.dup, 10);
    const newState = this.state.update('nickDup', () => !!dup);
    this.setState(newState);
  }

  onEmailVerifyFormOpen() {
    const newState = this.state.update('emailVerifyFormOpen', () => true);
    this.setState(newState);
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

  onResetForm() {
    this.setState(Map(defaultProps))
  }
}

export default alt.createStore(immutable(SigninFormStore), SigninFormStore.displayName);

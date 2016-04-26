import alt from '../Utils/alt';
import SigninActions from '../Actions/SigninActions';
import Immutable, {Map} from 'immutable';
import immutable from 'alt-utils/lib/ImmutableUtil';
import { initListener, setMergeState } from './Helper/func';

class SigninStore {
  constructor() {
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
      this.setState({
        emailRequested: true
      });
    } else {
      this.setState({
        emailRequested: false
      });
    }
  }
  onSubmit(result) {
    if (result.result === 'ok') {
      this.setState({
        submitResult: true
      });
    } else {
      this.setState({
        submitResult: false
      });
    }
  }
  checkVerifyCode(result) {
    if (result.result === 'ok') {
      this.setState({
        emailVerifySuccess: true,
        emailVerifyFail: false
      });
    } else {
      this.setState({
        emailVerifySuccess: false,
        emailVerifyFail: true
      });
    }
  }
}

export default alt.createStore(immutable(SigninStore), 'SigninStore');

import alt from '../../../Utils/alt';
import SigninActions from './SigninActions';
import { Map } from 'immutable';

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
  }

  onCheckEmail(result) {
    if (result === 'ok') {
      this.setState({
        emailDup: false
      });
    } else {
      this.setState({
        emailDup: true
      });
    }
  }
  onCheckNick(result) {
    if (result === 'ok') {
      this.setState({
        nickDup: false
      });
    } else {
      this.setState({
        nickDup: true
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

export default alt.createStore(SigninStore, 'SigninStore');

import React from 'react';
import { connect } from 'react-redux';
import { getLoginUser } from '../Util/func';
import Signin from '../../Components/Contents/Signin';

import {
  toggleAgreePrivacy,
  toggleAgreeTerm,
  confirmAgree,
  resetSigninForm,

  requestCheckEmailDup,
  requestCheckNickDup,
  requestEmailVerify,
  requestCheckVerifyCode,
  requestSignin
} from '../../Actions/Signin'

const SigninContainer = React.createClass({
  render() {
    return (<Signin {...this.props} />)
  }
});

const mapStateToProps = (state) => {
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args))
  };

  const getDomainState = function getUIState(args) {
    return state.getIn(['Stores', 'Domains'].concat(args))
  };

  return {
    SigninFormStore: getUIState('SigninForm'),
    UserStore: getLoginUser(getDomainState('Users'), getUIState('Auth')),
  }
};

module.exports = connect(
  mapStateToProps,
  {
    FireToggleAgreePrivacy: toggleAgreePrivacy,
    FireToggleAgreeTerm: toggleAgreeTerm,
    FireConfirmAgree: confirmAgree,
    FireResetSigninForm: resetSigninForm,

    FireRequestCheckEmailDup: requestCheckEmailDup,
    FireRequestCheckNickDup: requestCheckNickDup,
    FireRequestEmailVerify: requestEmailVerify,
    FireRequestCheckVerifyCode: requestCheckVerifyCode,
    FireRequestSignin: requestSignin,
  }
)(SigninContainer);

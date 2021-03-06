import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Selectors/User.js';
import Signin from './components/index.js';
import { UI } from '../../Reducers/InitialStates';

import {
  toggleAgreePrivacy,
  toggleAgreeTerm,
  confirmAgree,
  resetSigninForm,
  emailVerifyFormOpen,

  requestCheckEmailDup,
  requestCheckNickDup,
  requestEmailVerifyCode,
  requestCheckVerifyCode,
  requestSignin,
} from '../../Actions/Signin';

class SigninContainer extends React.Component {
  render() {
    return (<Signin {...this.props} />);
  }
}

SigninContainer.defaultProps = {
  UserStore: UI.User,
  SigninFormStore: UI.SigninForm,
};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');
  const getUIState = function getUIState(args) {
    return state.getIn(['Stores', 'UI'].concat(args));
  };

  return {
    SigninFormStore: getUIState('SigninForm'),
    UserStore: getUser(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireToggleAgreePrivacy: toggleAgreePrivacy,
    FireToggleAgreeTerm: toggleAgreeTerm,
    FireConfirmAgree: confirmAgree,
    FireResetSigninForm: resetSigninForm,
    FireEmailVerifyFormOpen: emailVerifyFormOpen,

    FireRequestCheckEmailDup: requestCheckEmailDup,
    FireRequestCheckNickDup: requestCheckNickDup,
    FireRequestEmailVerifyCode: requestEmailVerifyCode,
    FireRequestCheckVerifyCode: requestCheckVerifyCode,
    FireRequestSignin: requestSignin,
  },
)(SigninContainer);

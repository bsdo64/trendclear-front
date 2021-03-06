/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import PropTypes from 'prop-types';
import SigninAgree from './SigninAgree';
import SigninFormContents from './SigninFormContents';

require('./Signin.scss');
class SigninContents extends React.Component {
  componentWillMount() {
    const { UserStore, history } = this.props;
    if (UserStore && UserStore.get('user')) {
      history.replace('/');
    }
  }

  componentWillUnmount() {
    this.props.FireResetSigninForm();
  }

  render() {
    const { history, SigninFormStore } = this.props;

    const agreeTerm = SigninFormStore.get('agreeTerm');
    const agreePrivacy = SigninFormStore.get('agreePrivacy');
    const confirmAgree = SigninFormStore.get('confirmAgree');

    const signinContentsProps = {
      emailDup: SigninFormStore.get('emailDup'),
      nickDup: SigninFormStore.get('nickDup'),
      emailRequested: SigninFormStore.get('emailRequested'),
      submitResult: SigninFormStore.get('submitResult'),
      emailVerifySuccess: SigninFormStore.get('emailVerifySuccess'),
      emailVerifyFail: SigninFormStore.get('emailVerifyFail'),
      emailVerifyFormOpen: SigninFormStore.get('emailVerifyFormOpen'),

      email: SigninFormStore.get('email'),
      password: SigninFormStore.get('password'),
      nick: SigninFormStore.get('nick'),
      sex: SigninFormStore.get('sex'),
      year: SigninFormStore.get('year'),
      month: SigninFormStore.get('month'),
      day: SigninFormStore.get('day'),
      birth: SigninFormStore.get('birth'),
    };

    return (
      <div id="signing">
        {
          confirmAgree &&
          <SigninFormContents
            {...signinContentsProps}
            history={history}
            FireRequestCheckEmailDup={this.props.FireRequestCheckEmailDup}
            FireRequestCheckNickDup={this.props.FireRequestCheckNickDup}
            FireEmailVerifyFormOpen={this.props.FireEmailVerifyFormOpen}
            FireRequestEmailVerifyCode={this.props.FireRequestEmailVerifyCode}
            FireRequestCheckVerifyCode={this.props.FireRequestCheckVerifyCode}
            FireRequestSignin={this.props.FireRequestSignin}
          />
        }

        {
          !confirmAgree &&
          <SigninAgree
            agreeTerm={agreeTerm}
            agreePrivacy={agreePrivacy}
            confirmAgree={confirmAgree}
            FireToggleAgreePrivacy={this.props.FireToggleAgreePrivacy}
            FireToggleAgreeTerm={this.props.FireToggleAgreeTerm}
            FireConfirmAgree={this.props.FireConfirmAgree}
            FireResetSigninForm={this.props.FireResetSigninForm}
          />
        }
      </div>
    );
  }
}

SigninContents.displayName = 'SigninContents';
SigninContents.propTypes = {
  history: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  SigninFormStore: PropTypes.object.isRequired,
  FireToggleAgreePrivacy: PropTypes.func.isRequired,
  FireToggleAgreeTerm: PropTypes.func.isRequired,
  FireConfirmAgree: PropTypes.func.isRequired,
  FireResetSigninForm: PropTypes.func.isRequired,
  FireEmailVerifyFormOpen: PropTypes.func.isRequired,

  FireRequestCheckEmailDup: PropTypes.func.isRequired,
  FireRequestCheckNickDup: PropTypes.func.isRequired,
  FireRequestEmailVerifyCode: PropTypes.func.isRequired,
  FireRequestCheckVerifyCode: PropTypes.func.isRequired,
  FireRequestSignin: PropTypes.func.isRequired,
};

export default SigninContents;

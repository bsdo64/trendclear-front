/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React from 'react';
import {browserHistory} from 'react-router';

import SigninActions from '../../../Actions/SigninActions';

import SigninAgree from './SigninAgree';
import SigninFormContents from './SigninFormContents';

require('./Signin.scss');
const SigninContents = React.createClass({
  displayName: 'SigninContents',
  propTypes: {},
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount() {
    const {UserStore} = this.props;
    if (UserStore.get('user')) {
      browserHistory.replace('/');
    }
  },
  
  componentWillUnmount() {
    SigninActions.resetForm();
  },

  render() {
    const {SigninFormStore} = this.props;
    
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
      birth: SigninFormStore.get('birth')
    };

    return (
      <div id="signing">
        {
          confirmAgree &&
          <SigninFormContents
            {...signinContentsProps}
          />
        }

        {
          !confirmAgree && <SigninAgree
            agreeTerm={agreeTerm}
            agreePrivacy={agreePrivacy}
            confirmAgree={confirmAgree}
          />
        }
      </div>
    );
  }
});

export default SigninContents;

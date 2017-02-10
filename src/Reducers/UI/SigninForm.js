import { UI } from '../InitialStates';
import debug from 'debug';
const errorLog = debug('vn:action:error');

import {
  TOGGLE_AGREE_TERM,
  TOGGLE_AGREE_PRIVACY,
  CONFIRM_AGREE,
  EMAIL_VERIFY_FORM_OPEN,

  SUCCESS_CHECK_EMAILDUP,
  FAILURE_CHECK_EMAILDUP,
  SUCCESS_CHECK_NICKDUP,
  FAILURE_CHECK_NICKDUP,
  SUCCESS_CHECK_VERIFY_CODE,
  FAILURE_CHECK_VERIFY_CODE,
  SUCCESS_SIGNIN,
  FAILURE_SIGNIN,
  SUCCESS_EMAIL_VERIFY_CODE,
  FAILURE_EMAIL_VERIFY_CODE,
} from '../../Actions/Signin';

const SigninForm = (state = UI.SigninForm, action) => {
  switch (action.type) {

    case TOGGLE_AGREE_TERM: {
      return state.update('agreeTerm', v => !v)
    }

    case TOGGLE_AGREE_PRIVACY: {
      return state.update('agreePrivacy', v => !v);
    }

    case CONFIRM_AGREE: {
      return state.update('confirmAgree', () => true);
    }

    case EMAIL_VERIFY_FORM_OPEN: {
      return state.update('emailVerifyFormOpen', () => true);
    }

    case SUCCESS_CHECK_EMAILDUP: {
      return state.update('emailDup', () => !!action.dup);
    }

    case SUCCESS_CHECK_NICKDUP: {
      return state.update('nickDup', () => !!action.dup);
    }

    case SUCCESS_CHECK_VERIFY_CODE: {
      const result = (action.result === 'ok')
        ? { emailVerifySuccess: true, emailVerifyFail: false }
        : { emailVerifySuccess: false, emailVerifyFail: true };

      return state.merge(result);
    }

    case FAILURE_CHECK_VERIFY_CODE: {
      return state
        .update('emailVerifySuccess', () => false)
        .update('emailVerifyFail', () => true)
    }

    case SUCCESS_EMAIL_VERIFY_CODE: {
      return state.update('emailRequested', () => action.result === 'ok');
    }

    case SUCCESS_SIGNIN: {
      return state.update('submitResult', () => action.result === 'ok');
    }

    case FAILURE_CHECK_NICKDUP:
    case FAILURE_CHECK_EMAILDUP:
    case FAILURE_SIGNIN:
    case FAILURE_EMAIL_VERIFY_CODE: {
      errorLog(action.error);
      break;
    }

    default: return state;
  }
};

export default SigninForm;

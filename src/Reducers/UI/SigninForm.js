import { Map } from 'immutable';
import debug from 'debug';
const errorLog = debug('vn:action:error');

import {
  TOGGLE_AGREE_TERM,
  TOGGLE_AGREE_PRIVACY,
  CONFIRM_AGREE,

  SUCCESS_CHECK_EMAILDUP,
  FAILURE_CHECK_EMAILDUP,
  SUCCESS_CHECK_NICKDUP,
  FAILURE_CHECK_NICKDUP,
  SUCCESS_CHECK_VERIFYCODE,
  FAILURE_CHECK_VERIFYCODE,
} from '../../Actions/Signin';

const initMap = Map({

  // agree ui
  agreeTerm: false,
  agreePrivacy: false,
  confirmAgree: false,

  // form ui
  emailDup: null,
  nickDup: null,
  emailRequested: false,
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
});

const SigninForm = (state = initMap, action) => {
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

    case SUCCESS_CHECK_EMAILDUP: {
      return state.update('emailDup', () => action.dup);
    }

    case SUCCESS_CHECK_NICKDUP: {
      return state.update('nickDup', () => action.dup);
    }

    case SUCCESS_CHECK_VERIFYCODE: {
      return state.update('emailDup', () => action.dup);
    }

    case FAILURE_CHECK_NICKDUP:
    case FAILURE_CHECK_EMAILDUP:
    case FAILURE_CHECK_VERIFYCODE: {
      errorLog(action.error);
      break;
    }

    default: return state;
  }
};

export default SigninForm;

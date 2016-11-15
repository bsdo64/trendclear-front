import { Map } from 'immutable';

import {
  TOGGLE_AGREE_TERM,
  TOGGLE_AGREE_PRIVACY,
  CONFIRM_AGREE
} from '../../Actions/Signin';

const initMap = Map({

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

    default: return state;
  }
};

export default SigninForm;

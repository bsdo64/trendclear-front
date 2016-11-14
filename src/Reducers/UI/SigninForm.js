import {Map, fromJS} from 'immutable';

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

  return state;
};

export default SigninForm;

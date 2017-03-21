export const TOGGLE_AGREE_TERM = 'TOGGLE_AGREE_TERM';
export const TOGGLE_AGREE_PRIVACY = 'TOGGLE_AGREE_PRIVACY';
export const CONFIRM_AGREE = 'CONFIRM_AGREE';
export const RESET_SIGNIN_FORM = 'RESET_SIGNIN_FORM';
export const EMAIL_VERIFY_FORM_OPEN = 'EMAIL_VERIFY_FORM_OPEN';

export const REQUEST_CHECK_EMAILDUP = 'REQUEST_CHECK_EMAILDUP';
export const SUCCESS_CHECK_EMAILDUP = 'SUCCESS_CHECK_EMAILDUP';
export const FAILURE_CHECK_EMAILDUP = 'FAILURE_CHECK_EMAILDUP';

export const REQUEST_CHECK_NICKDUP = 'REQUEST_CHECK_NICKDUP';
export const SUCCESS_CHECK_NICKDUP = 'SUCCESS_CHECK_NICKDUP';
export const FAILURE_CHECK_NICKDUP = 'FAILURE_CHECK_NICKDUP';

export const REQUEST_EMAIL_VERIFY_CODE = 'REQUEST_EMAIL_VERIFY_CODE';
export const SUCCESS_EMAIL_VERIFY_CODE = 'SUCCESS_EMAIL_VERIFY_CODE';
export const FAILURE_EMAIL_VERIFY_CODE = 'FAILURE_EMAIL_VERIFY_CODE';

export const REQUEST_CHECK_VERIFY_CODE = 'REQUEST_CHECK_VERIFY_CODE';
export const SUCCESS_CHECK_VERIFY_CODE = 'SUCCESS_CHECK_VERIFY_CODE';
export const FAILURE_CHECK_VERIFY_CODE = 'FAILURE_CHECK_VERIFY_CODE';

export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';
export const SUCCESS_SIGNIN = 'SUCCESS_SIGNIN';
export const FAILURE_SIGNIN = 'FAILURE_SIGNIN';

export function toggleAgreeTerm() {
  return {
    type: TOGGLE_AGREE_TERM,
  };
}

export function toggleAgreePrivacy() {
  return {
    type: TOGGLE_AGREE_PRIVACY,
  };
}

export function confirmAgree() {
  return {
    type: CONFIRM_AGREE,
  };
}

export function resetSigninForm() {
  return {
    type: RESET_SIGNIN_FORM,
  };
}

export function emailVerifyFormOpen() {
  return {
    type: EMAIL_VERIFY_FORM_OPEN,
  };
}

// Ajax
export function requestCheckEmailDup(payload) {
  return {
    type: REQUEST_CHECK_EMAILDUP,
    payload,
  };
}

export function requestCheckNickDup(payload) {
  return {
    type: REQUEST_CHECK_NICKDUP,
    payload,
  };
}

export function requestEmailVerifyCode(payload) {
  return {
    type: REQUEST_EMAIL_VERIFY_CODE,
    payload,
  };
}

export function requestCheckVerifyCode(payload) {
  return {
    type: REQUEST_CHECK_VERIFY_CODE,
    payload,
  };
}

export function requestSignin(payload) {
  return {
    type: REQUEST_SIGNIN,
    payload,
  };
}

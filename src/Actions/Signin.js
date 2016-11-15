export const TOGGLE_AGREE_TERM = 'TOGGLE_AGREE_TERM';
export const TOGGLE_AGREE_PRIVACY = 'TOGGLE_AGREE_PRIVACY';
export const CONFIRM_AGREE = 'CONFIRM_AGREE';
export const RESET_SIGNIN_FORM = 'RESET_SIGNIN_FORM';

export function toggleAgreeTerm() {
  return {
    type: TOGGLE_AGREE_TERM
  }
}

export function toggleAgreePrivacy() {
  return {
    type: TOGGLE_AGREE_PRIVACY
  }
}

export function confirmAgree() {
  return {
    type: CONFIRM_AGREE
  }
}

export function resetSigninForm() {
  return {
    type: RESET_SIGNIN_FORM
  }
}

export default {
  toggleAgreePrivacy,
  toggleAgreeTerm,
  confirmAgree,
  resetSigninForm
}
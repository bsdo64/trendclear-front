export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export function toggleLoginModal({ contentType, location }) {
  return {
    type: TOGGLE_LOGIN_MODAL,
    contentType,
    location
  }
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL
  }
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

export default {
  toggleLoginModal,
  closeLoginModal,
  requestLogin
}
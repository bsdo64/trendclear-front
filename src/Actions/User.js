export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD';
export const SUCCESS_RESET_PASSWORD = 'SUCCESS_RESET_PASSWORD';
export const FAILURE_RESET_PASSWORD = 'FAILURE_RESET_PASSWORD';

export const REQUEST_USER_AVATAR_IMAGE_UPLOAD = 'REQUEST_USER_AVATAR_IMAGE_UPLOAD';
export const SUCCESS_USER_AVATAR_IMAGE_UPLOAD = 'SUCCESS_USER_AVATAR_IMAGE_UPLOAD';
export const FAILURE_USER_AVATAR_IMAGE_UPLOAD = 'FAILURE_USER_AVATAR_IMAGE_UPLOAD';

export const TOGGLE_AVATAR_MODAL = 'TOGGLE_AVATAR_MODAL';
export const CLOSE_AVATAR_MODAL = 'CLOSE_AVATAR_MODAL';

export function toggleAvatarModal({ data, contentType }) {
  return {
    type: TOGGLE_AVATAR_MODAL,
    data,
    contentType
  }
}

export function requestResetPassword(payload) {
  return {
    type: REQUEST_RESET_PASSWORD,
    payload
  }
}

export function requestUserAvatarImageUpload(payload) {
  return {
    type: REQUEST_USER_AVATAR_IMAGE_UPLOAD,
    payload
  }
}
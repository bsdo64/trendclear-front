import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILURE_RESET_PASSWORD,

  REQUEST_USER_AVATAR_IMAGE_UPLOAD,
  SUCCESS_USER_AVATAR_IMAGE_UPLOAD,
  FAILURE_USER_AVATAR_IMAGE_UPLOAD,

  CLOSE_AVATAR_MODAL
} from '../../Actions/User';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaUserAvatarImageUpload() {
  while (WORKING) {
    // REQUEST_USER_AVATAR_IMAGE_UPLOAD
    const { payload } = yield take(REQUEST_USER_AVATAR_IMAGE_UPLOAD);

    try {
      const file = yield call([Api.setEntryPoint('/image'), Api.postImg], '/upload', payload);
      const user = yield call([Api.setEntryPoint('/ajax'), Api.post], '/user/avatarImg', { file: file.files[0] });

      if (file && file.files[0] && user.user.id) {
        yield put({ type: SUCCESS_USER_AVATAR_IMAGE_UPLOAD, file, user });
        yield put({ type: CLOSE_AVATAR_MODAL });
      } else {
        yield put({ type: FAILURE_USER_AVATAR_IMAGE_UPLOAD })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_USER_AVATAR_IMAGE_UPLOAD, error })
    }
  }
}

function* SagaResetPassword() {
  while (WORKING) {
    // REQUEST_RESET_PASSWORD
    const { payload } = yield take(REQUEST_RESET_PASSWORD);

    try {
      const result = yield call([Api, API.post], '/user/resetPassword', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_RESET_PASSWORD, result })
      } else {
        yield put({ type: FAILURE_RESET_PASSWORD, result })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_RESET_PASSWORD, error })
    }
  }
}

export default function* user() {
  yield [
    SagaResetPassword(),
    SagaUserAvatarImageUpload(),
  ]
}
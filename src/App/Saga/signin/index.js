import { take, put, call } from 'redux-saga/effects';
import Api from '../../../Utils/ApiClient';

import {
  REQUEST_CHECK_EMAILDUP,
  SUCCESS_CHECK_EMAILDUP,
  FAILURE_CHECK_EMAILDUP,

  REQUEST_CHECK_NICKDUP,
  SUCCESS_CHECK_NICKDUP,
  FAILURE_CHECK_NICKDUP,

  REQUEST_CHECK_VERIFY_CODE,
  SUCCESS_CHECK_VERIFY_CODE,
  FAILURE_CHECK_VERIFY_CODE,

  REQUEST_EMAIL_VERIFY_CODE,
  SUCCESS_EMAIL_VERIFY_CODE,
  FAILURE_EMAIL_VERIFY_CODE,

  REQUEST_SIGNIN,
  SUCCESS_SIGNIN,
  FAILURE_SIGNIN,
} from '../../Actions/Signin';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaSignin() {
  while (WORKING) {
    // REQUEST_EMAILVERIFY
    const { payload } = yield take(REQUEST_SIGNIN);

    try {
      const { result } = yield call([Api, API.post], '/signin', payload);
      yield put({ type: SUCCESS_SIGNIN, result });
    }

    catch (error) {
      yield put({ type: FAILURE_SIGNIN, error });
    }
  }
}

function* SagaEmailVerify() {
  while (WORKING) {
    // REQUEST_EMAIL_VERIFY_CODE
    const { payload } = yield take(REQUEST_EMAIL_VERIFY_CODE);

    try {
      const { result } = yield call([Api, API.post],
        '/signin/requestEmailVerify',
        payload);
      yield put({ type: SUCCESS_EMAIL_VERIFY_CODE, result });
    }

    catch (error) {
      yield put({ type: FAILURE_EMAIL_VERIFY_CODE, error });
    }
  }
}

function* SagaCheckVerifyCode() {
  while (WORKING) {
    // REQUEST_CHECK_VERIFYCODE
    const { payload } = yield take(REQUEST_CHECK_VERIFY_CODE);

    try {
      const { result } = yield call([Api, API.post],
        '/signin/checkEmailCodeVerify', payload);

      if (result) {
        yield put({ type: SUCCESS_CHECK_VERIFY_CODE, result });
      } else {
        yield put({ type: FAILURE_CHECK_VERIFY_CODE });
      }

      yield put({ type: SUCCESS_CHECK_VERIFY_CODE, result });
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_VERIFY_CODE, error });
    }
  }
}

function* SagaCheckNickDup() {
  while (WORKING) {
    // REQUEST_CHECK_NICKDUP
    const { payload } = yield take(REQUEST_CHECK_NICKDUP);

    try {
      const { dup } = yield call([Api, API.post], '/signin/checkNickDup',
        payload);
      yield put({ type: SUCCESS_CHECK_NICKDUP, dup });
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_NICKDUP, error });
    }
  }
}

function* SagaCheckEmailDup() {
  while (WORKING) {
    // REQUEST_CHECK_EMAILDUP
    const { payload } = yield take(REQUEST_CHECK_EMAILDUP);

    try {
      const { dup } = yield call([Api, API.post], '/signin/checkEmailDup',
        payload);
      yield put({ type: SUCCESS_CHECK_EMAILDUP, dup });
    }

    catch (error) {
      yield put({ type: FAILURE_CHECK_EMAILDUP, error });
    }
  }
}

function* signinSaga() {
  yield [
    SagaCheckEmailDup(),
    SagaCheckNickDup(),
    SagaCheckVerifyCode(),
    SagaEmailVerify(),
    SagaSignin(),
  ];
}

export default signinSaga;

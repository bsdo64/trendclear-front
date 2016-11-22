import { normalize, arrayOf } from 'normalizr';
import { post } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_POST_LIST,
  SUCCESS_GET_MORE_POST_LIST,
  FAILURE_GET_MORE_POST_LIST,

  REQUEST_GET_INIT_POST_LIST,
  SUCCESS_GET_INIT_POST_LIST,
  FAILURE_GET_INIT_POST_LIST,

  REQUEST_SUBMIT_POST,
  SUCCESS_SUBMIT_POST,
  FAILURE_SUBMIT_POST,

  REQUEST_LIKE_POST,
  SUCCESS_LIKE_POST,
  FAILURE_LIKE_POST,
} from '../../Actions/Post';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaLikePost() {
  while (WORKING) {
    // REQUEST_LIKE_POST
    const { payload } = yield take(REQUEST_LIKE_POST);

    try {
      const result = yield call([Api, API.post], '/like/post', payload);

      if (result === 'ok') {
        yield put({ type: SUCCESS_LIKE_POST, postId: payload.postId })
      } else {
        yield put({ type: FAILURE_LIKE_POST })
      }
    }

    catch (error) {
      yield put({ type: FAILURE_LIKE_POST, error })
    }
  }
}

function* SagaSubmitPost() {
  while (WORKING) {
    // REQUEST_SUBMIT_POST
    const { payload } = yield take(REQUEST_SUBMIT_POST);

    try {
      const result = yield call([Api, API.post], '/community/submit', payload);

      yield put({ type: SUCCESS_SUBMIT_POST, result })
    }

    catch (error) {
      yield put({ type: FAILURE_SUBMIT_POST, error })
    }
  }
}

function* SagaInitList() {
  while (WORKING) {
    // REQUEST_GET_INIT_POST_LIST
    const { payload } = yield take(REQUEST_GET_INIT_POST_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_INIT_POST_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_INIT_POST_LIST, error })
    }
  }
}

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_POST_LIST
    const { payload } = yield take(REQUEST_GET_MORE_POST_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(post));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_POST_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_POST_LIST, error })
    }
  }
}

export default function* postSaga() {
  yield [
    SagaMoreList(),
    SagaLikePost(),
    SagaInitList(),
    SagaSubmitPost(),
  ]
}
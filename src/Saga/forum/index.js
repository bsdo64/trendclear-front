import { normalize, arrayOf } from 'normalizr';
import { forum } from '../../Model/normalizr/schema';

import { take, put, call } from 'redux-saga/effects';
import Api from '../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_FORUM_LIST,
  SUCCESS_GET_MORE_FORUM_LIST,
  FAILURE_GET_MORE_FORUM_LIST,

  REQUEST_FOLLOW_FORUM,
  SUCCESS_FOLLOW_FORUM,
  FAILURE_FOLLOW_FORUM,

  REQUEST_UN_FOLLOW_FORUM,
  SUCCESS_UN_FOLLOW_FORUM,
  FAILURE_UN_FOLLOW_FORUM,

  REQUEST_VALIDATE_TITLE_FORUM_CREATE,
  SUCCESS_VALIDATE_TITLE_FORUM_CREATE,
  FAILURE_VALIDATE_TITLE_FORUM_CREATE,
} from '../../Actions/Forum';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function* SagaVaildateTitleCreateForum() {
  while (WORKING) {
    // REQUEST_VALIDATE_TITLE_FORUM_CREATE
    const { payload } = yield take(REQUEST_VALIDATE_TITLE_FORUM_CREATE);

    try {
      const result = yield call([Api, API.get], '/validate/forum/create', payload);

      if (result.success) {
        yield put({ type: SUCCESS_VALIDATE_TITLE_FORUM_CREATE, result })
      } else if (!result.success && result.type === 'Error') {
        yield put({ type: FAILURE_VALIDATE_TITLE_FORUM_CREATE, result })
      }

    }

    catch (error) {
      yield put({ type: FAILURE_VALIDATE_TITLE_FORUM_CREATE, error })
    }
  }
}

function* SagaUnFollow() {
  while (WORKING) {
    // REQUEST_UN_FOLLOW_FORUM
    const { payload } = yield take(REQUEST_UN_FOLLOW_FORUM);

    try {
      const result = yield call([Api, API.post], '/user/forum/unfollow', payload);

      result.userId = payload.userId;

      yield put({ type: SUCCESS_UN_FOLLOW_FORUM, result })
    }

    catch (error) {
      yield put({ type: FAILURE_UN_FOLLOW_FORUM, error })
    }
  }
}

function* SagaFollow() {
  while (WORKING) {
    // REQUEST_FOLLOW_FORUM
    const { payload } = yield take(REQUEST_FOLLOW_FORUM);

    try {
      const result = yield call([Api, API.post], '/user/forum/follow', payload);

      result.userId = payload.userId;

      yield put({ type: SUCCESS_FOLLOW_FORUM, result })
    }

    catch (error) {
      yield put({ type: FAILURE_FOLLOW_FORUM, error })
    }
  }
}

function* SagaMoreList() {
  while (WORKING) {
    // REQUEST_GET_MORE_FORUM_LIST
    const { payload } = yield take(REQUEST_GET_MORE_FORUM_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      result.data = normalize(result.data, arrayOf(forum));
      result.listName = payload.listName;

      yield put({ type: SUCCESS_GET_MORE_FORUM_LIST, ...result })
    }

    catch (error) {
      yield put({ type: FAILURE_GET_MORE_FORUM_LIST, error })
    }
  }
}

export default function* forumSaga() {
  yield [
    SagaVaildateTitleCreateForum(),
    SagaMoreList(),
    SagaFollow(),
    SagaUnFollow()
  ]
}
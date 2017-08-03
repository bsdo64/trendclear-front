import { all, take, put, call } from 'redux-saga/effects';
import * as schema from '../../../Model/normalizr/schema';
import { normalize } from 'normalizr';
import deepMerge from 'deepmerge';
import Api from '../../../Utils/ApiClient';

import {
  REQUEST_GET_MORE_LIST,
  SUCCESS_GET_MORE_LIST,
  FAILURE_GET_MORE_LIST,
} from '../../Actions/List';

const WORKING = true;
const API = Api.setEntryPoint('/ajax');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createDomainEntities (entities) {
  const schemaMap = {
    Author: 'Users',
  };
  const result = {};

  for (let prop in entities) {
    let schemaName = capitalizeFirstLetter(prop);
    if (schemaMap[schemaName]) {
      schemaName = schemaMap[schemaName];
    }

    result[schemaName] = entities[prop];
  }

  return result;
}

function* SagaRequestMoreList() {
  while (WORKING) {
    // REQUEST_EMAILVERIFY
    const { payload } = yield take(REQUEST_GET_MORE_LIST);

    try {
      const result = yield call([Api, API.get], payload.pathName, payload.params);

      let r = {};
      for (let i = 0; i < result.lists.length; i++) {
        const list = result.lists[i];
        const normalized = normalize(list.data.results, [schema[list.itemSchema]]);
        const schemaEntities = createDomainEntities(normalized.entities);

        r = deepMerge.all([r, schemaEntities, {
          ListStore: { [list.listName]: normalized.result },
          PaginationStore: { [list.listName]: list.collection },
        }]);
      }

      yield put({ type: SUCCESS_GET_MORE_LIST, result: r });
    }

    catch (error) {
      console.log(error);

      yield put({ type: FAILURE_GET_MORE_LIST, error });
    }
  }
}

function* signinSaga() {
  yield all([
    SagaRequestMoreList(),
  ]);
}

export default signinSaga;

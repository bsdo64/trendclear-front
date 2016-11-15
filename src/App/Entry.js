import React from 'react';
import { render } from 'react-dom';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import Router from './Routes';
import configStore from '../Stores/ConfigStore';
if (process.env.NODE_ENV !== 'production') {

  window.Perf = require('react-addons-perf');
  localStorage.debug = 'vn:*'
}

require('core-js');

import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();

const store = configStore(fromJS({ Stores: { UI: {}, Domains: {} } }), sagaMiddleware);

import rootSaga from '../Saga'
sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    {Router(store)}
  </Provider>
  , document.getElementById('app'));

// Socket Actions
require('./socketSubscribe');

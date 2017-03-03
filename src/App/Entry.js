import { AppContainer } from 'react-hot-loader';

import React from 'react';
import { render } from 'react-dom';
import { fromJS } from 'immutable';
import App from './App';
import configStore from '../ConfigStore';
import createSagaMiddleware from 'redux-saga'
import StartSocketSubs from './socketSubscribe';
import rootSaga from '../Saga'

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
  localStorage.debug = 'vn:*'
}

require('core-js');

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
const store = configStore(fromJS({ Stores: { UI: {}, Domains: {} } }), sagaMiddleware);

// Socket Start
StartSocketSubs(store);

// Saga Start
sagaMiddleware.run(rootSaga);

// Render App
const renderApp = Component => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>, 
    document.getElementById('app')
  )
}

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => { renderApp(App); });
}

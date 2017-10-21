import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Map } from 'immutable';
import { UI, Domains } from './Reducers/InitialStates/index';
import App from './routes/index.js';
import configStore from './ConfigStore';
import createSagaMiddleware from 'redux-saga';
import StartSocketSubs from './socketSubscribe';
import rootSaga from './Saga';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'vn:*';
}

require('core-js');

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
const store = configStore(
  Map({ Stores: Map({ UI: Map(UI), Domains: Map(Domains) }) }),
  sagaMiddleware,
);

// Socket Start
StartSocketSubs(store);

// Saga Start
sagaMiddleware.run(rootSaga);

/**
 * Render App with webpack
 * @param Component
 * @returns {*}
 */
const renderApp = (Component) => {
  return render(
    <AppContainer>
      <Component store={store}/>
    </AppContainer>
    , document.getElementById('app'));
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./routes/index.js', () => {
    const App = require('./routes/index.js').default;
    renderApp(App);
  });
}

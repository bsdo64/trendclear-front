import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainHeader from '../components/MainHeader/index.js';
import Home from './Home';
import Signin from './Signin';
import ModalContainer from '../containers/Modal/ModalContainer';
import DataInitializer from '../containers/DataInitializer';

/**
 * Inject redux store to react view, Initialize react-router
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const App = (props) => {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <div>

          <div id="wrap">
            <Route component={MainHeader}/>
            <Switch>
              <Route path="/signin" component={Signin}/>
              <Route component={Home}/>
            </Switch>
          </div>

          <div id="modal">
            <Route component={ModalContainer}/>
          </div>

          <Route component={DataInitializer}/>

        </div>
      </BrowserRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

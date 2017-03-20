import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { 
  BrowserRouter,
  Route
} from 'react-router-dom';

import MainHeader from './containers/MainHeader';
import MainContents from './containers/MainContents';
import ModalContainer from '../Container/Modal/ModalContainer';
import DataInitializer from './containers/DataInitializer';

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
            <Route component={MainContents}/>
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
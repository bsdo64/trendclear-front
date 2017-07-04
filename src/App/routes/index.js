import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bundle from '../components/Bundle/index.js';
import MainHeader from '../components/MainHeader/index.js';
import loadHome from 'bundle-loader?lazy!./Home/index.js';
import Signin from './Signin/index.js';
import FindMember from './Member/FindMember.js';
import ModalContainer from '../components/Modals/ModalContainer.js';
import DataInitializer from '../components/DataInitializer/index.js';
import ScrollToTop from '../components/ScrollToTop/index.js'

const Home = (props) => {
  return <Bundle load={loadHome}>
      {Home => <Home {...props} />}
    </Bundle>
}

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
        <ScrollToTop>
          <div>

            <div id="wrap">
              <Route component={MainHeader}/>
              <Switch>
                <Route path="/signin" component={Signin}/>
                <Route path="/member/find" component={FindMember}/>
                <Route component={Home}/>
              </Switch>
            </div>

            <div id="modal">
              <Route component={ModalContainer}/>
            </div>

            <DataInitializer/>

          </div>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

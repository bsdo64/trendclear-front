import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import RedBox from 'redbox-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bundle from '../components/Bundle/index.js';
import MainHeader from '../components/MainHeader/index.js';
import loadHome from 'bundle-loader?lazy!./Home/index.js';
import loadSignin from 'bundle-loader?lazy!./Signin/index.js';
import FindMember from './Member/FindMember.js';
import ModalContainer from '../components/Modals/ModalContainer.js';
import DataInitializer from '../components/DataInitializer/index.js';
import ScrollToTop from '../components/ScrollToTop/index.js'

const Home = (props) => {
  return <Bundle load={loadHome}>
      {Home => <Home {...props} />}
    </Bundle>
}

const Signin = (props) => {
  return <Bundle load={loadSignin}>
      {Signin => <Signin {...props} />}
    </Bundle>
}

class App extends Component {
  /**
   * Inject redux store to react view, Initialize react-router
   *
   * @param props
   * @returns {XML}
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      componentError: false,
      error: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      componentError: false,
      error: null
    });
  }

  componentDidCatch(error) {
    if (error) {
      this.setState({
        componentError: true,
        error: error
      });

      return console.error(error);
    }
  }

  render() {
    if (this.state.componentError) {
      return (
        <RedBox error={this.state.error}/>
      )
    }

    return (
      <Provider store={this.props.store}>
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
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;

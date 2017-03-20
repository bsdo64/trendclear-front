import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import Router from './Routes';

import { 
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import DataInitializer from './container/DataInitializer';

/* Routes */
import Gnb from '../Container/Gnb';
import HeaderMyMenu from '../Container/Header/MyMenu';
import HeaderSearch from '../Container/Header/Search';
import ModalContainer from '../Container/Modal/ModalContainer';
import ContentsContainer from '../Container/Contents/Best';
import RightSide from '../Container/RightSide/RightSide';
import WidgetContainer from '../Container/RightCol/WidgetContainer';

const Header = (props) => {
  return (
    <div id="global-header">
      <div className="top_area">
        <div className="top_contents">
          <div>
            <div id="top_logo" onClick={() => {
              document.body.scrollTop = 0;
            }}>
              <Link className="ui header inverted huge" to="/">
                <img src={require('../images/Venacle.png')} />
              </Link>
            </div>
            <div id="top_my_area">
              <Route path="*" component={HeaderMyMenu}/>
            </div>
            <div id="top_search">
              <Route path="*" component={HeaderSearch}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Contents = (props) => {
  return (
    <div id="container">
      
      <Route component={Gnb}/>

      {
        /*<div id="left_col">

            /!*<div id="category_menu">
              { props.LeftColGnb }
            </div>
            <div id="category">
              { props.LeftColMenu }
            </div>*!/
          </div>*/
      }

      <div id="section">
        <div id="contents">
          <Route component={ContentsContainer}/>
        </div>

        <Route component={RightSide}/>

        <div id="right_col">
          <Route component={WidgetContainer}/>
        </div>
      </div>
    </div>
  )
}

const Body = (props) => {
  return (
    <div>
      
      <div id="wrap">
        <Route component={Header}/>
        <Route component={Contents}/>
      </div>

      <div id="modal">
        <Route component={ModalContainer}/>
      </div>

      <Route component={DataInitializer}/>

    </div>
  )
};

const App = (props) => {
  return (
    <Provider store={props.store}>
      {/*{Router(props.store)}*/}
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import alt from '../Utils/alt';
import { IndexRedirect, Router, Link, IndexRoute, Route, browserHistory } from 'react-router';
import Api from '../Utils/ApiClient';
import { createHistory } from 'history';

import AppActions from '../Actions/AppActions';

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var LeftColCategoryMenu = require('../Container/LeftCol/CategoryMenu.js');
var HeaderMyMenu = require('../Container/Header/MyMenu');
var LoginModalContainer = require('../Container/Modal/LoginModalContainer');
var WidgetContainer = require('../Container/RightCol/WidgetContainer');

var ContentsContainer = require('../Container/Contents/Best');
var SigninContainer = require('../Container/Contents/Signin');
var CommunityContainer = require('../Container/Contents/Community');

browserHistory.listen((location) => {
  "use strict";
  // 1. location에 따라 모든 Store 데이터를 가져온다
  // 2. 가져온 데이터를 각 Store에 삽입한다
  // 3.
  Api
    .get('/store' + location.pathname, location.query)
    .then(function (resBody, errBody) {
      "use strict";

      console.info('Move: ',location);
      console.info('data: ',resBody);

      AppActions.init(resBody)
    })
});

// Bootstrap Location
var loc = browserHistory.createLocation(location);

Api
  .get('/store' + loc.pathname, loc.query)
  .then(function (resBody, errBody) {
    "use strict";

    console.log('Create Location : ', loc);
    console.log('Window Location : ', location);

    alt.bootstrap(JSON.stringify(resBody));

  })
  .then(function () {
    "use strict";

    ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute
            components={{
          HeaderMyMenu: HeaderMyMenu,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: LeftColCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ContentsContainer: ContentsContainer
        }} />
        </Route>

        <Route path="/signin" component={App}>
          <IndexRoute
            components={{
          HeaderMyMenu: HeaderMyMenu,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: LeftColCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ContentsContainer: SigninContainer
        }} />
        </Route>

        <Route path="/community" component={App}>
          <IndexRoute
            components={{
          HeaderMyMenu: HeaderMyMenu,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: LeftColCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ContentsContainer: CommunityContainer
        }} />
        </Route>

        <Route path="*" component={App}>
          <IndexRedirect to="/" />
        </Route>
      </Router>
    ), document.getElementById('app'));
  });

var App = React.createClass({
  render() {
    return (
      <div>
        <div id="wrap">
          <div id="header">
            <div className="head_contents">
              <div className="top_area">
                <div className="top_contents">
                  <div id="top_logo">
                    <Link className="ui header inverted huge" to="/">Trend Clear</Link>
                  </div>
                  <div id="top_search">
                    <div className="ui input fluid small">
                      <input type="text" placeholder="여기에 검색.." />
                        <div className="results"></div>
                    </div>
                  </div>
                  <div id="top_my_area">
                    { this.props.HeaderMyMenu }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="container">
            <div id="left_col">
              <div id="category_menu">
                { this.props.LeftColGnb }
              </div>
              <div id="category">
                { this.props.LeftColMenu }
              </div>
            </div>
            <div id="section">
              <div id="contents">
                { this.props.ContentsContainer }
              </div>
              <div id="right_col">
                { this.props.WidgetContainer }
              </div>
            </div>
          </div>
        </div>
        <div id="modal">
          { this.props.LoginModalContainer }
        </div>
      </div>
    )
  }
});

//
// ReactDOM.render(
//   <LeftColGlobalCategoryNav />,
//   document.getElementById('category_menu')
// );
//
// ReactDOM.render(
//   <LeftColCategoryMenu />,
//   document.getElementById('category')
// );
//
// ReactDOM.render(
//   <HeaderMyMenu />,
//   document.getElementById('top_my_area')
// );
//
// ReactDOM.render(
//   <LoginModalContainer />,
//   document.getElementById('modal')
// );
//
// ReactDOM.render(
//   <WidgetContainer />,
//   document.getElementById('right_col')
// );
//
// ReactDOM.render(
//   <ContentsContainer />,
//   document.getElementById('contents')
// );

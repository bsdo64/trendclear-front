import React from 'react';
import Perf from 'react-addons-perf'

import ReactDOM from 'react-dom';
import alt from '../Utils/alt';
import { IndexRedirect, Router, Link, IndexRoute, Route, browserHistory } from 'react-router';
import Api from '../Utils/ApiClient';

import AppActions from '../Actions/AppActions';

window.Perf = Perf;

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var LeftColCategoryMenu = require('../Container/LeftCol/CategoryMenu.js');
var BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
var HeaderMyMenu = require('../Container/Header/MyMenu');
var HeaderSearch = require('../Container/Header/Search');
var LoginModalContainer = require('../Container/Modal/LoginModalContainer');
var ReportModalContainer = require('../Container/Modal/ReportModalContainer');
var WidgetContainer = require('../Container/RightCol/WidgetContainer');

var ContentsContainer = require('../Container/Contents/Best');
var SigninContainer = require('../Container/Contents/Signin');
var CommunityContainer = require('../Container/Contents/Community');
var SubmitContainer = require('../Container/Contents/SubmitPost');
var SearchContainer = require('../Container/Contents/Search');
var SettingContainer = require('../Container/Contents/Setting');
var ActivityContainer = require('../Container/Contents/Activity');

// Bootstrap Location
var loc = browserHistory.createLocation(location);

Api
  .setType('/ajax')
  .get('/store' + loc.pathname, loc.query)
  .then(function (resBody, errBody) {
    "use strict";

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
          HeaderSearch: HeaderSearch,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: BestCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ReportModalContainer: ReportModalContainer,
          ContentsContainer: ContentsContainer
        }} />
        </Route>

        <Route path="/signin" component={App}>
          <IndexRoute
            components={{
          HeaderMyMenu: HeaderMyMenu,
          HeaderSearch: HeaderSearch,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: LeftColCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ReportModalContainer: ReportModalContainer,
          ContentsContainer: SigninContainer
        }} />
        </Route>

        <Route path="/community" component={App}>
          <IndexRoute
            components={{
          HeaderMyMenu: HeaderMyMenu,
          HeaderSearch: HeaderSearch,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: LeftColCategoryMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ReportModalContainer: ReportModalContainer,
          ContentsContainer: CommunityContainer
        }} />

          <Route path="submit"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  WidgetContainer: WidgetContainer,
                  ReportModalContainer: ReportModalContainer,
                  ContentsContainer: SubmitContainer
                 }}
          />
        </Route>

        <Route path="/search" component={App}>
          <IndexRoute
            components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: SearchContainer
                 }}
          />
        </Route>

        <Route path="/activity" component={App}>
          <IndexRoute
            components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: ActivityContainer
                 }}
          />

          <Route path="likes"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: ActivityContainer
                 }}
          />

          <Route path="posts"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: ActivityContainer
                 }}
          />

          <Route path="comments"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: ActivityContainer
                 }}
          />

        </Route>

        <Route path="/setting" component={App}>
          <IndexRoute
            components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: SettingContainer
                 }}
          />

          <Route path="password"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: SettingContainer
                 }}
          />

          <Route path="profile"
                 components={{
                  HeaderMyMenu: HeaderMyMenu,
                  HeaderSearch: HeaderSearch,
                  LeftColGnb: LeftColGlobalCategoryNav,
                  LeftColMenu: LeftColCategoryMenu,
                  LoginModalContainer: LoginModalContainer,
                  ReportModalContainer: ReportModalContainer,
                  WidgetContainer: WidgetContainer,
                  ContentsContainer: SettingContainer
                 }}
          />
        </Route>

        <Route path="*" component={App}>
          <IndexRedirect to="/" />
        </Route>
      </Router>
    ), document.getElementById('app'));
  })
  .then(function() {
    "use strict";

    browserHistory.listen((location) => {
      "use strict";
      // 1. location에 따라 모든 Store 데이터를 가져온다
      // 2. 가져온 데이터를 각 Store에 삽입한다
      // 3.
      Api
        .setType('/ajax')
        .get('/store' + location.pathname, location.query)
        .then(function (resBody, errBody) {
          "use strict";

          console.info('Move: ',location);
          console.info('data: ',resBody);

          AppActions.init(resBody)
        })
    });
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
                    <Link className="ui header inverted huge" to="/">
                      <img src="/images/Venacle.png" />
                    </Link>
                  </div>
                  <div id="top_search">
                    { this.props.HeaderSearch }
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
          { this.props.ReportModalContainer }
        </div>
      </div>
    )
  }
});

const socket = require('../Utils/Socket');

socket.on('news', function (data) {
  console.log(data);
});
import React from 'react';
import {IndexRedirect, Link, IndexRoute, Router, Route, browserHistory} from 'react-router';

var LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
var ForumMenu = require('../Container/LeftCol/ForumMenu.js');

var HeaderMyMenu = require('../Container/Header/MyMenu');
var HeaderSearch = require('../Container/Header/Search');

var ContentsContainer = require('../Container/Contents/Best');
var SigninContainer = require('../Container/Contents/Signin');
var CommunityContainer = require('../Container/Contents/Community');
var SubmitContainer = require('../Container/Contents/SubmitPost');
var SubmitForumContainer = require('../Container/Contents/SubmitForum');
var SubmitForumPrefixContainer = require('../Container/Contents/SubmitForumPrefix');
var SearchContainer = require('../Container/Contents/Search');
var SettingContainer = require('../Container/Contents/Setting');
var ActivityContainer = require('../Container/Contents/Activity');

var BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
var AccountCategoryMenu = require('../Container/LeftCol/AccountCategoryMenu');
var SubmitCategoryMenu = require('../Container/LeftCol/SubmitCategoryMenu');

var LoginModalContainer = require('../Container/Modal/LoginModalContainer');
var ReportModalContainer = require('../Container/Modal/ReportModalContainer');
var WidgetContainer = require('../Container/RightCol/WidgetContainer');

const App = React.createClass({
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
                      <img src="/images/Venacle.png"/>
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


export default () =>
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
    }}/>
  </Route>

  <Route path="/signin" component={App}>
    <IndexRoute
      components={{
      HeaderMyMenu: HeaderMyMenu,
      HeaderSearch: HeaderSearch,
      LeftColGnb: LeftColGlobalCategoryNav,
      LeftColMenu: ForumMenu,
      LoginModalContainer: LoginModalContainer,
      WidgetContainer: WidgetContainer,
      ReportModalContainer: ReportModalContainer,
      ContentsContainer: SigninContainer
    }}/>
  </Route>

  <Route path="/community" component={App}>
    <IndexRoute
      components={{
      HeaderMyMenu: HeaderMyMenu,
      HeaderSearch: HeaderSearch,
      LeftColGnb: LeftColGlobalCategoryNav,
      LeftColMenu: ForumMenu,
      LoginModalContainer: LoginModalContainer,
      WidgetContainer: WidgetContainer,
      ReportModalContainer: ReportModalContainer,
      ContentsContainer: CommunityContainer
    }}/>

    <Route path="submit"
           components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: ForumMenu,
              LoginModalContainer: LoginModalContainer,
              WidgetContainer: WidgetContainer,
              ReportModalContainer: ReportModalContainer,
              ContentsContainer: SubmitContainer
             }}
    />

    <Route path="submit/forum"
           components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: SubmitCategoryMenu,
              LoginModalContainer: LoginModalContainer,
              WidgetContainer: WidgetContainer,
              ReportModalContainer: ReportModalContainer,
              ContentsContainer: SubmitForumContainer
             }}
    />

    <Route path="submit/forum/prefix"
           components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: SubmitCategoryMenu,
              LoginModalContainer: LoginModalContainer,
              WidgetContainer: WidgetContainer,
              ReportModalContainer: ReportModalContainer,
              ContentsContainer: SubmitForumPrefixContainer
             }}
    />
  </Route>

  <Route path="/search" component={App}>
    <IndexRoute
      components={{
              HeaderMyMenu: HeaderMyMenu,
              HeaderSearch: HeaderSearch,
              LeftColGnb: LeftColGlobalCategoryNav,
              LeftColMenu: ForumMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
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
              LeftColMenu: AccountCategoryMenu,
              LoginModalContainer: LoginModalContainer,
              ReportModalContainer: ReportModalContainer,
              WidgetContainer: WidgetContainer,
              ContentsContainer: SettingContainer
             }}
    />
  </Route>

  <Route path="*" component={App}>
    <IndexRedirect to="/"/>
  </Route>
</Router>
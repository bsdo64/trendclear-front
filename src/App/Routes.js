import React from 'react';
import {IndexRedirect, Link, IndexRoute, Router, Route, browserHistory} from 'react-router';

const LeftColGlobalCategoryNav = require('../Container/LeftCol/GlobalCategoryNav');
const ForumMenu = require('../Container/LeftCol/ForumMenu.js');
const CollectionMenu = require('../Container/LeftCol/CollectionMenu');

const HeaderMyMenu = require('../Container/Header/MyMenu');
const HeaderSearch = require('../Container/Header/Search');

const ContentsContainer = require('../Container/Contents/Best');
const CollectionContentsContainer = require('../Container/Contents/BestCollection');
const SigninContainer = require('../Container/Contents/Signin');
const CommunityContainer = require('../Container/Contents/Community');
const SubmitContainer = require('../Container/Contents/SubmitPost');
const SubmitForumContainer = require('../Container/Contents/SubmitForum');
const SubmitForumPrefixContainer = require('../Container/Contents/SubmitForumPrefix');
const ForumSettingMain = require('../Container/Contents/ForumSetting');
const SearchContainer = require('../Container/Contents/Search');
const SettingContainer = require('../Container/Contents/Setting');
const ActivityContainer = require('../Container/Contents/Activity');

const BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
const AccountCategoryMenu = require('../Container/LeftCol/AccountCategoryMenu');
const SubmitCategoryMenu = require('../Container/LeftCol/SubmitCategoryMenu');
const ForumSettingMenu = require('../Container/LeftCol/ForumSettingMenu');

const LoginModalContainer = require('../Container/Modal/LoginModalContainer');
const ReportModalContainer = require('../Container/Modal/ReportModalContainer');
const WidgetContainer = require('../Container/RightCol/WidgetContainer');

const App = (props) => {
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
                  { props.HeaderSearch }
                </div>
                <div id="top_my_area">
                  { props.HeaderMyMenu }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="container">
          <div id="left_col">
            <div id="category_menu">
              { props.LeftColGnb }
            </div>
            <div id="category">
              { props.LeftColMenu }
            </div>
          </div>
          <div id="section">
            <div id="contents">
              { props.ContentsContainer }
            </div>
            <div id="right_col">
              { props.WidgetContainer }
            </div>
          </div>
        </div>
      </div>
      <div id="modal">
        { props.LoginModalContainer }
        { props.ReportModalContainer }
      </div>
    </div>
  )
};


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

  <Route path="/collection" component={App}>
    <IndexRedirect to="/" />
  </Route>

  <Route path="/collection/:collectionId" component={App}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: CollectionMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: CollectionContentsContainer
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

    <Route path="settings">
      <IndexRoute
        components={{
          HeaderMyMenu: HeaderMyMenu,
          HeaderSearch: HeaderSearch,
          LeftColGnb: LeftColGlobalCategoryNav,
          LeftColMenu: ForumSettingMenu,
          LoginModalContainer: LoginModalContainer,
          WidgetContainer: WidgetContainer,
          ReportModalContainer: ReportModalContainer,
          ContentsContainer: ForumSettingMain
        }}/>

      <Route path="foruminfo" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="forumurl" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="announce" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="writepost" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="writecomment" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="share" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="promotion" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="managers" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="banlist" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="spams" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="spamreports" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/forum" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/views" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/visitors" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/likerank" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/commentrank" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

      <Route path="stat/viewrank" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        ContentsContainer: ForumSettingMain
      }}/>

    </Route>

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
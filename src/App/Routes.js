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
const PolicyContainer = require('../Container/Contents/Policy');
const CompanyContainer = require('../Container/Contents/Company');

const BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
const AccountCategoryMenu = require('../Container/LeftCol/AccountCategoryMenu');
const PolicyMenu = require('../Container/LeftCol/PolicyMenu');
const CompanyMenu = require('../Container/LeftCol/CompanyMenu');
const SubmitCategoryMenu = require('../Container/LeftCol/SubmitCategoryMenu');
const ForumSettingMenu = require('../Container/LeftCol/ForumSettingMenu');
const SigninMenu = require('../Container/LeftCol/SigninMenu');
const SearchMenu = require('../Container/LeftCol/SearchMenu');

const LoginModalContainer = require('../Container/Modal/LoginModalContainer');
const ReportModalContainer = require('../Container/Modal/ReportModalContainer');
const DeleteModalContainer = require('../Container/Modal/DeleteModalContainer');
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
        { props.DeleteModalContainer }
      </div>
    </div>
  )
};

const HelpApp = (props) => {
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
          </div>
        </div>
      </div>
      <div id="modal">
        { props.LoginModalContainer }
        { props.ReportModalContainer }
        { props.DeleteModalContainer }
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
          DeleteModalContainer: DeleteModalContainer,
      ContentsContainer: ContentsContainer
    }}/>
  </Route>

  <Route path="/all" component={App}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: BestCategoryMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
        ContentsContainer: ContentsContainer
      }}/>
  </Route>

  <Route path="/signin" component={App}>
    <IndexRoute
      components={{
      HeaderMyMenu: HeaderMyMenu,
      HeaderSearch: HeaderSearch,
      LeftColGnb: LeftColGlobalCategoryNav,
      LeftColMenu: SigninMenu,
      LoginModalContainer: LoginModalContainer,
      WidgetContainer: WidgetContainer,
      ReportModalContainer: ReportModalContainer,
      DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
            DeleteModalContainer: DeleteModalContainer,
          ContentsContainer: ForumSettingMain
        }}/>

      <Route path="forumprefix" components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: ForumSettingMenu,
        LoginModalContainer: LoginModalContainer,
        WidgetContainer: WidgetContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
              LeftColMenu: SearchMenu,
              LoginModalContainer: LoginModalContainer,
              ReportModalContainer: ReportModalContainer,
          DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
          DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
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
              DeleteModalContainer: DeleteModalContainer,
              WidgetContainer: WidgetContainer,
              ContentsContainer: SettingContainer
             }}
    />
  </Route>

  <Route path="/policies" component={HelpApp}>
    <IndexRedirect to="privacy"/>

    <Route path="privacy"
           components={{
             HeaderMyMenu: HeaderMyMenu,
             HeaderSearch: HeaderSearch,
             LeftColGnb: LeftColGlobalCategoryNav,
             LeftColMenu: PolicyMenu,
             LoginModalContainer: LoginModalContainer,
             ReportModalContainer: ReportModalContainer,
             DeleteModalContainer: DeleteModalContainer,
             ContentsContainer: PolicyContainer
           }}
    />

    <Route path="terms"
           components={{
             HeaderMyMenu: HeaderMyMenu,
             HeaderSearch: HeaderSearch,
             LeftColGnb: LeftColGlobalCategoryNav,
             LeftColMenu: PolicyMenu,
             LoginModalContainer: LoginModalContainer,
             ReportModalContainer: ReportModalContainer,
             DeleteModalContainer: DeleteModalContainer,
             ContentsContainer: PolicyContainer
           }}
    />

  </Route>

  <Route path="/advertisement" component={HelpApp}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: CompanyMenu,
        LoginModalContainer: LoginModalContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
        WidgetContainer: WidgetContainer,
        ContentsContainer: CompanyContainer
      }}
    />

  </Route>

  <Route path="/about" component={HelpApp}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: CompanyMenu,
        LoginModalContainer: LoginModalContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
        WidgetContainer: WidgetContainer,
        ContentsContainer: CompanyContainer
      }}
    />

  </Route>

  <Route path="/careers" component={HelpApp}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: CompanyMenu,
        LoginModalContainer: LoginModalContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
        WidgetContainer: WidgetContainer,
        ContentsContainer: CompanyContainer
      }}
    />

  </Route>

  <Route path="/help" component={HelpApp}>
    <IndexRoute
      components={{
        HeaderMyMenu: HeaderMyMenu,
        HeaderSearch: HeaderSearch,
        LeftColGnb: LeftColGlobalCategoryNav,
        LeftColMenu: CompanyMenu,
        LoginModalContainer: LoginModalContainer,
        ReportModalContainer: ReportModalContainer,
        DeleteModalContainer: DeleteModalContainer,
        WidgetContainer: WidgetContainer,
        ContentsContainer: CompanyContainer
      }}
    />

  </Route>

  <Route path="*" component={App}>
    <IndexRedirect to="/"/>
  </Route>
</Router>
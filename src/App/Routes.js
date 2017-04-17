import React from 'react';
import {
  IndexRedirect,
  Link,
  IndexRoute,
  Router,
  Route,
} from 'react-router-dom';

const LeftColGlobalCategoryNav = require(
  '../Container/LeftCol/GlobalCategoryNav');
const ForumMenu = require('../Container/LeftCol/ForumMenu.js');
const CollectionMenu = require('../Container/LeftCol/CollectionMenu');
const DefaultMenu = require('../Container/LeftCol/DefaultMenu');

const ContentsContainer = require('../Container/Contents/Best');
const CollectionContentsContainer = require(
  '../Container/Contents/BestCollection');
const SigninContainer = require('../Container/Contents/Signin');
const CommunityContainer = require('../Container/Contents/Community');
const SubmitContainer = require('../Container/Contents/SubmitPost');
const SubmitForumContainer = require('../Container/Contents/SubmitForum');
const ForumSettingMain = require('../Container/Contents/ForumSetting');
const SearchContainer = require('../Container/Contents/Search');
const SettingContainer = require('../Container/Contents/Setting');
const ActivityContainer = require('../Container/Contents/Activity');
const PolicyContainer = require('../Container/Contents/Policy');
const HelpContainer = require('../Container/Contents/Help');
const CompanyContainer = require('../Container/Contents/Company');
const FindMemberContainer = require('../Container/Contents/FindMember');
const ChargePointContainer = require('../Container/Contents/ChargePoint');
const PointListContainer = require('../Container/Contents/PointList');
const ChargeLogListContainer = require('../Container/Contents/ChargeLogList');
const VenalinkActiveList = require('../Container/Contents/VenalinkActiveList');
const VenalinkShareList = require('../Container/Contents/VenalinkShareList');

const BestCategoryMenu = require('../Container/LeftCol/BestCategoryMenu');
const AccountCategoryMenu = require('../Container/LeftCol/AccountCategoryMenu');
const UserPointMenu = require('../Container/LeftCol/UserPointMenu');
const PolicyMenu = require('../Container/LeftCol/PolicyMenu');
const HelpMenu = require('../Container/LeftCol/HelpMenu');
const CompanyMenu = require('../Container/LeftCol/CompanyMenu');
const SubmitForumMenu = require('../Container/LeftCol/SubmitForumMenu');
const SubmitPostMenu = require('../Container/LeftCol/SubmitPostMenu');
const ForumSettingMenu = require('../Container/LeftCol/ForumSettingMenu');
const SigninMenu = require('../Container/LeftCol/SigninMenu');
const SearchMenu = require('../Container/LeftCol/SearchMenu');

const ModalContainer = require('../Container/Modal/ModalContainer');
const WidgetContainer = require('../Container/RightCol/WidgetContainer');

const LeftCol = require('../views/share/LeftCol');
const RightSide = require('../Container/RightSide/RightSide');

const App = (props) => {
  return (
    <div>
      <div id="wrap">
        <div id="global-header">
          <div className="top_area">
            <div className="top_contents">
              <div>
                <div id="top_logo" onClick={() => {
                  document.body.scrollTop = 0;
                }}>
                  <Link className="ui header inverted huge" to="/">
                    <img src={require('../images/Venacle.png')}/>
                  </Link>
                </div>
                <div id="top_my_area">
                </div>
                <div id="top_search">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="container">
          { props.LeftCol }
          {/*<div id="left_col">

           /!*<div id="category_menu">
           { props.LeftColGnb }
           </div>
           <div id="category">
           { props.LeftColMenu }
           </div>*!/
           </div>*/}
          <div id="section">
            <div id="contents">
              { props.ContentsContainer }
            </div>

            { props.RightSide }

            <div id="right_col">
              { props.WidgetContainer }
            </div>
          </div>
        </div>
      </div>
      <div id="modal">
        { props.ModalContainer }
      </div>
    </div>
  );
};

App.propTypes = {
  // LeftColGnb: React.PropTypes.element.isRequired,
  // LeftColMenu: React.PropTypes.element.isRequired,
  ContentsContainer: React.PropTypes.element.isRequired,
  WidgetContainer: React.PropTypes.element.isRequired,
  ModalContainer: React.PropTypes.element.isRequired,
};

const HelpApp = (props) => {
  return (
    <div>
      <div id="wrap">
        <div id="global-header">
          <div className="top_area">
            <div className="top_contents">
              <div id="top_logo">
                <Link className="ui header inverted huge" to="/">
                  <img src="/images/Venacle.png"/>
                </Link>
              </div>
              <div id="top_search">
              </div>
              <div id="top_my_area">
              </div>
            </div>
          </div>
        </div>
        <div id="container">
          <div id="left_col">
            {/*<div id="category_menu">*/}
            {/*{ props.LeftColGnb }*/}
            {/*</div>*/}
            {/*<div id="category">*/}
            {/*{ props.LeftColMenu }*/}
            {/*</div>*/}
          </div>
          <div id="section">
            <div id="contents">
              { props.ContentsContainer }
            </div>
          </div>
        </div>
      </div>
      <div id="modal">
        { props.ModalContainer }
      </div>
    </div>
  );
};

HelpApp.propTypes = {
  LeftColGnb: React.PropTypes.element.isRequired,
  LeftColMenu: React.PropTypes.element.isRequired,
  ContentsContainer: React.PropTypes.element.isRequired,
  ModalContainer: React.PropTypes.element.isRequired,
};

export default (store) => {

  return (
    <Router key={Math.random()} >
      <Route path="/" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            LeftCol: LeftCol,
            //LeftColMenu: BestCategoryMenu,
            RightSide: RightSide,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ContentsContainer,
          }}/>
      </Route>

      <Route path="/all" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: BestCategoryMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ContentsContainer,
          }}/>
      </Route>

      <Route path="/signin" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: SigninMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: SigninContainer,
          }}/>
      </Route>

      <Route path="/collection/:collectionId" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: CollectionMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: CollectionContentsContainer,
          }}/>
      </Route>

      <Route path="/community" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: CommunityContainer,
          }}/>

        <Route path="submit"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: SubmitPostMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SubmitContainer,
               }}
        />

        <Route path="submit/forum"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: SubmitForumMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SubmitForumContainer,
               }}
        />

        <Route path="settings">
          <IndexRoute
            components={{
              //LeftColGnb: LeftColGlobalCategoryNav,
              //LeftColMenu: ForumSettingMenu,
              WidgetContainer: WidgetContainer,
              ModalContainer: ModalContainer,
              ContentsContainer: ForumSettingMain,
            }}/>

          <Route path="forumprefix" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="foruminfo" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="forumurl" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="announce" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="writepost" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="writecomment" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="share" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="promotion" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="managers" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="banlist" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="spams" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="spamreports" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/forum" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/views" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/visitors" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/likerank" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/commentrank" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

          <Route path="stat/viewrank" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: ForumSettingMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ForumSettingMain,
          }}/>

        </Route>

      </Route>

      <Route path="/search" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: SearchMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: SearchContainer,
          }}
        />
      </Route>

      <Route path="/activity" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: AccountCategoryMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: ActivityContainer,
          }}
        />

        <Route path="likes"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: AccountCategoryMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer,
               }}
        />

        <Route path="posts"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: AccountCategoryMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer,
               }}
        />

        <Route path="comments"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: AccountCategoryMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ActivityContainer,
               }}
        />

      </Route>

      <Route path="/user" component={App}>
        <Route path="chargePoint"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: UserPointMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ChargePointContainer,
               }}
        />

        <Route path="points"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: UserPointMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PointListContainer,
               }}
        />

        <Route path="points/chargeLog"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: UserPointMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: ChargeLogListContainer,
               }}
        />

        <Route path="venalinks">
          <IndexRoute
            components={{
              //LeftColGnb: LeftColGlobalCategoryNav,
              //LeftColMenu: UserPointMenu,
              WidgetContainer: WidgetContainer,
              ModalContainer: ModalContainer,
              ContentsContainer: VenalinkActiveList,
            }}/>

          <Route path="active" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: UserPointMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: VenalinkActiveList,
          }}/>

          <Route path="share" components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: UserPointMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: VenalinkShareList,
          }}/>
        </Route>
      </Route>

      <Route path="/setting" component={App}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: AccountCategoryMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: SettingContainer,
          }}
        />

        <Route path="password"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: AccountCategoryMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SettingContainer,
               }}
        />

        <Route path="profile"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: AccountCategoryMenu,
                 WidgetContainer: WidgetContainer,
                 ModalContainer: ModalContainer,
                 ContentsContainer: SettingContainer,
               }}
        />
      </Route>

      <Route path="/policies" component={HelpApp}>
        <IndexRedirect to="privacy"/>

        <Route path="privacy"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: PolicyMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PolicyContainer,
               }}
        />

        <Route path="terms"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: PolicyMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: PolicyContainer,
               }}
        />

      </Route>

      <Route path="/advertisement" component={HelpApp}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: CompanyMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer,
          }}
        />

      </Route>

      <Route path="/about" component={HelpApp}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: CompanyMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer,
          }}
        />

      </Route>

      <Route path="/careers" component={HelpApp}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: CompanyMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: CompanyContainer,
          }}
        />

      </Route>

      <Route path="/help" component={HelpApp}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: HelpMenu,
            ModalContainer: ModalContainer,
            ContentsContainer: HelpContainer,
          }}
        />

        <Route path="guide"
               components={{
                 //LeftColGnb: LeftColGlobalCategoryNav,
                 //LeftColMenu: HelpMenu,
                 ModalContainer: ModalContainer,
                 ContentsContainer: HelpContainer,
               }}
        />

      </Route>

      <Route path="/member/find" component={HelpApp}>
        <IndexRoute
          components={{
            //LeftColGnb: LeftColGlobalCategoryNav,
            //LeftColMenu: DefaultMenu,
            WidgetContainer: WidgetContainer,
            ModalContainer: ModalContainer,
            ContentsContainer: FindMemberContainer,
          }}
        />

      </Route>

      <Route path="*" component={App}>
        <IndexRedirect to="/"/>
      </Route>
    </Router>
  );
};

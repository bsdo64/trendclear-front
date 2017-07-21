import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { getUser } from '../../Selectors/User';
import { toggleLoginModal } from '../../Actions/Login';

import { createLazyMod } from '../../Lib/utils';
const HomeMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/HomeMenuBox/index.js'));
const MyMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/MyMenuBox/index.js'));
const ClubMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ClubMenuBox/index.js'));
const ClubSettingBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ClubSettingBox/index.js'));
const UserMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/UserMenuBoxConnect/index.js'));
const ExploreMenuBox = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ExploreMenuBox/index.js'));
const SubmitMenuBox = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/SubmitMenuBox/index.js'));
const Policy = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/PolicyMenuBox/index.js'));
const SkillBox = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/SkillBox/index.js'));

import styles from './index.css';
import { getSeqPathName, activeStyle } from './func.js';

class LeftBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleLogin = this.handleToggleLogin.bind(this);
  }

  handleToggleLogin() {
    const { location, FireToggleLoginModal } = this.props;
    FireToggleLoginModal({
      contentType: 'Login',
      location: location.pathname + location.search,
    });
  }

  render() {
    const { location, user } = this.props;
    const pathname = getSeqPathName(location.pathname, 1);
    const getStyle = (path) => activeStyle(styles.active, path, pathname);

    return (
      <div className={styles.gnbMenu}>
        <ul className={styles.appIconList}>
          <li className={getStyle(['/', '/collection'])}>
            <Link to="/"><i className="fa fa-home"/></Link>
          </li>
          <li className={getStyle('/explore')}>
            <Link to="/explore"><i className="fa fa-globe"/></Link>
          </li>
          <li className={getStyle('/submit')}>
            <Link to="/submit"><i className="fa fa-pencil"/></Link>
          </li>
          <li className={getStyle('/user')}>
            {
              user &&
              <Link to="/user"><i className="fa fa-user"/></Link>
            }

            {
              !user &&
              <a style={{cursor: 'pointer'}} onClick={this.handleToggleLogin}><i className="fa fa-user"/></a>
            }
          </li>
        </ul>
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(34,36,38,.15)',
          borderBottom: '1px solid rgba(255,255,255,.1)',
        }}>
        </div>
        {
          user &&
          <SkillBox user={user} />
        }
        <ul className={styles.bottomIconList}>
          <li>
            <i className="fa fa-bars"/>
          </li>
        </ul>
      </div>
    );
  }
}

LeftBar.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
  FireToggleLoginModal: PropTypes.object.isRequired
};
LeftBar.defaultProps = {};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    user: getUser(StoreState)
  };
};

const LeftBarContainer = connect(
  mapStateToProps,
  {
    FireToggleLoginModal: toggleLoginModal,
  },
)(LeftBar);

const LeftCol = (props) => {
  return (
    <div id="left_col">

      <LeftBarContainer  {...props} />

      <Switch>

        {/* Activity */}
        <Route path="/activity" component={MyMenuBoxConnect}/>

        {/* User */}
        <Route path="/user" component={UserMenuBoxConnect}/>

        {/* Setting */}
        <Route path="/setting" component={MyMenuBoxConnect}/>

        {/* ClubSetting */}
        <Route path="/club/settings" component={ClubSettingBoxConnect}/>
        <Route path="/club/settings/forumInfo" component={ClubSettingBoxConnect}/>
        <Route path="/club/settings/forumprefix" component={ClubSettingBoxConnect}/>
        <Route path="/club/settings/announce" component={ClubSettingBoxConnect}/>
        <Route path="/club/settings/managers" component={ClubSettingBoxConnect}/>
        <Route path="/club/settings/banlist" component={ClubSettingBoxConnect}/>

        {/* Community */}
        <Route path="/club/:clubId" component={ClubMenuBoxConnect}/>
        <Route path="/collection" component={HomeMenuBoxConnect}/>
        <Route path="/collection/:collectionId" component={HomeMenuBoxConnect}/>

        {/* Gnb Menu */}
        <Route path="/explore" component={ExploreMenuBox}/>
        <Route path="/submit" component={SubmitMenuBox}/>

        {/* Policy Menu */}
        <Route path="/policies" component={Policy}/>
        <Route path="/policies/privacy" component={Policy}/>
        <Route path="/policies/terms" component={Policy}/>

        {/* About, help, etc.. Menu */}
        <Route path="/about" component={Policy}/>
        <Route path="/help" component={Policy}/>

        <Route exact path="/" component={HomeMenuBoxConnect}/>
      </Switch>
    </div>
  )
};

export default LeftCol;

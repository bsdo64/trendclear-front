import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import styles from './index.css';

import HomeMenuBoxConnect from './components/HomeMenuBox/index.js';
import MyMenuBoxConnect from './components/MyMenuBox/index.js';
import ClubMenuBoxConnect from './components/ClubMenuBox/index.js';
import ClubSettingBoxConnect from './components/ClubSettingBox/index.js';
import UserMenuBoxConnect from './components/UserMenuBoxConnect/index.js';
import ExploreMenuBox from './components/ExploreMenuBox/index.js';
import SubmitMenuBox from './components/SubmitMenuBox/index.js';
import Policy from './components/PolicyMenuBox/index.js';
import { getSeqPathName, activeStyle } from './func.js';

class LeftBar extends React.Component {
  render() {
    const { location } = this.props;
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
            <Link to="/user"><i className="fa fa-user"/></Link>
          </li>
        </ul>
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
};
LeftBar.defaultProps = {};

const LeftCol = (props) => {
  return (
    <div id="left_col">

      <LeftBar {...props} />

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

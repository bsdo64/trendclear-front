import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { createLazyMod } from '../../Lib/utils';
const HomeMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/HomeMenuBox/index.js'));
const MyMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/MyMenuBox/index.js'));
const ClubMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ClubMenuBox/index.js'));
const ClubSettingBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ClubSettingBox/index.js'));
const UserMenuBoxConnect = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/UserMenuBoxConnect/index.js'));
const ExploreMenuBox = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/ExploreMenuBox/index.js'));
const SubmitMenuBox = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/SubmitMenuBox/index.js'));
const Policy = createLazyMod(require('bundle-loader?lazy&name=[name]!./components/PolicyMenuBox/index.js'));
import LeftBarContainer from './components/LeftBar';

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

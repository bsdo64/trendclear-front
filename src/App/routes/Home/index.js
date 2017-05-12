import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CollectionIndex from '../Collection/index.js';
import Explore from '../Explore/index.js';
import Writing from '../Submit/index.js';
import Search from '../Search/index.js';
import User from '../User/index.js';
import Activity from '../Activity/index.js';
import RightSide from '../../components/RightSide/index.js';
import GnbLeft from '../../components/GnbLeft/index.js';
import Best from '../../containers/Contents/Best.js';
import Collection from '../../containers/Contents/BestCollection.js';
import Club from '../../containers/Contents/Community.js';
import ForumSetting from '../../containers/Contents/ForumSetting.js';
import Setting from '../../containers/Contents/Setting.js';

import TootipContainer from '../../components/TooltipContainer/index.js';
import InventoryContainer from '../../components/Inventory/InventoryContainer';

const DefaultLayout = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>

            {/* Activity */}
            <Route exact path="/activity" component={Activity}/>
            <Route exact path="/activity/likes" component={Activity}/>
            <Route exact path="/activity/posts" component={Activity}/>
            <Route exact path="/activity/comments" component={Activity}/>

            {/* Setting */}
            <Route exact path="/setting" component={Setting}/>
            <Route exact path="/setting/password" component={Setting}/>
            <Route exact path="/setting/profile" component={Setting}/>

            {/* Search */}
            <Route exact path="/search" component={Search}/>

            {/* Club Setting */}
            <Route exact path="/club/settings" component={ForumSetting}/>
            <Route exact path="/club/settings/forumInfo" component={ForumSetting}/>
            <Route exact path="/club/settings/forumprefix" component={ForumSetting}/>
            <Route exact path="/club/settings/announce" component={ForumSetting}/>
            <Route exact path="/club/settings/managers" component={ForumSetting}/>
            <Route exact path="/club/settings/banlist" component={ForumSetting}/>

            {/* Club */}
            <Route path="/club/:clubId" component={Club}/>

            {/* Collection */}
            <Route exact path="/collection" component={CollectionIndex}/>
            <Route path="/collection/:id" component={Collection}/>

            {/* User */}
            <Route path="/user" component={User}/>

            {/* Gnb Menu Item*/}
            <Route path="/submit" component={Writing}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/" component={Best}/>
          </Switch>
        </div>

        <Route component={RightSide}/>
      </div>

      <TootipContainer />
      <InventoryContainer />
    </div>
  );
};

export default DefaultLayout;

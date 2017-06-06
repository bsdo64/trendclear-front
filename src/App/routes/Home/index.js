import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Content Container */
import CollectionIndex from '../Collection/index.js';
import Explore from '../Explore/index.js';
import Writing from '../Submit/index.js';
import Search from '../Search/index.js';
import User from '../User/index.js';
import Policy from '../Policy/index.js';
import Company from '../Company/index.js';
import Help from '../Help/index.js';
import Best from '../../containers/Contents/Best.js';
import Collection from '../../containers/Contents/BestCollection.js';
import Club from '../Club/index.js';
import ForumSetting from '../../containers/Contents/ForumSetting.js';
import Setting from '../Setting/index.js';

/* RightSide Container */
import RightSide from '../../components/RightSide/index.js';

/* GnbLeftSide Container */
import GnbLeft from '../../components/GnbLeft/index.js';

/* Etc Components */
import TooltipContainer from '../../components/TooltipContainer/index.js';
import InventoryContainer from '../../components/Inventory/InventoryContainer';

const DefaultLayout = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>

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

            {/* Policy, About, etc.. Item*/}
            <Route path="/policies/terms" component={Policy}/>
            <Route path="/policies/privacy" component={Policy}/>
            <Route path="/policies" component={Policy}/>
            <Route path="/about" component={Company}/>
            <Route path="/help" component={Help}/>

            <Route path="/" component={Best}/>
          </Switch>
        </div>

        <Route component={RightSide}/>
      </div>

      <TooltipContainer />
      <InventoryContainer />
    </div>
  );
};

export default DefaultLayout;

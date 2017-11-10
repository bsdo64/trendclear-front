import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createLazyMod } from '../../Lib/utils';

/* Content Container */
const Explore = createLazyMod(require('bundle-loader?lazy!../Explore/index.js'));
const Writing = createLazyMod(require('bundle-loader?lazy!../Submit/index.js'));
const Search = createLazyMod(require('bundle-loader?lazy!../Search/index.js'));
const About = createLazyMod(require('bundle-loader?lazy!../About/index.js'));
const Help = createLazyMod(require('bundle-loader?lazy!../Help/index.js'));
const Setting = createLazyMod(require('bundle-loader?lazy!../Setting/index.js'));
const Club = createLazyMod(require('bundle-loader?lazy!../Club/index.js'));
const Policy = createLazyMod(require('bundle-loader?lazy!../Policy/index.js'));
const User = createLazyMod(require('bundle-loader?lazy!../User/index.js'));
const CollectionIndex = createLazyMod(require('bundle-loader?lazy!../Collection/index.js'));
const Collection = createLazyMod(require('bundle-loader?lazy!../../containers/Contents/BestCollection.js'));
const ForumSetting = createLazyMod(require('bundle-loader?lazy!../../containers/Contents/ForumSetting.js'));
const Best = createLazyMod(require('bundle-loader?lazy!../../containers/Contents/Best.js'));

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
            <Route path="/about" component={About}/>
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

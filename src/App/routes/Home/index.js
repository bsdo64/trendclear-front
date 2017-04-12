import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnbLeft from '../../components/GnbLeft/index.js';
import Best from '../../containers/Contents/Best.js';
import Collection from '../../containers/Contents/BestCollection.js';
import CollectionIndex from '../Collection/index.js';
import Club from '../../containers/Contents/Community.js';
import Setting from '../../containers/Contents/ForumSetting';
import Explore from '../Explore/index.js';
import Writing from '../Submit/index.js';
import User from '../User/index.js';
import RightSide from '../../containers/RightSide/RightSide.js';

const DefaultLayout = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>

            {/* Community */}
            <Route exact path="/collection" component={CollectionIndex}/>
            <Route path="/collection/:id" component={Collection}/>
            <Route exact path="/club/settings" component={Setting}/>
            <Route path="/club/:clubId" component={Club}/>

            {/* Gnb Menu Item*/}
            <Route path="/user" component={User}/>
            <Route path="/submit" component={Writing}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/" component={Best}/>
          </Switch>
        </div>

        <Route component={RightSide}/>
      </div>
    </div>
  );
};

export default DefaultLayout;

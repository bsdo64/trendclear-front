import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GnbLeft from '../../components/GnbLeft/index.js';
import Best from '../../containers/Contents/Best';
import Collection from '../../containers/Contents/BestCollection';
import Club from '../../containers/Contents/Community';
import Explore from '../Explore/index.js';
import Writing from '../Submit/index.js';
import User from '../User/index.js';
import RightSide from '../../containers/RightSide/RightSide.js';
import WidgetContainer from '../../containers/RightCol/WidgetContainer';

const DefaultLayout = () => {
  return (
    <div id="container">

      <Route component={GnbLeft}/>

      <div id="section">
        <div id="contents">
          <Switch>

            {/* Community */}
            <Route path="/collection" component={Collection}/>
            <Route path="/club/:clubId" component={Club}/>

            {/* Gnb Menu Item*/}
            <Route path="/user" component={User}/>
            <Route path="/submit" component={Writing}/>
            <Route path="/explore" component={Explore}/>
            <Route path="/" component={Best}/>
          </Switch>
        </div>

        <Route component={RightSide}/>

        <div id="right_col">
          <Route component={WidgetContainer}/>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

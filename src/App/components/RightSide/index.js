import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FollowingList from './FollowingList.js';
import SubscribingList from './SubscribingList';
import RankList from './RankList.js';
import CompanyInfo from './CompanyInfo.js'
import LatestSeen from './LatestSeen.js';
import FamouseList from './FamousList';
import Guide from './Guide'

import style from './index.css';

const RightSide = () => {
  return (
    <div className={style.rightSide}>

      <Guide />

      <Switch>
        <Route exact path="/" component={FollowingList} />
        <Route exact path="/collection/:clubId" component={SubscribingList} />
      </Switch>

      <RankList />

      <LatestSeen />

      <FamouseList/>

      <CompanyInfo />
    </div>
  );
};

RightSide.propTypes = {};
RightSide.defaultProps = {};

export default RightSide;

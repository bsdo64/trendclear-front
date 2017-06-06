import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main2 from '../Ad/Main2.js';
import style from './index.css';
import FollowingList from './FollowingList.js';
import SubscribingList from './SubscribingList';
import RankList from './RankList.js';
import CompanyInfo from './CompanyInfo.js'
import LatestSeen from './LatestSeen.js';

const RightSide = () => {
  return (
    <div className={style.rightSide}>

      <Switch>
        <Route exact path="/" component={FollowingList} />
        <Route exact path="/collection/:clubId" component={SubscribingList} />
      </Switch>

      <RankList />

      <LatestSeen />

      <Main2
        key="Main2"
        url={require('../../images/venacle-guide.jpg')}
        link="/help/guide"
      />

      <CompanyInfo />
    </div>
  );
};

RightSide.propTypes = {};
RightSide.defaultProps = {};

export default RightSide;

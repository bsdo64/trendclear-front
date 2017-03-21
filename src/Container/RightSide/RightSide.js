import React, {
  Component,
} from 'react';

import style from './index.css';
import FollowingList from './FollowingList.js';
import RankList from './RankList.js';
import FamousList from './FamouseList.js';

class RightSide extends Component {
  render() {
    return (
      <div className={style.rightSide}>
        <FollowingList />
        <RankList />
        <FamousList/>
      </div>
    );
  }
}

RightSide.propTypes = {};
RightSide.defaultProps = {};

module.exports = RightSide;

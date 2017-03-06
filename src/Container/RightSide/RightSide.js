import React, {
  Component,
  PropTypes,
} from 'react';

import style from './index.css';
import RankList from './RankList.js';
import FamousList from './FamouseList.js';

class RightSide extends Component {
  render() {
    return (
      <div className={style.rightSide}>
        <RankList />
        <FamousList/>
      </div>
    );
  }
}

RightSide.propTypes = {};
RightSide.defaultProps = {};

module.exports = RightSide;

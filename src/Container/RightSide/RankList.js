/**
 * Created by bsdo on 17. 3. 4.
 */
import React, {
  Component,
} from 'react';
import cx from 'classnames';
import style from './index.css';

const data = {
  listType: 'clubs',
  listData: [
    {
      rank: 1,
      keyword: '토레스 의식 회복 토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 2,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 3,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 4,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 5,
      keyword: '토레스 의식 회복 토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 6,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 7,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 8,
      keyword: '토레스 의식 회복 토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 9,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
    {
      rank: 10,
      keyword: '토레스 의식 회복',
      url: '/search?query=',
      type: 'new',
    },
  ],
};

class RankList extends Component {
  render() {
    return (
      <div className={cx([style.rankList, style.widgetBox])}>
        <div className={style.issueHeader}>
          <h3>HOT 인기검색어</h3>
        </div>
        <div className={style.issueWrap}>
          <ol>
            {
              data.listData.map((v, index) => {

                return (
                  <li key={index}>
                    <div className={cx([style.listItem])}>

                      <a>
                        <span className={style.numText}><em>{v.rank}</em></span>
                        <span className={style.issueKeyword}>{v.keyword}</span>
                        <span
                          className={style.type}>{v.type.toUpperCase()}</span>
                      </a>
                    </div>
                  </li>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

RankList.propTypes = {};
RankList.defaultProps = {};

export default RankList;

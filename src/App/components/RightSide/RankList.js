/**
 * Created by bsdo on 17. 3. 4.
 */
import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { requestSearchQueryRank } from '../../Actions/Search.js';
import { getSearchQueryRankList } from '../../Selectors/Search';
import style from './index.css';

class RankList extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.FireRequestSearchQueryRank();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.rankList) {
      this.props.FireRequestSearchQueryRank();
    }
  }

  render() {
    const { rankList } = this.props;

    return (
      <div className={cx([style.rankList, style.widgetBox])}>
        <div className={style.issueHeader}>
          HOT 인기검색어
        </div>
        <div className={style.issueWrap}>
          <ol>
            {
              rankList && rankList.map((v, index) => {

                return (
                  <li key={index}>
                    <div className={cx([style.listItem])}>

                      <Link to={`/search?query=${v.get('query')}`}>
                        <span className={style.numText}><em>{index + 1}</em></span>
                        <span className={style.issueKeyword}>{v.get('query')}</span>
                        <span className={style.type}>{'NEW'}</span>
                      </Link>
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

RankList.propTypes = {
  rankList: PropTypes.object,
  FireRequestSearchQueryRank: PropTypes.func.isRequired,
};
RankList.defaultProps = {

};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    rankList: getSearchQueryRankList(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {
    FireRequestSearchQueryRank: requestSearchQueryRank
  }
)(RankList);

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
import { getUser, getLatestSeenList } from '../../Selectors/User.js'
import style from './index.css';

class LatestSeen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { user, latestSeenList } = this.props;

    if (user) {
      return (
        <div className={cx([style.latestSeenList, style.widgetBox])}>
          <div className={style.issueHeader}>
            최근 본 포스트
          </div>
          <div className={style.issueWrap}>
            <ol>
              {
                latestSeenList && latestSeenList.map((v, index) => {

                  const likedClass = cx('fa', {
                    'fa-heart-o': !v.get('liked'),
                    'fa-heart': v.get('liked'),
                  });

                  return (
                    <li key={index}>
                      <div className={cx([style.listItem])}>

                        <Link to={`/club/${v.get('forum_id')}?postId=${v.get('id')}`}>
                          <div className={style.issueKeyword}>
                            {v.get('title')}
                            <div className={style.meta}>
                            <span className={style.type}>
                              <i className={likedClass} />{v.get('like_count')}
                            </span>
                              <span className={style.type}>
                              <i className="fa fa-edit" />{v.get('comment_count')}
                            </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </li>
                  );
                })
              }
            </ol>
          </div>
        </div>

      )
    } else {
      return null;
    }
  }
}

LatestSeen.propTypes = {
  latestSeenList: PropTypes.object,
  user: PropTypes.object,
};
LatestSeen.defaultProps = {

};

const mapStateToProps = (state) => {
  const StoreState = state.get('Stores');

  return {
    latestSeenList: getLatestSeenList(StoreState),
    user: getUser(StoreState),
  };
};

export default connect(
  mapStateToProps,
  {

  }
)(LatestSeen);

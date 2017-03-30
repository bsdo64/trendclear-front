import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { getSeqPathName, activeStyle } from '../../func';
import styles from '../../index.css';

class ExploreMenuBox extends React.Component {
  render() {
    const { match, location } = this.props;
    const pathname = getSeqPathName(location.pathname, 2);
    const getStyle = (path) => activeStyle(styles.activeButton, path, pathname);

    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={cx([styles.subMenuItem, getStyle('/')])}>
                <Link to={`${match.url}`}>
                  <i className="fa fa-star"/>
                  <span>메인</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/posts')])}>
                <Link to={`${match.url}/posts`}>
                  <i className="fa fa-file"/>
                  <span>포스트</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/clubs')])}>
                <Link to={`${match.url}/clubs`}>
                  <i className="fa fa-files-o"/>
                  <span>클럽</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/series')])}>
                <Link to={`${match.url}/series`}>
                  <i className="fa fa-list"/>
                  <span>시리즈</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/tags')])}>
                <Link to={`${match.url}/tags`}>
                  <i className="fa fa-hashtag"/>
                  <span>태그</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, getStyle('/users')])}>
                <Link to={`${match.url}/users`}>
                  <i className="fa fa-user"/>
                  <span>유저</span>
                </Link>
              </div>

            </div>

          </Scrollbars>
        </div>

        <div className={styles.userMenu}>
          <div className={styles.userMeta}>
            <div className={styles.userAvatar}>
              <img src="//placehold.it/40x40"/>
            </div>
            <div className={styles.userInfo}>
              <div>Nice</div>
              <div>Nice</div>
              <div>Nice</div>
            </div>
          </div>
          <div className={styles.userStats}>
            Hello
          </div>
        </div>
      </div>
    );
  }
}

ExploreMenuBox.propTypes = {
  match: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};
ExploreMenuBox.defaultProps = {};

export default ExploreMenuBox;
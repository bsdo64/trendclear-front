import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Route, Switch, Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './index.css';

const data = [
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
  { title: '나는 열네자 입니다' },
];

const activeStyle = function(selector, match, url) {
  let isMatch = url ===  match;

  return cx({[selector]: isMatch})
};

const getSeqPathName = function (pathname, seq = 0) {
  const array = pathname.split('/');

  if (array[seq]) {
    return '/' + array[seq];
  } else {
    return '/';
  }
};

class LeftBar extends React.Component {
  render() {
    const {location} = this.props;
    const pathname = getSeqPathName(location.pathname, 1);

    return (
      <div className={styles.gnbMenu}>
        <ul className={styles.appIconList}>
          <li className={activeStyle(styles.active, '/', pathname)}>
            <Link to="/"><i className="fa fa-home"/></Link>
          </li>
          <li className={activeStyle(styles.active, '/explore', pathname)}>
            <Link to="/explore"><i className="fa fa-globe"/></Link>
          </li>
          <li className={activeStyle(styles.active, '/writing', pathname)}>
            <Link to="/writing"><i className="fa fa-pencil"/></Link>
          </li>
          <li className={activeStyle(styles.active, '/user', pathname)}>
            <Link to="/user"><i className="fa fa-user"/></Link>
          </li>
        </ul>
        <ul className={styles.bottomIconList}>
          <li>
            <i className="fa fa-bars"/>
          </li>
        </ul>
      </div>
    );
  }
}

LeftBar.propTypes = {
  match: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
};
LeftBar.defaultProps = {};

class HomeMenuBox extends React.Component {
  render() {
    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={styles.subMenuItem}>
                <Link to="/">
                  <i className="fa fa-star"/>
                  <span>피드</span>
                </Link>
              </div>
              <div className={styles.subMenuItem}>
                <Link to="/">
                  <i className="fa fa-folder-open"/>
                  <span>컬렉션</span>
                </Link>

                <Link to="/">
                  <i className="fa fa-cog"/>
                </Link>

                <Link to="/">
                  <i className="fa fa-search"/>
                </Link>
              </div>

              <div className={styles.collectionSearchBox}>
                <i className="fa fa-inbox"/>
                <input type="text" className={styles.searchInput}/>
              </div>

              <div className={styles.scrollable}>
                <Scrollbars
                  autoHide
                  autoHeight
                  autoHeightMin={100}
                  autoHeightMax={200}
                  style={{ width: 210 }}>

                  <ul className={styles.collectionList}>
                    {data.map((v, i) => {
                      return (
                        <li key={i} className={styles.collectionListItem}>
                          <div className={styles.collectionItemBox}>
                            <i className="fa fa-inbox"/>
                            {v.title}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                </Scrollbars>
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

HomeMenuBox.propTypes = {};
HomeMenuBox.defaultProps = {};

class ExploreMenuBox extends React.Component {
  render() {
    const {match, location} = this.props;
    const pathname = getSeqPathName(location.pathname, 2);

    console.log(pathname);
    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/', pathname)])}>
                <Link to={`${match.url}`}>
                  <i className="fa fa-star"/>
                  <span>메인</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/posts', pathname)])}>
                <Link to={`${match.url}/posts`}>
                  <i className="fa fa-file"/>
                  <span>포스트</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/clubs', pathname)])}>
                <Link to={`${match.url}/clubs`}>
                  <i className="fa fa-files-o"/>
                  <span>클럽</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/series', pathname)])}>
                <Link to={`${match.url}/series`}>
                  <i className="fa fa-list"/>
                  <span>시리즈</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/tags', pathname)])}>
                <Link to={`${match.url}/tags`}>
                  <i className="fa fa-hashtag"/>
                  <span>태그</span>
                </Link>
              </div>

              <div className={cx([styles.subMenuItem, activeStyle(styles.activeButton, '/users', pathname)])}>
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
  match: React.PropTypes.object.isRequired
};
ExploreMenuBox.defaultProps = {};

const LeftCol = React.createClass({
  render() {

    return (
      <div id="left_col">

        <LeftBar {...this.props} />

        <Switch>
          <Route path="/explore" component={ExploreMenuBox} />
          <Route exact path="/" component={HomeMenuBox} />
        </Switch>
      </div>
    );
  },
});

module.exports = LeftCol;

import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, Route, Switch } from 'react-router-dom';
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

class LeftBar extends React.Component {
  render() {
    return (
      <div className={styles.gnbMenu}>
        <ul className={styles.appIconList}>
          <li className={styles.active}>
            <Link to="/"><i className="fa fa-home"/></Link>
          </li>
          <li>
            <Link to="/explore"><i className="fa fa-globe"/></Link>
          </li>
          <li>
            <Link to="/writing"><i className="fa fa-pencil"/></Link>
          </li>
          <li>
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

LeftBar.propTypes = {};
LeftBar.defaultProps = {};

class HomeMenuBox extends React.Component {
  render() {
    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={styles.subMenuItem}>
                <i className="fa fa-star"/>
                <span>피드</span>
              </div>
              <div className={styles.subMenuItem}>
                <i className="fa fa-folder-open"/>
                <span>컬렉션</span>

                <i className="fa fa-cog"/>
                <i className="fa fa-search"/>
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
    const { match } = this.props;

    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={styles.subMenuItem}>
                <i className="fa fa-star"/>
                <span>메인</span>
              </div>

              <div className={styles.subMenuItem}>
                <Link to={`${match.url}/posts`}>
                  <i className="fa fa-file"/>
                  <span>포스트</span>
                </Link>
              </div>

              <div className={styles.subMenuItem}>
                <i className="fa fa-inbox"/>
                <span>클럽</span>
              </div>

              <div className={styles.subMenuItem}>
                <i className="fa fa-list"/>
                <span>시리즈</span>
              </div>

              <div className={styles.subMenuItem}>
                <i className="fa fa-hashtag"/>
                <span>태그</span>
              </div>

              <div className={styles.subMenuItem}>
                <i className="fa fa-user"/>
                <span>유저</span>
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

        <LeftBar />

        <Switch>
          <Route path="/signin" render={() => null}/>
          <Route path="/explore" component={ExploreMenuBox}/>
          <Route path="/" component={HomeMenuBox}/>
        </Switch>
      </div>
    );
  },
});

module.exports = LeftCol;

import React, {
  PropTypes,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './index.css';

const LeftCol = React.createClass({
  render() {
    return (
      <div id="left_col">

        <div className={styles.gnbMenu}>
          <ul className={styles.appIconList}>
            <li className={styles.active}>
              <i className="fa fa-home" />
            </li>
            <li>
              <i className="fa fa-globe" />
            </li>
            <li>
              <i className="fa fa-pencil" />
            </li>
            <li>
              <i className="fa fa-user" />
            </li>
          </ul>
          <ul className={styles.bottomIconList}>
            <li>
              <i className="fa fa-bars" />
            </li>
          </ul>
        </div>

        <div className={styles.gnbSubMenu}>
          <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
            <div className={styles.subMenuBox}>
              <div className={styles.subMenuItem}>
                <h3>베스트</h3>
              </div>
              <div className={styles.subMenuItem}>
                <h3>팔로잉</h3>
              </div>
              <div className={styles.subMenuItem}>
                <h3>구독</h3>
              </div>
            </div>
          </Scrollbars>
          <div className={styles.userMenu}>
            <div className={styles.userMeta}>
              <div className={styles.userAvatar}>
                <img src="//placehold.it/40x40" />
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

      </div>
    );
  }
});

module.exports = LeftCol;

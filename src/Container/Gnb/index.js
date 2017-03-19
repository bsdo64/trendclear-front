import React, {
  PropTypes,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
          <div className={styles.box}>
            <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
              <div className={styles.subMenuBox}>
                <div className={styles.subMenuItem}>
                  <i className="fa fa-star" />
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
                  <input type="text" className={styles.searchInput} />
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
                        )
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

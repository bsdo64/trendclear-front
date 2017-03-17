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

    console.log(1);

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

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum neque sed pretium luctus. Integer hendrerit quam odio, quis accumsan arcu aliquam in. Cras nec vestibulum est. Sed mauris quam, pretium nec lectus quis, accumsan auctor diam. Etiam sagittis, felis in sodales viverra, tellus est viverra ante, eget mattis nulla augue et metus. Fusce convallis suscipit ex a convallis. Suspendisse lobortis eros neque, vitae vulputate magna venenatis quis. Phasellus ligula lorem, fringilla et felis a, dictum pretium nulla. Phasellus ligula elit, cursus at varius ac, ultrices eleifend nibh. Ut imperdiet sagittis felis, vitae malesuada elit. Nulla facilisi.</p>
              <p>Sed ante purus, commodo in dignissim mattis, aliquet luctus nunc. Quisque in neque sed nunc lacinia gravida. Sed tincidunt tristique vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin in ornare purus. Suspendisse leo mauris, aliquam et justo a, interdum commodo tellus. Maecenas dignissim condimentum odio quis sagittis. Sed luctus et elit in rutrum. Aenean eleifend malesuada suscipit. Nunc hendrerit quis sem eu dictum. Quisque tincidunt, massa eget bibendum consequat, nulla odio eleifend mi, quis fringilla tortor tortor ut nulla. Quisque pellentesque, ipsum et vestibulum dapibus, urna nibh ornare mi, ut tempus lectus neque sit amet eros. Curabitur sit amet elit mi. Vivamus bibendum justo placerat nulla lacinia, quis semper ante sagittis. Morbi venenatis metus at lacinia mattis.</p>
              <p>Vestibulum quis fringilla lectus. Nunc lacinia consequat ligula, quis tristique elit vehicula et. Nunc pretium sagittis vestibulum. Mauris semper metus iaculis, scelerisque enim at, scelerisque quam. Donec malesuada vehicula ipsum, sit amet rutrum erat rutrum sit amet. Pellentesque quis hendrerit dolor. Aliquam ex lacus, imperdiet a ante ac, interdum hendrerit est. Fusce quam massa, malesuada at nunc vitae, pellentesque luctus orci. In nunc ex, imperdiet id dolor ac, laoreet tincidunt mauris. Sed vel ante vitae nibh maximus mattis. Sed ante urna, feugiat ac iaculis eu, scelerisque vitae est.</p>
              <p>Pellentesque scelerisque elementum mi id tincidunt. Pellentesque luctus enim sit amet metus tempus, vulputate dignissim lorem varius. Curabitur congue tellus mi, at interdum nulla rhoncus id. Nam vitae neque vel purus tempor fermentum. Duis semper a mauris a interdum. Maecenas in ligula non sapien tempus ultricies a eu justo. Cras facilisis lobortis felis at pellentesque.</p>
              <p>Suspendisse blandit a lorem a consectetur. Praesent eget placerat nunc. Sed sollicitudin metus in facilisis molestie. Quisque nec porttitor magna, et vehicula arcu. Suspendisse venenatis, ante at porttitor vehicula, nunc elit facilisis elit, sed vulputate leo nisl non elit. Donec vel vehicula est. Etiam egestas felis a erat ultrices malesuada.</p>


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

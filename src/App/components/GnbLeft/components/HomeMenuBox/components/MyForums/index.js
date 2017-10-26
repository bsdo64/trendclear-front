import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../index.css';
import { Link } from 'react-router-dom';
import Scrollbars from '../../../../../ShadowScrollbars';
import cx from 'classnames';
import qs from 'qs';

const MyForums = props => {
  const {
    forumManaged, user, openSearchForum,
    searchList, toggleOpenSearchForum
  } = props;
  return (
    <div>
      <div className={styles.subMenuItem}>
        <Link to="/collection">
          <i className="fa fa-files-o"/>
          <span>내 클럽</span>
        </Link>

        <a onClick={toggleOpenSearchForum}>
          <i className={cx('fa', {
            'fa-search': !openSearchForum,
            'fa-close': openSearchForum,
          })}
          />
        </a>
      </div>

      {
        openSearchForum &&
        <div className={styles.collectionSearchBox}>
          <i className="fa fa-file-o"/>
          <input
            autoFocus={true}
            type="text"
            className={styles.searchInput}
            onChange={searchList}
          />
        </div>
      }

      {
        !!forumManaged.size &&
        <div className={styles.scrollable}>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={50}
            autoHeightMax={200}
            style={{ width: 210 }}>

            <ul className={styles.collectionList}>
              {forumManaged
                .sortBy(item => item.get('title'))
                .map((v, i) => {
                  const styleActive = cx(styles.collectionListItem, {
                    active: qs.parse(location.search.slice(1)).forumId === v.get('id').toString(),
                  });
                  const isCreate = v.get('creator_id') === user.get('id');

                  return (
                    <li key={i} className={styleActive}>
                      <div className={styles.collectionItemBox}>
                        <Link to={`/club/${v.get('id')}`}>
                          <i className="fa fa-file-o"/>
                          {v.get('title')}
                          {!isCreate && ' (매)'}
                        </Link>
                      </div>
                    </li>
                  );
                })}
            </ul>

          </Scrollbars>
        </div>
      }

      {
        forumManaged.size === 0 &&
        <div className={styles.emptyAddBox}>
          <Link to="/submit/club" className={styles.addButton}>
            + 새로운 클럽 만들기
          </Link>
        </div>
      }
    </div>
  )
};

MyForums.propTypes = {
  forumManaged: PropTypes.object.isRequired,
  user: PropTypes.object,
  openSearchForum: PropTypes.bool,
  toggleOpenSearchForum: PropTypes.func,
  searchList: PropTypes.func
};
MyForums.defaultProps = {};

export default MyForums;

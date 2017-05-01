import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../index.css';
import { Link } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import cx from 'classnames';
import qs from 'qs';

const MyCollections = props => {
  const {
    collectionList, user, openSearchCollection,
    searchList, toggleOpenSearchCollection
  } = props;

  return (
    <div>
      <div className={styles.subMenuItem}>
        <Link to="/collection">
          <i className="fa fa-folder-open"/>
          <span>컬렉션</span>
        </Link>

        <a onClick={toggleOpenSearchCollection}>
          <i className={cx('fa', {
            'fa-search': !openSearchCollection,
            'fa-close': openSearchCollection,
          })}
          />
        </a>
      </div>

      {
        openSearchCollection &&
        <div className={styles.collectionSearchBox}>
          <i className="fa fa-inbox"/>
          <input
            type="text"
            className={styles.searchInput}
            onChange={searchList}
          />
        </div>
      }

      <div className={styles.scrollable}>
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={50}
          autoHeightMax={200}
          style={{ width: 210 }}>

          <ul className={styles.collectionList}>
            {collectionList.map((v, i) => {
              return (
                <li key={i} className={styles.collectionListItem}>
                  <div className={styles.collectionItemBox}>
                    <Link to={`/collection/${v.get('id')}`}>
                      <i className="fa fa-inbox"/>
                      {v.get('title')}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

        </Scrollbars>
      </div>
    </div>
  );
};

MyCollections.propTypes = {
  collectionList: PropTypes.object.isRequired,
  user: PropTypes.object,
  openSearchCollection: PropTypes.bool,
  toggleOpenSearchCollection: PropTypes.func,
  searchList: PropTypes.func
};
MyCollections.defaultProps = {};

export default MyCollections;

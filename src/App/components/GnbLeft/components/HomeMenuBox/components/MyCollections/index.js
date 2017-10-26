import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../index.css';
import { NavLink, Link } from 'react-router-dom';
import Scrollbars from '../../../../../ShadowScrollbars';
import cx from 'classnames';

const isActive = location => {
  return location.pathname === '/collection'
};

const MyCollections = props => {
  const {
    collectionList, openSearchCollection,
    searchList, toggleOpenSearchCollection
  } = props;

  const activeStyle = cx(styles.subMenuItem, {
    [styles.activeButton]: isActive(location)
  });

  return (
    <div>
      <div className={activeStyle}>
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
            autoFocus={true}
            type="text"
            className={styles.searchInput}
            onChange={searchList}
          />
        </div>
      }

      {
        !!collectionList.size &&
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
                      <NavLink to={`/collection/${v.get('id')}`} activeClassName={styles.activeButton}>
                        <i className="fa fa-inbox"/>
                        {v.get('title')}
                      </NavLink>
                    </div>
                  </li>
                );
              })}
            </ul>

          </Scrollbars>
        </div>
      }

      {
        collectionList.size === 0 &&
        <div className={styles.emptyAddBox}>
          <Link to="/collection" className={styles.addButton}>
            + 컬렉션을 추가해보세요
          </Link>
        </div>
      }
    </div>
  );
};

MyCollections.propTypes = {
  collectionList: PropTypes.object.isRequired,
  openSearchCollection: PropTypes.bool,
  toggleOpenSearchCollection: PropTypes.func,
  searchList: PropTypes.func
};
MyCollections.defaultProps = {};

export default MyCollections;

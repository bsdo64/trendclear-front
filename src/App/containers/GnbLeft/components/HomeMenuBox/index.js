import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import { getCollectionList } from '../../../../Selectors/User';

class HomeMenuBox extends React.Component {
  constructor() {
    super();

    this.state = {
      openSearch: false
    };

    this.toggleOpenSearch = this.toggleOpenSearch.bind(this);
    this.searchList = this.searchList.bind(this);
  }

  searchList(e) {
    console.log(e.target.value);
  }

  toggleOpenSearch() {
    this.setState({openSearch: !this.state.openSearch});
  }

  render() {
    const { collectionList } = this.props;

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

                <a href="#" onClick={this.toggleOpenSearch}>
                  <i className={cx("fa", {
                    'fa-search': !this.state.openSearch,
                    'fa-close': this.state.openSearch
                  })}
                  />
                </a>
              </div>

              {
                this.state.openSearch &&
                <div className={styles.collectionSearchBox}>
                  <i className="fa fa-inbox"/>
                  <input
                    type="text"
                    className={styles.searchInput}
                    onChange={this.searchList}
                  />
                </div>
              }

              <div className={styles.scrollable}>
                <Scrollbars
                  autoHide
                  autoHeight
                  autoHeightMin={100}
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

HomeMenuBox.propTypes = {
  collectionList: React.PropTypes.object.isRequired
};
HomeMenuBox.defaultProps = {};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    collectionList: getCollectionList(stateStore, props)
  };
};

export default connect(
  mapStateToProps,
  {}
)(HomeMenuBox);

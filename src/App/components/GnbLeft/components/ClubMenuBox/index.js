import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import { getCurrentClub } from '../../../../Selectors/Club.js';

class ClubMenuBox extends React.Component {
  constructor() {
    super();

    this.state = {
      openSearch: false,
    };

    this.toggleOpenSearch = this.toggleOpenSearch.bind(this);
    this.searchList = this.searchList.bind(this);
  }

  searchList(e) {
    console.log(e.target.value);
  }

  toggleOpenSearch() {
    this.setState({ openSearch: !this.state.openSearch });
  }

  render() {
    const { clubInfo } = this.props;

    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          {
            clubInfo &&
            <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
              <div className={styles.subMenuBox}>
                <div className={styles.subMenuItem}>
                  <Link to="/">
                    <i className="fa fa-files-o"/>
                    <span>클럽</span>
                  </Link>
                </div>
                <div >
                  <Link to="/" style={{
                    padding: 10,
                    color: 'inherit',
                    fontWeight: 'bold'
                  }}>
                    <span>{clubInfo.get('title')}</span>
                  </Link>

                  <div style={{
                    minHeight: 60,
                    padding: '2px 10px',
                  }}>
                    <img src="http://placehold.it/40x40" style={{
                      float: 'left',
                      paddingRight: 10,
                      paddingTop: 4,
                    }} />
                    <div style={{display: 'inline'}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                  </div>
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
                    <i className={cx('fa', {
                      'fa-search': !this.state.openSearch,
                      'fa-close': this.state.openSearch,
                    })}
                    />
                  </a>
                </div>
                <div>
                  <Link to="/" style={{color: 'inherit'}}>
                    <span>컬렉션</span>
                  </Link>
                </div>
                <div>
                  <Link to="/" style={{color: 'inherit'}}>
                    <span>컬렉션</span>
                  </Link>
                </div>

              </div>

            </Scrollbars>
          }
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

ClubMenuBox.propTypes = {
  clubInfo: React.PropTypes.object.isRequired,
};
ClubMenuBox.defaultProps = {};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    clubInfo: getCurrentClub(stateStore, props),
  };
};

export default connect(
  mapStateToProps,
  {},
)(ClubMenuBox);

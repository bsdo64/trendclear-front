import React from 'react';
import { Map } from 'immutable';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import { getCurrentClub } from '../../../../Selectors/Club.js';
import WidgetContaienr from '../../../../components/WidgetBox/index.js';

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
    // TODO: Add filter function
    console.log(e.target.value);
  }

  toggleOpenSearch() {
    this.setState({ openSearch: !this.state.openSearch });
  }

  render() {
    const { clubInfo, match } = this.props;

    return (
      <div className={styles.gnbSubMenu}>
        <div className={styles.box}>
          {
            clubInfo &&
            <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
              <div className={styles.subMenuBox}>
                <div className={styles.subMenuItem}>
                  <Link to={`/club/${clubInfo.get('id')}`}>
                    <i className="fa fa-files-o"/>
                    <span>{clubInfo.get('title')}</span>
                  </Link>
                </div>
                <div >

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
                      {clubInfo.get('description')}
                    </div>
                  </div>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/">
                    <span>정보</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/">
                    <span>피드</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/">
                    <span>시리즈</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/">
                    <span>태그</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/">
                    <span>유저</span>
                  </Link>
                </div>
              </div>

            </Scrollbars>
          }
        </div>

        <Route component={WidgetContaienr} />
      </div>
    );
  }
}

ClubMenuBox.propTypes = {
  clubInfo: React.PropTypes.object.isRequired,
  match: React.PropTypes.object.isRequired,
};
ClubMenuBox.defaultProps = {
  clubInfo: Map(),
};

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

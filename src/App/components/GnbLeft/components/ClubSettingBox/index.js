import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import { getCurrentClub } from '../../../../Selectors/Club.js';
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import WidgetContaienr from '../../../../components/WidgetBox/index.js';

class ClubSettingBox extends React.Component {
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
    this.setState({ openSearch: !this.state.openSearchCollection });
  }

  render() {
    const { clubInfo, widgetBox } = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
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
                  padding: '2px 10px',
                }}>
                  <div style={{borderBottom: '1px solid #abc', paddingBottom: 5}}>
                    <i className="fa fa-gear" style={{paddingRight: 5}}/>
                    <span style={{fontWeight: 'bold'}}>설정</span>
                  </div>
                </div>
              </div>
              <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                <Link to={`/club/settings/forumInfo?forumId=${clubInfo.get('id')}`}>
                  <span>클럽 정보</span>
                </Link>
              </div>
              <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                <Link to={`/club/settings/forumprefix?forumId=${clubInfo.get('id')}`}>
                  <span>말머리 설정</span>
                </Link>
              </div>
              <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                <Link to={`/club/settings/announce?forumId=${clubInfo.get('id')}`}>
                  <span>공지글 설정</span>
                </Link>
              </div>
              <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                <Link to={`/club/settings/managers?forumId=${clubInfo.get('id')}`}>
                  <span>매니저 설정</span>
                </Link>
              </div>
              <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                <Link to={`/club/settings/banlist?forumId=${clubInfo.get('id')}`}>
                  <span>벤 유저</span>
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

ClubSettingBox.propTypes = {
  clubInfo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
};
ClubSettingBox.defaultProps = {
  clubInfo: Map(),
};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    clubInfo: getCurrentClub(stateStore, props),
    widgetBox: getWidgetBox(stateStore)
  };
};

export default connect(
  mapStateToProps,
  {

  },
)(ClubSettingBox);

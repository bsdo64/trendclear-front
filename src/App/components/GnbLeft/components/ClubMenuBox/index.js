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

const isActiveButton = (location, locationMatch) => {
  return location.pathname === locationMatch;
};

class ClubMenuBox extends React.Component {
  constructor() {
    super();

    this.state = {
      openSearch: false,
    };

    this.toggleOpenSearch = this.toggleOpenSearch.bind(this);
    this.createClubImage = this.createClubImage.bind(this);
  }

  createClubImage() {
    const { clubInfo } = this.props;
    const forumImage = clubInfo.get('forum_image');

    let dom = (imgSrc) => (
      <div style={{
        width: 45,
        height: 45,
        verticalAlign: 'top',
        display: 'inline-block',
        overflow: 'hidden'
      }}>
        <img src={imgSrc} style={{
          float: 'left',
          paddingRight: 10,
          paddingTop: 4,
          width: 45
        }} />
      </div>
    );

    let imgSrc;
    if (forumImage) {
      imgSrc = `/image/uploaded/files/avatar1/${forumImage}`;
    } else {
      imgSrc = `/images/empty-club-image.png`;
    }

    return dom(imgSrc);
  }

  toggleOpenSearch() {
    this.setState({ openSearch: !this.state.openSearchCollection });
  }

  render() {
    const { match, clubInfo, widgetBox, location } = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    if (clubInfo.get('error')) {
      return null;
    }

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
                    minHeight: 60,
                    padding: '2px 10px',
                  }}>
                    {
                      this.createClubImage()
                    }
                    <div style={{display: 'inline'}}>
                      {clubInfo.get('description')}
                    </div>
                  </div>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem], {
                  [styles.activeButton]: isActiveButton(location, `/club/${clubInfo.get('id')}`)
                })}>
                  <Link to={`/club/${clubInfo.get('id')}`}>
                    <span>정보</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem], {
                  [styles.activeButton]: isActiveButton(location, `/club/${clubInfo.get('id')}/feed`)
                })}>
                  <Link to={`/club/${clubInfo.get('id')}/feed`}>
                    <span>피드</span>
                  </Link>
                </div>
                {/*<div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/" className="ui disable">
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
                </div>*/}
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
  clubInfo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
};
ClubMenuBox.defaultProps = {
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
)(ClubMenuBox);

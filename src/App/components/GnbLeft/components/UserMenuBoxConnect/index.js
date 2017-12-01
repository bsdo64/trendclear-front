import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import styles from '../../index.css';
import cx from 'classnames';
import accounting from 'accounting';

import { getCurrentClub } from '../../../../Selectors/Club.js';
import { getWidgetBox } from '../../../../Selectors/WidgetBox';
import { getUser } from '../../../../Selectors/User';
import AvatarImage from '../../../AvatarImage';

class UserMenuBox extends React.Component {
  componentDidMount() {
    const {user} = this.props;
    if (user) {
      const prevTotalExp = user.getIn(['trendbox', 'prev_exp']);
      const currentTotalExp = user.getIn(['trendbox', 'exp']);
      const nextTotalExp = user.getIn(['trendbox', 'next_exp']);

      const expPercent = (currentTotalExp - prevTotalExp) /
        (nextTotalExp - prevTotalExp) * 100;

      $('#exp_progress')
        .progress({
          percent: expPercent,
        });
    }
  }
  
  render() {
    const { user, clubInfo, widgetBox } = this.props;
    const toggleStyle = cx(styles.box, {
      [styles.toggled]: widgetBox && widgetBox.get('toggleTrendBox')
    });

    if (!user) {
      return (null)
    }

    const sex = user.getIn(['profile', 'sex']),
      avatar_img = user.getIn(['profile', 'avatar_img']),
      iconDef = user.getIn(['icon', 'iconDef']),
      icon_img = iconDef ? iconDef.get('icon_img') : null,
      grade_img = user.getIn(['grade', 'gradeDef', 'img']);
    let iconImg, gradeImg;

    if (icon_img) {
      iconImg = <img id="user_icon_img" src={'/images/' + icon_img}/>;
    }

    return (
      <div className={styles.gnbSubMenu}>
        <div className={toggleStyle}>
          {
            clubInfo &&
            <Scrollbars autoHide style={{ width: 210, paddingRight: 10 }}>
              <div className={styles.subMenuBox}>

                <div id="trend_box" className="widget">
                  <div id="widget_user_info">
                    <div className="ui items">
                      <div className="ui item">

                        <a id="user_avatar_img" className="ui mini image"
                           onClick={this.openAvatarModal}>
                          <AvatarImage
                            sex={sex}
                            avatarImg={avatar_img}
                          />
                        </a>

                        <div className="content">
                          <div className="user_info_header">
                            <span className="ui description">{user.get('nick')}</span>
                            {iconImg}

                            <div className="user_info">
                              <span className="item_col">Lv. {user.getIn(['trendbox', 'level'])}</span>
                              <span className="item_col">Rep. {user.getIn(['trendbox', 'reputation'])}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ui item">
                        <div id="stat_box">
                          <div className="colum">
                            <h4 className="ui description title">트랜드 포인트</h4>
                            <div className="point_line">
                              <span className="ui description">TP</span>
                              <span id="tp_point"
                                    className="ui right floated point tp_point">
                      {accounting.formatNumber(user.getIn(['trendbox', 'T']))}</span>
                            </div>
                            <div className="point_line">
                              <span className="ui description">RP</span>
                              <span id="rp_point"
                                    className="ui right floated point rp_point">
                      {accounting.formatNumber(user.getIn(['trendbox', 'R']))}</span>
                            </div>
                          </div>
                          <div className="colum">
                            <h4 className="ui description title">
                              {'경험치 '}
                              <div className="exp_description">
                                {'('}
                                <span id="current_exp">{user.getIn(['trendbox', 'exp'])}</span>
                                {')'}
                              </div>
                            </h4>
                            <div className="exp_line">
                              <div id="exp_progress"
                                   className="ui indicating small blue progress"
                              >
                                <div className="bar">
                                  <div className="progress"></div>
                                </div>
                                <div className="label remain_exp">
                                  나머지 {user.getIn(['trendbox', 'next_exp']) -
                                user.getIn(['trendbox', 'exp'])}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <span style={{color: '#fff', fontWeight: 'bold'}}>활동</span>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/profile">
                    <span>프로필</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/activity">
                    <span>내 활동 기록</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <span style={{color: '#fff', fontWeight: 'bold'}}>포인트</span>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/chargePoint">
                    <span>포인트 충전하기</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/points/chargeLog">
                    <span>충전 내역</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/points">
                    <span>사용 내역</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/points/myPointRefund">
                    <span>RP 환급</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <span style={{color: '#fff', fontWeight: 'bold'}}>베나링크</span>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/venalinks/active">
                    <span>활성화 내역</span>
                  </Link>
                </div>
                <div className={cx([styles.subMenuItem, styles.clubMenuItem])}>
                  <Link to="/user/venalinks/share">
                    <span>참여 내역</span>
                  </Link>
                </div>
              </div>

            </Scrollbars>
          }
        </div>
      </div>
    );
  }
}

UserMenuBox.propTypes = {
  clubInfo: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  widgetBox: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
UserMenuBox.defaultProps = {
  clubInfo: Map(),
};

const mapStateToProps = (state, props) => {
  const stateStore = state.get('Stores');

  return {
    user: getUser(stateStore),
    clubInfo: getCurrentClub(stateStore, props),
    widgetBox: getWidgetBox(stateStore),
  };
};

export default connect(
  mapStateToProps,
  {

  },
)(UserMenuBox);

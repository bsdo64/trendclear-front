import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import LoginButton from './LoginButton';
import UserActions from '../../Actions/UserActions';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

require('./index.scss');

class NotiButtons extends Component {
  render() {
    const {UserStore} = this.props;
    const Noti = UserStore.getIn(['notifications', 'INoti']);
    const notiEntities = Noti ? Noti.getIn(['entities', 'notis']) : null;

    return (
      <div className="item noti">
        <i className="large alarm icon inverted" />
        {
          Noti && !!notiEntities &&
          <div className="ui red label">
            {notiEntities.reduce((r, v) => r + (v.read ? 0 : 1), 0)}
          </div>
        }
        <div id="alarm_popup" className="ui segment popup">
          <div className="alarm_header">
            <div className="xQb">알림</div>
          </div>

          <Scrollbars style={{ width: 270, height: 300 }}>
            <div className="ui feed ">
              {
                Noti &&
                Noti.get('result').map(notiId => {

                  const noti = notiEntities.get(notiId.toString());
                  const notiItemClass = cx({
                    event: true,
                    'is-read': !noti.get('read')
                  });

                  switch(noti.get('type')) {
                    case 'comment_write':
                      return (
                        <div className={notiItemClass}>
                          <div className="label">
                            <img src="http://dummyimage.com/40x40" />
                          </div>
                          <div className="content">
                            <div className="summary">
                              글 <a>여봉이 사랑해</a>에 <a>{noti.get('count')}</a>개의 댓글이 달렸습니다.

                              <div className="date">
                                3 days ago
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  }

                })
              }
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    <a>151</a>명이 글 <a>여봉이 사랑해</a> 를 좋아합니다.

                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="label">
                  <img src="http://dummyimage.com/40x40" />
                </div>
                <div className="content">
                  <div className="summary">
                    You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                    <div className="date">
                      3 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Scrollbars>
        </div>
      </div>
    )
  }
}

const UserButtons = React.createClass({

  gotoActivity() {
    "use strict";

    $('#profile_id_button').popup('hide');
    browserHistory.push('/activity');
  },

  gotoSettings() {
    "use strict";

    $('#profile_id_button').popup('hide');
    browserHistory.push('/setting');
  },

  handleLogout() {
    UserActions.requestLogout();
  },

  render() {
    const { UserStore } = this.props;
    const user = UserStore.get('user');
    const trendbox = UserStore.get('trendbox');
    const profile = UserStore.get('profile');
    const avatar_img = profile.get('avatar_img'),
      sex = profile.get('sex');

    let avatarImg;
    if (avatar_img) {
      avatarImg = <img className="ui avatar image" src={'/image/uploaded/files/' + avatar_img} />;
    } else {
      if (sex) {
        avatarImg = <img className="ui avatar image" src="/images/default-male.png" />;
      } else {
        avatarImg = <img className="ui avatar image" src="/images/default-female.png" />;
      }
    }

    return (
      <div className="item gnb_my_namebox">
        {
          avatarImg
        }
        <a id="profile_id_button" className="text" >{user.get('nick')}</a>
        <div id="profile_popup" className="ui popup">
          <div className="ui vertical menu secondary">
            <a className="item" onClick={this.gotoActivity}>나의 활동</a>
            <a className="active item" onClick={this.gotoSettings}>설정1</a>
            <a className="item" onClick={this.handleLogout}>
              로그아웃
            </a>
          </div>
        </div>
      </div>
    )
  }
});

const MyArea = React.createClass({
  componentDidMount() {
    $('#profile_id_button')
      .popup({
        popup : $('#profile_popup'),
        position : 'bottom right',
        lastResort: 'bottom right',
        on    : 'click'
      });

    $('.large.alarm.icon')
      .popup({
        popup : $('#alarm_popup'),
        position : 'bottom right',
        lastResort: 'bottom right',
        on    : 'click'
      });
  },
  componentDidUpdate(prevProps, prevState) {
    $('#profile_id_button')
      .popup('refresh');

    $('.large.alarm.icon')
      .popup('refresh');
  },

  render() {
    const { LoginStore } = this.props;
    const isLogin = LoginStore.get('isLogin');
    const openLoginModal = LoginStore.get('openLoginModal');
    
    return (
      <div className="my_area">
        <div className="ui horizontal list">

          {
            !isLogin &&
            <LoginButton
              location={this.props.location}
              openLoginModal={openLoginModal}
            />
          }

          { /* userButtons */ }
          {
            isLogin &&
            <NotiButtons
              {...this.props}
            />
          }
          {
            isLogin &&
            <UserButtons
              {...this.props}
            />
          }

        </div>
      </div>
    );
  }
});

export default MyArea;
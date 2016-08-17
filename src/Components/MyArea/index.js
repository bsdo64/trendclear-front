import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import LoginButton from './LoginButton';
import UserActions from '../../Actions/UserActions';
import cx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import moment from 'moment';
moment.locale('ko')

require('./index.scss');

const NotiItem = React.createClass({
  readNoti(notiId) {
    "use strict";
    const {noti} = this.props;

    if (!noti.get('read')) {
      UserActions.readNoti({
        id: notiId
      });
    }
  },

  render() {

    const {noti} = this.props;
    const forumId = noti.get('forum_id');
    const postId = noti.get('post_id');
    const linkUrl = `/community?forumId=${forumId}&postId=${postId}`
    const notiItemClass = cx({
      event: true,
      'is-read': !noti.get('read')
    });

    switch(noti.get('type')) {
      case 'comment_write':
        return (
          <div className={notiItemClass} onMouseEnter={this.readNoti.bind(this, noti.get('id'))}>
            <div className="label">
              <img src="http://dummyimage.com/40x40" />
            </div>
            <div className="content">
              <div className="summary" onClick={this.props.close}>
                글 <Link to={linkUrl}>{noti.get('title')}</Link>에 <Link to={linkUrl}>{noti.get('count')}</Link>개의 댓글이 달렸습니다.

                <div className="date">
                  {moment(noti.get('receive_at')).fromNow()}
                </div>
              </div>
            </div>
          </div>
        );
      case 'post_like':
        return (
          <div className={notiItemClass} onMouseEnter={this.readNoti.bind(this, noti.get('id'))}>
            <div className="label">
              <img src="http://dummyimage.com/40x40" />
            </div>
            <div className="content">
              <div className="summary">
                글 <Link to={linkUrl}>{noti.get('title')}</Link>을 <Link to={linkUrl}>{noti.get('count')}</Link>명이 좋아합니다.

                <div className="date">
                  {moment(noti.get('receive_at')).fromNow()}
                </div>
              </div>
            </div>
          </div>
        );
      default :
        return (
          <div></div>
        )
    }
  }
});


class NotiButtons extends Component {
  constructor(props) {
    super(props);

    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
  }
  handleCloseDropdown() {
    this.refs.noti_dropdown.hide();
  }
  render() {
    const {UserStore} = this.props;
    const Noti = UserStore.getIn(['notifications', 'INoti']);
    const notiEntities = Noti ? Noti.getIn(['entities', 'notis']) : null;

    let countNoti;
    if (notiEntities) {
      countNoti = notiEntities.reduce((r, v) => r + (v.get('read') ? 0 : 1), 0)
    }
    return (
      <Dropdown id='noti_button' className="item noti" ref="noti_dropdown">
        <DropdownTrigger>
          <i className="large alarm icon inverted" />
          {
            Noti && !!notiEntities && !!countNoti &&
            <div className="ui red label">
              {countNoti}
            </div>
          }
        </DropdownTrigger>
        <DropdownContent>
          <div id="alarm_popup" className="ui segment">
            <div className="alarm_header">
              <div className="xQb">알림</div>
            </div>

            <Scrollbars style={{ height: 300 }}>
              <div className="ui feed ">
                {
                  Noti &&
                  Noti.get('result').map(notiId => <NotiItem close={this.handleCloseDropdown} key={notiId} noti={notiEntities.get(notiId.toString())} />)
                }
              </div>

            </Scrollbars>
          </div>
        </DropdownContent>
      </Dropdown>
    )
  }
}

const UserButtons = React.createClass({

  gotoSubmitCategory() {
    "use strict";

    this.refs.profile_dropdown.hide();
    browserHistory.push('/community/submit/forum');
  },

  gotoActivity() {
    "use strict";

    this.refs.profile_dropdown.hide();
    browserHistory.push('/activity');
  },

  gotoSettings() {
    "use strict";

    this.refs.profile_dropdown.hide();
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
      <div className="item profile">
        {
          avatarImg
        }
        <Dropdown ref="profile_dropdown">
          <DropdownTrigger id="profile_id_button" className="text">
            {user.get('nick')}
          </DropdownTrigger>
          <DropdownContent id="profile_popup" className="ui">
            <div className="ui vertical menu secondary">
              <a className="item" onClick={this.gotoSubmitCategory}>커뮤니티 만들기</a>
              <div className="ui divider"></div>
              <a className="item" onClick={this.gotoActivity}>나의 활동</a>
              <a className="item" onClick={this.gotoSettings}>설정</a>
              <a className="item" onClick={this.handleLogout}>
                로그아웃
              </a>
            </div>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
});

const MyArea = React.createClass({
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
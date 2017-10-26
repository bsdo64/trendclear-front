import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import cx from 'classnames';
import Scrollbars from '../ShadowScrollbars';
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from 'react-simple-dropdown';
import moment from '../../Lib/MomentLib';
moment.locale('ko');

require('./index.scss');
const NotiItem = props => {
  function readNoti(notiId) {
    const { noti, FireRequestUserReadNotification } = props;

    if (!noti.get('read')) {
      FireRequestUserReadNotification({
        id: notiId,
      });
    }
  }

  const { noti, close } = props;
  const forumId = noti.get('forum_id');
  const postId = noti.get('post_id');
  const linkUrl = `/club/${forumId}?postId=${postId}`;
  const notiItemClass = cx({
    event: true,
    'is-read': !noti.get('read'),
  });

  switch (noti.get('type')) {
    case 'comment_write':
      return (
        <div className={notiItemClass}
             onMouseEnter={readNoti.bind(this, noti.get('id'))}>
          <div className="label">
            <img src={require('../../images/40x40.png')}/>
          </div>
          <div className="content">
            <div className="summary" onClick={close}>
              글 <Link to={linkUrl}>{noti.get('title')}</Link>에 <Link
              to={linkUrl}>{noti.get('count')}</Link>개의 댓글이
              달렸습니다.

              <div className="date">
                {moment(noti.get('receive_at')).fromNow()}
              </div>
            </div>
          </div>
        </div>
      );
    case 'post_like':
      return (
        <div className={notiItemClass}
             onMouseEnter={readNoti.bind(this, noti.get('id'))}>
          <div className="label">
            <img src={require('../../images/40x40.png')}/>
          </div>
          <div className="content">
            <div className="summary">
              글 <Link to={linkUrl}>{noti.get('title')}</Link>을 <Link
              to={linkUrl}>{noti.get('count')}</Link>명이 좋아합니다.

              <div className="date">
                {moment(noti.get('receive_at')).fromNow()}
              </div>
            </div>
          </div>
        </div>
      );
    default :
      return (<div/>);
  }
};

NotiItem.propTypes = {
  noti: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  FireRequestUserReadNotification: PropTypes.func.isRequired,
};

class NotiButtons extends Component {
  constructor(props) {
    super(props);

    this.noti_dropdown = null;
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
  }

  handleCloseDropdown() {
    this.noti_dropdown.hide();
  }

  render() {
    const { UserStore, FireRequestUserReadNotification } = this.props;
    const Noti = UserStore.getIn(['notifications', 'INoti']);
    const notiEntities = Noti ? Noti.getIn(['entities', 'notis']) : null;

    let countNoti;
    if (notiEntities) {
      countNoti = notiEntities.reduce((r, v) => r + (v.get('read') ? 0 : 1), 0);
    }
    return (
      <Dropdown id='noti_button' className="item noti" ref={r => this.noti_dropdown = r}>
        <DropdownTrigger>
          <i className="large alarm icon inverted"/>
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

            <Scrollbars autoHide style={{ height: 300 }}>
              <div className="ui feed ">
                {
                  Noti &&
                  Noti.get('result').map(notiId =>
                    <NotiItem close={this.handleCloseDropdown} key={notiId}
                              noti={notiEntities.get(notiId.toString())}
                              FireRequestUserReadNotification={FireRequestUserReadNotification}
                    />
                  )
                }
              </div>

            </Scrollbars>
          </div>
        </DropdownContent>
      </Dropdown>
    );
  }
}

NotiButtons.propTypes = {
  UserStore: PropTypes.object.isRequired,
  FireRequestUserReadNotification: PropTypes.func.isRequired,
};

const UserButtons = props => {
  let profile_dropdown = null;

  function gotoActivity() {
    profile_dropdown.hide();
    props.history.push('/user');
  }

  function gotoSettings() {
    profile_dropdown.hide();
    props.history.push('/setting');
  }

  function handleLogout() {
    props.FireRequestLogout();
  }

  const { UserStore } = props;
  const user = UserStore.get('user');
  const profile = UserStore.get('profile');
  const avatar_img = profile.get('avatar_img'),
    sex = profile.get('sex');

  let avatarImg;
  if (avatar_img) {
    avatarImg = <img className="ui avatar image"
                     src={'/image/uploaded/files/' + avatar_img}/>;
  } else {
    if (sex) {
      avatarImg = <img className="ui avatar image"
                       src={require('../../images/default-male.png')}/>;
    } else {
      avatarImg = <img className="ui avatar image"
                       src={require('../../images/default-female.png')}/>;
    }
  }

  return (
    <div className="item profile">
      {
        avatarImg
      }
      <Dropdown ref={r => profile_dropdown = r}>
        <DropdownTrigger id="profile_id_button" className="text">
          {user.get('nick')}
        </DropdownTrigger>
        <DropdownContent id="profile_popup" className="ui">
          <div className="ui vertical menu secondary">
            <a className="item" onClick={gotoActivity}>프로필 / 활동</a>
            <a className="item" onClick={gotoSettings}>설정</a>
            <a className="item" onClick={handleLogout}>
              로그아웃
            </a>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

UserButtons.propTypes = {
  history: PropTypes.object.isRequired,
  UserStore: PropTypes.object.isRequired,
  FireRequestLogout: PropTypes.func.isRequired,
};

class MyArea extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.LoginStore.get('logoutSuccess') &&
      nextProps.LoginStore.get('logoutSuccess')) {
      window.location.href = '/';
    }
  }

  render() {
    const { LoginStore, location } = this.props;
    const isLogin = LoginStore.get('isLogin');

    return (
      <div className="my_area">
        {
          !isLogin &&
          <LoginButton
            location={location}
            FireToggleLoginModal={this.props.FireToggleLoginModal}
          />
        }

        {
          isLogin &&
          <div className="ui horizontal list">

            <NotiButtons
              {...this.props}
            />

            <UserButtons
              {...this.props}
            />

          </div>
        }

      </div>
    );
  }
}

MyArea.propTypes = {
  location: PropTypes.object.isRequired,
  LoginStore: PropTypes.object.isRequired,
  UserStore: PropTypes.object,
  FireToggleLoginModal: PropTypes.func.isRequired,
  FireRequestLogout: PropTypes.func.isRequired,
  FireRequestUserReadNotification: PropTypes.func.isRequired,
};

export default MyArea;

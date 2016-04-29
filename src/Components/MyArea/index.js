import React, {Component} from 'react';
import LoginButton from './LoginButton';
import UserActions from '../../Actions/UserActions';

require('./index.scss');
class MyArea extends Component {
  componentDidMount() {
    $('#profile_id_button')
      .popup({
        popup : $('#profile_popup'),
        position : 'bottom right',
        on    : 'click'
      });

    $('.large.alarm.icon')
      .popup({
        popup : $('#alarm_popup'),
        position : 'bottom right',
        on    : 'click'
      });
  }

  handleLogout() {
    UserActions.requestLogout();
  }
  render() {
    const { LoginStore, UserStore } = this.props;
    const isLogin = LoginStore.get('isLogin');
    const openLoginModal = LoginStore.get('openLoginModal');
    // const logout = LoginStore.get('logout');

    // if (logout) {
    //   location.href = '/';
    // }

    let userButtons;

    if (isLogin) {
      const user = UserStore.get('user');
      const trendbox = UserStore.get('trendbox');
      const profile = UserStore.get('profile');
      const icon = UserStore.get('icon');
      const grade = UserStore.get('grade');
      const avatar_img = profile.get('avatar_img'),
            sex = profile.get('sex');

      let avatarImg;
      if (avatar_img) {
        avatarImg = <img className="ui avatar image" src={'/images/files/' + avatar_img + '.png'} />;
      } else {
        if (sex) {
          avatarImg = <img className="ui avatar image" src="/images/default-male.png" />;
        } else {
          avatarImg = <img className="ui avatar image" src="/images/default-female.png" />;
        }
      }

      userButtons = [
        <div className="item">
          <i className="large alarm icon" />
          <div id="alarm_popup" className="ui segment popup"  style={{width: 250}}>
            <div className="ui feed ">
              <div className="event">
                <div className="label">
                  {avatarImg}
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
          </div>
        </div>
        ,
        <div className="item gnb_my_namebox">
          {
            avatarImg
          }
          <a id="profile_id_button" className="text" >{user.get('nick')}</a>
          <div id="profile_popup" className="ui popup">
            <div className="ui vertical menu secondary">
              <a className="active item">내 프로필</a>
              <a className="item">내 활동</a>
              <a className="item">도움말</a>
              <div className="ui divider"></div>
              <a href="http://www.google.com" className="item">
                설정
              </a>
              <a className="item" onClick={this.handleLogout}>
                로그아웃
              </a>
            </div>
          </div>
        </div>
      ];
    }
    
    return (
      <div className="my_area">
        <div className="ui horizontal list">

          {
            !isLogin &&
            <LoginButton
              openLoginModal={openLoginModal}
            />
          }

          { /* userButtons */ }
          {
            isLogin &&
            userButtons
          }

        </div>
      </div>
    );
  }
}

export default MyArea;
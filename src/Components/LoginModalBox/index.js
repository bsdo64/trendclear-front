import React from 'react';

import LoginActions from '../../Actions/LoginActions.js';

require('./index.scss');

const LoginModalBox = React.createClass({
  displayName: 'LoginModalBox',
  componentDidMount() {
    $(this.refs.loginform)
      .form({
        inline : true,
        on     : 'blur',
        keyboardShortcuts: false,
        fields: {
          loginEmail     : {
            identifier  : 'loginEmail',
            rules: [
              {
                type   : 'empty',
                prompt : '이메일을 입력해주세요'
              },
              {
                type   : 'email',
                prompt : 'Email 형식을 입력해 주세요.'
              }
            ]
          },
          password   : {
            identifier  : 'password',
            rules: [
              {
                type   : 'regExp[/^[a-z0-9_-]{4,16}$/]',
                prompt : '비밀번호는 4~16자리,영문 입니다'
              }
            ]
          }
        },
        onSuccess: function(event, fields) {
          LoginActions.requestLogin(fields);
        },
        onFailure: function (formErrors, fields) {
          console.log(formErrors);
          console.log(fields);
        }
      });
  },
  handleRequestLogin() {
    $(this.refs.loginform).form('validate form');
  },
  render() {
    const { LoginStore } = this.props;
    const loginFail = LoginStore.get('loginFail');
    const openLoginModal = LoginStore.get('openLoginModal');
    const loginSuccess = LoginStore.get('loginSuccess');
    let loginError;

    if (openLoginModal) {
      $(this.refs.loginmodal).modal({
        duration:	400,
        detachable: false,
        onHide: function () {
          LoginActions.closeLoginModal();
        }
      }).modal('show');
    }

    if (loginFail) {
      loginError = (
        <div className="ui error message" style={{display: 'block'}}>
          <ul className="list">
            <li>이메일과 비밀번호를 다시 확인해주세요</li>
          </ul>
        </div>
      );
    }

    if ((loginFail === false) && (loginSuccess === true)) {
      location.href = '/'
    }

    return (
      <div className="ui small modal gb_login" ref="loginmodal">
        <i className="close icon"></i>
        <div className="content">

          <div id="tc_Head" role="banner">
            <h1>
              <a href="/" id="tc_ServiceLogo"><span
                className="ir_wa">Trend Clear</span></a>
            </h1>
          </div>

          <div id="tc_Content" role="main">
            <div id="mArticle">
              <form className="ui form" ref="loginform">
                <div className="field">
                  <label>이메일</label>
                  <input type="text" name="loginEmail"  />
                </div>
                <div className="field">
                  <label>비밀번호</label>
                  <input type="password" name="password" />
                </div>
                <div className="inline field">
                  <div className="ui checkbox">
                    <input type="checkbox" id="agreement-checkbox" />
                    <label htmlFor="agreement-checkbox">아이디를 저장합니다</label>
                  </div>
                </div>
                <div className="ui primary button fluid" onClick={this.handleRequestLogin}>로그인</div>

                { loginError }

                <div className="login_append">
                  <a href="/member/find/loginId" className="link_find">아이디</a>
                  <span> / </span>
                  <a href="/member/find/password" className="link_find">비밀번호찾기</a>
                  <span className="txt_bar">|</span>
                  <a href="/signin">회원 가입하기</a>
                </div>

              </form>
            </div>
            <div id="tc_Foot" className="footer_tistory" role="contentinfo">
              <div className="inner_footer">
                <address className="txt_copyright">
                  Copyright © 
                  <a className="link_tc_">TrendClear Corp.</a>
                  All rights reserved.
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default LoginModalBox;

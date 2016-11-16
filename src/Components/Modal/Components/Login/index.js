import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LoginActions from '../../../../Actions/LoginActions.js';

require('./index.scss');
const Login = React.createClass({
  displayName: 'LoginModalBox',
  propTypes: {
    LoginStore: PropTypes.object.isRequired,
  },

  componentDidMount() {
    $(this.refs.loginform)
      .form({
        inline: true,
        on: 'blur',
        keyboardShortcuts: false,
        fields: {
          loginEmail: {
            identifier: 'loginEmail',
            rules: [
              {
                type: 'empty',
                prompt: '이메일을 입력해주세요'
              },
              {
                type: 'email',
                prompt: 'Email 형식을 입력해 주세요.'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'regExp[/^[A-Za-z0-9~!@\#$%<>^&*\()\-=+_\’]{6,20}$/]',
                prompt: '비밀번호는 특수문자포함 6~20 자리 안으로 입력해주세요'
              }
            ]
          }
        },
        onSuccess: (event, fields) => {
          LoginActions.sendLogin({
            email: fields.loginEmail,
            password: fields.password
          });
        },
        onFailure: (formErrors, fields) => {
          console.log(formErrors);
          console.log(fields);
        }
      });
  },

  handleRequestLoginByEnter(e) {
    if (e.key === "Enter" && e.keyCode === 13) {
      this.handleRequestLogin();
    }
  },

  handleRequestLogin() {
    $(this.refs.loginform).form('validate form');
  },
  handleRequestSignin() {
    $(this.refs.loginmodal).modal('hide');
  },

  afterOpenModal: function () {
    // references are now sync'd and can be accessed.
    $(this.refs.loginform)
      .form({
        inline: true,
        on: 'blur',
        keyboardShortcuts: false,
        fields: {
          loginEmail: {
            identifier: 'loginEmail',
            rules: [
              {
                type: 'empty',
                prompt: '이메일을 입력해주세요'
              },
              {
                type: 'email',
                prompt: 'Email 형식을 입력해 주세요.'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'regExp[/^[A-Za-z0-9~!@\#$%<>^&*\()\-=+_\’]{6,20}$/]',
                prompt: '비밀번호는 특수문자포함 6~20 자리 안으로 입력해주세요'
              }
            ]
          }
        },
        onSuccess: function (event, fields) {
          LoginActions.sendLogin({
            email: fields.loginEmail,
            password: fields.password
          });
        },
        onFailure: function (formErrors, fields) {
          console.log(formErrors);
          console.log(fields);
        }
      });
  },

  closeModal: function () {
    LoginActions.closeLoginModal();
  },

  render() {
    const { LoginStore } = this.props;
    const loginFail = LoginStore.get('loginFail');
    const loginSuccess = LoginStore.get('loginSuccess');
    let loginError;

    if (loginFail) {
      loginError = (
        <div className="ui error message" style={{ display: 'block' }}>
          <ul className="list">
            <li>이메일과 비밀번호를 다시 확인해주세요</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="content">

        <div id="tc_Head" role="banner">
          <h1>
            <a href="/" id="tc_ServiceLogo"><span
              className="ir_wa">Venacle</span></a>
          </h1>
        </div>

        <div id="tc_Content" role="main">
          <div id="mArticle">
            <form className="ui form" ref="loginform">
              <div className="field">
                <label>이메일</label>
                <input type="text" name="loginEmail"/>
              </div>
              <div className="field">
                <label>비밀번호</label>
                <input type="password" name="password" onKeyDown={this.handleRequestLoginByEnter}/>
              </div>
              <div className="inline field">
                <div className="ui checkbox">
                  <input type="checkbox" id="agreement-checkbox"/>
                  <label htmlFor="agreement-checkbox">아이디를 저장합니다</label>
                </div>
              </div>
              <div className="ui primary button fluid" onClick={this.handleRequestLogin}>로그인</div>

              { loginError }

              <div className="login_append">
                <Link to="/member/find" className="link_find">아이디 / 비밀번호찾기</Link>
                <span className="txt_bar">|</span>
                <Link to="/signin" onClick={this.handleRequestSignin}>회원 가입하기</Link>
              </div>

            </form>
          </div>
          <div id="tc_Foot" className="footer_tistory" role="contentinfo">
            <div className="inner_footer">
              <address className="txt_copyright">
                Copyright ©
                <a className="link_tc_">Venacle Corp.</a>
                All rights reserved.
              </address>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Login;
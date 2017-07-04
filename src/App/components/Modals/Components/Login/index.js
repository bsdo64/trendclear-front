import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import debug from 'debug';
const errorLog = debug('vn:Components:Modal:Login:Form');

require('./index.scss');
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.loginForm = null;

    this.handleRequestLogin = this.handleRequestLogin.bind(this);
    this.handleRequestLoginByEnter = this.handleRequestLoginByEnter.bind(this);
    this.handleRequestFindUser = this.handleRequestFindUser.bind(this);
    this.handleRequestSignin = this.handleRequestSignin.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.LoginStore.get('loginSuccess') &&
      nextProps.LoginStore.get('loginSuccess')) {
      window.location.href = nextProps.ModalStore.get('location') || '/';
    }
  }

  componentDidMount() {
    $(this.loginForm)
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
                prompt: '이메일을 입력해주세요',
              },
              {
                type: 'email',
                prompt: 'Email 형식을 입력해 주세요.',
              },
            ],
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'regExp[/^[A-Za-z0-9~!@\#$%<>^&*\()\-=+_\’]{6,20}$/]',
                prompt: '비밀번호는 특수문자포함 6~20 자리 안으로 입력해주세요',
              },
            ],
          },
        },
        onSuccess: (event, fields) => {
          this.props.FireRequestLogin({
            email: fields.loginEmail,
            password: fields.password,
          });
        },
        onFailure: (formErrors, fields) => {
          errorLog(formErrors, fields);
        },
      });
  }

  handleRequestFindUser() {
    const { history, FireToggleLoginModal } = this.props;

    FireToggleLoginModal({
      contentType: 'Login',
    });

    history.push('/member/find');
  }

  handleRequestLoginByEnter(e) {
    if (e.key === 'Enter' && e.keyCode === 13) {
      this.handleRequestLogin();
    }
  }

  handleRequestLogin() {
    $(this.loginForm).form('validate form');
  }

  handleRequestSignin() {
    const { history, FireToggleLoginModal } = this.props;

    FireToggleLoginModal({
      contentType: 'Login',
    });

    history.push('/signin');
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    $(this.loginForm)
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
                prompt: '이메일을 입력해주세요',
              },
              {
                type: 'email',
                prompt: 'Email 형식을 입력해 주세요.',
              },
            ],
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'regExp[/^[A-Za-z0-9~!@\#$%<>^&*\()\-=+_\’]{6,20}$/]',
                prompt: '비밀번호는 특수문자포함 6~20 자리 안으로 입력해주세요',
              },
            ],
          },
        },
        onSuccess: (event, fields) => {
          this.props.FireRequestLogin({
            email: fields.loginEmail,
            password: fields.password,
          });
        },
        onFailure: (formErrors, fields) => {
          errorLog(formErrors, fields);
        },
      });
  }

  render() {
    const {LoginStore} = this.props;
    const loginFail = LoginStore.get('loginFail');
    let loginError;

    if (loginFail) {
      loginError = (
        <div className="ui error message" style={{display: 'block'}}>
          <ul className="list">
            <li>이메일과 비밀번호를 다시 확인해주세요</li>
          </ul>
        </div>
      );
    }

    const loginButton = cx('ui primary button fluid', {
      loading: LoginStore.get('isLoading'),
      disabled: LoginStore.get('isLoading'),
    });

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
            <form className="ui form" ref={r => this.loginForm = r}>
              <div className="field">
                <label>이메일</label>
                <input type="text" name="loginEmail"/>
              </div>
              <div className="field">
                <label>비밀번호</label>
                <input type="password" name="password"
                       onKeyDown={this.handleRequestLoginByEnter}/>
              </div>
              <div className="inline field">
                <div className="ui checkbox">
                  <input type="checkbox" id="agreement-checkbox"/>
                  <label htmlFor="agreement-checkbox">아이디를 저장합니다</label>
                </div>
              </div>
              <div className={loginButton} onClick={this.handleRequestLogin}>
                로그인
              </div>

              { loginError }

              <div className="login_append">
                <a href="#"
                   className="link_find"
                   onClick={this.handleRequestFindUser}>아이디 / 비밀번호찾기</a>
                <span className="txt_bar">|</span>
                <a href="#" onClick={this.handleRequestSignin}>회원 가입하기</a>
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
}

Login.displayName = 'LoginModalBox';
Login.propTypes =  {
  history: PropTypes.object.isRequired,
  LoginStore: PropTypes.object.isRequired,
  ModalStore: PropTypes.object.isRequired,
  FireRequestLogin: PropTypes.func.isRequired,
  FireToggleLoginModal: PropTypes.func.isRequired,
};

export default withRouter(Login);
